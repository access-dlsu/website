'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './dp-blast.module.css';

export default function DPBlast() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState({ x: 1, y: 1 });
  const [currentCategory, setCurrentCategory] = useState('new');
  const [caption, setCaption] = useState('');
  const [originalCaption, setOriginalCaption] = useState('');
  const [frameSubOptions, setFrameSubOptions] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; key: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempOverlayOnCanvasRef = useRef<HTMLImageElement>(null);
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const startDragPos = useRef({ x: 0, y: 0 });
  const defaultImgSize = useRef({ width: 0, height: 0 });
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const initialTouchDistance = useRef(0);
  const uploadedImageEl = useRef<HTMLImageElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const minZoom = 0.25;
  const maxZoom = 2.25;

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type, key: Date.now() });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const tempOverlay = tempOverlayOnCanvasRef.current;
    if (!canvas || !tempOverlay) return;

    if (selectedFrame) {
      tempOverlay.src = selectedFrame.src;
    }

    if (!uploadedImage) {
      return;
    }

    canvas.width = 1080;
    canvas.height = 1080;
    updateImage();
  };

  const updateImage = (callback?: () => void) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const imageToDraw = uploadedImageEl.current;
      if (!canvas || !imageToDraw) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        imageToDraw,
        imgPos.x,
        imgPos.y,
        defaultImgSize.current.width * zoom.x,
        defaultImgSize.current.height * zoom.y
      );

      if (callback && selectedFrame) {
        if (tempOverlayOnCanvasRef.current) tempOverlayOnCanvasRef.current.style.display = 'none';
        ctx.drawImage(selectedFrame, 0, 0, canvas.width, canvas.height);
        callback();
        if (tempOverlayOnCanvasRef.current) tempOverlayOnCanvasRef.current.style.display = '';
        updateImage(); // Redraw without frame for live preview
      }
    });
  };

  const loadFrameCaption = (frameElement: HTMLImageElement) => {
    let captionFile = 'caption3.txt'; // default
    const alt = frameElement.alt;

    if (alt.includes('ARW24')) captionFile = 'caption.txt';
    else if (alt.includes('ACCESS Scares')) captionFile = 'caption2.txt';
    else if (alt.includes('ACCESS Under the Sea')) captionFile = 'caption3.txt';
    else if (alt.includes('LEAP2025')) captionFile = 'caption4.txt';
    else if (alt.includes('Full Throttle')) captionFile = 'caption5.txt';
    else if (alt.includes('BYTE')) captionFile = 'caption6.txt';
    else if (alt.includes('Frosh Welcoming')) captionFile = 'caption7.txt';

    fetch(`/dp-blast/captions/${captionFile}`)
      .then(response => response.text())
      .then(data => {
        setCaption(data);
        setOriginalCaption(data);
      })
      .catch(error => console.error('Error loading caption:', error));
  };

  const selectFrame = (frameElement: HTMLImageElement) => {
    setSelectedFrame(frameElement);
    loadFrameCaption(frameElement);
  };

  useEffect(() => {
    const newFrames = framesRef.current.filter(f => (f?.closest('.frame-item') as HTMLElement | null)?.dataset.category === 'new');
    const frameToSelect = newFrames.length > 0 ? newFrames[0] : framesRef.current[0];
    if (frameToSelect) {
      setSelectedFrame(frameToSelect);
      loadFrameCaption(frameToSelect);
    }
  }, []);

  useEffect(() => {
    updateCanvas();
  }, [uploadedImage, selectedFrame, frameSubOptions, imgPos, zoom]);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target?.result as string;
      setUploadedImage(imgUrl);
      const img = new Image();
      img.onload = () => {
        uploadedImageEl.current = img;
        const scaleFactor = 1080 / Math.max(img.naturalWidth, img.naturalHeight);
        defaultImgSize.current = {
          width: img.naturalWidth * scaleFactor,
          height: img.naturalHeight * scaleFactor,
        };
        setImgPos({ x: 0, y: 0 });
        setZoom({ x: 1, y: 1 });
      };
      img.src = imgUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const getCanvasRelativeScale = (property: 'width' | 'height') => {
    const canvas = canvasRef.current;
    if (!canvas) return 1;
    return canvas[property] / parseFloat(getComputedStyle(canvas)[property]);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!uploadedImage) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setIsDragging(true);
    startDragPos.current = {
      x: (e.clientX - rect.left) * getCanvasRelativeScale('width') - imgPos.x,
      y: (e.clientY - rect.top) * getCanvasRelativeScale('height') - imgPos.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && uploadedImage) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      setImgPos({
        x: (e.clientX - rect.left) * getCanvasRelativeScale('width') - startDragPos.current.x,
        y: (e.clientY - rect.top) * getCanvasRelativeScale('height') - startDragPos.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: WheelEvent) => {
    const canvas = canvasRef.current;
    if (!uploadedImage || !canvas) return;
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const mouseX = (e.clientX - rect.left) / canvas.clientWidth;
    const mouseY = (e.clientY - rect.top) / canvas.clientHeight;

    const newZoomX = Math.min(maxZoom, Math.max(minZoom, zoom.x + delta));
    const newZoomY = Math.min(maxZoom, Math.max(minZoom, zoom.y + delta));

    const zoomXChange = newZoomX - zoom.x;
    const zoomYChange = newZoomY - zoom.y;

    setImgPos(prevImgPos => ({
      x: prevImgPos.x - (mouseX * canvas.clientWidth) * getCanvasRelativeScale('width') * zoomXChange,
      y: prevImgPos.y - (mouseY * canvas.clientHeight) * getCanvasRelativeScale('height') * zoomYChange,
    }));

    setZoom({ x: newZoomX, y: newZoomY });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!uploadedImage || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (e.touches.length === 1) {
      setIsDragging(true);
      startDragPos.current = {
        x: (e.touches[0].clientX - rect.left) * getCanvasRelativeScale('width') - imgPos.x,
        y: (e.touches[0].clientY - rect.top) * getCanvasRelativeScale('height') - imgPos.y,
      };
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      initialTouchDistance.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const canvas = canvasRef.current;
    if (!uploadedImage || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (e.touches.length === 1 && isDragging) {
      e.preventDefault();
      setImgPos({
        x: (e.touches[0].clientX - rect.left) * getCanvasRelativeScale('width') - startDragPos.current.x,
        y: (e.touches[0].clientY - rect.top) * getCanvasRelativeScale('height') - startDragPos.current.y,
      });
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
      const centerX = (touch1.clientX + touch2.clientX) / 2;
      const centerY = (touch1.clientY + touch2.clientY) / 2;
      const relativeX = (centerX - rect.left) / canvas.clientWidth;
      const relativeY = (centerY - rect.top) / canvas.clientHeight;

      if (initialTouchDistance.current === 0) {
          initialTouchDistance.current = currentDistance;
      } else {
        const delta = (currentDistance - initialTouchDistance.current) * 0.01;
        const newZoomX = Math.min(maxZoom, Math.max(minZoom, zoom.x + delta));
        const newZoomY = Math.min(maxZoom, Math.max(minZoom, zoom.y + delta));

        const zoomXChange = newZoomX - zoom.x;
        const zoomYChange = newZoomY - zoom.y;

        setZoom({ x: newZoomX, y: newZoomY });

        setImgPos(prevImgPos => ({
          x: prevImgPos.x - (relativeX * canvas.clientWidth) * getCanvasRelativeScale('width') * zoomXChange,
          y: prevImgPos.y - (relativeY * canvas.clientHeight) * getCanvasRelativeScale('height') * zoomYChange,
        }));
        initialTouchDistance.current = currentDistance;
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    setIsDragging(false);
    if (e.touches.length < 2) {
      initialTouchDistance.current = 0;
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, uploadedImage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel);
      }
    };
  }, [uploadedImage, zoom]);

  const handleDownload = () => {
    if (!uploadedImage || !selectedFrame) return;
    updateImage(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const link = document.createElement('a');
        link.download = 'dp-blast-image.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.dragover);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add(styles.dragover);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.dragover);
  };

  const frameData = [
    { id: 'frame1', category: 'old', label: 'ARW24', src: 'dp-blast/images/frame1.png' },
    { id: 'frame2', category: 'old', label: 'ACCESS Scares', src: 'dp-blast/images/frame2.png' },
    { id: 'frame3', category: 'old', label: 'ACCESS Under the Sea', src: 'dp-blast/images/frame3.png' },
    { id: 'frame4', category: 'old', label: 'LEAP2025: Rank Up!', src: 'dp-blast/images/frame4.png' },
    {
      id: 'frame5', category: 'old', label: 'Full Throttle: ACCESS Grand Prix',
      options: ['dp', 'president', 'internals', 'externals', 'logistics'],
      getSrc: (sub: string) => `dp-blast/images/frame5/${sub}.png`
    },
    {
      id: 'frame6', category: 'old', label: 'BYTE: Beyond Your Technical Expertise 2025',
      options: ['dp', 'internals', 'externals', 'operations'],
      getSrc: (sub: string) => `dp-blast/images/frame6/${sub}.png`
    },
    { id: 'frame7', category: 'new', label: 'Frosh Welcoming 2025', src: 'dp-blast/images/frame7.png' },
  ];

  useEffect(() => {
    const initialSubOptions: Record<string, string> = {};
    frameData.forEach(frame => {
      if (frame.options) {
        initialSubOptions[frame.id] = frame.options[0];
      }
    });
    setFrameSubOptions(initialSubOptions);
  }, []);

  const filteredFrames = frameData.filter(frame => currentCategory === 'all' || frame.category === currentCategory);

  return (
    <div className={styles.container}>
      {notification && (
        <div key={notification.key} className={`${styles.notification} ${styles[notification.type]} ${styles.show}`}>
          <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : 'info-circle'}`}></i>
          <span>{notification.message}</span>
        </div>
      )}
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <i className="fas fa-rocket"></i>
          <h1>DP Blast Maker</h1>
        </div>
        <p className={styles.subtitle}>Just upload your image and choose your frame, and you&apos;re good to go!</p>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Two Column Layout */}
        <div className={styles.twoColumnLayout}>
          {/* Left Column - Upload and Frame Selection */}
          <div className={styles.leftColumn}>
            {/* Step 1: Image Upload */}
            <section className={styles.stepSection}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>1</div>
                <h2>Upload Your Image</h2>
              </div>
              <div className={styles.uploadArea} id="uploadArea" onClick={() => uploadImageRef.current?.click()} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                <input type="file" id="uploadImage" accept="image/*" className={styles.fileInput} ref={uploadImageRef} onChange={handleFileChange} />
                <div className={styles.uploadContent}>
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Click to upload or drag and drop</p>
                  <span className={styles.fileTypes}>PNG, JPG, JPEG up to 10MB</span>
                </div>
              </div>
            </section>

            {/* Step 2: Frame Selection */}
            <section className={styles.stepSection}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>2</div>
                <h2>Choose Your Frame</h2>
              </div>
              <div className={styles.frameSelection}>
                <div className={styles.frameCategories}>
                  <div className={styles.categoryTabs}>
                    <button className={`${styles.categoryTab} ${currentCategory === 'all' ? styles.active : ''}`} onClick={() => setCurrentCategory('all')}>
                      <i className="fas fa-th"></i>
                      All Frames
                    </button>
                    <button className={`${styles.categoryTab} ${currentCategory === 'old' ? styles.active : ''}`} onClick={() => setCurrentCategory('old')}>
                      <i className="fas fa-clock"></i>
                      Old
                    </button>
                    <button className={`${styles.categoryTab} ${currentCategory === 'new' ? styles.active : ''}`} onClick={() => setCurrentCategory('new')}>
                      <i className="fas fa-star"></i>
                      New
                    </button>
                  </div>
                </div>

                <div className={styles.framesContainer}>
                  <div className={styles.frames}>
                    {filteredFrames.map((frame) => (
                      <div
                        key={frame.id}
                        className={`${styles.frameItem} ${selectedFrame?.id.startsWith(frame.id) ? styles.selected : ''}`}
                        data-category={frame.category}
                        onClick={() => {
                          const frameEl = framesRef.current.find(f => f?.id.startsWith(frame.id));
                          if (frameEl) selectFrame(frameEl);
                        }}
                      >
                        <div className={styles.framePreview}>
                          <img
                            ref={el => {
                              if (el && !framesRef.current.includes(el)) {
                                framesRef.current.push(el);
                              }
                            }}
                            src={frame.options ? frame.getSrc(frameSubOptions[frame.id] || frame.options[0]) : frame.src}
                            className={`${styles.frameOption} ${selectedFrame?.id.startsWith(frame.id) ? styles.active : ''}`}
                            alt={frame.label}
                            id={frame.id}
                            data-frame={frame.id}
                          />
                          <div className={styles.frameOverlay}>
                            <i className="fas fa-check"></i>
                          </div>
                        </div>
                        <div className={styles.frameInfo}>
                          <span className={styles.frameLabel}>{frame.label}</span>
                          <span className={`${styles.frameBadge} ${frame.category === 'new' ? styles.new : styles.old}`}>{frame.category}</span>
                        </div>
                        {frame.options && (
                          <select
                            className={styles.frameDropdown}
                            value={frameSubOptions[frame.id] || frame.options[0]}
                            onChange={(e) => {
                              const sub = e.target.value;
                              setFrameSubOptions(prev => ({ ...prev, [frame.id]: sub }));

                              const newSrc = frame.getSrc(sub);
                              const frameEl = framesRef.current.find(f => f?.id.startsWith(frame.id));
                              if (frameEl) {
                                frameEl.src = newSrc;
                                selectFrame(frameEl);
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {frame.options.map(opt => (
                              <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Canvas and Customization */}
          <div className={styles.rightColumn}>
            {/* Step 3: Customize */}
            <section className={styles.stepSection}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>3</div>
                <h2>Customize Your Image</h2>
              </div>
              <div className={styles.canvasContainer}>
                <div className={styles.canvasWrapper}>
                  <canvas className={styles.profileCanvas} ref={canvasRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}></canvas>
                  <img className={styles.tempOverlayOnCanvas} alt="" ref={tempOverlayOnCanvasRef} style={{ pointerEvents: 'none' }} />
                  <div className={styles.canvasOverlay} id="canvasOverlay" style={{ display: uploadedImage ? 'none' : 'flex' }}>
                    <div className={styles.overlayContent}>
                      <i className="fas fa-image"></i>
                      <p>Upload an image to get started</p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                  <div className={styles.controlGroup}>
                    <label htmlFor="sizeSlider">Width Scale</label>
                    <input type="range" id="sizeSlider" min="0.25" max="1.75" step="0.05" value={zoom.x} onChange={(e) => setZoom({ ...zoom, x: parseFloat(e.target.value) })} />
                    <span className={styles.sliderValue} id="sizeSliderValue">{zoom.x.toFixed(2)}</span>
                  </div>
                  <div className={styles.controlGroup}>
                    <label htmlFor="sizeSlider2">Height Scale</label>
                    <input type="range" id="sizeSlider2" min="0.25" max="1.75" step="0.05" value={zoom.y} onChange={(e) => setZoom({ ...zoom, y: parseFloat(e.target.value) })} />
                    <span className={styles.sliderValue} id="sizeSlider2Value">{zoom.y.toFixed(2)}</span>
                  </div>
                </div>
                <div className={styles.frameSelectionTips}>
                  <div className={styles.tipItem}>
                    <i className="fas fa-mouse"></i>
                    <span>Drag to move image</span>
                  </div>
                  <div className={styles.tipItem}>
                    <i className="fas fa-search"></i>
                    <span>Scroll/pinch to zoom</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className={styles.fullWidthSections}>
          {/* Step 4: Download */}
          <section className={styles.stepSection}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>4</div>
              <h2>Download Your Creation</h2>
            </div>
            <div className={styles.downloadSection}>
              <button id="downloadImage" className={styles.downloadBtn} onClick={handleDownload}>
                <i className="fas fa-download"></i>
                Download Image
              </button>
            </div>
          </section>

          {/* Caption Section */}
          <section className={styles.stepSection}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>5</div>
              <h2>Caption</h2>
            </div>
            <div className={styles.captionSection}>
              <textarea className={styles.caption} placeholder="Your caption will appear here..." rows={8} value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
              <div className={styles.captionActions}>
                <button id="resetButton" className={styles.btnSecondary} onClick={() => {
                  setCaption(originalCaption);
                  showNotification('Caption reset to original', 'info');
                }}>
                  <i className="fas fa-undo"></i>
                  Reset
                </button>
                <button id="copyButton" className={styles.btnPrimary} onClick={() => {
                  navigator.clipboard.writeText(caption)
                    .then(() => showNotification('Caption copied to clipboard!', 'success'))
                    .catch(() => showNotification('Failed to copy caption', 'error'));
                }}>
                  <i className="fas fa-copy"></i>
                  Copy Caption
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

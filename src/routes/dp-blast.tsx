import { onMount } from "solid-js"

import './dp-blast.css'

export default function DPBlast() {
  // Refs for DOM elements
  let copyButtonRef: HTMLButtonElement | undefined;
  let resetButtonRef: HTMLButtonElement | undefined;
  let captionRef: HTMLTextAreaElement | undefined;
  let sizeSliderRef: HTMLInputElement | undefined;
  let sizeSlider2Ref: HTMLInputElement | undefined;
  let sizeSliderValueRef: HTMLSpanElement | undefined;
  let sizeSlider2ValueRef: HTMLSpanElement | undefined;
  let uploadImageRef: HTMLInputElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;
  let tempOverlayOnCanvasRef: HTMLImageElement | undefined;
  let canvasOverlayRef: HTMLDivElement | undefined;
  let uploadAreaRef: HTMLDivElement | undefined;
  let downloadImageRef: HTMLButtonElement | undefined;
  let frame5PreviewImgRef: HTMLImageElement | undefined;
  let frame5DropdownRef: HTMLSelectElement | undefined;
  let frame5OptionsRef: HTMLDivElement | undefined;
  let frame5ItemRef: HTMLDivElement | undefined;

  // Notification function
  function showNotification(message: string, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  onMount(() => {
    // Clear all cookies for this page on load
    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach(function(cookie) {
        var eqPos = cookie.indexOf('=');
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name.trim() + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      });
    }

    // Copy caption to clipboard
    copyButtonRef?.addEventListener('click', function() {
      if (!captionRef) return;
      captionRef.select();
      captionRef.setSelectionRange(0, 99999); // For mobile devices

      try {
        document.execCommand('copy');
        showNotification('Caption copied to clipboard!', 'success');
      } catch (err) {
        showNotification('Failed to copy caption', 'error');
      }
    });

    // Reset caption to original
    resetButtonRef?.addEventListener('click', function() {
      if (!captionRef) return;
      // @ts-ignore
      captionRef.value = window.originalCaption;
      showNotification('Caption reset to original', 'info');
    });

    // Update slider values display
    sizeSliderRef?.addEventListener('input', function(this: HTMLInputElement) {
      if (sizeSliderValueRef)
        sizeSliderValueRef.textContent = parseFloat(this.value).toFixed(2);
    });

    sizeSlider2Ref?.addEventListener('input', function(this: HTMLInputElement) {
      if (sizeSlider2ValueRef)
        sizeSlider2ValueRef.textContent = parseFloat(this.value).toFixed(2);
    });

    // --- Begin integrated JS logic using refs ---

    // Refs for DOM elements
    const uploadImage = uploadImageRef!;
    const canvas = canvasRef!;
    const tempOverlayOnCanvas = tempOverlayOnCanvasRef!;
    const canvasOverlay = canvasOverlayRef!;
    const ctx = canvas.getContext('2d')!;
    const frames = Array.from(document.querySelectorAll('.frame-option')) as HTMLImageElement[];
    const frameItems = Array.from(document.querySelectorAll('.frame-item')) as HTMLDivElement[];
    const categoryTabs = Array.from(document.querySelectorAll('.category-tab')) as HTMLButtonElement[];
    const sizeSlider = sizeSliderRef!;
    const sizeSlider2 = sizeSlider2Ref!;
    const sizeSliderValue = sizeSliderValueRef!;
    const sizeSlider2Value = sizeSlider2ValueRef!;
    const uploadArea = uploadAreaRef!;
    const downloadImageBtn = downloadImageRef!;
    const frame5PreviewImg = frame5PreviewImgRef!;
    const frame5Dropdown = frame5DropdownRef!;
    const frame5Options = frame5OptionsRef!;
    const frame5Item = frame5ItemRef!;

    // Debug logging
    // ...existing code...

    let uploadedImage: string | null = null;
    let selectedFrame: HTMLImageElement | null = null;
    let isDragging = false;
    let startX = 0, startY = 0;
    let imgX = 0, imgY = 0;
    let zoomX = 1, zoomY = 1;
    const minZoom = 0.25;
    const maxZoom = 2.25;
    let initialDistance = 0;
    let defaultWidth = 0, defaultHeight = 0;
    let currentCategory = 'new';

    // Initialize the first frame as selected
    if (frames.length > 0) {
      // Filter to show only new frames by default
      filterFrames('new');

      // Find the first new frame to select
      const newFrames = frames.filter(frame => {
        const frameItem = frame.closest('.frame-item');
        return frameItem && (frameItem as HTMLElement).dataset.category === 'new';
      });

      if (newFrames.length > 0) {
        frames[0].classList.remove('active');
        newFrames[0].classList.add('active');
        selectedFrame = newFrames[0];
        const firstNewFrameItem = newFrames[0].closest('.frame-item');
        if (firstNewFrameItem) {
          firstNewFrameItem.classList.add('selected');
        }
        loadFrameCaption(selectedFrame);
      } else {
        frames[0].classList.add('active');
        selectedFrame = frames[0];
        const firstFrameItem = frameItems[0];
        if (firstFrameItem) {
          firstFrameItem.classList.add('selected');
        }
        loadFrameCaption(selectedFrame);
      }

      frames.forEach(frame => {
        frame.addEventListener('error', () => {});
        frame.addEventListener('load', () => {});
      });
    }

    function loadImage(src: string, callback: (img: HTMLImageElement) => void) {
      const img = new window.Image();
      img.onload = () => callback(img);
      img.onerror = () => showNotification('Error loading image', 'error');
      img.src = src;
    }

    function updateCanvas() {
      if (selectedFrame) {
        tempOverlayOnCanvas.src = selectedFrame.src;
      }
      if (!uploadedImage) return;
      canvas.width = 1080;
      canvas.height = 1080;
      updateImage();
    }

    function updateImage(callback?: () => void) {
      updateSliderValues();
      loadImage(uploadedImage!, (img) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, imgX, imgY, defaultWidth * zoomX, defaultHeight * zoomY);
        if (callback) {
          tempOverlayOnCanvas.style.display = 'none';
          ctx.drawImage(selectedFrame!, 0, 0, canvas.width, canvas.height);
          callback();
          tempOverlayOnCanvas.style.display = '';
          updateImage();
        }
      });
    }

    function updateSliderValues() {
      sizeSlider.value = zoomX.toString();
      sizeSlider2.value = zoomY.toString();
      sizeSliderValue.textContent = zoomX.toFixed(2);
      sizeSlider2Value.textContent = zoomY.toFixed(2);
    }

    function getCanvasRelativeScale(property: 'width' | 'height') {
      return canvas[property] / parseFloat(getComputedStyle(canvas)[property]);
    }

    function hideCanvasOverlay() {
      if (canvasOverlay) canvasOverlay.style.display = 'none';
    }

    function showCanvasOverlay() {
      if (canvasOverlay) canvasOverlay.style.display = 'flex';
    }

    let selectFrame = function(frameElement: HTMLImageElement) {
      frames.forEach(f => f.classList.remove('active'));
      frameItems.forEach(item => item.classList.remove('selected'));
      frameElement.classList.add('active');
      selectedFrame = frameElement;
      const frameItem = frameElement.closest('.frame-item');
      if (frameItem) frameItem.classList.add('selected');
      loadFrameCaption(frameElement);
      updateCanvas();
      showNotification(`Frame "${frameElement.alt}" selected`, 'info');
    }

    function loadFrameCaption(frameElement: HTMLImageElement) {
      let captionFile = 'caption3.txt';
      if (frameElement.alt.includes('ARW24')) captionFile = 'caption.txt';
      else if (frameElement.alt.includes('ACCESS Scares')) captionFile = 'caption2.txt';
      else if (frameElement.alt.includes('ACCESS Under the Sea')) captionFile = 'caption3.txt';
      else if (frameElement.alt.includes('LEAP2025')) captionFile = 'caption4.txt';
      else if (frameElement.alt.includes('Full Throttle')) captionFile = 'caption5.txt';

      fetch(`/dp-blast/${captionFile}`)
        .then(response => {
          if (!response.ok) throw new Error();
          return response.text();
        })
        .then(data => {
          if (captionRef) captionRef.value = data;
          // @ts-ignore
          window.originalCaption = data;
          showNotification(`Caption updated for ${frameElement.alt}`, 'success');
        })
        .catch(() => {
          if (captionRef) captionRef.value = `Error loading caption for ${frameElement.alt}. Please try again.`;
          showNotification('Error loading caption', 'error');
        });
    }

    function filterFrames(category: string) {
      currentCategory = category;
      frameItems.forEach(item => {
        const itemCategory = (item as HTMLElement).dataset.category;
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
          item.classList.add('hidden');
        }
      });
    }

    uploadImage.addEventListener('change', (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showNotification('File size must be less than 10MB', 'error');
        return;
      }
      uploadedImage = URL.createObjectURL(file);
      loadImage(uploadedImage, (img) => {
        const scaleFactor = 1080 / Math.max(img.naturalWidth, img.naturalHeight);
        defaultWidth = img.naturalWidth * scaleFactor;
        defaultHeight = img.naturalHeight * scaleFactor;
        imgX = 0;
        imgY = 0;
        zoomX = 1;
        zoomY = 1;
        hideCanvasOverlay();
        updateCanvas();
        showNotification('Image uploaded successfully!', 'success');
      });
    });

    frames.forEach(frame => {
      frame.addEventListener('click', (e) => {
        e.stopPropagation();
        selectFrame(frame);
      });
    });

    // Frame5 sub-option logic
    function showFrame5Options(show: boolean) {
      if (frame5Options) frame5Options.style.display = show ? 'block' : 'none';
    }
    function setFrame5Preview(sub: string) {
      if (!frame5PreviewImg) return;
      frame5PreviewImg.src = `/dp-blast/images/frame5/${sub}.png`;
      frame5PreviewImg.alt = `ACCESS Full Throttle (${sub.charAt(0).toUpperCase() + sub.slice(1)})`;
      frame5PreviewImg.setAttribute('data-frame', `frame5-${sub}`);
      selectedFrame = frame5PreviewImg;
      updateCanvas();
    }
    if (frame5Dropdown) {
      frame5Dropdown.addEventListener('change', (e: any) => {
        setFrame5Preview(e.target.value);
      });
    }
    // Patch selectFrame to handle frame5
    const originalSelectFrame = selectFrame;
    selectFrame = function(frameElement: HTMLImageElement) {
      if (
        frameElement === frame5PreviewImg ||
        (frameElement.getAttribute && frameElement.getAttribute('data-frame') && frameElement.getAttribute('data-frame')!.startsWith('frame5'))
      ) {
        showFrame5Options(true);
        if (frame5Dropdown && !frame5Dropdown.value) {
          frame5Dropdown.value = 'dp';
          setFrame5Preview('dp');
        } else if (frame5Dropdown) {
          setFrame5Preview(frame5Dropdown.value);
        }
      } else {
        showFrame5Options(false);
        originalSelectFrame(frameElement);
      }
    };

    frameItems.forEach(frameItem => {
      frameItem.addEventListener('click', () => {
        const frame = frameItem.querySelector('.frame-option') as HTMLImageElement;
        if (frame) selectFrame(frame);
      });
    });

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.dataset.category!;
        filterFrames(category);
        showNotification(`Showing ${category} frames`, 'info');
      });
    });

    canvas.addEventListener('mousedown', (e) => {
      if (!uploadedImage) return;
      e.preventDefault();
      isDragging = true;
      startX = (e.clientX - canvas.offsetLeft) * getCanvasRelativeScale('width') - imgX;
      startY = (e.clientY - canvas.offsetTop) * getCanvasRelativeScale('height') - imgY;
      canvas.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        imgX = (e.clientX - canvas.offsetLeft) * getCanvasRelativeScale('width') - startX;
        imgY = (e.clientY - canvas.offsetTop) * getCanvasRelativeScale('height') - startY;
        updateImage();
      }
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        canvas.style.cursor = 'grab';
      }
    });

    canvas.addEventListener('wheel', (e: any) => {
      if (!uploadedImage) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const mouseX = (e.clientX - canvas.offsetLeft) / canvas.clientWidth;
      const mouseY = (e.clientY - canvas.offsetTop) / canvas.clientHeight;
      const newZoomX = Math.min(maxZoom, Math.max(minZoom, zoomX + delta));
      const newZoomY = Math.min(maxZoom, Math.max(minZoom, zoomY + delta));
      imgX -= (mouseX * canvas.clientWidth) * getCanvasRelativeScale('width') * (newZoomX - zoomX);
      imgY -= (mouseY * canvas.clientHeight) * getCanvasRelativeScale('height') * (newZoomY - zoomY);
      zoomX = newZoomX;
      zoomY = newZoomY;
      updateSliderValues();
      updateImage();
    });

    tempOverlayOnCanvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
    });

    canvas.addEventListener('touchstart', (e: any) => {
      if (!uploadedImage) return;
      if (e.touches.length === 1) {
        isDragging = true;
        startX = (e.touches[0].clientX - canvas.offsetLeft) * getCanvasRelativeScale('width') - imgX;
        startY = (e.touches[0].clientY - canvas.offsetTop) * getCanvasRelativeScale('height') - imgY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    canvas.addEventListener('touchmove', (e: any) => {
      if (!uploadedImage) return;
      if (e.touches.length === 1 && isDragging) {
        e.preventDefault();
        imgX = (e.touches[0].clientX - canvas.offsetLeft) * getCanvasRelativeScale('width') - startX;
        imgY = (e.touches[0].clientY - canvas.offsetTop) * getCanvasRelativeScale('height') - startY;
        updateImage();
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        const relativeX = (centerX - canvas.offsetLeft) * getCanvasRelativeScale('width') / canvas.clientWidth;
        const relativeY = (centerY - canvas.offsetTop) * getCanvasRelativeScale('height') / canvas.clientHeight;
        if (initialDistance === 0) {
          initialDistance = currentDistance;
        } else {
          const delta = (currentDistance - initialDistance) * 0.01;
          const newZoomX = Math.min(maxZoom, Math.max(minZoom, zoomX + delta));
          const newZoomY = Math.min(maxZoom, Math.max(minZoom, zoomY + delta));
          imgX -= (relativeX * canvas.clientWidth) * (newZoomX - zoomX);
          imgY -= (relativeY * canvas.clientHeight) * (newZoomY - zoomY);
          zoomX = newZoomX;
          zoomY = newZoomY;
          initialDistance = currentDistance;
          updateSliderValues();
          updateImage();
        }
      }
    });

    canvas.addEventListener('touchend', (e: any) => {
      isDragging = false;
      if (e.touches.length < 2) initialDistance = 0;
    });

    sizeSlider.addEventListener('input', (e: any) => {
      zoomX = parseFloat(e.target.value);
      updateImage();
    });

    sizeSlider2.addEventListener('input', (e: any) => {
      zoomY = parseFloat(e.target.value);
      updateImage();
    });

    downloadImageBtn.addEventListener('click', () => {
      if (!uploadedImage || !selectedFrame) {
        showNotification('Please upload an image and select a frame first', 'error');
        return;
      }
      const originalText = downloadImageBtn.innerHTML;
      downloadImageBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      downloadImageBtn.disabled = true;
      updateImage(() => {
        try {
          const link = document.createElement('a');
          link.download = 'access-dp-blast-image.png';
          link.href = canvas.toDataURL();
          link.click();
          showNotification('Image downloaded successfully!', 'success');
        } catch {
          showNotification('Failed to download image', 'error');
        } finally {
          downloadImageBtn.innerHTML = originalText;
          downloadImageBtn.disabled = false;
        }
      });
    });

    // Initialize canvas overlay
    showCanvasOverlay();

    // Upload area drag and drop functionality
    uploadArea.addEventListener('click', () => uploadImage.click());
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', (e: any) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadImage.files = files;
        uploadImage.dispatchEvent(new Event('change'));
      }
    });

    // Show frame5 dropdown on page load if it exists
    if (frame5Options) frame5Options.style.display = 'block';

    // --- End integrated JS logic using refs ---
  })

  return (
    <div class="container">
      {/* Header */}
      <header class="header">
        <div class="logo">
          <i class="fas fa-rocket"></i>
          <h1>DP Blast Maker</h1>
        </div>
        <p class="subtitle">Just upload your image and choose your frame, and you're good to go!</p>
      </header>

      {/* Main Content */}
      <main class="main-content">
        {/* Two Column Layout */}
        <div class="two-column-layout">
          {/* Left Column - Upload and Frame Selection */}
          <div class="left-column">
            {/* Step 1: Image Upload */}
            <section class="step-section">
              <div class="step-header">
                <div class="step-number">1</div>
                <h2>Upload Your Image</h2>
              </div>
              <div class="upload-area" id="uploadArea" ref={uploadAreaRef}>
                <input type="file" id="uploadImage" accept="image/*" class="file-input" ref={uploadImageRef}/>
                <div class="upload-content">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <p>Click to upload or drag and drop</p>
                  <span class="file-types">PNG, JPG, JPEG up to 10MB</span>
                </div>
              </div>
            </section>

            {/* Step 2: Frame Selection */}
            <section class="step-section">
              <div class="step-header">
                <div class="step-number">2</div>
                <h2>Choose Your Frame</h2>
              </div>
              <div class="frame-selection">
                <div class="frame-categories">
                  <div class="category-tabs">
                    <button class="category-tab" data-category="all">
                      <i class="fas fa-th"></i>
                      All Frames
                    </button>
                    <button class="category-tab" data-category="old">
                      <i class="fas fa-clock"></i>
                      Old
                    </button>
                    <button class="category-tab active" data-category="new">
                      <i class="fas fa-star"></i>
                      New
                    </button>
                  </div>
                </div>

                <div class="frames-container">
                  <div class="frames">
                    <div class="frame-item" data-category="old">
                      <div class="frame-preview">
                        <img src="/dp-blast/images/frame1.png" class="frame-option" alt="ARW24 Frame" data-frame="frame1"/>
                        <div class="frame-overlay">
                          <i class="fas fa-check"></i>
                        </div>
                      </div>
                      <div class="frame-info">
                        <span class="frame-label">ARW24</span>
                        <span class="frame-badge old">Old</span>
                      </div>
                    </div>

                    <div class="frame-item" data-category="old">
                      <div class="frame-preview">
                        <img src="/dp-blast/images/frame2.png" class="frame-option" alt="ACCESS Scares Frame" data-frame="frame2"/>
                        <div class="frame-overlay">
                          <i class="fas fa-check"></i>
                        </div>
                      </div>
                      <div class="frame-info">
                        <span class="frame-label">ACCESS Scares</span>
                        <span class="frame-badge old">Old</span>
                      </div>
                    </div>

                    <div class="frame-item" data-category="old">
                      <div class="frame-preview">
                        <img src="/dp-blast/images/frame3.png" class="frame-option active" alt="ACCESS Under the Sea Frame" data-frame="frame3"/>
                        <div class="frame-overlay">
                          <i class="fas fa-check"></i>
                        </div>
                      </div>
                      <div class="frame-info">
                        <span class="frame-label">ACCESS Under the Sea</span>
                        <span class="frame-badge old">Old</span>
                      </div>
                    </div>
                    <div class="frame-item" data-category="old">
                      <div class="frame-preview">
                        <img src="/dp-blast/images/frame4.png" class="frame-option" alt="LEAP2025 Rank Up Frame" data-frame="frame4"/>
                        <div class="frame-overlay">
                          <i class="fas fa-check"></i>
                        </div>
                      </div>
                      <div class="frame-info">
                        <span class="frame-label">LEAP2025: Rank Up!</span>
                        <span class="frame-badge old">Old</span>
                      </div>
                    </div>
                    <div class="frame-item" data-category="new" id="frame5-item" ref={frame5ItemRef}>
                      <div class="frame-preview" id="frame5-preview-container">
                        <img src="/dp-blast/images/frame5/dp.png" class="frame-option" alt="ACCESS Full Throttle (DP)" data-frame="frame5-dp" id="frame5-preview-img" ref={frame5PreviewImgRef}/>
                        <div class="frame-overlay">
                          <i class="fas fa-check"></i>
                        </div>
                      </div>
                      <div class="frame-info">
                        <span class="frame-label">Full Throttle: ACCESS Grand Prix</span>
                        <span class="frame-badge new">New</span>
                      </div>
                      <div class="frame5-options" id="frame5-options" style="display:none; margin-top: 10px; text-align:center;" ref={frame5OptionsRef}>
                        <select id="frame5-dropdown" class="frame5-dropdown" ref={frame5DropdownRef}>
                          <option value="dp">DP</option>
                          <option value="president">President</option>
                          <option value="internals">Internals</option>
                          <option value="externals">Externals</option>
                          <option value="logistics">Logistics</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="frame-selection-tips">
                  <div class="tip-item">
                    <i class="fas fa-lightbulb"></i>
                    <span>Click on any frame to preview it on your image</span>
                  </div>
                  <div class="tip-item">
                    <i class="fas fa-mobile-alt"></i>
                    <span>Frames work great on all social media platforms</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Canvas and Customization */}
          <div class="right-column">
            {/* Step 3: Customize */}
            <section class="step-section">
              <div class="step-header">
                <div class="step-number">3</div>
                <h2>Customize Your Image</h2>
              </div>
              <div class="canvas-container">
                <div class="canvas-wrapper">
                  <canvas id="profileCanvas" ref={canvasRef}></canvas>
                  <img id="tempOverlayOnCanvas" ref={tempOverlayOnCanvasRef} />
                  <div class="canvas-overlay" id="canvasOverlay" ref={canvasOverlayRef}>
                    <div class="overlay-content">
                      <i class="fas fa-image"></i>
                      <p>Upload an image to get started</p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div class="controls">
                  <div class="control-group">
                    <label for="sizeSlider">Width Scale</label>
                    <input
                      type="range"
                      id="sizeSlider"
                      min="0.25"
                      max="1.75"
                      step="0.05"
                      value="1"
                      ref={sizeSliderRef}
                    />
                    <span class="slider-value" id="sizeSliderValue" ref={sizeSliderValueRef}>1.00</span>
                  </div>
                  <div class="control-group">
                    <label for="sizeSlider2">Height Scale</label>
                    <input
                      type="range"
                      id="sizeSlider2"
                      min="0.25"
                      max="1.75"
                      step="0.05"
                      value="1"
                      ref={sizeSlider2Ref}
                    />
                    <span class="slider-value" id="sizeSlider2Value" ref={sizeSlider2ValueRef}>1.00</span>
                  </div>
                  <div class="control-tips">
                    <p><i class="fas fa-mouse"></i> Drag to move image</p>
                    <p><i class="fas fa-search"></i> Scroll to zoom</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Full Width Sections */}
        <div class="full-width-sections">
          {/* Step 4: Download */}
          <section class="step-section">
            <div class="step-header">
              <div class="step-number">4</div>
              <h2>Download Your Creation</h2>
            </div>
            <div class="download-section">
              <button id="downloadImage" class="download-btn" ref={downloadImageRef}>
                <i class="fas fa-download"></i>
                Download Image
              </button>
            </div>
          </section>

          {/* Caption Section */}
          <section class="step-section">
            <div class="step-header">
              <div class="step-number">5</div>
              <h2>Caption</h2>
            </div>
            <div class="caption-section">
              <textarea
                id="caption"
                placeholder="Your caption will appear here..."
                rows="8"
                ref={captionRef}
              ></textarea>
              <div class="caption-actions">
                <button
                  id="resetButton"
                  class="btn-secondary"
                  ref={resetButtonRef}
                >
                  <i class="fas fa-undo"></i>
                  Reset
                </button>
                <button
                  id="copyButton"
                  class="btn-primary"
                  ref={copyButtonRef}
                >
                  <i class="fas fa-copy"></i>
                  Copy Caption
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

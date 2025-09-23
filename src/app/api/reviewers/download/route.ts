import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts, RotationTypes } from 'pdf-lib';

export async function GET(request: NextRequest) {
  // Get user info from session_token cookie
  let userInfo;
  try {
    // Use next/headers cookies API
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = JSON.parse(sessionToken);
    userInfo = {
      name: user.name || 'Unknown User',
      email: user.email || 'unknown@email.com'
    };
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: '"id" parameter must be specified' }, { status: 400 });

  const downloadDate = new Date();

  const idDecrypted = atob(id);
  const webContentLink = `https://drive.google.com/uc?id=${idDecrypted}&export=download`;
  console.log(`Fetching file ID ${idDecrypted}`);

  const res = await fetch(webContentLink);
  if (!res.ok) {
    console.error('Error downloading from Google Drive:', await res.text());
    return NextResponse.json({ error: 'Error downloading from Google Drive' }, { status: 500 });
  }
  const originalPDF = Buffer.from(await res.arrayBuffer());

  // Get filename from Content-Disposition header if present
  let filename = `ACCESS_Reviewer_${id}_${downloadDate.toLocaleString('sv')}.pdf`;
  const contentDisposition = res.headers.get('Content-Disposition');
  if (contentDisposition) {
    const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (match && match[1]) {
      filename = match[1].replace(/['"]/g, '').trim();
    }
  }

  console.log('Adding watermark to PDF')
  const watermarkedPDF = await addWatermark(originalPDF, userInfo, downloadDate);

  return new NextResponse(watermarkedPDF, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': watermarkedPDF.length.toString(),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

/**
 * Add watermark to PDF
 * @param {Buffer} pdfBuffer - Original PDF buffer
 * @param {Object} userInfo - User information for watermark
 * @param {string} userInfo.name - User's display name
 * @param {string} userInfo.email - User's email address
 * @returns {Promise<Buffer>} - Watermarked PDF buffer
 */
async function addWatermark(pdfBuffer: Buffer, userInfo: { name: string, email: string }, downloadDate: Date) {
  try {
    // Load the PDF
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    // Embed font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Watermark text
    const watermarkText = `${userInfo.name} • ${userInfo.email}`;
    const fontSize = 8;
    const textColor = rgb(0.6, 0.6, 0.6); // Gray color

    // Current timestamp for download tracking
    const downloadDateString = downloadDate.toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Add watermark to each page
    pages.forEach((page, index) => {
      const { width, height } = page.getSize();

      // Calculate text dimensions
      const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
      const timeWidth = font.widthOfTextAtSize(`Downloaded: ${downloadDateString}`, fontSize - 1);

      // Margins
      const margin = 20;

      // === BOTTOM RIGHT WATERMARK ===
      const bottomX = width - Math.max(textWidth, timeWidth) - margin;
      const bottomY = margin;

      // Add user info watermark (bottom right)
      page.drawText(watermarkText, {
        x: bottomX,
        y: bottomY + 15,
        size: fontSize,
        font: font,
        color: textColor,
        opacity: 0.9
      });

      // Add download timestamp (bottom right)
      page.drawText(`Downloaded: ${downloadDateString}`, {
        x: bottomX,
        y: bottomY,
        size: fontSize - 1,
        font: font,
        color: textColor,
        opacity: 0.8
      });

      // === TOP RIGHT WATERMARK ===
      const topY = height - margin - 15;

      // Add user info watermark (top right)
      page.drawText(watermarkText, {
        x: bottomX,
        y: topY,
        size: fontSize,
        font: font,
        color: textColor,
        opacity: 0.7
      });

      // === TOP LEFT WATERMARK ===
      page.drawText(`DLSU Access - ${userInfo.name}`, {
        x: margin,
        y: topY,
        size: fontSize - 1,
        font: font,
        color: textColor,
        opacity: 0.6
      });
        // === CENTER DIAGONAL WATERMARK (More Visible) ===
      const centerX = width / 2;
      const centerY = height / 2;
      const diagonalText = `${userInfo.name} - DLSU ACCESS - ${downloadDateString.split(',')[0]}`;

      page.drawText(diagonalText, {
        x: centerX - (font.widthOfTextAtSize(diagonalText, 12) / 2),
        y: centerY,
        size: 12,
        font: font,
        color: rgb(0.9, 0.9, 0.9),
        opacity: 0.4,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });

      // === ADDITIONAL DIAGONAL WATERMARKS ===

      // Top-left to bottom-right diagonal
      const shortText = `${userInfo.name} - ACCESS`;
      page.drawText(shortText, {
        x: width * 0.25,
        y: height * 0.75,
        size: 10,
        font: font,
        color: rgb(0.88, 0.88, 0.88),
        opacity: 0.35,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });

      // Bottom-left to top-right diagonal (opposite angle)
      page.drawText(shortText, {
        x: width * 0.75,
        y: height * 0.75,
        size: 10,
        font: font,
        color: rgb(0.88, 0.88, 0.88),
        opacity: 0.35,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 45
        }
      });
        // Lower diagonal
      page.drawText(`${userInfo.email}`, {
        x: centerX - (font.widthOfTextAtSize(userInfo.email, 9) / 2),
        y: centerY - 50,
        size: 9,
        font: font,
        color: rgb(0.9, 0.9, 0.9),
        opacity: 0.3,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });

      // Repeating pattern - Multiple small diagonals
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
          const xPos = (width / 4) * (i + 1);
          const yPos = (height / 3) * (j + 1);

          page.drawText(userInfo.name.split(' ')[0] || 'USER', {
            x: xPos - 30,
            y: yPos,
            size: 7,
            font: font,
            color: rgb(0.92, 0.92, 0.92),
            opacity: 0.25,
            rotate: {
              type: RotationTypes.Degrees,
              angle: -45
            }
          });
        }
      }

      // === ADDITIONAL CENTER-ADJACENT DIAGONAL WATERMARKS ===

      // Lower-left from center
      page.drawText(`${userInfo.name.split(' ')[0]}`, {
        x: centerX - 120,
        y: centerY - 80,
        size: 9,
        font: font,
        color: rgb(0.89, 0.89, 0.89),
        opacity: 0.32,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });

      // Lower-right from center
      page.drawText(`${userInfo.name.split(' ')[0]}`, {
        x: centerX + 20,
        y: centerY + 100,
        size: 9,
        font: font,
        color: rgb(0.89, 0.89, 0.89),
        opacity: 0.32,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });

      // Far lower-left diagonal
      page.drawText(`${userInfo.email.split('@')[0]}`, {
        x: centerX - 160,
        y: centerY - 120,
        size: 8,
        font: font,
        color: rgb(0.91, 0.91, 0.91),
        opacity: 0.28,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });

      // Far lower-right diagonal
      page.drawText(`${userInfo.email.split('@')[0]}`, {
        x: centerX + 80,
        y: centerY - 120,
        size: 8,
        font: font,
        color: rgb(0.91, 0.91, 0.91),
        opacity: 0.28,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });
        // Mid-left diagonal with reverse angle
      page.drawText(`${userInfo.email.split('@')[0]}`, {
        x: centerX - 200,
        y: centerY + 200,
        size: 8,
        font: font,
        color: rgb(0.9, 0.9, 0.9),
        opacity: 0.3,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 45  // Opposite angle
        }
      });

      // === LOWER LEFT AND RIGHT WATERMARKS ===

      // Lower left area - diagonal watermarks
      page.drawText(`${userInfo.name.split(' ')[0]} - ACCESS`, {
        x: width * 0.15,
        y: height * 0.25,
        size: 8,
        font: font,
        color: rgb(0.88, 0.88, 0.88),
        opacity: 0.35,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });

      // Lower left area - another diagonal
      page.drawText(`${userInfo.email.split('@')[0]}`, {
        x: width * 0.05,
        y: height * 0.35,
        size: 7,
        font: font,
        color: rgb(0.92, 0.92, 0.92),
        opacity: 0.28,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 45
        }
      });

      // Lower left area - straight horizontal
      page.drawText(`DLSU ACCESS - ${userInfo.name.split(' ')[0]}`, {
        x: width * 0.08,
        y: height * 0.2,
        size: 7,
        font: font,
        color: rgb(0.9, 0.9, 0.9),
        opacity: 0.32,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 0  // Straight horizontal
        }
      });

      // Lower left area - vertical watermark
      page.drawText(`${userInfo.name.split(' ')[0]} - ACCESS`, {
        x: width * 0.02,
        y: height * 0.15,
        size: 6,
        font: font,
        color: rgb(0.93, 0.93, 0.93),
        opacity: 0.25,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 90  // Vertical
        }
      });

      // Lower right area - diagonal watermarks
      page.drawText(`${userInfo.name.split(' ')[0]} - ACCESS`, {
        x: width * 0.75,
        y: height * 0.25,
        size: 8,
        font: font,
        color: rgb(0.88, 0.88, 0.88),
        opacity: 0.35,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 45
        }
      });

      // Lower right area - another diagonal
      page.drawText(`${userInfo.email.split('@')[0]}`, {
        x: width * 0.85,
        y: height * 0.35,
        size: 7,
        font: font,
        color: rgb(0.92, 0.92, 0.92),
        opacity: 0.28,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -45
        }
      });

      // Lower right area - straight horizontal
      page.drawText(`${userInfo.email} - ACCESS`, {
        x: width * 0.55,
        y: height * 0.2,
        size: 7,
        font: font,
        color: rgb(0.9, 0.9, 0.9),
        opacity: 0.32,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 0  // Straight horizontal
        }
      });

      // Lower right area - vertical watermark
      page.drawText(`${userInfo.email} - ACCESS`, {
        x: width * 0.95,
        y: height * 0.15,
        size: 6,
        font: font,
        color: rgb(0.93, 0.93, 0.93),
        opacity: 0.25,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 90  // Vertical
        }
      });

      // Mid-lower left - additional diagonal
      page.drawText(`${downloadDateString.split(',')[0]}`, {
        x: width * 0.12,
        y: height * 0.3,
        size: 6,
        font: font,
        color: rgb(0.94, 0.94, 0.94),
        opacity: 0.22,
        rotate: {
          type: RotationTypes.Degrees,
          angle: -30
        }
      });

      // Mid-lower right - additional diagonal
      page.drawText(`${downloadDateString.split(',')[0]}`, {
        x: width * 0.78,
        y: height * 0.3,
        size: 6,
        font: font,
        color: rgb(0.94, 0.94, 0.94),
        opacity: 0.22,
        rotate: {
          type: RotationTypes.Degrees,
          angle: 30
        }
      });

      // === ADDITIONAL CORNER WATERMARKS ===
      // Bottom left
      page.drawText(`Page ${index + 1}`, {
        x: margin,
        y: bottomY,
        size: fontSize - 2,
        font: font,
        color: textColor,
        opacity: 0.5
      });
    });

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error: any) {
    console.error('Error adding watermark to PDF:', error);
    throw new Error('Failed to add watermark');
  }
}

"""
Enhance hero carousel images:
- Convert HEIC to JPG
- Enhance brightness, contrast, sharpness
- Resize to 4K (3840x2160) with center crop
- Output high-quality JPGs
"""

import os
from PIL import Image, ImageEnhance, ImageFilter
import pillow_heif

# Register HEIC opener
pillow_heif.register_heif_opener()

HERO_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'Hero', 'Home')
TARGET_WIDTH = 3840
TARGET_HEIGHT = 2160
QUALITY = 92

def center_crop_resize(img, target_w, target_h):
    """Resize maintaining aspect ratio then center-crop to exact dimensions."""
    w, h = img.size
    target_ratio = target_w / target_h
    img_ratio = w / h

    if img_ratio > target_ratio:
        # Image is wider, resize by height then crop width
        new_h = target_h
        new_w = int(img_ratio * target_h)
    else:
        # Image is taller, resize by width then crop height
        new_w = target_w
        new_h = int(target_w / img_ratio)

    img = img.resize((new_w, new_h), Image.LANCZOS)

    # Center crop
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    img = img.crop((left, top, left + target_w, top + target_h))
    return img


def enhance_image(img):
    """Apply brightness, contrast, and sharpness enhancements."""
    # Boost brightness slightly
    img = ImageEnhance.Brightness(img).enhance(1.12)
    # Boost contrast
    img = ImageEnhance.Contrast(img).enhance(1.18)
    # Boost color saturation slightly
    img = ImageEnhance.Color(img).enhance(1.10)
    # Sharpen
    img = ImageEnhance.Sharpness(img).enhance(1.25)
    return img


def process_image(filepath, output_path=None):
    """Process a single image: enhance and resize to 4K."""
    print(f"  Processing: {os.path.basename(filepath)}")
    img = Image.open(filepath)

    # Convert to RGB (handles HEIC, RGBA, etc.)
    if img.mode != 'RGB':
        img = img.convert('RGB')

    print(f"    Original size: {img.size[0]}x{img.size[1]}")

    # Resize to 4K
    img = center_crop_resize(img, TARGET_WIDTH, TARGET_HEIGHT)
    print(f"    Resized to: {img.size[0]}x{img.size[1]}")

    # Enhance
    img = enhance_image(img)

    # Save
    out = output_path or filepath
    # Ensure output is .jpg
    if out.lower().endswith('.heic'):
        out = out.rsplit('.', 1)[0] + '.jpg'

    img.save(out, 'JPEG', quality=QUALITY, optimize=True)
    size_mb = os.path.getsize(out) / (1024 * 1024)
    print(f"    Saved: {os.path.basename(out)} ({size_mb:.1f} MB)")
    return out


def main():
    print("=" * 50)
    print("Hero Image Enhancement Script")
    print("=" * 50)

    files = [
        'hero-bg.jpg',
        '20240928_112021.jpg',
        'DSC_2956.JPG',
        'IMG_2386.jpg',
        'IMG_4896.HEIC',
    ]

    for f in files:
        filepath = os.path.join(HERO_DIR, f)
        if not os.path.exists(filepath):
            print(f"  WARNING: {f} not found, skipping")
            continue

        output_path = filepath
        if f.endswith('.HEIC'):
            output_path = os.path.join(HERO_DIR, f.rsplit('.', 1)[0] + '.jpg')

        process_image(filepath, output_path)

    print("\n✓ All images enhanced successfully!")
    print(f"  Output directory: {os.path.abspath(HERO_DIR)}")


if __name__ == '__main__':
    main()

"""Restore source logos and knock out cream/black to true transparency."""
from pathlib import Path
from PIL import Image
import numpy as np

BRAND = Path('public/brand')


def knock(src: Path, dest: Path, also_black: bool = False) -> None:
    img = Image.open(src).convert('RGBA')
    # Upscale 3x before processing for cleaner edges, then keep
    img = img.resize((img.width * 3, img.height * 3), Image.Resampling.LANCZOS)
    arr = np.asarray(img).astype(np.float32)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    # Distance from cream plate ~#F5F5F0
    cream_ref = np.array([245, 245, 240], dtype=np.float32)
    dist = np.sqrt((r - cream_ref[0]) ** 2 + (g - cream_ref[1]) ** 2 + (b - cream_ref[2]) ** 2)
    # Soft alpha: fully transparent if close to cream
    cream_alpha = np.clip((dist - 18) / 28, 0, 1)

    # Near white
    white = (r > 248) & (g > 248) & (b > 245)
    cream_alpha = np.where(white, 0, cream_alpha)

    if also_black:
        black = (r < 20) & (g < 20) & (b < 20)
        cream_alpha = np.where(black, 0, cream_alpha)

    # Protect brand blues (saturated / darker cyan-teal)
    is_brand = ((b > r + 8) & (b > 70)) | ((r < 90) & (g < 130) & (b > 80)) | ((r < 40) & (g < 90) & (b < 120) & ((r + g + b) > 40))
    cream_alpha = np.where(is_brand, 1, cream_alpha)

    arr[:, :, 3] = np.clip(a * cream_alpha, 0, 255)
    out = Image.fromarray(arr.astype(np.uint8), 'RGBA')
    bbox = out.getbbox()
    if bbox:
        # pad a little
        l, t, rgt, btm = bbox
        pad = 6
        out = out.crop((max(0, l - pad), max(0, t - pad), min(out.width, rgt + pad), min(out.height, btm + pad)))
    out.save(dest, optimize=True)
    print(dest.name, out.size)


knock(BRAND / 'tdyu-logo-src.png', BRAND / 'tdyu-logo.png')
knock(BRAND / 'tdyu-mark-src.png', BRAND / 'tdyu-mark.png', also_black=True)

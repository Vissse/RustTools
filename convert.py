import os
from PIL import Image
from pathlib import Path

def convert_png_to_webp():
    # Nastavení cest podle tvého zadání
    source_dir = Path(r"G:\RustTools\public\images")
    dest_dir = Path(r"G:\RustTools\public\images\recycle")

    # Vytvoření cílové složky 'recycle', pokud ještě neexistuje
    dest_dir.mkdir(parents=True, exist_ok=True)

    # Počítadlo pro přehled na konci
    converted_count = 0

    print(f"Začínám hledat .png obrázky ve složce: {source_dir}")

    # Procházení všech souborů ve zdrojové složce
    for filename in os.listdir(source_dir):
        if filename.lower().endswith(".png"):
            png_path = source_dir / filename
            
            # Vytvoření nového názvu s koncovkou .webp
            webp_filename = filename.rsplit(".", 1)[0] + ".webp"
            webp_path = dest_dir / webp_filename

            try:
                # Otevření obrázku a jeho uložení ve formátu WebP
                with Image.open(png_path) as img:
                    # 'quality' můžeš upravit (0-100). 80 je skvělý kompromis mezi kvalitou a velikostí.
                    img.save(webp_path, "webp", quality=80, optimize=True)
                
                print(f"✅ Převedeno: {filename} -> {webp_filename}")
                converted_count += 1
                
            except Exception as e:
                print(f"❌ Chyba při převodu {filename}: {e}")

    print(f"\nHotovo! Úspěšně převedeno {converted_count} obrázků.")
    print(f"Nové obrázky najdeš v: {dest_dir}")

if __name__ == "__main__":
    convert_png_to_webp()
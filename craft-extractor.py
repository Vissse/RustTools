import json
from bs4 import BeautifulSoup

def generate_ts_crafting_data(file_path, output_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Najdeme sekci 'craft-footer'
    craft_footer_div = soup.find('div', id=lambda x: x and x.endswith('raft-footer'))
    
    if not craft_footer_div:
        print("Sekce s informacemi o craftění nebyla nalezena.")
        return

    crafting_items = []

    # Projdeme všechny elementy se třídou 'item-box'
    for item_box in craft_footer_div.find_all('span', class_='item-box'):
        img_tag = item_box.find('img')
        amount_tag = item_box.find('span', class_='text-in-icon')
        
        if img_tag and amount_tag:
            # Název vytáhneme z atributu alt u obrázku
            name = img_tag.get('alt', '').strip()
            
            # 1. Získáme text, odstraníme '×' a čárky (oddělovače tisíců jako 2,200)
            raw_quantity = amount_tag.text.strip().replace('×', '').replace(',', '').strip()
            
            # 2. Vyfiltrujeme z textu pouze číslice (tohle vyřeší i problém s "1 ft", ze kterého to udělá prostě 1)
            numeric_chars = ''.join(filter(str.isdigit, raw_quantity))
            
            # 3. Bezpečný převod na číslo
            if numeric_chars:
                quantity = int(numeric_chars)
            else:
                quantity = 0  # Fallback, pokud by tam nebylo žádné číslo

            crafting_items.append({
                "name": name,
                "quantity": quantity
            })

    # Vytvoření TS obsahu
    ts_content = "export interface CraftingRequirement {\n"
    ts_content += "  name: string;\n"
    ts_content += "  quantity: number;\n"
    ts_content += "}\n\n"
    
    ts_content += "export const CraftingDataMortarShell: CraftingRequirement[] = "
    ts_content += json.dumps(crafting_items, indent=2, ensure_ascii=False)
    ts_content += ";\n"

    # Uložení do souboru
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Hotovo! Soubor '{output_path}' byl úspěšně vygenerován s {len(crafting_items)} položkami.")

# Použití
generate_ts_crafting_data('craft.txt', 'src/lib/data/crafting-data-mortar-shell.ts')
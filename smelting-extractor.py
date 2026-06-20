import json
from bs4 import BeautifulSoup

def generate_ts_smelting_data(file_path, output_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Najdeme kontejner pro smelting data
    smelting_div = soup.find('div', {'data-name': 'smelting'})
    
    if not smelting_div:
        print("Sekce s informacemi o smeltingu nebyla nalezena.")
        return

    smelting_items = []

    # Projdeme všechny řádky tabulky uvnitř <tbody>
    tbody = smelting_div.find('tbody')
    if not tbody:
        print("Tabulka v sekci smelting nemá <tbody>.")
        return

    for row in tbody.find_all('tr'):
        td_process = row.find('td', class_='no-padding left')
        td_time = row.find_all('td')[-1] # Poslední buňka v řádku obsahuje čas
        
        if not td_process or not td_time:
            continue

        item_boxes = td_process.find_all('a', class_='item-box')
        
        # Očekáváme 3 prvky pro tavení s dřevem: Co se taví -> (Dřevo) -> Výsledek
        # Očekáváme 2 prvky pro proces bez dřeva (tvorba uhlí z čistého dřeva): Dřevo -> Uhlí
        if len(item_boxes) < 2:
            continue
            
        # Zpracování VSTUPU
        input_box = item_boxes[0]
        input_name = input_box.find('img').get('alt', '').strip()
        
        # Zpracování PALIVA (Wood)
        wood_cost = 0.0
        if len(item_boxes) >= 3:
            wood_box = item_boxes[1]
            wood_amount_tag = wood_box.find('span', class_='text-in-icon')
            if wood_amount_tag:
                raw_wood = wood_amount_tag.text.strip().replace('×', '')
                if raw_wood:
                    try:
                        wood_cost = float(raw_wood)
                    except ValueError:
                        pass
        
        # Zpracování VÝSTUPU (poslední item-box v řádku)
        output_box = item_boxes[-1]
        output_name = output_box.find('img').get('alt', '').strip()
        output_amount_tag = output_box.find('span', class_='text-in-icon')
        
        output_quantity = "1" # Výchozí množství, pokud není uvedeno (např. 1 Metal Fragment z 1 Metal Ore)
        if output_amount_tag and output_amount_tag.text.strip():
            raw_output = output_amount_tag.text.strip().replace('×', '')
            output_quantity = raw_output
            
        # Zpracování ČASU (např. "3.33 sec" -> 3.33)
        raw_time = td_time.text.replace('sec', '').strip()
        try:
            time_seconds = float(raw_time)
        except ValueError:
            time_seconds = 0.0

        smelting_items.append({
            "inputItem": input_name,
            "woodRequired": wood_cost,
            "outputItem": output_name,
            "outputQuantity": output_quantity,
            "timeSeconds": time_seconds
        })

    # Vytvoření TS obsahu
    ts_content = "export interface SmeltingProcess {\n"
    ts_content += "  inputItem: string;\n"
    ts_content += "  woodRequired: number;\n"
    ts_content += "  outputItem: string;\n"
    ts_content += "  outputQuantity: string | number;\n"
    ts_content += "  timeSeconds: number;\n"
    ts_content += "}\n\n"
    
    ts_content += "export const SmallStoneFireplace: SmeltingProcess[] = "
    ts_content += json.dumps(smelting_items, indent=2, ensure_ascii=False)
    ts_content += ";\n"

    # Uložení do souboru
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Hotovo! Soubor '{output_path}' byl úspěšně vygenerován s {len(smelting_items)} položkami.")

# Použití
generate_ts_smelting_data('smelt.txt', 'src/lib/data/smelting-data-small-stone-fireplace.ts')
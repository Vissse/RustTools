import json
from bs4 import BeautifulSoup

def generate_ts_raid_data(file_path, output_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Najdeme sekci 'destroyed-by'
    destroyed_by_div = soup.find('div', {'data-name': 'destroyed-by'})
    
    if not destroyed_by_div:
        print("Sekce s informacemi o poškození nebyla nalezena.")
        return

    # Najdeme tabulku v rámci této sekce
    table = destroyed_by_div.find('table', {'class': 'sorting'})
    
    if not table:
        print("Tabulka nebyla nalezena.")
        return

    raid_items = []

    # Iterace přes řádky tabulky
    for row in table.find('tbody').find_all('tr'):
        cols = row.find_all('td')
        
        if len(cols) >= 5:
            # Vytáhneme informaci o straně z atributu data-group2 (soft/hard/both)
            # Pokud atribut z nějakého důvodu chybí, dáme výchozí 'both'
            side = row.get('data-group2', 'both')

            # Spojení názvu a případného podnázvu (munice)
            name = cols[1].get_text(separator=" - ", strip=True) 
            
            # Vytažení hodnot
            damage = cols[2].text.strip()
            quantity = cols[3].text.strip().replace('×', '').strip()
            time = cols[4].text.strip()
            
            raid_items.append({
                "name": name,
                "side": side,
                "damage": damage,
                "quantity": quantity,
                "time": time
            })

    # Vytvoření TS obsahu
    ts_content = "export interface RaidItem {\n"
    ts_content += "  name: string;\n"
    ts_content += "  side: 'soft' | 'hard' | 'both';\n"
    ts_content += "  damage: string;\n"
    ts_content += "  quantity: string;\n"
    ts_content += "  time: string;\n"
    ts_content += "}\n\n"
    
    ts_content += "export const RaidDataMetalVerticalEmbrasure: RaidItem[] = "
    ts_content += json.dumps(raid_items, indent=2, ensure_ascii=False)
    ts_content += ";\n"

    # Uložení do souboru
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Hotovo! Soubor '{output_path}' byl úspěšně vygenerován s {len(raid_items)} položkami.")

# Použití
generate_ts_raid_data('raid.txt', 'src/lib/data/raid-data-metal-vertical-embrasure.ts')
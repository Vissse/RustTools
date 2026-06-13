import os
import json
import time
from playwright.sync_api import sync_playwright

BASE_URL = "https://wiki.rustclash.com"
ITEM_LIST_URL = f"{BASE_URL}/group=itemlist"

def update_categories_only():
    # --- 1. NAČTENÍ EXISTUJÍCÍCH DAT Z JSONU ---
    if not os.path.exists('rust_recycling_data.json'):
        print("[-] Soubor rust_recycling_data.json neexistuje. Nemám co upravovat.")
        return

    with open('rust_recycling_data.json', 'r', encoding='utf-8') as f:
        try:
            existing_data = json.load(f)
            print(f"[i] Načteno {len(existing_data)} položek z rust_recycling_data.json.")
        except json.JSONDecodeError:
            print("[-] Původní JSON je poškozený nebo prázdný.")
            return

    # Přepíšeme do slovníku (dictionary) pro snadné vyhledávání podle ID
    data_dict = {item['id']: item for item in existing_data}

    # --- 2. RYCHLÝ SCRAPING POUZE HLAVNÍ STRÁNKY ---
    with sync_playwright() as p:
        print("Připojuji se k tvému spuštěnému oknu Chrome...")
        try:
            browser = p.chromium.connect_over_cdp("http://localhost:9222")
            context = browser.contexts[0]
            page = context.new_page()
        except Exception as e:
            print(f"\n[-] Chyba připojení: Ujisti se, že jsi spustil Chrome s portem 9222! ({e})")
            return

        print("Načítám hlavní seznam předmětů pro získání kategorií...")
        page.goto(ITEM_LIST_URL)
        time.sleep(2) 

        items_info = page.evaluate("""() => {
            let results = [];
            let currentCategory = 'Uncategorized';
            
            // Projdeme všechny elementy v kontejneru, který obsahuje jak h2, tak odkazy
            // Předpokládám, že položky jsou v nějakém hlavním divu
            let content = document.querySelector('#main') || document.body; 
            let elements = content.querySelectorAll('h2, a.pad');
            
            elements.forEach(el => {
                if (el.tagName === 'H2') {
                    // Jakmile narazíme na H2, změníme kategorii
                    currentCategory = el.innerText.trim();
                } else if (el.tagName === 'A' && el.classList.contains('pad')) {
                    // Odkaz patří k aktuální kategorii
                    let name = el.querySelector('.r-cell') ? el.querySelector('.r-cell').innerText.trim() : '';
                    if (name) {
                        results.push({ name: name, category: currentCategory });
                    }
                }
            });
            return results;
        }""")
        
        page.close()

    # --- 3. PŘIŘAZENÍ KATEGORIÍ DO JSONU ---
    updated_count = 0
    for info in items_info:
        item_id = info['name'].lower().replace(" ", "").replace("-", "")
        
        # Pokud toto ID máme v JSONu, updatneme mu kategorii
        if item_id in data_dict:
            # Uložíme kategorii z h2 (převedenou na malá písmena, nebo si to můžeš smazat .lower(), pokud chceš zachovat velikost z webu)
            data_dict[item_id]['category'] = info['category'].lower()
            updated_count += 1

    print(f"[i] Úspěšně upraveno {updated_count} kategorií.")

    # --- 4. SEŘAZENÍ A ULOŽENÍ ---
    print("Seřazuji opravená data a ukládám...")
    # Třídíme nejdříve podle kategorie, pak podle jména
    final_data_sorted = sorted(
        data_dict.values(), 
        key=lambda x: (x.get('category', '').lower(), x.get('name', '').lower())
    )

    with open('rust_recycling_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data_sorted, f, ensure_ascii=False, indent=4)
    
    print("\n[✓] Hotovo! Kategorie byly opraveny čistě z hlavní stránky a JSON je uložen.")

if __name__ == "__main__":
    update_categories_only()
import json, re

with open('C:/Users/Vít/.gemini/antigravity/brain/a84195d8-ba36-4b8e-ac3b-bdb068494b11/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in reversed(lines):
    msg = json.loads(line)
    if msg.get('type') == 'USER_INPUT':
        content = msg.get('content', '')
        links = set(re.findall(r'href=\"/monument/([^\"]+)\"', content))
        if links:
            sorted_links = sorted(list(links))
            print(f'Found {len(sorted_links)} unique links:')
            for link in sorted_links:
                print(link)
            break

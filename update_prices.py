import re
import codecs

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Update prices in the room cards
# Look for <div class="room-price"> blocks or similar
# e.g., <span class="amount">550</span>
text = re.sub(r'<span class="amount">\d+</span>\s*<span class="unit">MAD\s*/\s*night</span>', '<span class="amount">35</span>\n                <span class="unit">€ / night</span>', text)

# Just in case they are structured differently
text = re.sub(r'<span class="amount">\d+</span>', '<span class="amount">35</span>', text)
text = text.replace('MAD / night', '€ / night')
text = text.replace('MAD/night', '€/night')
text = text.replace('150–550 MAD', '35 €')
text = text.replace('150 MAD', '35 €')
text = text.replace('150 MAD/night', '35 €/night')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Price update completed.")

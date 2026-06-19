import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace all <span class="amount">... MAD</span> with <span class="amount">35 €</span>
text = re.sub(r'<span class="amount">\d+\s*MAD</span>', '<span class="amount">35 €</span>', text)
# Just in case some have different spacing or no MAD inside
text = re.sub(r'<span class="amount">\d+</span>\s*MAD', '<span class="amount">35 €</span>', text)

# For the one that was already modified to 35 € but says "per person" instead of "per night" (Trekker's dorm)
# Wait, let's just make sure all prices are 35 EUR. 
text = re.sub(r'<span class="amount">\d+\s*</span>', '<span class="amount">35 €</span>', text)
text = text.replace('35 €<', '35 €<')

# Also fix the booking price range text in the hero/header if any
text = text.replace('150–550 MAD', '35 €')
text = text.replace('150 MAD', '35 €')
text = text.replace('MAD', '€')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Second pass complete.")

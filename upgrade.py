import sys
import codecs

replacements = {
    'ðŸ ƒ': '🍃',
    'ðŸ—ºï¸ ': '🗺️',
    'ðŸ žï¸ ': '🏞️',
    'âœˆï¸ ': '✈️',
    'âœ‰ï¸ ': '✉️'
}

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

for k, v in replacements.items():
    text = text.replace(k, v)

# Update the image links to the generated ones
text = text.replace('https://thumbs.dreamstime.com/b/imilchil-morocco-october-berbers-men-traveling-truck-atlas-mountains-152680032.jpg', 'images/hero_atlas.png')
text = text.replace('https://media.istockphoto.com/id/1447225501/photo/tislit-lake-in-autumn-imilchil-morocco.jpg?s=612x612&w=0&k=20&c=fYR0B1Uir16LB_nCOpvtnHlfITKr1VFgBe2_b30SSO4=', 'images/lake_tislit.png')
text = text.replace('https://media.istockphoto.com/id/1284462076/photo/panorama-view-over-pancake-formed-rock-formations-viewed-from-a-pass-road-on-the-way-to.jpg?s=612x612&w=0&k=20&c=ka_sxuL8KBnWqb1iUhZwYKBv1Di0c8JYqgUqv6aLYp8=', 'images/cultural_weaving.png')

# Update fonts
text = text.replace('Playfair Display', 'Cormorant Garamond')
text = text.replace('family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,600', 'family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600')
text = text.replace('Inter', 'Montserrat')
text = text.replace('family=Inter:wght@300;400;500;600;700', 'family=Montserrat:wght@300;400;500;600;700')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

with open('style.css', 'r', encoding='utf-8') as f:
    css_text = f.read()

css_text = css_text.replace('Playfair Display', 'Cormorant Garamond')
css_text = css_text.replace('Inter', 'Montserrat')
css_text = css_text.replace('https://thumbs.dreamstime.com/b/imilchil-morocco-october-berbers-men-traveling-truck-atlas-mountains-152680032.jpg', 'images/hero_atlas.png')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css_text)

print("Updates completed.")

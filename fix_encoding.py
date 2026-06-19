import sys
paths = ['index.html', 'style.css']
replacements = {
    'Ã®': 'î', 'â€”': '—', 'DrÃ¢a': 'Drâa', 'â€“': '–', 'â†’': '→', 'âœ¦': '✦',
    'Â·': '·', 'â˜…': '★', 'FianÃ§ailles': 'Fiançailles', 'pisÃ©': 'pisé',
    'Â©': '©', 'â€¦': '…', 'ðŸ ƒ': '🍃', 'ðŸ—ºï¸ ': '🗺️', 'ðŸŒ™': '🌙',
    'ðŸ žï¸ ': '🏞️', 'ðŸ’™': '💙', 'ðŸ—»': '🗻', 'ðŸŽ‰': '🎉', 'ðŸš—': '🚗',
    'âœˆï¸ ': '✈️', 'ðŸ“ž': '📞', 'ðŸ’¬': '💬', 'âœ‰ï¸ ': '✉️',
    'â• ': '═', 'GÃ®te': 'Gîte', 'DrÃ¢a': 'Drâa', 'FianÃ§ailles': 'Fiançailles',
    'pisÃ©': 'pisé', 'Ã©': 'é', 'Ã¨': 'è', 'Ã ': 'à', 'Ã§': 'ç', 'Ã´': 'ô', 'Ã ': 'â', 'Ãª': 'ê', 'Ã¯': 'ï'
}
for p in paths:
    text = open(p, 'r', encoding='utf-8').read()
    for k, v in replacements.items():
        text = text.replace(k, v)
    open(p, 'w', encoding='utf-8').write(text)
print('Fixed manually')

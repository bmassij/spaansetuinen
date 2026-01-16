import os
import re

# Directory with HTML files
html_dir = 'website/public'

for filename in os.listdir(html_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(html_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace Yucca Rostrata with Cycca Revoluta in navbar
        content = re.sub(
            r'yucca-rostrata\.html.*Yucca Rostrata',
            'cycca-revoluta.html" class="block text-gray-700 hover:text-emerald-600 transition-colors">Cycca Revoluta',
            content
        )

        # Also replace in mobile menu
        content = re.sub(
            r'yucca-rostrata\.html.*Yucca Rostrata',
            'cycca-revoluta.html" class="block py-1 text-sm text-gray-600 hover:text-emerald-600">Cycca Revoluta',
            content
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Navbar consistentie gecorrigeerd: Yucca Rostrata vervangen door Cycca Revoluta.")
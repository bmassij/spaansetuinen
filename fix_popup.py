import os
import re

# Directory with HTML files
html_dir = 'website/public'

# Jubilee popup HTML to add before </body>
popup_html = '''
  <!-- Jubilee Popup -->
  <div id="jubilee-popup" class="jubilee-popup" role="dialog" aria-modal="true">
    <div class="jubilee-popup__inner">
      <button class="jubilee-popup__close" id="jubilee-close" aria-label="Sluiten">✕</button>
      <h2>10 jaar Spaanse Tuin & Zo!</h2>
      <p>Vier ons jubileum met speciale acties. Bekijk de actiepagina voor meer informatie.</p>
      <a href="opdrachten/�� 10 jaar Spaanse Tuin & Zo! ��" class="jubilee-popup__btn">Bekijk actie</a>
    </div>
  </div>
  <script src="scripts/jubilee-popup.js" defer></script>
'''

# CSS for popup (add to <style> or separate)
popup_css = '''
.jubilee-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.jubilee-popup__inner {
  background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
  padding: 30px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border: 4px solid #f59e0b;
  text-align: center;
}

.jubilee-popup__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #92400e;
}

.jubilee-popup__btn {
  background: #16a34a;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  transition: background 0.3s;
}

.jubilee-popup__btn:hover {
  background: #15803d;
}
'''

for filename in os.listdir(html_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(html_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if popup already exists
        if 'jubilee-popup' in content:
            continue

        # Add CSS to <style> tag
        if '<style>' in content:
            content = content.replace('<style>', '<style>' + popup_css, 1)

        # Add popup before </body>
        content = content.replace('</body>', popup_html + '</body>')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Jubilee popup toegevoegd aan alle HTML bestanden.")
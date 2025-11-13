const fastFoodSites = [
  'mcdonalds.com',
  'kfc.com',
  'wendys.com',
  'burgerking.com',
  'tacobell.com',
  'chick-fil-a.com',
  'popeyes.com',
  'pizzahut.com',
  'dominos.com',
  'papajohns.com',
  'littlecaesars.com',
  'dunkindonuts.com',
  'subway.com',
  'jimmyjohns.com',
  'jambajuice.com',
  'smoothieking.com',
  'chipotle.com',
  'qdoba.com',
  'panerabread.com',
  'wingstop.com',
  'chickfila.com',
  'arbys.com',
  'sonic.com',
  'in-n-out.com',
  'fiveguys.com',
  'shake-shack.com',
  'whataburger.com',
  'chick-fil-a.com',
  'cfa.com',
  'staples.com'
];

function isOnFastFoodSite() {
  const hostname = window.location.hostname;
  return fastFoodSites.some(site => hostname.includes(site));
}

function showOverlay() {
  if (isOnFastFoodSite()) {
    chrome.storage.sync.get('enabled', (result) => {
      if (result.enabled !== false) {
        chrome.runtime.sendMessage({
          action: 'getFoodType',
          url: window.location.href,
          title: document.title
        }, (response) => {
          if (response && response.recipe) {
            displayOverlay(response.recipe);
          }
        });
      }
    });
  }
}

function displayOverlay(recipeData) {
  const overlay = document.createElement('div');
  overlay.id = 'foodso-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 32px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  `;

  const title = document.createElement('h1');
  title.textContent = 'Make This At Home Instead';
  title.style.cssText = `
    font-size: 28px;
    color: #333;
    margin: 0 0 16px 0;
  `;

  const recipeContent = document.createElement('div');
  recipeContent.innerHTML = `
    <div style="margin-bottom: 24px;">
      <h2 style="font-size: 20px; color: #4CAF50; margin: 0 0 12px 0;">${recipeData.name}</h2>
      <div style="display: flex; gap: 24px; margin-bottom: 16px; font-size: 14px; color: #666;">
        <span><strong>Time:</strong> ${recipeData.time}</span>
        <span><strong>Difficulty:</strong> ${recipeData.difficulty}</span>
        <span><strong>Calories:</strong> ${recipeData.calories}</span>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; color: #333; margin: 0 0 12px 0;">Ingredients:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #555;">
        ${recipeData.ingredients.map(ing => `<li style="margin-bottom: 6px;">${ing}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; color: #333; margin: 0 0 12px 0;">Instructions:</h3>
      <ol style="margin: 0; padding-left: 20px; color: #555;">
        ${recipeData.instructions.map(inst => `<li style="margin-bottom: 8px;">${inst}</li>`).join('')}
      </ol>
    </div>
  `;

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Continue Browsing (I Understand)';
  closeBtn.style.cssText = `
    width: 100%;
    padding: 12px 16px;
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  `;
  closeBtn.onmouseover = () => closeBtn.style.background = '#e0e0e0';
  closeBtn.onmouseout = () => closeBtn.style.background = '#f0f0f0';
  closeBtn.onclick = () => overlay.remove();

  container.appendChild(title);
  container.appendChild(recipeContent);
  container.appendChild(closeBtn);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.remove();
  });
}

document.addEventListener('DOMContentLoaded', showOverlay);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showOverlay);
} else {
  showOverlay();
}

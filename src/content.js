const fastFoodSites = [
  'mcdonalds',
  'kfc',
  'wendys',
  'burgerking',
  'tacobell',
  'chick-fil-a',
  'chickfila',
  'popeyes',
  'pizzahut',
  'dominos',
  'papajohns',
  'littlecaesars',
  'dunkin',
  'subway',
  'jimmyjohns',
  'chipotle',
  'qdoba',
  'panerabread',
  'wingstop',
  'arbys',
  'sonic',
  'in-n-out',
  'innout',
  'fiveguys',
  'shakeshack',
  'whataburger',
  'carls',
  'carlsjr',
  'jackinthebox',
  'dairyqueen',
  'raisingcanes',
  'zaxbys',
  'culvers',
  'panera',
  'buffalowildwings',
  'wingstop',
  'daveshot',
  'hardees',
  'elpolloloco',
  'deltaco',
  'steak-n-shake',
  'whitecastle',
  'checkers',
  'rallys',
  'krystal',
  'churchs',
  'boston-market',
  'tijuanaflats',
  'moes',
  'chipotle',
  'panda-express',
  'pandaexpress',
  'outback',
  'tgifridays',
  'applebees',
  'chilis',
  'olivegarden',
  'redlobster',
  'buffalowildwings',
  'dennys',
  'ihop',
  'cracker-barrel',
  'hooters',
  'wafflehouse',
  'pizzahut',
  'dominos',
  'papajohns',
  'marcos',
  'caesars',
  'jets',
  'hungry-howies',
  'godfathers',
  'cici',
  'roundtable',
  'papamurphys',
  'blaze',
  'modpizza',
  'pieology',
  'pizza',
  'burger',
  'fried-chicken',
  'fastfood',
  'fast-food',
  'delivery',
  'ubereats',
  'doordash',
  'grubhub',
  'postmates',
  'seamless'
];

function isOnFastFoodSite() {
  const hostname = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const fullUrl = window.location.href.toLowerCase();
  
  return fastFoodSites.some(site => 
    hostname.includes(site) || 
    path.includes(site) || 
    fullUrl.includes(site)
  );
}

function showOverlay() {
  if (isOnFastFoodSite()) {
    chrome.storage.sync.get('enabled', (result) => {
      if (result.enabled !== false) {
        displayLoadingPage();
        
        chrome.runtime.sendMessage({
          action: 'generateRecipe',
          url: window.location.href,
          title: document.title,
          content: document.body.innerText.substring(0, 1000)
        }, (response) => {
          if (response && response.success && response.data) {
            displayOverlay(response.data);
          }
        });
      }
    });
  }
}

function displayLoadingPage() {
  document.body.innerHTML = '';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.background = '#FFC72C';
  document.body.style.fontFamily = 'Arial Black, Arial, sans-serif';

  const page = document.createElement('div');
  page.innerHTML = `
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
    <div style="background: #FFC72C; min-height: 100vh; padding: 0;">
      <div style="background: #DA291C; padding: 60px 20px; text-align: center; border-bottom: 8px solid #000;">
        <h1 style="font-size: 72px; color: #FFC72C; text-shadow: 4px 4px 0 #000; margin-bottom: 20px; font-family: Arial Black, sans-serif; letter-spacing: 2px;">
          WAIT!
        </h1>
        <p style="font-size: 24px; color: #fff; font-weight: bold;">
          Before you order that, here's what you should know
        </p>
      </div>

      <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: #fff; border: 6px solid #DA291C; border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 8px 8px 0 #000;">
          <h2 style="font-size: 36px; color: #DA291C; margin-bottom: 20px; font-family: Arial Black, sans-serif;">
            FUN FACTS
          </h2>
          <ul style="font-size: 18px; line-height: 2; color: #333; font-family: Arial, sans-serif; padding-left: 25px;">
            <li>A typical fast food burger has 50+ ingredients (a homemade one needs 5)</li>
            <li>Fast food meals contain your entire day's sodium in one sitting</li>
            <li>The "fresh" fries you're ordering were frozen 6 months ago</li>
            <li>You could make the same meal at home in 15 minutes for half the price</li>
            <li>Fast food is designed to be addictive - high salt, sugar, and fat combo triggers your brain's reward system</li>
          </ul>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px;">
          <div style="background: #DA291C; color: #FFC72C; padding: 30px; border-radius: 15px; border: 4px solid #000; box-shadow: 4px 4px 0 #000; text-align: center;">
            <h3 style="font-size: 48px; margin-bottom: 10px; font-family: Arial Black, sans-serif;">15min</h3>
            <p style="font-size: 16px; font-weight: bold; line-height: 1.6;">Average time to make a healthy meal at home</p>
          </div>
          <div style="background: #DA291C; color: #FFC72C; padding: 30px; border-radius: 15px; border: 4px solid #000; box-shadow: 4px 4px 0 #000; text-align: center;">
            <h3 style="font-size: 48px; margin-bottom: 10px; font-family: Arial Black, sans-serif;">$5-8</h3>
            <p style="font-size: 16px; font-weight: bold; line-height: 1.6;">What a healthy recipe actually costs</p>
          </div>
          <div style="background: #DA291C; color: #FFC72C; padding: 30px; border-radius: 15px; border: 4px solid #000; box-shadow: 4px 4px 0 #000; text-align: center;">
            <h3 style="font-size: 48px; margin-bottom: 10px; font-family: Arial Black, sans-serif;">50%</h3>
            <p style="font-size: 16px; font-weight: bold; line-height: 1.6;">Less calories than fast food</p>
          </div>
        </div>

        <div style="background: #fff; border: 6px solid #000; border-radius: 20px; padding: 40px; text-align: center; box-shadow: 8px 8px 0 #DA291C;">
          <h2 style="font-size: 32px; color: #DA291C; margin-bottom: 20px; font-family: Arial Black, sans-serif; animation: pulse 1.5s infinite;">
            OUR CHEF IS COOKING UP SOMETHING SPECIAL...
          </h2>
          <p style="font-size: 18px; color: #333; font-family: Arial, sans-serif; font-weight: bold;">
            We're finding you a tastier AND healthier recipe you can make at home
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(page);
}

function displayOverlay(healthData) {
  document.body.innerHTML = '';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.background = '#FFC72C';
  document.body.style.fontFamily = 'Arial Black, Arial, sans-serif';

  const page = document.createElement('div');
  page.innerHTML = `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { overflow-x: hidden; }
      .foodso-page { 
        background: #FFC72C; 
        min-height: 100vh; 
        padding: 0;
      }
      .hero {
        background: #DA291C;
        padding: 60px 20px;
        text-align: center;
        border-bottom: 8px solid #000;
      }
      .hero h1 {
        font-size: 72px;
        color: #FFC72C;
        text-shadow: 4px 4px 0 #000;
        margin-bottom: 20px;
        font-family: Arial Black, sans-serif;
        letter-spacing: 2px;
      }
      .hero p {
        font-size: 24px;
        color: #fff;
        max-width: 800px;
        margin: 0 auto;
        font-weight: bold;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      .facts-box {
        background: #fff;
        border: 6px solid #DA291C;
        border-radius: 20px;
        padding: 40px;
        margin-bottom: 40px;
        box-shadow: 8px 8px 0 #000;
      }
      .facts-box h2 {
        font-size: 36px;
        color: #DA291C;
        margin-bottom: 20px;
        font-family: Arial Black, sans-serif;
      }
      .facts-box p {
        font-size: 18px;
        line-height: 1.8;
        color: #333;
        font-weight: normal;
        font-family: Arial, sans-serif;
      }
      .fun-facts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }
      .fun-fact {
        background: #DA291C;
        color: #FFC72C;
        padding: 30px;
        border-radius: 15px;
        border: 4px solid #000;
        box-shadow: 4px 4px 0 #000;
      }
      .fun-fact h3 {
        font-size: 48px;
        margin-bottom: 10px;
        font-family: Arial Black, sans-serif;
      }
      .fun-fact p {
        font-size: 16px;
        font-weight: bold;
        line-height: 1.6;
      }
      .recipes {
        display: grid;
        gap: 30px;
      }
      .recipe-card {
        background: #fff;
        border: 6px solid #000;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 8px 8px 0 #DA291C;
      }
      .recipe-header {
        background: #DA291C;
        padding: 30px;
        text-align: center;
      }
      .recipe-header h2 {
        font-size: 42px;
        color: #FFC72C;
        text-shadow: 3px 3px 0 #000;
        margin-bottom: 15px;
        font-family: Arial Black, sans-serif;
      }
      .recipe-meta {
        display: flex;
        justify-content: center;
        gap: 30px;
        flex-wrap: wrap;
      }
      .recipe-meta span {
        background: #FFC72C;
        color: #000;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        font-size: 16px;
        border: 3px solid #000;
      }
      .recipe-body {
        padding: 40px;
      }
      .recipe-section {
        margin-bottom: 30px;
      }
      .recipe-section h3 {
        font-size: 24px;
        color: #DA291C;
        margin-bottom: 15px;
        font-family: Arial Black, sans-serif;
        text-transform: uppercase;
      }
      .recipe-section ul, .recipe-section ol {
        padding-left: 25px;
        font-family: Arial, sans-serif;
      }
      .recipe-section li {
        font-size: 18px;
        line-height: 2;
        color: #333;
        margin-bottom: 8px;
      }
      .action-box {
        background: #fff;
        border: 6px solid #000;
        border-radius: 20px;
        padding: 50px;
        text-align: center;
        margin-top: 40px;
        box-shadow: 8px 8px 0 #DA291C;
      }
      .action-box h2 {
        font-size: 32px;
        color: #DA291C;
        margin-bottom: 30px;
        font-family: Arial Black, sans-serif;
      }
      .buttons {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        padding: 20px 50px;
        font-size: 24px;
        font-weight: bold;
        border: 5px solid #000;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: Arial Black, sans-serif;
        text-transform: uppercase;
        box-shadow: 4px 4px 0 #000;
      }
      .btn-primary {
        background: #DA291C;
        color: #FFC72C;
      }
      .btn-primary:hover {
        background: #b81e14;
        transform: translateY(-2px);
        box-shadow: 6px 6px 0 #000;
      }
      .btn-secondary {
        background: #FFC72C;
        color: #DA291C;
      }
      .btn-secondary:hover {
        background: #e6b329;
        transform: translateY(-2px);
        box-shadow: 6px 6px 0 #000;
      }
    </style>
    
    <div class="foodso-page">
      <div class="hero">
        <h1>WAIT!</h1>
        <p>Before you order that, here's what you should know</p>
      </div>

      <div class="container">
        <div class="facts-box">
          <h2>THE REAL DEAL</h2>
          <p>${healthData.healthFacts}</p>
        </div>

        <div class="fun-facts">
          <div class="fun-fact">
            <h3>20min</h3>
            <p>Average time to make a healthy meal at home</p>
          </div>
          <div class="fun-fact">
            <h3>$5-8</h3>
            <p>What these recipes actually cost</p>
          </div>
          <div class="fun-fact">
            <h3>50%</h3>
            <p>Less calories than fast food</p>
          </div>
        </div>

        <div class="recipes">
          ${healthData.recipes.map(recipe => `
            <div class="recipe-card">
              <div class="recipe-header">
                <h2>${recipe.name}</h2>
                <div class="recipe-meta">
                  <span>${recipe.time}</span>
                  <span>${recipe.difficulty}</span>
                  <span>${recipe.cost}</span>
                </div>
              </div>
              <div class="recipe-body">
                <div class="recipe-section">
                  <h3>What You Need:</h3>
                  <ul>
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                  </ul>
                </div>
                <div class="recipe-section">
                  <h3>How To Make It:</h3>
                  <ol>
                    ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
                  </ol>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="action-box">
          <h2>SO WHAT'S IT GONNA BE?</h2>
          <div class="buttons">
            <button class="btn btn-primary" id="foodso-cook">COOK AT HOME</button>
            <button class="btn btn-secondary" id="foodso-continue">NAH, I'LL ORDER</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(page);

  document.getElementById('foodso-cook').onclick = () => {
    chrome.storage.sync.get('resistedCount', (result) => {
      const count = (result.resistedCount || 0) + 1;
      chrome.storage.sync.set({ resistedCount: count });
    });
    document.body.innerHTML = `
      <div style="background: #FFC72C; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 40px;">
        <div>
          <h1 style="font-size: 64px; color: #DA291C; text-shadow: 4px 4px 0 #000; font-family: Arial Black, sans-serif; margin-bottom: 20px;">
            NICE CHOICE!
          </h1>
          <p style="font-size: 24px; color: #333; font-weight: bold; font-family: Arial, sans-serif;">
            Your body thanks you. Now go make that food.
          </p>
        </div>
      </div>
    `;
    setTimeout(() => window.close(), 2000);
  };

  document.getElementById('foodso-continue').onclick = () => {
    location.reload();
  };
}

document.addEventListener('DOMContentLoaded', showOverlay);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showOverlay);
} else {
  showOverlay();
}

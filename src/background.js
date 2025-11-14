const HACKCLUB_API_KEY = 'skddb621dc2a8545e9b6be85fd495166c00d46c55de1de4d0e92cbc63aeef12701';
const HACKCLUB_API_URL = 'https://ai.hackclub.com/proxy/v1/chat/completions';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateRecipe') {
    console.log('Generating recipe for:', request.url);
    generateAIRecipe(request.url, request.title, request.content)
      .then(result => {
        console.log('AI recipe generated successfully');
        sendResponse({ success: true, data: result });
      })
      .catch(error => {
        console.error('Error generating recipe:', error);
        console.log('Using fallback recipe');
        sendResponse({ success: true, data: getFallbackRecipe() });
      });
    return true;
  }
});

async function generateAIRecipe(url, title, content) {
  const siteName = new URL(url).hostname.replace('www.', '');
  
  const prompt = `The user is about to order from ${siteName}. 

Write in a raw, honest, no-BS tone. No corporate speak. No emojis. Just real talk.

Give me:
1. Why this food is bad for them (3-4 sentences, be direct and factual about health impacts)
2. Two simple recipes they can make at home that taste good and are actually healthier

Format as JSON:
{
  "healthFacts": "straight talk about what this does to your body",
  "recipes": [
    {
      "name": "Recipe name (make it sound appetizing)",
      "time": "actual time in minutes",
      "difficulty": "Easy",
      "cost": "realistic price like $5 or $8",
      "ingredients": ["real ingredients people have", "nothing fancy"],
      "instructions": ["clear step 1", "step 2", "etc"]
    }
  ]
}

Keep recipes simple. 5-7 ingredients max. Real food. No chef nonsense.`;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(HACKCLUB_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HACKCLUB_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'qwen/qwen3-32b',
          messages: [
            {
              role: 'system',
              content: 'You provide honest health advice and simple recipe alternatives to fast food. Always respond with valid JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        if (attempt === 0 && response.status === 503) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      let parsedData;
      try {
        parsedData = JSON.parse(content);
      } catch (e) {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to parse AI response');
        }
      }

      return parsedData;
    } catch (error) {
      if (attempt === 1) {
        console.error('AI API Error after retries:', error);
        throw error;
      }
    }
  }
}

function getFallbackRecipe() {
  return {
    healthFacts: "Fast food is loaded with sodium, unhealthy fats, and empty calories. Your body processes this stuff differently than real food. The high sodium makes you retain water and spike your blood pressure. The refined carbs and sugar crash your energy an hour later. Plus, you're not getting any real nutrients your body actually needs.",
    recipes: [
      {
        name: "Actual Good Burger",
        time: "15 minutes",
        difficulty: "Easy",
        cost: "$6",
        ingredients: [
          "Ground beef or turkey (1/4 lb)",
          "Whole wheat bun",
          "Lettuce, tomato, onion",
          "Pickles",
          "Mustard and ketchup",
          "Slice of cheese if you want it"
        ],
        instructions: [
          "Form meat into patty, season with salt and pepper",
          "Cook in pan 4 minutes per side for medium",
          "Toast the bun in the same pan",
          "Stack it: bun, lettuce, patty, toppings",
          "Eat it while it's hot"
        ]
      },
      {
        name: "Quick Chicken Wrap",
        time: "10 minutes",
        difficulty: "Easy",
        cost: "$5",
        ingredients: [
          "Whole wheat tortilla",
          "Cooked chicken breast (use rotisserie)",
          "Shredded lettuce",
          "Diced tomatoes",
          "Greek yogurt ranch",
          "Hot sauce if you like"
        ],
        instructions: [
          "Warm tortilla for 20 seconds",
          "Slice up the chicken",
          "Layer everything down the center",
          "Fold sides in, roll it up tight",
          "Done"
        ]
      }
    ]
  };
}


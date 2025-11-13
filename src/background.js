chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getFoodType') {
    const foodType = extractFoodType(request.url, request.title);
    const recipe = getRecipeByFoodType(foodType);
    sendResponse({ recipe });
  }
});

function extractFoodType(url, title) {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();
  
  if (urlLower.includes('burger') || titleLower.includes('burger')) return 'burger';
  if (urlLower.includes('pizza') || titleLower.includes('pizza')) return 'pizza';
  if (urlLower.includes('chicken') || titleLower.includes('chicken') || urlLower.includes('popcorn-chicken')) return 'fried-chicken';
  if (urlLower.includes('sandwich') || titleLower.includes('sandwich')) return 'sandwich';
  if (urlLower.includes('taco') || titleLower.includes('taco')) return 'taco';
  if (urlLower.includes('donut') || titleLower.includes('donut')) return 'donut';
  if (urlLower.includes('fries') || titleLower.includes('fries')) return 'fries';
  if (urlLower.includes('wings') || titleLower.includes('wings')) return 'wings';
  
  return 'burger';
}

function getRecipeByFoodType(foodType) {
  const recipes = {
    burger: {
      name: 'Homemade Grilled Burger',
      time: '20 minutes',
      difficulty: 'Easy',
      calories: '450',
      ingredients: [
        '1/4 lb ground beef (lean)',
        '1 whole wheat bun',
        'Lettuce leaf',
        '1 slice tomato',
        '1 slice red onion',
        '1 tbsp Greek yogurt (instead of mayo)',
        'Mustard',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Form ground beef into a patty, season with salt and pepper',
        'Grill over medium-high heat for 3-4 minutes per side',
        'Toast bun lightly on the grill',
        'Layer: bun base, lettuce, patty, tomato, onion',
        'Mix Greek yogurt with mustard for topping',
        'Serve immediately'
      ]
    },
    pizza: {
      name: 'Whole Wheat Veggie Pizza',
      time: '25 minutes',
      difficulty: 'Easy',
      calories: '320',
      ingredients: [
        '1 whole wheat pita bread',
        '2 tbsp tomato sauce',
        '1/4 cup mozzarella cheese',
        '1/4 cup fresh vegetables (peppers, mushrooms, spinach)',
        '1 clove garlic, minced',
        'Italian herbs',
        'Olive oil spray'
      ],
      instructions: [
        'Preheat oven to 400°F',
        'Spread tomato sauce on pita bread',
        'Distribute cheese and vegetables evenly',
        'Sprinkle minced garlic and Italian herbs',
        'Spray lightly with olive oil',
        'Bake for 12-15 minutes until cheese melts'
      ]
    },
    'fried-chicken': {
      name: 'Baked Herb Chicken',
      time: '35 minutes',
      difficulty: 'Easy',
      calories: '240',
      ingredients: [
        '4 oz chicken breast',
        '1/2 cup whole wheat breadcrumbs',
        '1 egg white',
        '1 tsp garlic powder',
        '1 tsp paprika',
        '1 tsp dried thyme',
        'Salt and pepper',
        'Cooking spray'
      ],
      instructions: [
        'Preheat oven to 400°F',
        'Mix breadcrumbs with garlic powder, paprika, thyme',
        'Dip chicken in egg white, then coat with breadcrumb mixture',
        'Place on baking sheet, spray lightly with cooking oil',
        'Bake for 25-30 minutes until internal temp reaches 165°F',
        'Let cool for 2 minutes before serving'
      ]
    },
    sandwich: {
      name: 'Mediterranean Veggie Sandwich',
      time: '15 minutes',
      difficulty: 'Easy',
      calories: '380',
      ingredients: [
        '1 whole grain bread',
        '2 tbsp hummus',
        'Handful of spinach',
        '1/4 cup sliced cucumber',
        '2 slices tomato',
        '1/4 cup bell peppers (mixed colors)',
        '2 tbsp feta cheese',
        'Lemon juice'
      ],
      instructions: [
        'Toast bread lightly',
        'Spread hummus on both sides',
        'Layer spinach on one side',
        'Add cucumber, tomato, peppers',
        'Sprinkle feta cheese',
        'Drizzle lemon juice and serve'
      ]
    },
    taco: {
      name: 'Black Bean & Veggie Tacos',
      time: '20 minutes',
      difficulty: 'Easy',
      calories: '280',
      ingredients: [
        '2 corn tortillas',
        '1/2 cup black beans (canned, rinsed)',
        '1/4 cup corn kernels',
        '1/4 cup shredded cabbage',
        '1/4 cup diced bell peppers',
        '2 tbsp salsa',
        '1 tbsp Greek yogurt',
        'Lime juice, cilantro'
      ],
      instructions: [
        'Warm tortillas over low heat for 1 minute per side',
        'Heat black beans with cumin and chili powder',
        'Warm corn briefly',
        'Assemble tacos: beans, corn, cabbage, peppers',
        'Top with salsa and Greek yogurt',
        'Serve with lime and fresh cilantro'
      ]
    },
    donut: {
      name: 'Banana Oat Energy Bites',
      time: '15 minutes',
      difficulty: 'Easy',
      calories: '120',
      ingredients: [
        '1 ripe banana',
        '1/2 cup rolled oats',
        '2 tbsp almond butter',
        '1 tbsp honey',
        '1/4 tsp vanilla extract',
        'Pinch of cinnamon',
        '1 tbsp dark chocolate chips (optional)'
      ],
      instructions: [
        'Mash banana in a bowl',
        'Mix in oats, almond butter, honey, vanilla',
        'Add cinnamon and chocolate chips',
        'Form into bite-sized balls',
        'Refrigerate for 10 minutes',
        'Store in fridge and enjoy throughout the week'
      ]
    },
    fries: {
      name: 'Crispy Oven Baked Sweet Potato Fries',
      time: '25 minutes',
      difficulty: 'Easy',
      calories: '150',
      ingredients: [
        '1 medium sweet potato',
        '1 tbsp olive oil',
        '1/2 tsp paprika',
        '1/2 tsp garlic powder',
        '1/4 tsp cayenne (optional)',
        'Sea salt',
        'Black pepper'
      ],
      instructions: [
        'Preheat oven to 425°F',
        'Cut sweet potato into fries',
        'Toss with olive oil and seasonings',
        'Spread on baking sheet in single layer',
        'Bake for 20-25 minutes, stirring halfway',
        'Serve immediately while hot and crispy'
      ]
    },
    wings: {
      name: 'Baked Spicy Lime Chicken Wings',
      time: '40 minutes',
      difficulty: 'Easy',
      calories: '210',
      ingredients: [
        '1 lb chicken wings',
        '2 tbsp lime juice',
        '1 tbsp olive oil',
        '1 tsp chili powder',
        '1 tsp garlic powder',
        '1/2 tsp cumin',
        'Salt and pepper',
        'Fresh cilantro'
      ],
      instructions: [
        'Preheat oven to 400°F',
        'Pat wings dry with paper towel',
        'Mix lime juice, oil, and all spices',
        'Coat wings thoroughly with mixture',
        'Place on lined baking sheet',
        'Bake for 35-40 minutes until crispy',
        'Toss with fresh cilantro and serve'
      ]
    }
  };

  return recipes[foodType] || recipes.burger;
}

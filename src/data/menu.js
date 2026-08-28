// =============================================================
// NASIR CAFÉ — MENU DATA
// This is the single source of truth for every product shown on
// the site (featured section + full menu). Add, remove or edit
// items here — every component reads from this file.
// =============================================================

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'Breakfast', label: 'Breakfast' },
  { id: 'Burgers', label: 'Burgers' },
  { id: 'Pizza', label: 'Pizza' },
  { id: 'Sandwiches', label: 'Sandwiches' },
  { id: 'Pasta', label: 'Pasta' },
  { id: 'Coffee', label: 'Coffee' },
  { id: 'Desserts', label: 'Desserts' },
  { id: 'Drinks', label: 'Drinks' },
]

export const categoryImages = {
  Breakfast:
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80',
  Burgers:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
  Pizza:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
  Sandwiches:
    'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&w=400&q=80',
  Pasta:
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80',
  Coffee:
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
  Desserts:
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
  Drinks:
    'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80',
}

const menuItems = [
  // ---------------- Breakfast ----------------
  {
    id: 1,
    name: 'Classic Pancake Stack',
    category: 'Breakfast',
    price: 24,
    description: 'Fluffy buttermilk pancakes served with maple syrup and fresh berries.',
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    ingredients: ['Flour', 'Butter', 'Maple Syrup', 'Mixed Berries', 'Eggs'],
    featured: true,
  },
  {
    id: 2,
    name: 'Eggs Benedict',
    category: 'Breakfast',
    price: 26,
    description: 'Poached eggs and grilled turkey on toasted muffins, finished with hollandaise.',
    image:
      'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    ingredients: ['Eggs', 'English Muffin', 'Turkey', 'Hollandaise Sauce'],
  },
  {
    id: 3,
    name: 'Avocado Toast',
    category: 'Breakfast',
    price: 22,
    description: 'Smashed avocado, cherry tomatoes and feta on toasted sourdough.',
    image:
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    ingredients: ['Sourdough', 'Avocado', 'Cherry Tomato', 'Feta Cheese', 'Chili Flakes'],
  },

  // ---------------- Burgers ----------------
  {
    id: 4,
    name: 'Classic Beef Burger',
    category: 'Burgers',
    price: 32,
    description: 'Grilled beef patty, lettuce, tomato, cheese and special sauce.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    ingredients: ['Beef Patty', 'Cheese', 'Lettuce', 'Tomato', 'Brioche Bun', 'Special Sauce'],
    featured: true,
  },
  {
    id: 5,
    name: 'Cheese Melt Burger',
    category: 'Burgers',
    price: 34,
    description: 'Double beef patty smothered in melted cheddar with caramelized onions.',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    ingredients: ['Double Beef Patty', 'Cheddar', 'Caramelized Onion', 'Brioche Bun'],
  },
  {
    id: 6,
    name: 'Spicy Chicken Burger',
    category: 'Burgers',
    price: 30,
    description: 'Crispy fried chicken fillet with jalapenos and spicy mayo.',
    image:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    ingredients: ['Chicken Fillet', 'Jalapeno', 'Spicy Mayo', 'Lettuce', 'Bun'],
  },

  // ---------------- Pizza ----------------
  {
    id: 7,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 30,
    description: 'Fresh tomato, mozzarella and basil.',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Fresh Basil', 'Olive Oil'],
    featured: true,
  },
  {
    id: 8,
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    price: 36,
    description: 'Loaded with spicy pepperoni and a blend of melted cheeses.',
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    ingredients: ['Pepperoni', 'Mozzarella', 'Tomato Sauce', 'Oregano'],
  },
  {
    id: 9,
    name: 'BBQ Chicken Pizza',
    category: 'Pizza',
    price: 38,
    description: 'Grilled chicken, red onion and smoky BBQ sauce.',
    image:
      'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    ingredients: ['Chicken', 'BBQ Sauce', 'Red Onion', 'Mozzarella'],
  },

  // ---------------- Sandwiches ----------------
  {
    id: 10,
    name: 'Chicken Club Sandwich',
    category: 'Sandwiches',
    price: 28,
    description: 'Grilled chicken, lettuce, tomato, cheese and house sauce.',
    image:
      'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    ingredients: ['Grilled Chicken', 'Cheese', 'Lettuce', 'Tomato', 'Toasted Bread'],
    featured: true,
  },
  {
    id: 11,
    name: 'Grilled Veggie Sandwich',
    category: 'Sandwiches',
    price: 24,
    description: 'Grilled seasonal vegetables with hummus on multigrain bread.',
    image:
      'https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    ingredients: ['Zucchini', 'Bell Pepper', 'Hummus', 'Multigrain Bread'],
  },
  {
    id: 12,
    name: 'Tuna Melt Sandwich',
    category: 'Sandwiches',
    price: 26,
    description: 'Creamy tuna and melted cheese on grilled sourdough.',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    ingredients: ['Tuna', 'Cheese', 'Sourdough', 'Mayo'],
  },

  // ---------------- Pasta ----------------
  {
    id: 13,
    name: 'Alfredo Pasta',
    category: 'Pasta',
    price: 34,
    description: 'Creamy Alfredo sauce with pasta and parmesan.',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    ingredients: ['Fettuccine', 'Cream', 'Parmesan', 'Garlic', 'Butter'],
    featured: true,
  },
  {
    id: 14,
    name: 'Spaghetti Bolognese',
    category: 'Pasta',
    price: 32,
    description: 'Classic spaghetti with slow-cooked beef ragù.',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    ingredients: ['Spaghetti', 'Beef Ragu', 'Tomato', 'Parmesan'],
  },
  {
    id: 15,
    name: 'Pesto Penne',
    category: 'Pasta',
    price: 30,
    description: 'Penne tossed in fresh basil pesto with pine nuts.',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    ingredients: ['Penne', 'Basil Pesto', 'Pine Nuts', 'Parmesan'],
  },

  // ---------------- Coffee ----------------
  {
    id: 16,
    name: 'Cappuccino',
    category: 'Coffee',
    price: 18,
    description: 'Freshly brewed espresso with steamed milk.',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam'],
    featured: true,
  },
  {
    id: 17,
    name: 'Caffe Latte',
    category: 'Coffee',
    price: 18,
    description: 'Smooth espresso layered with steamed milk and a light foam.',
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    ingredients: ['Espresso', 'Steamed Milk'],
  },
  {
    id: 18,
    name: 'Espresso',
    category: 'Coffee',
    price: 14,
    description: 'A bold, rich shot of freshly ground espresso.',
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    ingredients: ['Espresso Beans'],
  },
  {
    id: 19,
    name: 'Mocha',
    category: 'Coffee',
    price: 20,
    description: 'Espresso with rich chocolate and steamed milk, topped with cream.',
    image:
      'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    ingredients: ['Espresso', 'Chocolate', 'Steamed Milk', 'Whipped Cream'],
  },

  // ---------------- Desserts ----------------
  {
    id: 20,
    name: 'Chocolate Cake',
    category: 'Desserts',
    price: 22,
    description: 'Rich chocolate cake with smooth chocolate cream.',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Chocolate Cream'],
    featured: true,
  },
  {
    id: 21,
    name: 'Cheesecake',
    category: 'Desserts',
    price: 24,
    description: 'Baked New York style cheesecake with a buttery biscuit base.',
    image:
      'https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    ingredients: ['Cream Cheese', 'Biscuit Base', 'Sugar', 'Berry Compote'],
  },
  {
    id: 22,
    name: 'Tiramisu',
    category: 'Desserts',
    price: 26,
    description: 'Layers of espresso-soaked sponge and mascarpone cream.',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    ingredients: ['Mascarpone', 'Espresso', 'Ladyfingers', 'Cocoa Powder'],
  },

  // ---------------- Drinks ----------------
  {
    id: 23,
    name: 'Fresh Orange Juice',
    category: 'Drinks',
    price: 16,
    description: 'Freshly squeezed oranges, served chilled.',
    image:
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    ingredients: ['Fresh Oranges'],
  },
  {
    id: 24,
    name: 'Iced Lemon Tea',
    category: 'Drinks',
    price: 14,
    description: 'Refreshing black tea with lemon, served over ice.',
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    ingredients: ['Black Tea', 'Lemon', 'Ice'],
  },
  {
    id: 25,
    name: 'Mineral Water',
    category: 'Drinks',
    price: 6,
    description: 'Chilled still mineral water, 500ml.',
    image:
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    ingredients: ['Mineral Water'],
  },
]

export default menuItems

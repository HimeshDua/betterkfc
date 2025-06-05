'use client';

import ProductCard from '@/components/ProductCard';
import CartModal from '@/components/CartModal';
import {useState, useMemo} from 'react';

const products = [
  // Buckets
  {
    id: 'chicken-bucket-6pc',
    name: '6 Pc Chicken Bucket',
    price: 1800,
    image: '/images/bucket-6pc.jpg',
    category: 'buckets'
  },
  {
    id: 'chicken-bucket-12pc',
    name: '12 Pc Chicken Bucket',
    price: 3500,
    image: '/images/bucket-12pc.jpg',
    category: 'buckets'
  },
  {
    id: 'family-fill-up',
    name: 'Family Fill Up',
    price: 2200,
    image: '/images/family-fill-up.jpg',
    category: 'buckets'
  },
  // Individual Chicken
  {
    id: 'original-recipe-2pc',
    name: '2 Pc Original Recipe',
    price: 650,
    image: '/images/original-recipe-2pc.jpg',
    category: 'individual-chicken'
  },
  {
    id: 'hot-wings-6pc',
    name: '6 Pc Hot Wings',
    price: 450,
    image: '/images/wings-6pc.jpg',
    category: 'individual-chicken'
  },
  {
    id: 'chicken-strips-3pc',
    name: '3 Pc Chicken Strips',
    price: 400,
    image: '/images/strips-3pc.jpg',
    category: 'individual-chicken'
  },
  // Sandwiches (Burgers)
  {
    id: 'zinger',
    name: 'Zinger Burger',
    price: 550,
    image: '/images/zinger.jpg',
    category: 'sandwiches'
  },
  {
    id: 'boxmaster',
    name: 'Boxmaster',
    price: 700,
    image: '/images/boxmaster.jpg',
    category: 'sandwiches'
  },
  {
    id: 'kentucky-burger',
    name: 'Kentucky Burger',
    price: 650,
    image: '/images/kentucky-burger.jpg',
    category: 'sandwiches'
  },
  {
    id: 'twister',
    name: 'Twister Wrap',
    price: 480,
    image: '/images/twister.jpg',
    category: 'sandwiches'
  },
  // Sides
  {
    id: 'fries',
    name: 'French Fries',
    price: 220,
    image: '/images/fries.jpg',
    category: 'sides'
  },
  {
    id: 'rice',
    name: 'Rice & Spice',
    price: 500,
    image: '/images/rice.jpg',
    category: 'sides'
  },
  {
    id: 'coleslaw',
    name: 'Coleslaw',
    price: 120,
    image: '/images/coleslaw.jpg',
    category: 'sides'
  },
  {
    id: 'corn',
    name: 'Corn on the Cob',
    price: 180,
    image: '/images/corn.jpg',
    category: 'sides'
  },
  // Desserts
  {
    id: 'icecream',
    name: 'Soft Serve Ice Cream',
    price: 150,
    image: '/images/icecream.jpg',
    category: 'desserts'
  },
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    price: 280,
    image: '/images/lava-cake.jpg',
    category: 'desserts'
  },
  // Drinks
  {
    id: 'pepsi',
    name: 'Pepsi',
    price: 100,
    image: '/images/pepsi.jpg',
    category: 'drinks'
  },
  {
    id: '7up',
    name: '7 Up',
    price: 100,
    image: '/images/7up.jpg',
    category: 'drinks'
  },
  {
    id: 'mirinda',
    name: 'Mirinda',
    price: 100,
    image: '/images/mirinda.jpg',
    category: 'drinks'
  }
];

const categories = [
  {id: 'all', name: 'All Products'},
  {id: 'buckets', name: 'Buckets'},
  {id: 'individual-chicken', name: 'Individual Chicken'},
  {id: 'sandwiches', name: 'Sandwiches & Burgers'},
  {id: 'sides', name: 'Sides'},
  {id: 'desserts', name: 'Desserts'},
  {id: 'drinks', name: 'Drinks'}
];

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function MenuPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // State to manage the active category for filtering
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on the active category
  // Using useMemo to prevent re-filtering on every render if activeCategory doesn't change
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  function addToCart(item: Product) {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? {...i, quantity: i.quantity + 1} : i
        );
      } else {
        return [...prev, {...item, quantity: 1}];
      }
    });
    setCartOpen(true);
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg flex-shrink-0">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Menu Categories
          </h2>
          <nav className="flex flex-col space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  w-full text-left py-3 px-4 rounded-md text-lg font-medium transition-colors duration-200
                  ${
                    activeCategory === category.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Product Display Area */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            {categories.find((cat) => cat.id === activeCategory)?.name ||
              'Menu Items'}
          </h2>
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  {...item}
                  onAdd={() => addToCart(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600 text-xl">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
      />
    </>
  );
}

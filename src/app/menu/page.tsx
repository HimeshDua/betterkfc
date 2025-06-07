'use client';

import ProductCardMenu from '@/components/ProductCardMenu'; // Ensure this path is correct
import CartModal from '@/components/CartModal';
import {useState, useMemo, useRef, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils'; // Assuming you have shadcn's cn utility for conditional classes

// --- Product Data --- (Keep your product data as is, ensure image paths are correct)
const products = [
  // Promotion
  {
    id: 'ramen-wings',
    name: 'Ramen Wings',
    price: 1800,
    image: '/images/products/ramen.png',
    category: 'promotion'
  },
  {
    id: '3rilling',
    name: '3rilling',
    price: 3500,
    image: '/images/products/3rilling.png',
    category: 'promotion'
  },
  // Everyday value
  {
    id: 'krunch-burger',
    name: 'Krunch Burger',
    price: 2200,
    image: '/images/products/krunch-burger.png',
    category: 'everyday-value'
  },
  {
    id: 'garlic-mayo-zingeratha',
    name: 'Garlic Mayo Zingeratha',
    price: 390,
    image: '/images/products/garlic-mayo-zingeratha.png',
    category: 'everyday-value'
  },
  // Deals & Combos
  {
    id: 'zingeratha',
    name: 'Zingeratha',
    price: 390,
    image: '/images/products/zingeratha.png',
    category: 'everyday-value',
    description: 'Our iconic Zinger Burger, crispy fries & a drink.'
  },
  {
    id: 'rice-&-spice',
    name: 'Crispy Duo Box',
    price: 390,
    image: '/images/products/rice-&-spice.png',
    category: 'everyday-value',
    description: '2 Crispy Chicken Pieces, 1 Zinger Burger, Fries & Drink.'
  },
  {
    id: 'krunch-burger-+-drink',
    name: 'Krunch Burger + Drink',
    price: 410,
    image: '/images/products/krunch-burger-+-drink.png',
    category: 'everyday-value',
    description: 'A bigger Zinger, 2 Hot Wings, Fries & Drink.'
  },
  // Individual Chicken
  {
    id: 'original-recipe-2pc',
    name: '2 Pc Original Recipe',
    price: 650,
    image: '/images/products/original-recipe-2pc.png',
    category: 'individual-chicken'
  },
  {
    id: 'hot-wings-6pc',
    name: '6 Pc Hot Wings',
    price: 450,
    image: '/images/products/wings-6pc.png',
    category: 'individual-chicken'
  },
  {
    id: 'chicken-strips-3pc',
    name: '3 Pc Chicken Strips',
    price: 400,
    image: '/images/products/strips-3pc.png',
    category: 'individual-chicken'
  },
  // Sandwiches (Burgers)
  {
    id: 'zinger',
    name: 'Zinger Burger',
    price: 550,
    image: '/images/products/zinger.png',
    category: 'sandwiches'
  },
  {
    id: 'boxmaster',
    name: 'Boxmaster',
    price: 700,
    image: '/images/products/boxmaster.png',
    category: 'sandwiches'
  },
  {
    id: 'kentucky-burger',
    name: 'Kentucky Burger',
    price: 650,
    image: '/images/products/kentucky-burger.png',
    category: 'sandwiches'
  },
  {
    id: 'twister',
    name: 'Twister Wrap',
    price: 480,
    image: '/images/products/twister.png',
    category: 'sandwiches'
  },
  // Sides
  {
    id: 'fries',
    name: 'French Fries (Large)',
    price: 220,
    image: '/images/products/fries.png',
    category: 'sides'
  },
  {
    id: 'rice',
    name: 'Rice & Spice',
    price: 500,
    image: '/images/products/rice.png',
    category: 'sides'
  },
  {
    id: 'coleslaw',
    name: 'Coleslaw',
    price: 120,
    image: '/images/products/coleslaw.png',
    category: 'sides'
  },
  {
    id: 'corn',
    name: 'Corn on the Cob',
    price: 180,
    image: '/images/products/corn.png',
    category: 'sides'
  },
  // Desserts
  {
    id: 'icecream',
    name: 'Soft Serve Ice Cream',
    price: 150,
    image: '/images/products/icecream.png',
    category: 'desserts'
  },
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    price: 280,
    image: '/images/products/lava-cake.png',
    category: 'desserts'
  },
  // Drinks
  {
    id: 'pepsi',
    name: 'Pepsi (Regular)',
    price: 100,
    image: '/images/products/pepsi.png',
    category: 'drinks'
  },
  {
    id: '7up',
    name: '7 Up (Regular)',
    price: 100,
    image: '/images/products/7up.png',
    category: 'drinks'
  },
  {
    id: 'mirinda',
    name: 'Mirinda (Regular)',
    price: 100,
    image: '/images/products/mirinda.png',
    category: 'drinks'
  }
];

const categories = [
  {id: 'all', name: 'All Products'},
  {id: 'promotion', name: 'Promotion'},
  {id: 'everyday-value', name: 'Everyday Value'},
  {id: 'buckets', name: 'Buckets'},
  {id: 'deals-combos', name: 'Deals & Combos'},
  {id: 'individual-chicken', name: 'Individual Chicken'},
  {id: 'sandwiches', name: 'Burgers & Wraps'},
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
  description?: string;
  quantity?: number;
}

export default function MenuPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const productDisplayRef = useRef<HTMLDivElement>(null);

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
          i.id === item.id ? {...i, quantity: (i.quantity ?? 0) + 1} : i
        );
      } else {
        return [...prev, {...item, quantity: 1}];
      }
    });
    setCartOpen(true);
  }

  useEffect(() => {
    if (productDisplayRef.current && window.innerWidth < 1024) {
      productDisplayRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [activeCategory]);

  return (
    <>
      <div className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 bg-background">
        {/* Category Navigation (Left Sidebar) */}
        <div className="w-full lg:w-1/4 flex-shrink-0">
          <div className="lg:sticky lg:top-[120px] bg-card p-4 lg:p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Menu Categories
            </h2>
            <nav className="flex flex-col space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start text-left py-2 px-3 rounded-md text-base font-medium transition-colors duration-200',
                    'hover:bg-accent hover:text-accent-foreground', // Use accent for hover
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-md' // Active state primary styling
                      : 'text-foreground'
                  )}
                >
                  {category.name}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Product Display Area */}
        <div className="flex-1" ref={productDisplayRef}>
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            {categories.find((cat) => cat.id === activeCategory)?.name ||
              'Menu Items'}
          </h2>
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {filteredProducts.map((item) => (
                <ProductCardMenu
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  description={item.description}
                  onAdd={() => addToCart(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground text-xl">
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

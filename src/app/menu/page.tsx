'use client';

import ProductCardMenu from '@/components/ProductCardMenu'; // Ensure this path is correct
import CartModal from '@/components/CartModal';
import {useState, useMemo, useRef, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils'; // Assuming you have shadcn's cn utility for conditional classes

// --- Product Data --- (Keep your product data as is, ensure image paths are correct)
const products = [
  // Buckets
  {
    id: 'chicken-bucket-6pc',
    name: '6 Pc Chicken Bucket',
    price: 1800,
    image: '/images/products/bucket-6pc.jpg',
    category: 'buckets'
  },
  {
    id: 'chicken-bucket-12pc',
    name: '12 Pc Chicken Bucket',
    price: 3500,
    image: '/images/products/bucket-12pc.jpg',
    category: 'buckets'
  },
  {
    id: 'family-fill-up',
    name: 'Family Fill Up',
    price: 2200,
    image: '/images/products/family-fill-up.jpg',
    category: 'buckets'
  },
  {
    id: 'zingers-only-bucket',
    name: 'Zingers Only Bucket',
    price: 2500,
    image: '/images/products/zinger-bucket.jpg',
    category: 'buckets'
  },
  // Deals & Combos
  {
    id: 'zinger-combo',
    name: 'Zinger Combo',
    price: 750,
    image: '/images/products/zinger-combo.jpg',
    category: 'deals-combos',
    description: 'Our iconic Zinger Burger, crispy fries & a drink.'
  },
  {
    id: 'crispy-duo-box',
    name: 'Crispy Duo Box',
    price: 1200,
    image: '/images/products/crispy-duo-box.jpg',
    category: 'deals-combos',
    description: '2 Crispy Chicken Pieces, 1 Zinger Burger, Fries & Drink.'
  },
  {
    id: 'mighty-zinger-box',
    name: 'Mighty Zinger Box',
    price: 990,
    image: '/images/products/mighty-zinger-box.jpg',
    category: 'deals-combos',
    description: 'A bigger Zinger, 2 Hot Wings, Fries & Drink.'
  },
  // Individual Chicken
  {
    id: 'original-recipe-2pc',
    name: '2 Pc Original Recipe',
    price: 650,
    image: '/images/products/original-recipe-2pc.jpg',
    category: 'individual-chicken'
  },
  {
    id: 'hot-wings-6pc',
    name: '6 Pc Hot Wings',
    price: 450,
    image: '/images/products/wings-6pc.jpg',
    category: 'individual-chicken'
  },
  {
    id: 'chicken-strips-3pc',
    name: '3 Pc Chicken Strips',
    price: 400,
    image: '/images/products/strips-3pc.jpg',
    category: 'individual-chicken'
  },
  // Sandwiches (Burgers)
  {
    id: 'zinger',
    name: 'Zinger Burger',
    price: 550,
    image: '/images/products/zinger.jpg',
    category: 'sandwiches'
  },
  {
    id: 'boxmaster',
    name: 'Boxmaster',
    price: 700,
    image: '/images/products/boxmaster.jpg',
    category: 'sandwiches'
  },
  {
    id: 'kentucky-burger',
    name: 'Kentucky Burger',
    price: 650,
    image: '/images/products/kentucky-burger.jpg',
    category: 'sandwiches'
  },
  {
    id: 'twister',
    name: 'Twister Wrap',
    price: 480,
    image: '/images/products/twister.jpg',
    category: 'sandwiches'
  },
  // Sides
  {
    id: 'fries',
    name: 'French Fries (Large)',
    price: 220,
    image: '/images/products/fries.jpg',
    category: 'sides'
  },
  {
    id: 'rice',
    name: 'Rice & Spice',
    price: 500,
    image: '/images/products/rice.jpg',
    category: 'sides'
  },
  {
    id: 'coleslaw',
    name: 'Coleslaw',
    price: 120,
    image: '/images/products/coleslaw.jpg',
    category: 'sides'
  },
  {
    id: 'corn',
    name: 'Corn on the Cob',
    price: 180,
    image: '/images/products/corn.jpg',
    category: 'sides'
  },
  // Desserts
  {
    id: 'icecream',
    name: 'Soft Serve Ice Cream',
    price: 150,
    image: '/images/products/icecream.jpg',
    category: 'desserts'
  },
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    price: 280,
    image: '/images/products/lava-cake.jpg',
    category: 'desserts'
  },
  // Drinks
  {
    id: 'pepsi',
    name: 'Pepsi (Regular)',
    price: 100,
    image: '/images/products/pepsi.jpg',
    category: 'drinks'
  },
  {
    id: '7up',
    name: '7 Up (Regular)',
    price: 100,
    image: '/images/products/7up.jpg',
    category: 'drinks'
  },
  {
    id: 'mirinda',
    name: 'Mirinda (Regular)',
    price: 100,
    image: '/images/products/mirinda.jpg',
    category: 'drinks'
  }
];

const categories = [
  {id: 'all', name: 'All Products'},
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
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
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

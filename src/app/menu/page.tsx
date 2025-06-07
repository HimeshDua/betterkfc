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
    image: '/images/products/ramen-wings.png',
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
  {
    id: 'boneless-strips',
    name: 'Boneless Strips',
    price: 440,
    image: '/images/products/boneless-strips.png',
    category: 'everyday-value'
  },
  {
    id: 'twister',
    name: 'Twister',
    price: 440,
    image: '/images/products/twister.png',
    category: 'everyday-value'
  },
  {
    id: 'krunch-combo',
    name: 'Krunch Combo',
    price: 590,
    image: '/images/products/krunch-combo.png',
    category: 'everyday-value'
  },
  {
    id: 'chicken-&-chips',
    name: 'Chicken & Chips',
    price: 620,
    image: '/images/products/chicken-&-chips.png',
    category: 'everyday-value'
  },
  {
    id: 'krunch-chicken-combo',
    name: 'Krunch Chicken Combo',
    price: 590,
    image: '/images/products/krunch-chicken-combo.png',
    category: 'everyday-value'
  },
  {
    id: '3-pcs-chicken',
    name: '3 Pcs Chicken',
    price: 690,
    image: '/images/products/3-pcs-chicken.png',
    category: 'everyday-value'
  },
  {
    id: 'twister',
    name: 'Twister Combo',
    price: 710,
    image: '/images/products/twister-combo.png',
    category: 'everyday-value'
  },
  // Ala-Carte-&-Combos
  {
    id: 'zinger-burger',
    name: 'Zinger Burger',
    price: 600,
    image: '/images/products/zinger-burger.png',
    category: 'ala-cc'
  },
  {
    id: 'zinger-stacker',
    name: 'Zinger Stacker',
    price: 660,
    image: '/images/products/zinger-stacker.png',
    category: 'ala-cc'
  },
  {
    id: 'kentucky-burger',
    name: 'Kentucky Burger',
    price: 660,
    image: '/images/products/kentucky-burger.png',
    category: 'ala-cc'
  },
  {
    id: 'mighty-zinger',
    name: 'Mighty Zinger',
    price: 770,
    image: '/images/products/mighty-zinger.png',
    category: 'ala-cc'
  },
  {
    id: 'zinger-combo',
    name: 'Zinger Combo',
    price: 910,
    image: '/images/products/zinger-combo.png',
    category: 'ala-cc'
  },
  {
    id: 'zinger-stacker-combo',
    name: 'Zinger Stacker Combo',
    price: 950,
    image: '/images/products/zinger-stacker-combo.png',
    category: 'ala-cc'
  },
  {
    id: 'mighty-zinger-combo',
    name: 'Migty Zinger Combo',
    price: 1050,
    image: '/images/products/mighty-zinger-combo.png',
    category: 'ala-cc'
  },
  // Signature-Boxes
  {
    id: 'crispy-box',
    name: 'Crispy Box',
    price: 710,
    image: '/images/products/crispy-box.png',
    category: 'signature'
  },
  {
    id: 'boneless-box',
    name: 'Boneless Box',
    price: 710,
    image: '/images/products/boneless-box.png',
    category: 'signature'
  },
  {
    id: 'wow-box',
    name: 'Wow Box',
    price: 1050,
    image: '/images/products/wow-box.png',
    category: 'signature'
  },
  {
    id: 'crispy-duo-box',
    name: 'Crispy Duo Box',
    price: 1350,
    image: '/images/products/crispy-duo-box.png',
    category: 'signature'
  },
  {
    id: 'xtream-duo-box',
    name: 'Xtream Duo Box',
    price: 1560,
    image: '/images/products/xtream-duo-box.png',
    category: 'signature'
  },
  // Sharing
  {
    id: 'value-bucket',
    name: 'Value Bucket',
    price: 2050,
    image: '/images/products/value-bucket.png',
    category: 'sharing'
  },
  {
    id: 'family-festival-1',
    name: 'Family Festival 1',
    price: 2190,
    image: '/images/products/family-festival-1.png',
    category: 'sharing'
  },
  {
    id: 'family-festival-2',
    name: 'Family Festival 2',
    price: 2390,
    image: '/images/products/family-festival-2.png',
    category: 'sharing'
  },
  {
    id: 'family-festival-3',
    name: 'Family Festival 3',
    price: 2590,
    image: '/images/products/family-festival-3.png',
    category: 'sharing'
  },
  // Snacks-&-Beverages
  {
    id: 'dinner-roll',
    name: 'Dinner Roll',
    price: 50,
    image: '/images/products/dinner-roll.png',
    category: 's-n-b'
  },
  {
    id: 'mayo-dip',
    name: 'Mayo Dip',
    price: 50,
    image: '/images/products/mayo-dip.png',
    category: 's-n-b'
  },
  {
    id: 'vietnamese-dip',
    name: 'Vietnamese Dip',
    price: 50,
    image: '/images/products/vietnamese-dip.png',
    category: 's-n-b'
  },
  {
    id: 'mineral-water-500ml',
    name: 'Mineral Water 500ml',
    price: 90,
    image: '/images/products/mineral-water-500ml.png',
    category: 's-n-b'
  },
  {
    id: 'coleslaw',
    name: 'Coleslaw',
    price: 150,
    image: '/images/products/coleslaw.png',
    category: 's-n-b'
  },
  {
    id: 'pepsi-regular',
    name: 'Pepsi Regular',
    price: 180,
    image: '/images/products/pepsi-regular.png',
    category: 's-n-b'
  },
  {
    id: '7up-regular',
    name: '7UP Regular',
    price: 180,
    image: '/images/products/pepsi-regular.png',
    category: 's-n-b'
  },
  {
    id: 'mountain-dew-regular',
    name: 'Mountain Dew Regular',
    price: 180,
    image: '/images/products/mountain-dew-regular.png',
    category: 's-n-b'
  },
  {
    id: '1.5-ltr-drink',
    name: '1.5 Ltr Drink',
    price: 250,
    image: '/images/products/1.5-ltr-drink.png',
    category: 's-n-b'
  },
  {
    id: 'corn-on-the-cob',
    name: 'Corn On the Cob',
    price: 290,
    image: '/images/products/corn-on-the-cob.png',
    category: 's-n-b'
  },
  {
    id: 'one-piece-chicken',
    name: 'One Piece Chicken',
    price: 320,
    image: '/images/products/one-piece-chicken.png',
    category: 's-n-b'
  },
  {
    id: 'fries',
    name: 'Fries',
    price: 340,
    image: '/images/products/fries.png',
    category: 's-n-b'
  },
  {
    id: 'masala-fries',
    name: 'Masala Fries',
    price: 360,
    image: '/images/products/masala-fries.png',
    category: 's-n-b'
  },
  {
    id: 'fries-bucket',
    name: 'Fries Bucket',
    price: 470,
    image: '/images/products/fries-bucket.png',
    category: 's-n-b'
  },
  {
    id: 'hot-shots',
    name: 'Hot Shots',
    price: 480,
    image: '/images/products/hot-shots.png',
    category: 's-n-b'
  },
  {
    id: 'masala-fries-bucket',
    name: 'Masala Fries Bucket',
    price: 490,
    image: '/images/products/masala-fries-bucket.png',
    category: 's-n-b'
  },
  {
    id: 'chicky-meal-1',
    name: 'Chicky Meal 1',
    price: 550,
    image: '/images/products/chicky-meal-1.png',
    category: 's-n-b'
  },
  {
    id: 'chicky-meal-2',
    name: 'Chicky Meal 2',
    price: 550,
    image: '/images/products/chicky-meal-2.png',
    category: 's-n-b'
  },
  {
    id: 'plain-nuggets',
    name: 'Plain Nuggets',
    price: 580,
    image: '/images/products/plain-nuggets.png',
    category: 's-n-b'
  },
  {
    id: 'spicy-nuggets',
    name: 'Spicy Nuggets',
    price: 580,
    image: '/images/products/spicy-nuggets.png',
    category: 's-n-b'
  },
  {
    id: 'buffalo-wings',
    name: 'Buffalo Wings',
    price: 640,
    image: '/images/products/buffalo-wings.png',
    category: 's-n-b'
  },
  {
    id: 'thai-sweet-chili-wings',
    name: 'Thai Sweet Chili Wings',
    price: 640,
    image: '/images/products/thai-sweet-chili-wings.png',
    category: 's-n-b'
  },
  {
    id: 'tangy-masala-wings',
    name: 'Tangy Masala Wings',
    price: 640,
    image: '/images/products/tangy-masala-wings.png',
    category: 's-n-b'
  },
  {
    id: 'salsa-sprinkle-wings',
    name: 'Salsa Sprinkle Wings',
    price: 640,
    image: '/images/products/salsa-sprinkle-wings.png',
    category: 's-n-b'
  },
  {
    id: 'cheesy-chicken-loaded-fries',
    name: 'Cheesy Chicken Loaded Fries',
    price: 650,
    image: '/images/products/cheesy-chicken-loaded-fries.png',
    category: 's-n-b'
  },
  {
    id: 'snack-bucket',
    name: 'Snack Bucket',
    price: 650,
    image: '/images/products/snack-bucket.png',
    category: 's-n-b'
  },
  {
    id: 'hot-wings-bucket',
    name: 'Hot Wings Bucket',
    price: 670,
    image: '/images/products/hot-wings-bucket.png',
    category: 's-n-b'
  },
  // Midnight (Start at 12 am)
  {
    id: 'midnight-deal-1',
    name: 'Midnight Deal 1',
    price: 520,
    image: '/images/products/midnight-deal-1.png',
    category: 'mid'
  },
  {
    id: 'midnight-deal-2',
    name: 'Midnight Deal 2',
    price: 610,
    image: '/images/products/midnight-deal-2.png',
    category: 'mid'
  },
  {
    id: 'midnight-deal-3',
    name: 'Midnight Deal 3',
    price: 710,
    image: '/images/products/midnight-deal-3.png',
    category: 'mid'
  }
];

const categories = [
  {id: 'all', name: 'All Products'},
  {id: 'promotion', name: 'Promotion'},
  {id: 'everyday-value', name: 'Everyday Value'},
  {id: 'ala-cc', name: 'Ala-Carte-&-Combos'},
  {id: 'signature', name: 'Signature'},
  {id: 'sharing', name: 'Sharing'},
  {id: 's-n-b', name: 'Snacks-&-Beverages'},
  {id: 'mid', name: 'Midnight (Start at 12 am)'}
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

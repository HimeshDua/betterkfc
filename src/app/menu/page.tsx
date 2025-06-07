'use client';
import React, {useState, useEffect, useMemo} from 'react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import ProductCardMenu from '@/components/ProductCardMenu'; // Assuming this component exists
import CartModal from '@/components/CartModal'; // Assuming this component exists
import Image from 'next/image';

// Define your product data with descriptions
const products = [
  // Promotion
  {
    id: 'ramen-wings',
    name: 'Ramen Wings',
    price: 1800,
    image: '/images/products/ramen-wings.png',
    category: 'promotion',
    description:
      '8 x Hot and crispy wings glazed in spicy Ramen Sauce and topped with crunchy noodles.'
  },
  {
    id: '3rilling',
    name: '3rilling',
    price: 3500,
    image: '/images/products/3rilling.png',
    category: 'promotion',
    description:
      '3 Zinger Burgers, 3 Chicken Drumsticks, 1 Bucket of Fries, and 3 Regular Drinks.'
  },
  // Everyday value
  {
    id: 'krunch-burger',
    name: 'Krunch Burger',
    price: 2200,
    image: '/images/products/krunch-burger.png',
    category: 'everyday-value',
    description:
      'Enjoy the crispy chicken fillet in a soft bun with our signature sauce with fresh lettuce.'
  },
  {
    id: 'garlic-mayo-zingeratha',
    name: 'Garlic Mayo Zingeratha',
    price: 390,
    image: '/images/products/garlic-mayo-zingeratha.png',
    category: 'everyday-value',
    description:
      'Tender boneless strips, sliced onions, tangy imli chutney, mint mayo, wrapped in a soft paratha.'
  },
  // Deals & Combos (These were categorized as everyday-value in the original prompt, keeping them as is)
  {
    id: 'zingeratha',
    name: 'Zingeratha',
    price: 390,
    image: '/images/products/zingeratha.png',
    category: 'everyday-value',
    description:
      'Crispy zinger strips rolled into a golden paratha with a fusion of Imli ki chutney and Mint Mayo with fresh onions.'
  },
  {
    id: 'rice-&-spice',
    name: 'Rice & Spice',
    price: 390,
    image: '/images/products/rice-&-spice.png',
    category: 'everyday-value',
    description:
      "Add some spice to your rice with KFC's Rice and Spice! With lovely pieces of chicken in spicy rice and it'll make for a lovely meal!"
  },
  {
    id: 'krunch-burger-+-drink',
    name: 'Krunch Burger + Drink',
    price: 410,
    image: '/images/products/krunch-burger-+-drink.png',
    category: 'everyday-value',
    description:
      'Enjoy a crispy crunchy chicken fillet on a bed of lettuce with a soft bun, topped with the signature sauce. Served with a drink.'
  },
  {
    id: 'boneless-strips',
    name: 'Boneless Strips',
    price: 440,
    image: '/images/products/boneless-strips.png',
    category: 'everyday-value',
    description:
      '4 Zinger strips, dinner roll, regular fries, coleslaw, dip and regular soft drink.'
  },
  {
    id: 'twister',
    name: 'Twister',
    price: 440,
    image: '/images/products/twister.png',
    category: 'everyday-value',
    description:
      '2 zinger strips drizzled with KFC signature pepper mayo, tomatoes and fresh lettuce, all wrapped in a lightly toasted tortilla.'
  },
  {
    id: 'krunch-combo',
    name: 'Krunch Combo',
    price: 590,
    image: '/images/products/krunch-combo.png',
    category: 'everyday-value',
    description:
      'Enjoy a crispy crunchy chicken fillet on a bed of lettuce with a soft bun, topped with the signature sauce. Served with fries and drink.'
  },
  {
    id: 'chicken-&-chips',
    name: 'Chicken & Chips',
    price: 620,
    image: '/images/products/chicken-&-chips.png',
    category: 'everyday-value',
    description:
      '2 Pieces hot and crispy chicken, dinner roll, regular fries, and dip sauce.'
  },
  {
    id: 'krunch-chicken-combo',
    name: 'Krunch Chicken Combo',
    price: 590,
    image: '/images/products/krunch-chicken-combo.png',
    category: 'everyday-value',
    description: 'Krunch Burger with Hot & Crispy Chicken Piece & 345ml Drink.'
  },
  {
    id: '3-pcs-chicken',
    name: '3 Pcs Chicken',
    price: 690,
    image: '/images/products/3-pcs-chicken.png',
    category: 'everyday-value',
    description: '3 Pieces of Hot and Crispy fried chicken.'
  },
  {
    id: 'twister-combo',
    name: 'Twister Combo',
    price: 710,
    image: '/images/products/twister-combo.png',
    category: 'everyday-value',
    description: 'Twister, Regular Fries and drink.'
  },
  // Ala-Carte-&-Combos
  {
    id: 'zinger-burger',
    name: 'Zinger Burger',
    price: 600,
    image: '/images/products/zinger-burger.png',
    category: 'ala-cc',
    description:
      "Scrumptious whole muscle zinger with KFC's signature dressing with fresh lettuce bundled together in a sesame seeded bun."
  },
  {
    id: 'zinger-stacker',
    name: 'Zinger Stacker',
    price: 660,
    image: '/images/products/zinger-stacker.png',
    category: 'ala-cc',
    description:
      '2 krunch fillets with Vietnamese sauce, cheese and jalapenos, all bundled together in a corn meal bun.'
  },
  {
    id: 'kentucky-burger',
    name: 'Kentucky Burger',
    price: 660,
    image: '/images/products/kentucky-burger.png',
    category: 'ala-cc',
    description:
      "Crispy zinger fillet with a beef pepperoni, cheese, crispy onions and KFC's signature BBQ sauce."
  },
  {
    id: 'mighty-zinger',
    name: 'Mighty Zinger',
    price: 770,
    image: '/images/products/mighty-zinger.png',
    category: 'ala-cc',
    description:
      '2 whole muscle zingers with cheese and fresh lettuce, all bundled in a Mighty bun.'
  },
  {
    id: 'zinger-combo',
    name: 'Zinger Combo',
    price: 910,
    image: '/images/products/zinger-combo.png',
    category: 'ala-cc',
    description: 'Zinger burger, fries and soft drink.'
  },
  {
    id: 'zinger-stacker-combo',
    name: 'Zinger Stacker Combo',
    price: 950,
    image: '/images/products/zinger-stacker-combo.png',
    category: 'ala-cc',
    description: 'Zinger stacker, fries and soft drink.'
  },
  {
    id: 'mighty-zinger-combo',
    name: 'Migty Zinger Combo',
    price: 1050,
    image: '/images/products/mighty-zinger-combo.png',
    category: 'ala-cc',
    description: 'Mighty zinger burger, fries and soft drink.'
  },
  // Signature-Boxes
  {
    id: 'crispy-box',
    name: 'Crispy Box',
    price: 710,
    image: '/images/products/crispy-box.png',
    category: 'signature',
    description:
      '2 Pieces hot and crispy chicken, regular fries, coleslaw and regular drink.'
  },
  {
    id: 'boneless-box',
    name: 'Boneless Box',
    price: 710,
    image: '/images/products/boneless-box.png',
    category: 'signature',
    description:
      '4 Zinger strips, dinner roll, regular fries, coleslaw, dip and regular soft drink.'
  },
  {
    id: 'wow-box',
    name: 'Wow Box',
    price: 1050,
    image: '/images/products/wow-box.png',
    category: 'signature',
    description:
      'Zinger burger, hot and crispy piece, regular fries, coleslaw and regular soft drink.'
  },
  {
    id: 'crispy-duo-box',
    name: 'Crispy Duo Box',
    price: 1350,
    image: '/images/products/crispy-duo-box.png',
    category: 'signature',
    description: '5 Chicken pieces, large fries and 2 regular soft drinks.'
  },
  {
    id: 'xtream-duo-box',
    name: 'Xtream Duo Box',
    price: 1560,
    image: '/images/products/xtream-duo-box.png',
    category: 'signature',
    description:
      '2 Zinger burgers, 2 chicken pieces, large fries and 2 regular soft drinks.'
  },
  // Sharing
  {
    id: 'value-bucket',
    name: 'Value Bucket',
    price: 2050,
    image: '/images/products/value-bucket.png',
    category: 'sharing',
    description: '9 Pieces hot and crispy chicken.'
  },
  {
    id: 'family-festival-1',
    name: 'Family Festival 1',
    price: 2190,
    image: '/images/products/family-festival-1.png',
    category: 'sharing',
    description:
      '4 Krunch burgers, 4 pieces Hot and Crispy Chicken, 2 Dinner Rolls, and 1.5 Liter drink.'
  },
  {
    id: 'family-festival-2',
    name: 'Family Festival 2',
    price: 2390,
    image: '/images/products/family-festival-2.png',
    category: 'sharing',
    description:
      '2 Zinger burgers, 2 krunch burgers, 4 pieces chicken, 2 dinner roll and 1.5 litre soft drink.'
  },
  {
    id: 'family-festival-3',
    name: 'Family Festival 3',
    price: 2590,
    image: '/images/products/family-festival-3.png',
    category: 'sharing',
    description:
      '4 Zinger burgers, 4 pieces chicken, 2 dinner roll and 1.5 litre soft drink.'
  },
  // Snacks-&-Beverages
  {
    id: 'dinner-roll',
    name: 'Dinner Roll',
    price: 50,
    image: '/images/products/dinner-roll.png',
    category: 's-n-b',
    description: "KFC's moist dinner roll is a great side to any meal!"
  },
  {
    id: 'mayo-dip',
    name: 'Mayo Dip',
    price: 50,
    image: '/images/products/mayo-dip.png',
    category: 's-n-b',
    description: 'A creamy and delicious dipping sauce.'
  },
  {
    id: 'vietnamese-dip',
    name: 'Vietnamese Dip',
    price: 50,
    image: '/images/products/vietnamese-dip.png',
    category: 's-n-b',
    description: 'A flavorful and tangy dipping sauce.'
  },
  {
    id: 'mineral-water-500ml',
    name: 'Mineral Water 500ml',
    price: 90,
    image: '/images/products/mineral-water-500ml.png',
    category: 's-n-b',
    description: 'Refreshing bottled mineral water.'
  },
  {
    id: 'coleslaw',
    name: 'Coleslaw',
    price: 150,
    image: '/images/products/coleslaw.png',
    category: 's-n-b',
    description:
      'Made from fresh vegetables — Cabbage and Carrots— all blended with a delicious and creamy dressing.'
  },
  {
    id: 'pepsi-regular',
    name: 'Pepsi Regular',
    price: 180,
    image: '/images/products/pepsi-regular.png',
    category: 's-n-b',
    description: 'A refreshing regular Pepsi drink.'
  },
  {
    id: '7up-regular',
    name: '7UP Regular',
    price: 180,
    image: '/images/products/pepsi-regular.png',
    category: 's-n-b',
    description: 'The classic crisp lemon-lime regular drink.'
  },
  {
    id: 'mountain-dew-regular',
    name: 'Mountain Dew Regular',
    price: 180,
    image: '/images/products/mountain-dew-regular.png',
    category: 's-n-b',
    description: 'A bold and refreshing regular Mountain Dew drink.'
  },
  {
    id: '1.5-ltr-drink',
    name: '1.5 Ltr Drink',
    price: 250,
    image: '/images/products/1.5-ltr-drink.png',
    category: 's-n-b',
    description: 'A large 1.5 liter bottle of your favorite soft drink.'
  },
  {
    id: 'corn-on-the-cob',
    name: 'Corn On the Cob',
    price: 290,
    image: '/images/products/corn-on-the-cob.png',
    category: 's-n-b',
    description:
      'This delicious, sweet yellow corn is so ripe it falls right off the cob and into a bowl which makes it a perfect side to any meal.'
  },
  {
    id: 'one-piece-chicken',
    name: 'One Piece Chicken',
    price: 320,
    image: '/images/products/one-piece-chicken.png',
    category: 's-n-b',
    description:
      'Single piece - Who says you always have to share food? Get your very own KFC scrumptious chicken piece at an amazing price!'
  },
  {
    id: 'fries',
    name: 'Fries',
    price: 340,
    image: '/images/products/fries.png',
    category: 's-n-b',
    description:
      'The perfect accompaniment to your KFC meal! Enjoy our golden fries with your favorite meal.'
  },
  {
    id: 'masala-fries',
    name: 'Masala Fries',
    price: 360,
    image: '/images/products/masala-fries.png',
    category: 's-n-b',
    description: 'Masala Crispy and Golden Fries.'
  },
  {
    id: 'fries-bucket',
    name: 'Fries Bucket',
    price: 470,
    image: '/images/products/fries-bucket.png',
    category: 's-n-b',
    description: 'Enjoy our amazing bucket of fries with mayo sauce.'
  },
  {
    id: 'hot-shots',
    name: 'Hot Shots',
    price: 480,
    image: '/images/products/hot-shots.png',
    category: 's-n-b',
    description:
      "9 Pieces they're tasty, they're hot, they're HOT SHOTS and they're absolutely yummy!"
  },
  {
    id: 'masala-fries-bucket',
    name: 'Masala Fries Bucket',
    price: 490,
    image: '/images/products/masala-fries-bucket.png',
    category: 's-n-b',
    description: 'Masala Crispy and Golden Fries in a bucket.'
  },
  {
    id: 'chicky-meal-1',
    name: 'Chicky Meal 1',
    price: 550,
    image: '/images/products/chicky-meal-1.png',
    category: 's-n-b',
    description:
      'Krunch burger, chicky fries, and regular soft drink or slice juice.'
  },
  {
    id: 'chicky-meal-2',
    name: 'Chicky Meal 2',
    price: 550,
    image: '/images/products/chicky-meal-2.png',
    category: 's-n-b',
    description:
      '4 Pieces of nuggets, chicky fries and regular soft drink or slice juice.'
  },
  {
    id: 'plain-nuggets',
    name: 'Plain Nuggets',
    price: 580,
    image: '/images/products/plain-nuggets.png',
    category: 's-n-b',
    description:
      "You won't be able to resist our hot and flavorsome Chicken Nuggets which will keep you coming back for more!"
  },
  {
    id: 'spicy-nuggets',
    name: 'Spicy Nuggets',
    price: 580,
    image: '/images/products/spicy-nuggets.png',
    category: 's-n-b',
    description: 'Spicy cravings in every bite!'
  },
  {
    id: 'buffalo-wings',
    name: 'Buffalo Wings',
    price: 640,
    image: '/images/products/buffalo-wings.png',
    category: 's-n-b',
    description:
      '8 Pcs of Hot Wings coated with a spicy Buffalo sauce, topped with chili flakes.'
  },
  {
    id: 'thai-sweet-chili-wings',
    name: 'Thai Sweet Chili Wings',
    price: 640,
    image: '/images/products/thai-sweet-chili-wings.png',
    category: 's-n-b',
    description:
      '8 Pieces - Our wings just got even more exciting! Enjoy our sweet Thai chili flavor wings, only at KFC!'
  },
  {
    id: 'tangy-masala-wings',
    name: 'Tangy Masala Wings',
    price: 640,
    image: '/images/products/tangy-masala-wings.png',
    category: 's-n-b',
    description:
      '8 Pieces - Packing a sweet and tangy kick with spicy masala, these wings truly satisfy your desi cravings!'
  },
  {
    id: 'salsa-sprinkle-wings',
    name: 'Salsa Sprinkle Wings',
    price: 640,
    image: '/images/products/salsa-sprinkle-wings.png',
    category: 's-n-b',
    description:
      '8 Pieces - The crispiest amigo in town tossed in tangy and spicy salsa sprinkles.'
  },
  {
    id: 'cheesy-chicken-loaded-fries',
    name: 'Cheesy Chicken Loaded Fries',
    price: 650,
    image: '/images/products/cheesy-chicken-loaded-fries.png',
    category: 's-n-b',
    description:
      'Crispy fries loaded with succulent chicken pieces and a generous topping of melted cheese.'
  },
  {
    id: 'snack-bucket',
    name: 'Snack Bucket',
    price: 650,
    image: '/images/products/snack-bucket.png',
    category: 's-n-b',
    description: '4 Hot wings, 4 hot shots, 2 strips and dip sauce.'
  },
  {
    id: 'hot-wings-bucket',
    name: 'Hot Wings Bucket',
    price: 670,
    image: '/images/products/hot-wings-bucket.png',
    category: 's-n-b',
    description:
      '10 Pieces Spicy and Fiery hot, get ready for a ride of flavor and spice with KFC Hot Wings.'
  },
  // Midnight (Start at 12 am)
  {
    id: 'midnight-deal-1',
    name: 'Midnight Deal 1',
    price: 520,
    image: '/images/products/midnight-deal-1.png',
    category: 'mid',
    description: 'A special deal available only after midnight.'
  },
  {
    id: 'midnight-deal-2',
    name: 'Midnight Deal 2',
    price: 610,
    image: '/images/products/midnight-deal-2.png',
    category: 'mid',
    description: '2 Krunch burgers with 2 regular soft drinks.'
  },
  {
    id: 'midnight-deal-3',
    name: 'Midnight Deal 3',
    price: 710,
    image: '/images/products/midnight-deal-3.png',
    category: 'mid',
    description: 'Another exciting deal for your late-night cravings.'
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
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const groupedProducts = useMemo(() => {
    const grouped: {[key: string]: Product[]} = {};
    products.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, []);

  const addToCart = (item: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? {...i, quantity: (i.quantity ?? 0) + 1} : i
        );
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === itemId
            ? {...i, quantity: newQuantity > 0 ? newQuantity : 0}
            : i
        )
        .filter((i) => (i.quantity ?? 0) > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartItems = useMemo(
    () => cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0),
    [cartItems]
  );

  const totalCartPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * (item.quantity ?? 0),
        0
      ),
    [cartItems]
  );

  return (
    <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 bg-background">
      <section className="flex-1 lg:w-3/4">
        {categories.map((category) => {
          if (category.id === 'all') return null;
          const items = groupedProducts[category.id];
          if (!items || items.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="mb-12 pt-4">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {category.name}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {items.map((item) => (
                  <article key={item.id}>
                    <ProductCardMenu
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      description={item.description}
                      onAdd={() => addToCart(item)}
                    />
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {Object.values(groupedProducts).every((arr) => arr.length === 0) && (
          <p className="text-center py-10 text-muted-foreground text-xl">
            No products available in the menu.
          </p>
        )}
      </section>

      <aside className="w-full lg:w-1/4 flex-shrink-0">
        <div className="lg:sticky lg:top-[120px] bg-card p-4 lg:p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Your Bucket
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-muted-foreground">Your bucket is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Price: Rs. {item.price * (item.quantity ?? 0)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateItemQuantity(item.id, (item.quantity ?? 0) - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      -
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateItemQuantity(item.id, (item.quantity ?? 0) + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <footer className="pt-4 border-t-2 border-dashed border-border">
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total Items:</span>
                  <span>{totalCartItems}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground mt-2">
                  <span>Total Price:</span>
                  <span>Rs. {totalCartPrice}</span>
                </div>
                <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Proceed to Checkout
                </Button>
              </footer>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}

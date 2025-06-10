'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import CartModal from '@/components/CartModal';
import {MenuIcon, ShoppingCart, X} from 'lucide-react';
import Image from 'next/image';
import {useTheme} from 'next-themes';
import {cn} from '@/lib/utils';
import {usePathname} from 'next/navigation';

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {setTheme} = useTheme();
  const path = usePathname();

  const categories = [
    {slug: 'all', name: 'All Products'},
    {slug: 'promotion', name: 'Promotion'},
    {slug: 'everyday-value', name: 'Everyday Value'},
    {slug: 'ala-cc', name: 'Ala-Carte-&-Combos'},
    {slug: 'signature', name: 'Signature'},
    {slug: 'sharing', name: 'Sharing'},
    {slug: 's-n-b', name: 'Snacks-&-Beverages'},
    {slug: 'mid', name: 'Midnight (Start at 12 am)'}
  ];

  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <div className="bg-muted text-muted-foreground text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span
              className="cursor-pointer"
              role="button"
              onClick={() => setTheme('light')}
            >
              Day
            </span>
            <span className="text-gray-400">|</span>{' '}
            <span
              className="cursor-pointer"
              role="button"
              onClick={() => setTheme('dark')}
            >
              Night
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="hover:text-primary hidden sm:block"
            >
              Login / Sign Up
            </Link>
            <Button
              variant="ghost"
              onClick={() => setCartOpen(true)}
              className="relative p-0 h-auto text-foreground hover:bg-transparent"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="ml-1 text-xs font-bold text-primary-foreground bg-primary rounded-full px-1.5 py-0.5 min-w-[20px] flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-background flex flex-col justify-center gap-y-3 shadow-md py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/logo-2.svg"
              alt="KFC Pakistan Logo"
              width={80}
              height={50}
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <nav className="space-x-4 lg:space-x-6">
              <Link
                href="/menu"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/deals"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Deals
              </Link>
              <Link
                href="/locations"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Locations
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          <Button
            variant="ghost"
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </Button>
        </div>
        {path === '/menu' && (
          <nav className="container mx-auto flex justify-start overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className={cn(
                  'flex-shrink-0 px-4 py-3 rounded-none border-b-2 text-base font-medium transition-colors duration-200',
                  'hover:border-red-800 '
                )}
              >
                {category.name}
              </a>
            ))}
          </nav>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(56px+44px)] bg-background py-4 px-4 shadow-lg z-40 overflow-y-auto animate-fade-in-down">
          <nav className="flex flex-col space-y-3">
            <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-foreground hover:bg-muted"
              >
                Menu
              </Button>
            </Link>
            <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-foreground hover:bg-muted"
              >
                Deals
              </Button>
            </Link>
            <Link href="/locations" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-foreground hover:bg-muted"
              >
                Locations
              </Button>
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-foreground hover:bg-muted"
              >
                About
              </Button>
            </Link>
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-foreground hover:bg-muted"
              >
                Login / Sign Up
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-lg text-foreground hover:bg-muted"
              onClick={() => {
                setCartOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Cart ({cartItems.length})
            </Button>
          </nav>
        </div>
      )}

      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
      />
    </header>
  );
}

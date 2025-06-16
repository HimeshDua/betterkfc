'use client';

import Link from 'next/link';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Menu, X, Sun, Moon, ShoppingCart, UserCircle2} from 'lucide-react';
import {useSessions} from '@/contexts/UserContext';
import {cn} from '@/lib/utils';
import {useTheme} from 'next-themes';
import {categories, navLinks} from '@/data/data';
import {useCart} from '@/contexts/CartContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const {user, valid} = useSessions();
  const {theme, setTheme} = useTheme();
  const {cart} = useCart();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="w-full border-b bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl italic text-nowrap font-bold text-primary relative">
            KFC
            <span className="absolute -bottom-1 -right-4 text-xs font-semibold text-muted-foreground tracking-wide">
              better
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-col w-full items-end">
          <nav className="flex items-center gap-6">
            {navLinks.map(({name, href}) => (
              <Link key={name} href={href} prefetch>
                <span
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    pathname === href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {name}
                </span>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="group"
            >
              {theme === 'dark' ? (
                <Sun
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              ) : (
                <Moon
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              )}
            </Button>
            <Link href="/menu/bucket">
              <Button variant="ghost" size="icon" className="relative group">
                <ShoppingCart
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            {user ? (
              <Link href={user.role === 'admin' ? '/admin' : '/profile'}>
                <Button variant="ghost" size="icon" className="group">
                  <UserCircle2
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link href="/signin">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
          {pathname === '/menu' && (
            <div className="w-full flex justify-end mt-2 overflow-x-auto no-scrollbar">
              <nav className="flex gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`#${category.slug}`}
                    className={cn(
                      'px-4 py-2 text-sm font-medium whitespace-nowrap rounded-md border',
                      'hover:bg-primary/10 hover:text-primary transition-colors',
                      'text-muted-foreground border-transparent'
                    )}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md hover:bg-accent/20 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t shadow-inner pb-4">
          <div className="flex flex-col px-4 py-3 gap-2">
            {navLinks.map(({name, href}) => (
              <Link
                key={name}
                href={href}
                prefetch
                onClick={() => setMobileOpen(false)}
              >
                <Button variant="ghost">{name}</Button>
              </Link>
            ))}

            <Button
              variant="ghost"
              onClick={() => {
                toggleTheme();
                setMobileOpen(false);
              }}
              className="w-full justify-start text-base h-auto py-2"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="mr-2 h-4 w-4" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" /> Dark Mode
                </>
              )}
            </Button>

            <Link href="/menu/bucket" onClick={() => setMobileOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-base relative h-auto py-2"
              >
                <ShoppingCart size={18} className="mr-2" />
                View Cart
                {totalItems > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold leading-none">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {valid && user ? (
              <Link
                href={user.role === 'admin' ? '/admin' : '/profile'}
                onClick={() => setMobileOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base h-auto py-2"
                >
                  <UserCircle2 size={18} className="mr-2" />
                  {user.role === 'admin' ? 'Admin Dashboard' : 'My Profile'}
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signin" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base h-auto py-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base h-auto py-2"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

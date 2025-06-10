'use client';

import Link from 'next/link';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import {useSessions} from '@/contexts/UserContext';
import {cn} from '@/lib/utils';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const {user, valid} = useSessions();
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

  const navLinks = [
    {name: 'Menu', href: '/menu'},
    {name: 'Deals', href: '/deals'},
    {name: 'Locations', href: '/locations'},
    {name: 'About', href: '/about'}
  ];

  return (
    <header className="w-full border-b bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl text-nowrap font-bold text-primary">
            KFC Clone
          </h1>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden md:flex flex-col w-full items-center">
          <nav className="w-full flex justify-end items-center gap-6">
            {navLinks.map(({name, href}) => (
              <Link key={name} href={href}>
                <span
                  className={`text-sm font-medium hover:text-primary ${
                    pathname === href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {name}
                </span>
              </Link>
            ))}

            {user ? (
              <span className="text-sm font-semibold text-primary">
                {user.name}
              </span>
            ) : (
              <div className="flex items-center gap-3">
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
          {/* {path === '/menu' && (
            <nav className="w-full flex justify-end overflow-x-auto no-scrollbar mt-2">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className={cn(
                    'flex-shrink-0 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap',
                    'hover:border-primary',
                    'transition-colors',
                    'border-transparent'
                  )}
                >
                  {category.name}
                </a>
              ))}
            </nav>
          )} */}
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t shadow-inner">
          <div className="flex flex-col px-4 py-3 gap-2">
            {navLinks.map(({name, href}) => (
              <Link key={name} href={href} onClick={() => setMobileOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-base hover:bg-muted"
                >
                  {name}
                </Button>
              </Link>
            ))}

            {valid ? (
              <p className="text-primary font-semibold text-base px-2 mt-2">
                {user?.name}
              </p>
            ) : (
              <>
                <Link href="/signin" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base"
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

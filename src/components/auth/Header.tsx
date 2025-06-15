'use client';

import Link from 'next/link';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Menu, X, Sun, Moon} from 'lucide-react';
import {useTheme} from 'next-themes';
import {navLinks} from '@/data/data';

export default function AuthHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const {theme, setTheme} = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
        <div className="hidden md:flex flex-col w-full items-center">
          <nav className="w-full flex justify-end items-center gap-6">
            {navLinks.map(({name, href}) => (
              <Link key={name} href={href} prefetch>
                <span
                  className={`text-sm font-medium hover:text-primary ${
                    pathname === href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {name}
                </span>
              </Link>
            ))}
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

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </nav>
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
              <Link
                key={name}
                href={href}
                prefetch
                onClick={() => setMobileOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-base hover:bg-muted"
                >
                  {name}
                </Button>
              </Link>
            ))}

            {/* Theme Toggle (Mobile) */}
            <Button
              variant="ghost"
              onClick={() => {
                toggleTheme();
                setMobileOpen(false);
              }}
              className="w-full justify-start text-base"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" /> Dark Mode
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

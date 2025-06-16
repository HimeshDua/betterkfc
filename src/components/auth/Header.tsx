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
          </nav>
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
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-base h-auto py-2 hover:bg-muted"
                >
                  {name}
                </Button>
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
          </div>
        </div>
      )}
    </header>
  );
}

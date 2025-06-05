'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Icons} from './icons'; // Assuming Icons is correctly defined elsewhere
import {useState} from 'react';
import CartModal from '@/components/CartModal'; // Assuming CartModal is correctly defined
import {EyeClosed, MenuIcon, ShoppingCart, User} from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems] = useState([]); // In a real app, this would come from global state (e.g., Context, Redux)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Using a custom KFC logo image for authenticity */}
          <Image
            src="/images/kfc-logo.svg" // Replace with your KFC logo SVG/PNG
            alt="KFC Logo"
            width={70} // Adjust size as needed
            height={40} // Adjust size as needed
            priority
          />
          {/* <h1 className="text-2xl font-bold text-red-600 hidden md:block">KFC</h1> {/* Optional text if logo is just icon */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link href="/menu">
            <Button
              variant="ghost"
              className="text-lg font-semibold text-gray-700 hover:text-red-600"
            >
              Menu
            </Button>
          </Link>
          <Link href="/deals">
            <Button
              variant="ghost"
              className="text-lg font-semibold text-gray-700 hover:text-red-600"
            >
              Deals
            </Button>
          </Link>
          <Link href="/locations">
            <Button
              variant="ghost"
              className="text-lg font-semibold text-gray-700 hover:text-red-600"
            >
              Locations
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="ghost"
              className="text-lg font-semibold text-gray-700 hover:text-red-600"
            >
              About
            </Button>
          </Link>
          {/* Other navigation links can go here */}
        </nav>

        {/* Right-aligned actions (Order Start, Cart, Account) */}
        <div className="flex items-center space-x-4">
          {/* "Start Your Order" Button - Primary CTA */}
          <Link href="/menu">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold text-base hidden lg:flex items-center space-x-2 transition-all duration-300 shadow">
              {/* Assuming you have an 'Order' icon or use a standard one */}
              {/* <Icons.order className="w-5 h-5" /> */}
              <span>Start Your Order</span>
            </Button>
          </Link>

          {/* Cart Icon Button */}
          <Button
            variant="ghost"
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {/* Cart item count badge - dynamic in real app */}
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>

          {/* User Account/Profile Icon (Optional) */}
          <Link href="/profile">
            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 hidden md:block"
            >
              <User className="w-6 h-6 text-gray-700" />
            </Button>
          </Link>

          {/* Mobile Menu Toggle (Hamburger Icon) */}
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <EyeClosed className="w-6 h-6 text-gray-700" />
            ) : (
              <MenuIcon className="w-6 h-6 text-gray-700" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg absolute w-full left-0 animate-fade-in-down">
          <nav className="flex flex-col space-y-3">
            <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-gray-800 hover:bg-gray-100"
              >
                Menu
              </Button>
            </Link>
            <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-gray-800 hover:bg-gray-100"
              >
                Deals
              </Button>
            </Link>
            <Link href="/locations" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-gray-800 hover:bg-gray-100"
              >
                Locations
              </Button>
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-gray-800 hover:bg-gray-100"
              >
                About
              </Button>
            </Link>
            {/* Add more mobile-specific links here */}
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg text-gray-800 hover:bg-gray-100"
              >
                Account
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-lg text-gray-800 hover:bg-gray-100"
              onClick={() => {
                setCartOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Cart
            </Button>
            <Link href="/menu">
              {' '}
              {/* A prominent "Start Order" for mobile */}
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 mt-4 rounded-md font-semibold text-lg">
                Start Your Order
              </Button>
            </Link>
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

import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function Header() {
  return (
    <header className="border-b shadow-sm sticky top-0 z-50 bg-white dark:bg-background">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/">
          <h1 className="text-xl font-bold text-red-600">KFC Pakistan</h1>
        </Link>
        <nav className="space-x-4">
          <Link href="/menu">
            <Button variant="ghost">Menu</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div>
          <h4 className="text-lg font-semibold mb-2">KFC Pakistan</h4>
          <p className="text-sm">
            Fast food chain offering world-famous fried chicken.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p className="text-sm">Email: support@kfc.com.pk</p>
          <p className="text-sm">Phone: +92 21 111 532 532</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} KFC Pakistan. All Rights Reserved.
      </div>
    </footer>
  );
}

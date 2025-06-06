import Link from 'next/link';
import Image from 'next/image'; // Assuming you'll use Next.js Image component for icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-8 md:pb-12 border-b border-primary-foreground/20">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4">
              <Image
                src="/images/logo-2.svg"
                alt="KFC Pakistan Logo"
                width={80}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/kfcpakistanofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KFC Pakistan Facebook"
              >
                {/* Replace with actual social media icons (e.g., from Lucide React or your assets) */}
                <span className="sr-only">Facebook</span>{' '}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Image
                    src="/images/icons/facebook.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>
              <Link
                href="https://instagram.com/kfcpakistanofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KFC Pakistan Instagram"
              >
                <span className="sr-only">Instagram</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Image
                    src="/images/icons/instagram.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>
              <Link
                href="https://twitter.com/kfcpakistanofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KFC Pakistan Twitter"
              >
                <span className="sr-only">Twitter</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Image
                    src="/images/icons/twitter.svg"
                    alt="Twitter"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Column 2: Legal & Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:underline">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:underline">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:underline">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:underline">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: App Downloads & Contact */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold mb-3">Download App</h4>
            <div className="flex flex-col space-y-3 mb-6">
              <Link
                href="https://play.google.com/store/apps/details?id=com.kfc.pk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on Google Play"
              >
                <Image
                  src="/images/app-store-badges/google-play.svg"
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="w-32 h-auto"
                />
              </Link>
              <Link
                href="https://apps.apple.com/pk/app/kfc-pakistan/id123456789"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on Apple App Store"
              >
                <Image
                  src="/images/app-store-badges/app-store.svg"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="w-32 h-auto"
                />
              </Link>
            </div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm text-primary-foreground/80">
              <Link href="tel:+9221111532532" className="hover:underline">
                UAN: +92 21 111 532 532
              </Link>
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-xs text-primary-foreground/60 pt-6 mt-6 border-t border-primary-foreground/10">
          <p>&copy; {currentYear} KFC Pakistan. All Rights Reserved. </p>
          <p className="mt-1">Developed by Your Name/Company Name (Optional)</p>
        </div>
      </div>
    </footer>
  );
}

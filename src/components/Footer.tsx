import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary dark:bg-[#202020] text-primary-foreground py-10 md:py-14">
      <div className="container mx-auto px-4 space-y-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-10 border-b border-primary-foreground/20">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex justify-center md:justify-start">
              <h1 className="text-3xl italic text-nowrap font-bold text-primary relative">
                KFC
                <span className="absolute -bottom-1 -right-4 text-xs font-semibold text-muted-foreground tracking-wide">
                  better
                </span>
              </h1>
            </Link>
            <div className="flex gap-4">
              {[
                {
                  name: 'YouTube',
                  icon: 'youtube.svg',
                  link: 'https://youtube.com/kfcpakistan6047'
                },
                {
                  name: 'Instagram',
                  icon: 'instagram.svg',
                  link: 'https://instagram.com/kfcpakistanofficial'
                },
                {
                  name: 'Facebook',
                  icon: 'facebook.svg',
                  link: 'https://facebook.com/kfcpakistanofficial'
                }
              ].map(({name, icon, link}) => (
                <Link
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`KFC Pakistan ${name}`}
                  className="bg-primary-foreground text-primary rounded-full w-9 h-9 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Image
                    src={`/images/icons/${icon}`}
                    className="scale-75"
                    alt={name}
                    width={50}
                    height={50}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16">
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-primary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Store Locator
                </Link>
              </li>
              <li>
                <Link
                  href="/menu/bucket"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>

            <div className="space-y-3">
              <Link
                href="/terms-and-conditions"
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors block"
              >
                Terms & Conditions
              </Link>
              <div className="flex flex-col space-y-3 mt-4">
                <Link
                  href="https://apps.apple.com/pk/app/kfc-pakistan/id123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/footer/app-store.png"
                    alt="App Store"
                    width={120}
                    height={36}
                    className="w-auto h-9"
                  />
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.kfc.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/footer/play-store.png"
                    alt="Google Play"
                    width={120}
                    height={36}
                    className="w-auto h-9"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-center text-xs text-primary-foreground/60 pt-4 gap-2">
          <p>&copy; {currentYear} KFC. All rights reserved</p>
          <p className="text-primary font-semibold">
            Created by{' '}
            <a href="https://github.com/HimeshDua">
              <span className="underline hover:opacity-80 cursor-pointer">
                Himesh Dua
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

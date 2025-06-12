import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const developer = 'Himesh Dua'; // e.g., 'Developed by XYZ'

  return (
    <footer className="bg-primary text-primary-foreground py-10 md:py-14">
      <div className="container mx-auto px-4 space-y-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-primary-foreground/20 pb-10">
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/images/logo-2.svg"
                alt="KFC Pakistan Logo"
                width={100}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <div className="flex gap-3 mt-4">
              {[
                {
                  name: 'Facebook',
                  icon: 'facebook.svg',
                  link: 'https://facebook.com/kfcpakistanofficial'
                },
                {
                  name: 'Instagram',
                  icon: 'instagram.svg',
                  link: 'https://instagram.com/kfcpakistanofficial'
                },
                {
                  name: 'Twitter',
                  icon: 'twitter.svg',
                  link: 'https://twitter.com/kfcpakistanofficial'
                }
              ].map(({name, icon, link}) => (
                <Link
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`KFC Pakistan ${name}`}
                  className="bg-white rounded-full w-9 h-9 flex items-center justify-center hover:scale-105 transition"
                >
                  <Image
                    src={`/images/icons/${icon}`}
                    alt={name}
                    width={20}
                    height={20}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {['terms', 'privacy', 'disclaimer', 'careers'].map((path) => (
                <li key={path}>
                  <Link
                    href={`/${path}`}
                    className="hover:underline capitalize"
                  >
                    {path.replace('-', ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {[
                {name: 'About Us', href: '/about'},
                {name: 'Contact Us', href: '/contact'},
                {name: 'Our Menu', href: '/menu'},
                {name: 'Promotions', href: '/deals'},
                {name: 'Feedback', href: '/feedback'}
              ].map(({name, href}) => (
                <li key={name}>
                  <Link href={href} className="hover:underline">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App + Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Download App</h4>
            <div className="flex flex-col space-y-3 mb-6">
              <Link
                href="https://play.google.com/store/apps/details?id=com.kfc.pk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/app-store-badges/google-play.svg"
                  alt="Google Play"
                  width={130}
                  height={40}
                  className="w-32"
                />
              </Link>
              <Link
                href="https://apps.apple.com/pk/app/kfc-pakistan/id123456789"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/app-store-badges/app-store.svg"
                  alt="App Store"
                  width={130}
                  height={40}
                  className="w-32"
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

        {/* Bottom Section */}
        <div className="text-center text-xs text-primary-foreground/60 pt-4">
          <p>&copy; {currentYear} KFC Pakistan. All Rights Reserved.</p>
          {developer && <p className="mt-1">{developer}</p>}
        </div>
      </div>
    </footer>
  );
}

import {Separator} from '@/components/ui/separator';
import {ArrowLeft} from 'lucide-react';
import {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Better KFC Clone',
  description:
    'Learn how Better KFC Clone collects, uses, and protects your personal information. Your privacy and data security are our priority.',
  keywords: [
    'privacy policy',
    'data protection',
    'user privacy',
    'cookies',
    'KFC clone',
    'Better KFC',
    'customer data',
    'terms',
    'user agreement'
  ],
  authors: [{name: 'Himesh Dua', url: 'https://betterkfc.vercel.app'}],
  openGraph: {
    title: 'Privacy Policy | Better KFC Clone',
    description:
      'Understand how your data is handled at Better KFC Clone. We are committed to protecting your privacy and securing your information.',
    type: 'article',
    locale: 'en_US',
    url: 'https://betterkfc.vercel.app/privacy-policy',
    siteName: 'Better KFC Clone'
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Better KFC Clone',
    description:
      'Your privacy matters. Read how Better KFC Clone handles your data securely and transparently.',
    images: ['https://betterkfc.vercel.app/og-privacy.png'],
    creator: '@HimeshDua'
  },
  metadataBase: new URL('https://betterkfc.vercel.app')
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="sticky top-14 z-20 bg-background mb-2">
        <div className=" py-4 px-4 sm:px-6 md:py-6 flex items-center justify-center">
          <Link
            href="/"
            className="absolute left-4 p-2 rounded-full hover:bg-accent/20 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Privacy Policy
          </h1>
        </div>
        <Separator />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <section className="text-center mb-8">
          <p className="text-muted-foreground text-xs md:text-sm font-semibold">
            KFC CORPORATION PRIVACY POLICY — YOUR PRIVACY RIGHTS
          </p>
          <p className="text-muted-foreground text-xs md:text-sm font-semibold mt-1">
            EFFECTIVE DATE: JUNE 9, 2014
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            THIS PRIVACY POLICY APPLIES TO THE SITES
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            This Policy describes how we treat personal information both online
            and offline. This includes on our websites. It also includes in
            phone or email interactions you have with us.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            WE COLLECT INFORMATION FROM AND ABOUT YOU
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed pl-4">
            <li>
              <span className="font-semibold text-foreground">
                Contact information.
              </span>{' '}
              For example, we might collect your name and street address. We
              might also collect your phone number or email address.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Payment and billing information.
              </span>{' '}
              For example, we collect your credit card number and zip code when
              you buy one of our products. Information you submit or post. If
              you post content, apply for a job, or respond to a survey, we will
              collect the information you provide to us.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Demographic information.
              </span>{' '}
              We may collect information about our services you like or products
              you buy. We might collect this as part of a survey, for example.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Other information.
              </span>{' '}
              If you use our website, we may collect information about your
              computer location or the browser you're using. We might look at
              what site you came from, or what site you visit when you leave us.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            WE USE INFORMATION AS DISCLOSED AND DESCRIBED HERE
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed pl-4">
            <li>
              <span className="font-semibold text-foreground">
                We use information to respond to your requests or questions.
              </span>{' '}
              For example, we might use your information to confirm your
              registration for a program or contest, or fulfill prizes or
              premiums in a promotion. We may use your friend's email address if
              you send them features on our site.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                We use information to improve our products and services.
              </span>{' '}
              We might use your information to customize your experience with
              us. We may use your information to make our website and products
              better.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                We use information to look at site trends and customer
                interests.
              </span>{' '}
              We may use your information to make our website and products
              better. We may combine information we get from you with
              information about you we get from third parties.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                We use information for security purposes.
              </span>{' '}
              We may use information to protect our company, our customers, or
              our websites. For example, in the event of a breach, we may use
              your contact information to contact you about that incident.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                We use information for marketing purposes.
              </span>{' '}
              For example, we might send you information about special
              promotions or offers. We might also tell you about new features or
              products. These might be our own offers or products, or
              third-party offers or products we think you might find
              interesting. To learn about your choices for these communications,
              read the choices section below.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                We use information to send you transactional communications.
              </span>{' '}
              For example, we might send you emails about a purchase you made
              with us. We might also contact you about this policy or our
              website terms.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                We use information as otherwise permitted by law.
              </span>
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            YOU HAVE CERTAIN CHOICES ABOUT HOW WE USE YOUR INFORMATION
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              You can opt out of receiving our marketing emails. To stop
              receiving our promotional emails, send a request to{' '}
              <Link
                href="mailto:customercare@kfcpakistan.com"
                className="text-primary hover:underline"
              >
                customercare@kfcpakistan.com
              </Link>{' '}
              or follow the instructions in any promotional message you get from
              us. It may take about ten (10) days to process your request. Don't
              worry! Even if you opt out of getting marketing messages, we will
              still be sure to send you transactional messages. For example, we
              may still contact you about your orders.
            </p>
            <p>
              You can control if we share information with third parties for
              their marketing purposes. To opt out of having us share your
              information with third parties for their promotional purposes,
              click{' '}
              <Link href="#" className="text-primary hover:underline">
                here
              </Link>
              .
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            YOU CAN GET YOUR ACCOUNT INFORMATION UPDATED OR DELETED
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Any information that you want us to change or delete, for
              instance, your email address, can be requested by you. These
              requested changes will be made only after your consent, and we
              will update you regarding them. For any such requests you can
              always contact us on our support email i.e.{' '}
              <Link
                href="mailto:customercare@kfcpakistan.com"
                className="text-primary hover:underline"
              >
                customercare@kfcpakistan.com
              </Link>
              .
            </p>
            <p className="font-semibold text-foreground">
              If you want to delete your Facebook social login account from KFC
              Web & Apps, you can remove your information by following these
              steps:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>
                Go to your Facebook Account&apos;s Setting & Privacy. Click
                “Settings”.
              </li>
              <li>
                Look for “Apps and Websites” and you will see all of the apps
                and websites you linked with your Facebook.
              </li>
              <li>Search and Click “KFC” in the search bar.</li>
              <li>Scroll and click “Remove”.</li>
              <li>
                Congratulations, you have successfully removed your app
                activities and data from the KFC platform.
              </li>
            </ol>
            <p>
              Once your account has been deleted after your approval, you will
              lose all the information associated with that account e.g.
              Addresses, Past Orders.
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            CHILDREN'S PRIVACY
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Our sites are meant for adults. We do not knowingly collect
              personally identifiable information from children under 13 without
              permission from a parent or guardian. If you are a parent or legal
              guardian and think your child under 13 has given us information,
              you can email us{' '}
              <Link
                href="mailto:customercare@kfcpakistan.com"
                className="text-primary hover:underline"
              >
                here
              </Link>
              . You can also write to us at the address listed at the end of
              this policy. Please mark your inquiries "COPPA Information
              Request."
            </p>
            <p>
              Parents, you can also learn more about how to protect children's
              privacy online{' '}
              <Link
                href="https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                here
              </Link>
              .
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            CHANGES TO THIS POLICY
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              From time to time we may change our privacy practices. We will
              notify you of any material changes to this policy as required by
              law. We will also post an updated copy on our website. Please
              check our site periodically for updates.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

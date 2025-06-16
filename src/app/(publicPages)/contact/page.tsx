import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

export default function ContactUsPage() {
  return (
    <div className="bg-background text-foreground min-h-[calc(100vh-64px)]">
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
            Contact Us
          </h1>
        </div>
        <Separator />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl space-y-12 md:space-y-16">
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
            Get In Touch With KFC Pakistan
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Whether you have a question, feedback, or just want to say hello,
            we're here to help. Reach out to our teams at the respective offices
            or our central helpline.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border border-border rounded-xl p-5 shadow-md flex flex-col items-start text-left hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0 mb-3 w-full">
              <CardTitle className="text-xl font-semibold text-primary">
                Head Office
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow w-full space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span>{' '}
                <a
                  href="tel:02135877976"
                  className="text-primary hover:underline"
                >
                  0213-5877976
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Location:</span>{' '}
                Ocean Tower, 20th Floor, G-3, Block -9, Scheme 5, Main Clifton
                Road, Karachi, Pakistan
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-xl p-5 shadow-md flex flex-col items-start text-left hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0 mb-3 w-full">
              <CardTitle className="text-xl font-semibold text-primary">
                Regional Office Lahore
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow w-full space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span>{' '}
                <a
                  href="tel:04235884570"
                  className="text-primary hover:underline"
                >
                  042-35884570
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Location:</span>{' '}
                27-A Ali Block New Garden Town Opposite Barkat Market Lahore
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-xl p-5 shadow-md flex flex-col items-start text-left hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0 mb-3 w-full">
              <CardTitle className="text-xl font-semibold text-primary">
                Regional Office Islamabad
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow w-full space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span>{' '}
                <a
                  href="tel:0512726877"
                  className="text-primary hover:underline"
                >
                  0512726877
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Location:</span>{' '}
                United Bakery Building, 11، School Rd, F-6 Markaz F-6,
                Islamabad, Islamabad Capital Territory 44000
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-xl p-5 shadow-md flex flex-col items-start text-left hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0 mb-3 w-full">
              <CardTitle className="text-xl font-semibold text-primary">
                Helpline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow w-full space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">UAN:</span>{' '}
                <a
                  href="tel:111532532"
                  className="text-primary hover:underline"
                >
                  111 532 532
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-xl p-5 shadow-md flex flex-col items-start text-left hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0 mb-3 w-full">
              <CardTitle className="text-xl font-semibold text-primary">
                Complaints Email
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow w-full space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span>{' '}
                <a
                  href="mailto:customercare@kfcpakistan.com"
                  className="text-primary hover:underline"
                >
                  customercare@kfcpakistan.com
                </a>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

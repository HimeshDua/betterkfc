import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Frown} from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[94vh] flex flex-col items-center justify-center text-center px-4">
      <div className="flex flex-col items-center gap-4">
        <Frown className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-4xl font-bold text-primary">404 - Not Found</h2>
        <p className="text-muted-foreground text-lg">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link href="/menu" passHref>
          <Button size="lg" className="mt-4">
            🍗 Back to Menu
          </Button>
        </Link>
      </div>
    </main>
  );
}

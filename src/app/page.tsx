import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-5xl font-bold text-red-600">KFC Pakistan</h1>
      <p className="text-muted-foreground text-lg">
        Crispy chicken, spicy burgers, and your favorite meals — all here.
      </p>
      <div className="space-x-4">
        <Link href="/menu">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            View Menu
          </Button>
        </Link>
        <Link href="/cart">
          <Button variant="outline">View Cart</Button>
        </Link>
      </div>
    </section>
  );
}

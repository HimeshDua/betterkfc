import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[94vh] text-center">
      <h2 className="text-3xl text-accent-foreground ">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </main>
  );
}

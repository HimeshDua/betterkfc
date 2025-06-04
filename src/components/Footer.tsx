export default function Footer() {
  return (
    <footer className="border-t bg-muted text-muted-foreground py-4 text-center">
      <p>
        &copy; {new Date().getFullYear()} KFC Pakistan. All rights reserved.
      </p>
    </footer>
  );
}

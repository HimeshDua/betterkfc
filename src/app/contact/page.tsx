import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';

export default function ContactPage() {
  return (
    <form className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Contact Us</h2>
      <Input placeholder="Your Name" />
      <Input placeholder="Your Email" type="email" />
      <Textarea placeholder="Your Message" />
      <Button className="bg-red-600 text-white">Send Message</Button>
    </form>
  );
}

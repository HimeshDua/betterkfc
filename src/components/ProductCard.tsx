import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';

export default function ProductCard({
  name,
  price,
  // image,
  onAdd
}: {
  name: string;
  price: number;
  // image: string;
  onAdd: () => void;
}) {
  return (
    <Card className="w-full max-w-xs shadow-lg">
      <CardHeader className="text-center font-semibold text-lg">
        {name}
      </CardHeader>
      <CardContent>
        <Image
          src={
            'https://www.kfcpakistan.com/images/08873930-3f62-11f0-87c6-c7cd48868ce1-Webbanner_desktop_image-2025-06-02033113.jpg'
          }
          alt={name}
          className="rounded-xl w-full h-40 object-cover"
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold text-red-600">PKR {price}</span>
        <Button size="sm" onClick={onAdd}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

// -------- components/ProductCard.tsx --------
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

export default function ProductCard({
  name,
  price,
  image
}: {
  name: string;
  price: number;
  image: string;
}) {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="text-center font-semibold text-lg">
        {name}
      </CardHeader>
      <CardContent>
        <img
          src={image}
          alt={name}
          className="rounded-xl w-full h-40 object-cover"
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold text-red-600">PKR {price}</span>
        <Button size="sm">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

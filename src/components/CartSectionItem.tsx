// 'use client';

// import Image from 'next/image';
// import React from 'react';
// import {Button} from './ui/button';
// import {useCart} from '@/contexts/CartContext';
// import {Card, CardContent} from '@/components/ui/card';
// import {ScrollArea} from '@/components/ui/scroll-area';

// function CartSectionItem() {
//   const {cart, setCart, removeFromCart} = useCart();

//   const updateValue = (itemId: string, delta: number) => {
//     const updatedCart = cart
//       .map((i) =>
//         i.slug === itemId
//           ? {...i, quantity: Math.max(0, (i.quantity ?? 1) + delta)}
//           : i
//       )
//       .filter((i) => (i.quantity ?? 0) > 0);
//     setCart(updatedCart);
//   };

//   return (
//     <ScrollArea className="h-[55vh] space-y-4 p-4">
//       {cart.length === 0 ? (
//         <Card>
//           <CardContent>
//             <p className="text-muted-foreground text-center">
//               Your bucket is empty.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         cart.map((item) => (
//           <Card key={item.slug} className="overflow-hidden">
//             <CardContent className="flex items-center justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <Image
//                   height={50}
//                   width={50}
//                   alt={item.name}
//                   src={item.image}
//                   className="rounded object-cover w-12 h-12"
//                 />
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <div className="flex gap-x-2 text-lg font-semibold text-muted-foreground">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={() => updateValue(item.slug, -1)}
//                     >
//                       -
//                     </Button>
//                     <span className="inline-block w-4 text-center">
//                       {item.quantity ?? 1}
//                     </span>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={() => updateValue(item.slug, 1)}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <p className="font-semibold text-sm text-muted-foreground">
//                   Rs {item.price ?? 0}
//                 </p>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => removeFromCart(item.slug)}
//                 >
//                   Remove
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </ScrollArea>
//   );
// }

// export default CartSectionItem;

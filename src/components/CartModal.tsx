'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {ProductInterface} from '@/types/global-types';
import Link from 'next/link';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  items: ProductInterface[];
}

export default function CartModal({open, onClose, items}: CartModalProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md sm:max-w-lg px-4 sm:px-6 py-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Your Cart</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">
              Your cart is empty.
            </p>
          ) : (
            items.map((item: ProductInterface, idx: number) => (
              <div key={`${item.slug}-${idx}`}>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-medium text-sm sm:text-base">
                      {item.name}
                    </span>
                    <span className="bg-muted text-muted-foreground text-xs rounded-full px-2 py-0.5">
                      x{item.quantity}
                    </span>
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">
                    PKR {item.price * (item.quantity ?? 1)}
                  </span>
                </div>
                <Separator className="my-2" />
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-base sm:text-lg font-semibold">
            Total: PKR {total}
          </span>

          <Button
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
            asChild
          >
            <Link href="/menu/bucket">Checkout</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Separator} from './ui/separator';
import {ProductInterface} from '@/types/global-types';

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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty.
            </p>
          ) : (
            items.map((item: ProductInterface, idx: number) => (
              <>
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className="ml-2 bg-gray-200 text-xs rounded-full px-2 py-0.5">
                      x{item.quantity}
                    </span>
                  </div>
                  <span>PKR {item.price * (item.quantity ?? 1)}</span>
                </div>
                <Separator />
              </>
            ))
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-lg font-bold">Total: PKR {total}</span>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Checkout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

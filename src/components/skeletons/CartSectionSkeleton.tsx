'use client';
import React from 'react';
import {Button} from '../ui/button';
import {Skeleton} from '../ui/skeleton';

const CartSectionSkeleton = () => {
  return (
    <aside className="w-full lg:w-1/4 flex-shrink-0 lg:sticky lg:top-[190px] h-[75vh] p-4 bg-background rounded-xl shadow-xl border animate-pulse">
      <h2 className="text-2xl font-bold mb-6 text-primary">🧺 Your Bucket</h2>

      <section className="overflow-y-auto h-[55vh] space-y-4 pr-1">
        {Array.from({length: 3}).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-3 rounded-lg border hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded object-cover" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-4" />
                  <Skeleton className="h-6 w-6 rounded" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-16 rounded" />
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-between items-start mt-6 border-t pt-4">
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Button disabled className="ml-4 opacity-60">
          View Bucket
        </Button>
      </div>
    </aside>
  );
};

export default CartSectionSkeleton;

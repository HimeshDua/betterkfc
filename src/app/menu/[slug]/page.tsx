import React from 'react';

async function page({params}: {params: Promise<{slug: string}>}) {
  return <div>page: {(await params).slug}</div>;
}

export default page;

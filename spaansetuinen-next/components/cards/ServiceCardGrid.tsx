import React from 'react';
import ServiceCard from './ServiceCard';
import Image from 'next/image';

const cards = [
  {
    title: 'Douglas steigerhouten bloembakken',
    description: 'Met de hand gemaakte bloembakken van duurzaam Douglas steigerhout, op maat geleverd.',
    image: '/images/impressie__content__01.jpg'
  },
  {
    title: 'Bloembakken voor beplanting',
    description: 'Compleet geleverd met mediterrane potgrond en Franse boomschors.',
    image: '/images/impressie__content__02.jpg'
  },
  {
    title: 'Prijzen bloembakken',
    description: 'Overzichtelijke prijstabellen voor onze bloembakken.',
    image: '/images/impressie__content__03.jpg'
  },
  {
    title: 'Douglas steigerhouten statafel',
    description: 'Statafel met palmboom als natuurlijke blikvanger.',
    image: '/images/impressie__content__04.jpg'
  }
];

export default function ServiceCardGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((c) => (
        <ServiceCard
          key={c.title}
          icon={c.image}
          title={c.title}
          description={c.description}
        />
      ))}
    </section>
  );
}

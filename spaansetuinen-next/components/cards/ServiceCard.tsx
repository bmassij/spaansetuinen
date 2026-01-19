import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  icon: React.ReactNode | StaticImageData;
  title: string;
  description: string;
}

function isStaticImage(obj: any): obj is StaticImageData {
  return obj && typeof obj === 'object' && 'src' in obj;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <article className={styles.card} aria-label={title}>
      <div className={styles.iconWrap}>
        {isStaticImage(icon) ? (
          <Image src={icon} alt={title} className={styles.icon} />
        ) : (
          <div className={styles.icon}>
            {icon as React.ReactNode}
          </div>
        )}
      </div>

      <h3 className={styles.title} title={title}>
        {title}
      </h3>

      <p className={styles.description}>
        {description}
      </p>
    </article>
  );
}

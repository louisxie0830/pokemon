'use client';
import styles from '@/styles/Type.module.css';

export default function Type({ type }: any) {
  return (
    <button
      className={`${styles.type} ${styles[type]} ${styles.label} ${styles.tooltip}`}
      data-tip={type}
    />
  );
}

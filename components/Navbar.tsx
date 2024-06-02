'use client';
import styles from '@/styles/Navbar.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function Navbar({ number }: any) {
  const generateLower = (num: number) => {
    let lower = num - 4;

    if (num - 4 < 0) lower = 1;
    if (num + 5 > 898) lower -= num + 5 - 898;

    return lower;
  };

  const [lower, setLower] = useState(generateLower(number));
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    setLower(generateLower(number));
  }, [number]);

  useEffect(() => {
    const nums = new Array(10);
    for (let i = 0; i != 10; i++) nums[i] = lower + i;

    setLinks(nums);
  }, [number, lower]);

  const handleLeft = () => {
    if (lower < 2) return;
    setLower((lwr) => lwr - 1);
  };

  const handleRight = () => {
    if (lower + 10 > 898) return;
    setLower((lwr) => lwr + 1);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <BsChevronLeft className={styles.arrow} onClick={handleLeft} />
        {links.map((link, idx) => (
          <Link key={idx} href={`/dex/${link}`}>
            <div
              className={`${styles.link} ${link === number && styles.active}`}
            >
              {String(link).padStart(3, '0')}
            </div>
          </Link>
        ))}
        <BsChevronRight className={styles.arrow} onClick={handleRight} />
      </div>
    </nav>
  );
}

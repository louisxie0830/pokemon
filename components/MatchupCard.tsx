'use client';

import styles from '@/styles/Matchup.module.css';
import getMatchups from '@/lib/matchups';
import { Key, useState } from 'react';
import Type from './Type';

const TypeBadge = ({ name, multiplier }: any) => {
  let padding = '1rem';
  if (multiplier === 0.5) padding = '0.5rem';
  if (multiplier < 0.5 && multiplier !== 0) padding = '0.4rem';

  return (
    <div className={styles.typeContainer}>
      <Type type={name} />
      <span style={{ paddingRight: padding }} className={styles.typeValue}>
        {multiplier}x
      </span>
    </div>
  );
};

const Category = ({ name, types }: any) => {
  return (
    <div>
      <div className={styles.category}>{name}</div>
      <div className={styles.types}>
        {types.map(
          (type: { [x: string]: any }, idx: Key | null | undefined) => {
            let name = Object.keys(type)[0];

            return <TypeBadge key={idx} name={name} multiplier={type[name]} />;
          },
        )}
      </div>
    </div>
  );
};

export default function MatchupCard({ types }: any) {
  const [matchups, setMatchups] = useState(getMatchups(types));
  return (
    <div className={styles.container}>
      <div className={styles.header}>Type Matchups</div>

      <div className={styles.card}>
        {matchups.immuneTo.length !== 0 && (
          <Category name="Immune to," types={matchups.immuneTo} />
        )}

        {matchups.resistantTo.length !== 0 && (
          <Category name="Resistant to," types={matchups.resistantTo} />
        )}

        {matchups.weakTo.length !== 0 && (
          <Category name="Weak to," types={matchups.weakTo} />
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { getPalette } from '@/lib/palette';
import { getAbilities, getName } from '@/lib/pokemon';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import styles from '@/styles/Pokemon.module.css';
import Navbar from './Navbar';
import Type from './Type';
import EvolutionCard from './EvolutionCard';
import StatsCard from './StatsCard';
import MatchupCard from './MatchupCard';
import { useRouter } from 'next/router';

type abilitesType = {
  isHidden: boolean;
  name: string;
};

export default function PokemonDataPage({ number, pokemonData }: any) {
  const router = useRouter();
  const [vibrantColor, setVibrantColor] = useState<string>('#FFFFFF');
  const [abilities, setAbilities] = useState<abilitesType[]>([]);
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemonNo, setPokemonNo] = useState<string>('');

  useEffect(() => {
    (async () => {
      const bgColor = await getPalette(pokemonData.sprites.home_front);
      setVibrantColor(bgColor);
      document.body.style.backgroundColor = bgColor;
    })();
  }, [pokemonData]);

  useEffect(() => {
    setAbilities(getAbilities(pokemonData.abilities));
  }, [pokemonData]);

  useEffect(() => {
    setPokemonName(getName(pokemonData.species.name));
  }, [pokemonData]);

  useEffect(() => {
    setPokemonNo(number);
  }, [number]);

  const handlePrev = () => {
    if (Number(number) === 1) return;
    else router.push(`/dex/${Number(number) - 1}`);
  };

  const handleNext = () => {
    if (Number(number) === 898) return;
    else router.push(`/dex/${Number(number) + 1}`);
  };

  const handlers = useSwipeable({
    onSwipedRight: () => handlePrev(),
    onSwipedLeft: () => handleNext(),

    delta: 170,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  });

  return (
    <>
      <Navbar number={Number(pokemonNo.slice(1))} />
      <div {...handlers}>
        <main className={styles.main}>
          <div className={styles.row}>
            <section className={styles.meta}>
              <div className={styles.identifier}>
                <div>
                  <div className={styles.dexId}>{pokemonNo}</div>
                  <div className={styles.name}>{pokemonName}</div>
                  <div className={styles.category}>{pokemonData.category}</div>
                </div>

                <div className={styles.types}>
                  {pokemonData.type.map(
                    (type: { type: { name: any } }, idx: any) => (
                      <Type key={idx} type={type.type.name} />
                    ),
                  )}
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.card}>
                  <div>
                    <span className={styles.key}>Height</span>{' '}
                    <div>{pokemonData.height / 10}m</div>
                  </div>
                  <div>
                    <span className={styles.key}>Weight</span>{' '}
                    <div>{pokemonData.weight / 10}kg</div>
                  </div>
                  <div>
                    <span className={styles.key}>Abilities</span>{' '}
                    <div className={styles.abilities}>
                      {abilities.map((ability, idx) => (
                        <span className={styles.ability} key={idx}>
                          {ability.name}{' '}
                          {ability.isHidden && (
                            <span className={styles.abilityHidden}>
                              (Hidden)
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.art}>
              <div>
                <Image
                  className={styles.image}
                  alt={pokemonName}
                  src={pokemonData.sprites.official_artwork}
                  height="475"
                  width="475"
                />
              </div>
            </section>
          </div>
        </main>

        <main className={styles.main}>
          <EvolutionCard
            chain={pokemonData.evolutionChain}
            color={vibrantColor}
          />
        </main>

        <main className={styles.main}>
          <div className={styles.row}>
            <StatsCard stats={pokemonData.stats} />
            <MatchupCard types={pokemonData.type} />
          </div>
        </main>
      </div>
    </>
  );
}

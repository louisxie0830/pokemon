import { getHomeSprite, getPokemonData } from '@/lib/pokemon';
import PokemonDataPage from '@/components/PokemonDataPage';
import { Metadata } from 'next';


type PageProps = {
  params: {
    number: string;
  };
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const dexNo = params.number;
  const pokemonData = await getPokemonData(dexNo);
  const pokemonName = pokemonData.name;

  return {
    title: `${dexNo} | ${pokemonName} | ToxaDex`,
    icons: {
      icon: getHomeSprite(dexNo),
    },
  };
}

export default async function Homepage({ params }: PageProps) {
  const pokemonData = await getPokemonData(params.number);

  return <PokemonDataPage number={params.number} pokemonData={pokemonData} />;
}

export async function generateStaticParams() {
  return [...Array(898).keys()].map((_, id) => ({
    params: { number: String(id + 1) },
  }));
}

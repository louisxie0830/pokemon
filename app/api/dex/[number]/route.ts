import { getPokemonData } from '@/lib/pokemon';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { number: string } }) {
    const { number } = params;

    if (!number) {
        return NextResponse.json({ error: 'Invalid Pokémon number' }, { status: 400 });
    }

    try {
        const data = await getPokemonData(number);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
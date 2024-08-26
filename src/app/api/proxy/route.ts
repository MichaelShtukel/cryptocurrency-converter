import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const buyCurrency = searchParams.get('buyCurrency');
  const sellCurrency = searchParams.get('sellCurrency');

  if (!buyCurrency || !sellCurrency) {
    return NextResponse.json({ error: 'No params provided' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://api.coingate.com/api/v2/rates/trader/buy/${buyCurrency}/${sellCurrency}`);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return NextResponse.json({ error: 'Ошибка при получении данных из внешнего API' }, { status: 500 });
  }
}

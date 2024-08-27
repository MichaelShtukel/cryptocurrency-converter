import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface Client {
  id: string
  buyCurrency: string
  sellCurrency: string
  exchangeRate: string
  controller: ReadableStreamDefaultController
}

// быстро написанное решение, чтобы заимплементить real-time через SSE
class ExchangeRatesRequester {
  clients: Client[] = []
  intervalId: any = ''

  constructor() {
  }

  addClient(client: Client) {
    this.clients.push(client)
  }

  removeClient(clientId: string) {
    this.clients = this.clients.filter(client => client.id !== clientId);
  }

  async updateExchangeRate(buyCurrency: string, sellCurrency: string) {
    try {
      const response = await axios.get(`https://api.coingate.com/api/v2/rates/trader/buy/${buyCurrency}/${sellCurrency}`);

      return response.data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  updateExchangeRates() {
    Promise.all(
      this.clients.map(client =>
        this.updateExchangeRate(client.buyCurrency, client.sellCurrency))
    ).then(res => {
      this.clients = this.clients.map((client, index) => ({
        ...client,
        exchangeRate: res[index],
      }))
      this.clients.forEach(client => {
        client.controller.enqueue(`data: ${client.exchangeRate}\n\n`)
      })
    });
  }

  start() {
    this.intervalId = setInterval(() => this.updateExchangeRates(), 60000)
  }

  // надо как то красиво глушить и перезапускать это
  stop() {
    clearInterval(this.intervalId);
  }
}

// и запускать тоже надо красиво, не так
const exchangeRatesRequester = new ExchangeRatesRequester();
exchangeRatesRequester.start()

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const buyCurrency = searchParams.get('buyCurrency');
  const sellCurrency = searchParams.get('sellCurrency');

  if (!buyCurrency || !sellCurrency) {
    return NextResponse.json({error: 'No params provided'}, {status: 400});
  }

  try {
    const clientId = req.cookies.get('clientId')?.value || `${Math.random()}; ` + req.cookies.toString()
    const rate = await exchangeRatesRequester.updateExchangeRate(buyCurrency, sellCurrency);
    exchangeRatesRequester.removeClient(clientId)

    return new Response(
      new ReadableStream({
        start(controller) {
          exchangeRatesRequester.addClient({
            id: clientId,
            buyCurrency,
            sellCurrency,
            exchangeRate: rate,
            controller,
          })

          controller.enqueue(`data: ${rate}\n\n`);

          req.signal.onabort = () => {
            exchangeRatesRequester.removeClient(clientId)
            controller.close();
          };
        },
      }),
      {
        headers: {
          Connection: "keep-alive",
          "Content-Encoding": "none",
          "Cache-Control": "no-cache, no-transform",
          "Content-Type": "text/event-stream; charset=utf-8",
          'Set-Cookie': `clientId=${clientId}`,
        }
      }
    );
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return NextResponse.json({error: 'Ошибка при получении данных из внешнего API'}, {status: 500});
  }
}

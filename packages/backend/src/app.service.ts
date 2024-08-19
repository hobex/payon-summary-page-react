import { Injectable } from '@nestjs/common';
// use got because of corporate proxy issues with axios
import got, { Options } from 'got';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Injectable()
export class AppService {
  async createCheckout(): Promise<string> {
    // create checkout
    const data = new URLSearchParams();
    data.append('entityId', process.env.ENTITY_ID);
    data.append('amount', '1.00');
    data.append('currency', 'EUR');
    data.append('paymentType', 'DB');
    data.append(
      'customParameters[SHOPPER_ResultUrl]', // INFO: this is the actual return url after payment!
      'http://localhost:3000/result',
    );

    const config: Options = {
      headers: {
        Authorization: process.env.TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
      responseType: 'json',
    };
    if (process.env.HTTP_PROXY)
      config.agent = { https: new HttpsProxyAgent(process.env.HTTP_PROXY) };

    const res: any = await got.post(
      `${process.env.OPPWA_URL}/v1/checkouts`,
      config,
    );
    const checkout: any = res.body;

    return checkout.id;
  }
}

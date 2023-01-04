import { ServerRespond } from './DataStreamer';

export interface Row {
  // stock: string,
  // top_ask_price: number,
  timestamp: Date,
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const price_of_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const price_of_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = price_of_abc/price_of_def;
    const upper_bound_val = 1+.1;
    const lower_bound_val = 1-.1;
    return {
      price_abc: price_of_abc,
      price_def: price_of_def,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
        serverResponds[0].timestamp : serverResponds[1].timestamp,
      upper_bound: upper_bound_val,
      lower_bound: lower_bound_val,
      trigger_alert: (ratio > upper_bound_val || ratio < lower_bound_val) ? ratio : undefined,
    };
  }
}

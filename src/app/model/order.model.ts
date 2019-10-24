import {Client} from './client.model';
import {ItemProduct} from './item-product.model';

export class Order {

  constructor(){
      this.client = new Client('inconnu');
  }
  public id       : number;
  public client   : Client;
  public products : Array<ItemProduct> = [];
  public totalAmount : number;
  public date     :  Date;
}

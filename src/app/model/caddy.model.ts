import {ItemProduct} from './item-product.model';
import {Client} from './client.model';

export class Caddy{

  constructor(name:string){
      this.name = name;
      this.items = new Map();
      this.client = new Client('inconnu');
  }

  public name:string;   // nom du caddy 1,2,3...

  public items : Map<number,ItemProduct>; // liste des infos requises par produits (nom,prix,qté)

  public client:Client; // client qui effectue la commande

  public display():string{
      return 'name of caddy : ' + this.name + ' name of customer : ' + this.client.name;
  }

}

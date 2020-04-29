import { ItemProduct } from '../model/item-product.model';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { AuthenticationService } from './authentication.service';
import { Caddy } from '../model/caddy.model';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})

export class CaddyService {
  public caddy: Caddy;

  constructor(private authService: AuthenticationService) {
    let cad = localStorage.getItem("myCaddy");   // on vérifie si on a un caddy déjà existant en LS

    if (cad) {
      this.caddy = JSON.parse(cad);   //Si oui, on le récupère
    }
    else {
      this.caddy = new Caddy('myCaddy');  //sinon on le crée
    }
  }

  //methode permettant d'ajouter, tout au long de la navigation, un produit à un caddy
  public addProductToCaddy(p: Product): void {
    let item: ItemProduct = undefined;

    item = this.caddy.items[p.id];    //récupère l'ItemProduct correspondant à l'id du produit p

    if (item === undefined) {        //on regarde s'il n'existe pas déjà dans notre caddy
      item = new ItemProduct();     //il faut donc le créer
      item.id = p.id;
      item.name = p.name;
      item.price = p.currentPrice;
      item.quantity = p.quantity;

      this.caddy.items[item.id] = item;
    }
    else {
      item.quantity += p.quantity;  //sinon juste augmenter la quantité           ????????????????
    }
  }

  public removeProduct(id: number): void {
    delete this.caddy.items[id];
    this.saveCaddy();
    //ToDO trouver un moyen de supprimer aussi l'affichage dans la barre de nav
  }

  public addProduct(product: Product) {
    this.addProductToCaddy(product)     //une fois le caddy modifié
    this.saveCaddy();                   //mise à jour du local storage
  }

  /* public loadCaddyFromLocalStorage(){
        let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.userAuthenticated.username);
        this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
        this.listCaddies.forEach(c=>{
          let cad=localStorage.getItem("myCaddy_"+this.authService.userAuthenticated.username+"_"+c.name);
          this.caddies[c.name]=cad==undefined?new Caddy(c.name):JSON.parse(cad);
        })
   }*/

  public getCaddy(): Caddy {
    return this.caddy;
  }

  saveCaddy() {
    //localStorage.setItem("myCaddy_"+this.authService.userAuthenticated.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
    localStorage.setItem('myCaddy', JSON.stringify(this.caddy));
  }

  getSize() {
    //let caddy=this.caddies[this.currentCaddyName];
    return Object.keys(this.caddy.items).length;
  }

  emptyCaddy() {
    //this.caddies=new Map();
    //this.listCaddies=[];
  }

  getTotalCurrentCaddy() {    // renvoi le totale de la commande en cour
    let total = 0;
    
    for(let m in this.caddy.items){
      let p = this.caddy.items[m];
      total += p.price * p.quantity;
    }
   /* this.caddy.items.forEach(function(key: ItemProduct){
      total += key.price * key.quantity;
      console.log(key);
    });*/ 
    
    return total;
  }

  removeCaddyFromStorage() {
    this.caddy = new Caddy('myCaddy');
    localStorage.removeItem('myCaddy');
  }

  /* addNewCaddy(c: { num: number; name: string }) {
     this.listCaddies.push(c);
     this.caddies[c.name]=new Caddy(c.name);
     localStorage.setItem("ListCaddies_"+this.authService.userAuthenticated.username,JSON.stringify(this.listCaddies));
   }*/

  setClient(client: Client) {
    this.caddy.client = client;
    this.saveCaddy();
  }
}

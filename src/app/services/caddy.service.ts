import {ItemProduct} from '../model/item-product.model';
import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {AuthenticationService} from './authentication.service';
import {Caddy} from '../model/caddy.model';
import {Client} from '../model/client.model';

@Injectable({
  providedIn: 'root'
})

export  class CaddyService{
   public caddy : Caddy;

   constructor(private authService:AuthenticationService){
     let cad = localStorage.getItem("myCaddy");

     if(cad){
          this.caddy = JSON.parse(cad);
     }
     else {
          this.caddy = new Caddy('myCaddy');
          //console.log(this.caddy);
     }
  }

  //methode permettant d'ajouter, tout au long de la navigation, un produit à un caddy
  public addProductToCaddy(p:Product):void{
    let item=this.caddy.items[p.id];    //récupère l'ItemProduct correspondant à l'id du produit p
    if(item===undefined) {        //on regarde s'il n'existe pas déjà dans notre caddy
      item=new ItemProduct();     //il faut donc le créer
      item.id=p.id;
      item.name=p.name;
      item.price=p.currentPrice;
      item.quantity=p.quantity;
      //caddy.items[p.id]=item;     //puis le rajouter au caddy courant
      this.caddy.items.set(p.id,item);
    }
    else{
      item.quantity+=p.quantity;  //sinon juste augmenter la quantité
    }
  }

  public removeProduct(id:number):void{
    this.caddy.items.delete(id);
  }

 public addProduct(product:Product){
    this.addProductToCaddy(product)
    this.saveCaddy();
  }

 /* public loadCaddyFromLocalStorage(){
       let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.userAuthenticated.username);
       this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
       this.listCaddies.forEach(c=>{
         let cad=localStorage.getItem("myCaddy_"+this.authService.userAuthenticated.username+"_"+c.name);
         this.caddies[c.name]=cad==undefined?new Caddy(c.name):JSON.parse(cad);
       })
  }*/

  public getCaddy():Caddy{
    return this.caddy;
  }

  saveCaddy() {
    //localStorage.setItem("myCaddy_"+this.authService.userAuthenticated.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
    localStorage.setItem('myCaddy',JSON.stringify(this.caddy));
  }

  getSize(){
    //let caddy=this.caddies[this.currentCaddyName];
    //return Object.keys(caddy.items).length;
  }

  emptyCaddy(){
    //this.caddies=new Map();
    //this.listCaddies=[];
  }

  getTotalCurrentCaddy() {
    //let caddy=this.caddies[this.currentCaddyName];    //renvoi le caddy courant
    let total=0;
    this.caddy.items.forEach((key : ItemProduct)=>{
      total+=key.price*key.quantity;
    });
    return total;
  }

  removeCaddyFromStorage(){
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

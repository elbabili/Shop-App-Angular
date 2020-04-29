import {Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../model/product.model';
import {Router} from '@angular/router';
import {CaddyService} from '../services/caddy.service';
import {ItemProduct} from '../model/item-product.model';
import {Caddy} from '../model/caddy.model';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {

  public caddy:Caddy;

  constructor(private catService:CatalogueService, private router:Router,
              private caddyService:CaddyService, private authService:AuthenticationService) { 
    this.caddy = this.caddyService.getCaddy();            
  }

  ngOnInit() {
    //if(this.authService.isAuthenticated == false)   this.router.navigateByUrl('/login');
    //this.caddy = this.caddyService.getCaddy();
  }

  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
  }

  getTotal() {
      return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {  //ToDO pour une personne non authentifié qui souhaite réaliser un panier ok 
                  //mais si elle souhaite passer commande, il faut s'authentifier
    if(this.authService.isAuthenticated == false)   this.router.navigateByUrl('/login');
    else this.router.navigateByUrl("/client");
  }

}

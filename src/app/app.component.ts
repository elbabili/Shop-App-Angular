import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './services/catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ecom-web';
    responseCat;
    currentCategorie;

    constructor(private catService:CatalogueService, private router:Router,
    private authService:AuthenticationService, public caddyService:CaddyService){
        //console.log('app.component.ts / constructor');
    }

    ngOnInit(){
        //console.log('app.component.ts / ngOnInit()');
        //lorsque mon composant principale est sollicité, je charge les infos d'un utilisateur présent dans le local storage
        //si le local storage est vide, il n'y a pas de user connecté actuellement
        this.authService.loadAuthenticatedUserFromLocalStorage();
        this.getCategories();   //chargement des catégories
    }

    getCategories(){
        this.catService.getRessources("/categories")
            .subscribe(data => {
                this.responseCat = data;
            },err => {
                console.log(err);
            })
    }

    getProductsByCat(c){
        this.currentCategorie = c;  //si on affiche une categorie en particulier, les autres doivent être grisées
        this.router.navigateByUrl('/products/2/'+c.id);
    }

    onSelectedProducts(){   //home
        this.currentCategorie = undefined;
        this.router.navigateByUrl('/products/1/0');
    }

    onProductsPromo(){
        this.currentCategorie = undefined;
        this.router.navigateByUrl('/products/3/0');
    }

    onProductsDispo(){
         this.currentCategorie = undefined;
         this.router.navigateByUrl('/products/4/0');
    }

    onLogout(){
        this.authService.removeTokenFromLocalStorage();
        //si je veux me connecter, il faut me deconnecter avant tout
        this.router.navigateByUrl('/login');
    }
}

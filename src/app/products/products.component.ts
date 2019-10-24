import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpEventType, HttpResponse} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import {CaddyService} from '../services/caddy.service';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  responseProd;
  editPhoto:boolean;
  currentProduct;
  selectedFiles;
  progress;
  currentFileUpload;
  title:String;

  constructor(public catService:CatalogueService, private route:ActivatedRoute,
   private router:Router, public authService:AuthenticationService,
    public caddyService:CaddyService) {  }

  ngOnInit() {
       this.router.events.subscribe(val=>{     //en cas d'évènement sur notre routeur, il faudra bien venir ici pour traitement
                if(val instanceof NavigationEnd){
                    let firstParam = this.route.snapshot.params.p1;

                    if(firstParam == 1){     //indicateur permettant de gérer l'affichage des produits selectionnés
                        this.title = "Produits selectionnés";
                        this.getProducts("/products/search/selectedProducts");
                    }
                    else if(firstParam == 2){   //affichage par catégorie
                        this.title = "Produits par catégories";
                        let secondParam = this.route.snapshot.params.p2;    //id de la catégorie concernée
                        this.getProducts("/categories/"+secondParam+"/products");
                    }
                    else if(firstParam == 3){    //affichage des produits en promo
                         this.title = "Produits en promotion";
                         this.getProducts("/products/search/promoProducts");
                    }
                    else if(firstParam == 4){    //affichage des produits dispo
                         this.title = "Produits disponible";
                         this.getProducts("/products/search/dispoProducts");
                    }
                }
       });
       this.title = "Produits selectionnés";
       this.getProducts("/products/search/selectedProducts");
  }

  private getProducts(url){
        this.catService.getRessources(url)
            .subscribe(data => {
                this.responseProd = data;
            },err=>{
                console.log(err);
            })
   }

   onEditPhoto(p){
        this.currentProduct = p;
        this.editPhoto=true;
   }

   onSelectedFile(event){
        this.selectedFiles = event.target.files;
   }

   uploadPhoto(){
        this.progress = 0;
        this.currentFileUpload = this.selectedFiles.item(0);    //on peut uploader le 1er fichier selectionné
        this.catService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id)
            .subscribe(event=> {
                if(event.type === HttpEventType.UploadProgress){
                    this.progress = Math.round(100 * event.loaded / event.total);
                }else if(event instanceof HttpResponse) {
                     //tout s'est bien passé
                }
            },err=> {
                alert("pb de chargement");
            })
   }

    //pb de cache du browser :
    //astuce consistant à obliger le navigateur à raffraichir son affichage et donc de prendre en compte une image de produit changé
   getTimeStamp(){
        return Date.now();
   }

   onProductDetails(p:Product){ //lorsqu'on clic sur la photo d'un produit, appel d'un composant d'édition détaillée
        let url = btoa(p._links.product.href);  //"http://localhost:8080/products/1" par ex
        //console.log('dans products.component url ='+url);
        this.router.navigateByUrl('product/details/'+url);
   }

   onAddProductToCaddy(p:Product){
        this.caddyService.addProduct(p);
   }
}

import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private responseProd;

  constructor(private catService:CatalogueService) { }

  ngOnInit() {
        this.getProducts();
  }

  private getProducts(){
        this.catService.getRessources("/products/search/selectedProducts")
            .subscribe(data => {
                this.responseProd = data;
            },err=>{
                console.log(err);
            })
   }

}

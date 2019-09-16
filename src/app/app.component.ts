import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catalogue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ecom-web';
    private responseCat;

    constructor(private catService:CatalogueService){}

    ngOnInit(){
        this.getCategories();
    }

    getCategories(){
        this.catService.getRessources("/categories")
            .subscribe(data => {
                this.responseCat = data;
            },err => {
                console.log(err);
            })
    }
}

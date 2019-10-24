import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host : String = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  public getRessources(url){
        return this.http.get(this.host+url);
  }

  public getResByUrlOnly(url){
        return this.http.get(url);
  }

  public getProduct(url) : Observable <Product>{
        //console.log(this.host+url);
        return this.http.get<Product>(this.host+url);
   }

  public uploadPhotoProduct(file:File, idProduct):Observable<HttpEvent<{}>>{
        let formData:FormData = new FormData();
        formData.append('file',file);
        const req = new HttpRequest('POST',this.host+'/uploadPhoto/'+idProduct,formData,{
            reportProgress : true,
            responseType : 'text'
        });
    return this.http.request(req);
  }

  public patchResource(url,data){
      return this.http.patch(url,data);
  }
}

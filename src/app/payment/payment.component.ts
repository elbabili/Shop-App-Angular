import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../model/order.model';
import {OrderService} from '../services/order.service';
import {CaddyService} from '../services/caddy.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentAmount:number;
  currentOrder:Order;
  constructor(private router:Router, private route:ActivatedRoute,
              private orderService:OrderService, public caddyService:CaddyService) { }

  ngOnInit() {
    let id=this.route.snapshot.params.orderID
    this.orderService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }

  onPayOrder(data) {
    //console.log(data);
    alert("MERCI INFINIMENT !");
    this.caddyService.removeCaddyFromStorage();
    this.router.navigateByUrl('/products/1/0');
  }
}

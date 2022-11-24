import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public totalItem : number = 0;
  public filterCategory : any;
  public searchTerm : string = '';
  searchKey:string='';
  public productList : any ;
  constructor(private api : ApiService, private cartService : CartService) {}

  ngOnInit(): void {

      this.cartService.getProducts()
      .subscribe(res=>{
        this.totalItem = res.length;
      })
      
      this.api.getProduct()
      .subscribe(res=>{
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a:any) => {
          if(a.category ==="women's clothing" || a.category ==="men's clothing"){
            a.category ="fashion"
          }
          Object.assign(a,{quantity:1,total:a.price});
        });
        console.log(this.productList)
      });
        this.cartService.search.subscribe((val:any)=>{
          this.searchKey = val;
        })
    }
    addtocart(item: any){
      this.cartService.addtoCart(item);
    }
    filter(category:string){
      this.filterCategory = this.productList
      .filter((a:any)=>{
        if(a.category == category || category==''){
          return a;
        }
      })
    }

    search(event:any){
      this.searchTerm = (event.target as HTMLInputElement).value;
      console.log(this.searchTerm);
      this.cartService.search.next(this.searchTerm);
    }
}



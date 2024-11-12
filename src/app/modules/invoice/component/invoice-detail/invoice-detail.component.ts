import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../_model/invoice';
import { SwalMessages } from '../../../../shared/swal-messages';
import { InvoiceService } from '../../_service/invoice.service';
import { Item } from '../../_model/item';
import { Customer } from '../../../../modules/customer/_model/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {

  public invoice: any | Invoice = new Invoice(); // factura
  public id: any; // id de la factura
  public customer: any | Customer = new Customer(); // cliente asociado a la factura
  public rfc: any | string = ""; // rfc del cliente consultado
  public items: Item[] = []; // lista de items en la factura

  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if(this.id){
      this.getInvoice();
    }else{
      this.swal.errorMessage("El id de la factura es inválido"); 
    }
  }

  getInvoice(){
    this.loading = true;
    this.invoiceService.getInvoice(this.id).subscribe({
      next: (v) => {
        this.invoice = v;
        this.loading = false;
        console.log(this.invoice);
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }
}

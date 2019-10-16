import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoicesService, Invoice, CustomersService, Customer } from '@aia/services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { HoursValidator } from '../validators/hours.validator';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  invoice: Invoice;
  customer: Customer;
  customers: Customer[];
  total = 0;

  constructor(
    private loadingService: TdLoadingService,
    private invoicesService: InvoicesService,
    private router: Router,
    private dialogService: TdDialogService,
    private customersService: CustomersService,
    //Servicio para crear formularios React
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {

      //Utiliza elservicio formBuilder para crear un formulario. El argumento es un objeto con las propiedades que estaran disponibles en el formulario. Para cada propiedad se incluye una lista, array, de validator functions. Tambien indicamos el valor por defecto del componente, si alguno
      //EL formulario React se denomina FormGroup, asi que lo que estamos creando es tecnicamente a FormGroup
      this.invoiceForm = this.formBuilder.group({
        id: [''],
        service: ['', Validators.required],
        customerId: ['', Validators.required],
        rate: ['', Validators.required],
        //Utiliza nuestra directiva de validacion, HoursValidation
        hours: ['', [Validators.required, HoursValidator]],
        date: ['', Validators.required],
        paid: ['']
      });

    }

  //Una vez se ha construido el componente, lo inicializamos...
  ngOnInit() {
    this.loadingService.register('invoice');
    this.loadingService.register('customers');

    this.customersService.query<Array<Customer>>().subscribe(customers => {
      this.customers = customers;
      this.loadingService.resolve('customers');
    });

    //Carga los invoices
    this.route.params.map((params: Params) => params.invoiceId).subscribe(invoiceId => {
      if (invoiceId) {
        this.invoicesService.get<Invoice>(invoiceId).subscribe(invoice => {
          //Especifica un valor. EL objeto debe contener key values que correspondan con la estructura del FormGroup
          this.invoiceForm.setValue(invoice);
          this.invoice = invoice;
          this.loadingService.resolve('invoice');
        });
      } else {
        this.invoice = new Invoice();
        this.loadingService.resolve('invoice');
      }
    });

    //Observese como se utiliza el caracter stream de este tipo de forumlarios. Nos subscribimos a dos fuentes, la propiedad rate y la propiedad hours. Combina en un solo observable los dos streams. Calcula el total
    Observable.combineLatest(
      //Podemos recuperar los valores de una de las propiedades con un Observable. Tambien hay otro metodo que recupera la informacion de forma sincrona, this.invoiceForm.get('rate').value
      this.invoiceForm.get('rate').valueChanges,
      this.invoiceForm.get('hours').valueChanges
    ).subscribe(([rate = 0, hours = 0]) => {
      this.total = rate * hours;
    });
  }

  save() {
    if (this.invoice.id) {
      //Recupera todo el FormGroup
      this.invoicesService.update<Invoice>(this.invoice.id, this.invoiceForm.value).subscribe(response => {
        this.viewInvoice(response.id);
      });
    } else {
      this.invoicesService.create<Invoice>(this.invoiceForm.value).subscribe(response => {
        this.viewInvoice(response.id);
      });
    }
  }

  delete() {
    this.dialogService.openConfirm({
      message: 'Are you sure you want to delete this invoice?',
      title: 'Confirm',
      acceptButton: 'Delete'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.loadingService.register('invoice');
        this.invoicesService.delete(this.invoice.id).subscribe(response => {
          this.loadingService.resolve('invoice');
          this.invoice.id = null;
          this.cancel();
        });
      }
    });
  }

  cancel() {
    if (this.invoice.id) {
      this.router.navigate(['/invoices', this.invoice.id]);
    } else {
      this.router.navigateByUrl('/invoices');
    }
  }

  private viewInvoice(id: number) {
    this.router.navigate(['/invoices', id]);
  }

}

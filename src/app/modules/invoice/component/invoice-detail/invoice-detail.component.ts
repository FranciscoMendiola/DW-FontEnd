import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../_model/invoice';
import { SwalMessages } from '../../../../shared/swal-messages';
import { InvoiceService } from '../../_service/invoice.service';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {

  id: number = 0; // invoice id
  invoice: Invoice = new Invoice();
  invoices: any = [];

  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.getInvoice();
    } else {
      this.swal.errorMessage("El id de la factura es inválido");
    }
  }

  getInvoice() {
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

  redirect(url: string[]) {
    this.router.navigate(url);
  }

  imprimir() {
    // Obtener el contenido del elemento con el ID 'printable'
    const contenido = document.getElementById('printable')?.innerHTML;
    
    // Verificar si el contenido existe
    if (!contenido) {
      alert('No se encontró el contenido para imprimir.');
      return;
    }
    
    // Abrir una nueva ventana con un tamaño específico
    const ventana = window.open('', '', 'height=1660,width=1220');
    
    if (!ventana) {
      alert('No se pudo abrir la ventana emergente.');
      return;
    }
  
    // Obtener los estilos del documento actual
    const estilos = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          // Intentar acceder a las reglas CSS de la hoja de estilo
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join(' ');
        } catch (e) {
          // Si la hoja de estilo es de otro dominio (CORS), ignorarla
          return '';
        }
      })
      .join(' ');
  
    // Escribir el contenido HTML dentro de la nueva ventana
    ventana.document.write('<html><head><title>Imprimir</title>');
    
    // Incluir los estilos en la nueva ventana
    ventana.document.write('<style>' + estilos + '</style>');
    
    // Incluir el contenido a imprimir
    ventana.document.write('</head><body>');
    ventana.document.write(contenido);
    ventana.document.write('</body></html>');
    
    // Cerrar el documento para que la ventana lo renderice correctamente
    ventana.document.close();
    
    // Ejecutar la impresión sobre la nueva ventana
    ventana.print();
  }
  
  

}

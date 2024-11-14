
import { Category } from '../../../product/_model/category';
import { CategoryService } from '../../../product/_service/category.service';
import { CartService } from '../../../invoice/_service/cart.service';
import { Component } from '@angular/core';
import { Customer } from '../../../customer/_model/customer';
import { CustomerService } from '../../../customer/_service/customer.service';
import { Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { SharedModule } from '../../../../shared/shared-module';
import { LoginComponent } from '../../../auth/component/login/login.component';
import { RegisterComponent } from '../../../auth/component/register/register.component';

declare var $: any; // JQuery

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  categories: Category[] = []; // Category List

  loggedIn = false;
  isAdmin = false;

  customer: Customer = new Customer();
  userProfileImage: string = '';

  cartItemCount: number = 0;

  swal: SwalMessages = new SwalMessages(); // Swal messages

  constructor(
    private categoryService: CategoryService,
    private servicioAutenticacion: AuthenticationService,
    private customerService: CustomerService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user")) {

      let user = JSON.parse(localStorage.getItem("user")!);

      if (user.rol == "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }

    if (localStorage.getItem("token")) {
      this.loggedIn = true;
      if (!this.isAdmin) {
        this.getCustomerDetail();
      } else {
        this.userProfileImage = 'assets/images/user-logo.png';
      }
    }

    this.getCategories();

    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  getCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  logout() {
    this.servicioAutenticacion.logOut();
    this.loggedIn = false;
    this.isAdmin = false;
    this.customer = new Customer();
    this.userProfileImage = '';
    this.router.navigate(['/']);
  }

  getCustomerDetail() {
    this.customerService.getCustomerDetail().subscribe({
      next: (v) => {
        this.customer = v.body!;
        this.userProfileImage = this.customer.image?.image;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    })
  }

  showLoginModal() {
    $("#loginModal").modal("show");
  }

  showRegisterModal() {
    $("#registerModal").modal("show");
  }
}
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private userService: UserService) {}

  
  onLogout(): void {
    this.userService.logout();

    // Afficher la modale de déconnexion
    const logoutModalElement = document.getElementById(
      'logoutModal'
    ) as HTMLElement;
    const logoutModal = new Modal(logoutModalElement);
    logoutModal.show();
  }

 
}


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Token } from 'src/app/models/token';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-connect-page',
  templateUrl: './connect-page.component.html',
  styleUrls: ['./connect-page.component.css'],
})
export class ConnectPageComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userLogin: User = this.loginForm.value; // On récupère les données du formulaire
      console.log('je suis dans le submit, userLogin = ', userLogin);
      this.userService.loginUser(userLogin).subscribe(
        (res: Token) => {
          // On envoie l'utilisateur au serveur
          console.log('je suis dans le submit et je récupère res = ', res);
          const token = res.accessToken; // On récupère le token

          // Stocker le token dans le localStorage
          localStorage.setItem('token', token);



          // Afficher la modale de succès
          const loginModalElement = document.getElementById(
            'loginModal'
          ) as HTMLElement;
          const loginModal = new Modal(loginModalElement);
          loginModal.show();

          // console.log('Token:', token);
        },
        (error: any) => {
          const errorModalElement = document.getElementById(
            'errorModal'
          ) as HTMLElement;
          const errorModal = new Modal(errorModalElement);
          errorModal.show();
          console.error('Erreur lors de la connexion:', error);
        }
      );
    }
  }
}
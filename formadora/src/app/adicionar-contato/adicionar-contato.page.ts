import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { FirebaseService, Contato } from '../services/firebase.service';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonLabel, IonItem, RouterLink]
})
export class AdicionarContatoPage implements OnInit {
  contato: Contato = {
    name: '',
    email: ''
  };

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async adicionarContato() {
    if (this.contato.name.trim() && this.contato.email.trim()) {
      try {
        await this.firebaseService.adicionarContato(this.contato);
        // Limpar formulário
        this.contato = { name: '', email: '' };
        // Redirecionar para listar contatos
        this.router.navigate(['/listar-contatos']);
      } catch (error) {
        console.error('Erro ao adicionar contato:', error);
      }
    }
  }

}

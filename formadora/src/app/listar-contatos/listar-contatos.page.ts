import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirebaseService, Contato } from '../services/firebase.service';
import { Api, Usuario } from '../services/api';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.page.html',
  styleUrls: ['./listar-contatos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, RouterLink]
})
export class ListarContatosPage implements OnInit {
  usuarios: Contato[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private api: Api
  ) { }

  ngOnInit() {
    this.carregarContatos();
    this.carregarUsuariosApi();
  }

  carregarContatos() {
    this.firebaseService.listarContatos().subscribe({
      next: (data) => {
        // garantir formato { name, email }
        const contatos = data.map(c => ({ name: c.name, email: c.email }));
        // colocar contatos do Firebase primeiro
        this.usuarios = [...contatos, ...this.usuarios];
      },
      error: (error) => {
        console.error('Erro ao carregar contatos do Firebase:', error);
      }
    });
  }

  carregarUsuariosApi() {
    this.api.getUsers().subscribe({
      next: (data: Usuario[]) => {
        const usuariosApi = data.map(u => ({ name: u.name, email: u.email }));
        // juntar sem sobrescrever os contatos já carregados
        this.usuarios = [...this.usuarios, ...usuariosApi];
      },
      error: (error) => {
        console.error('Erro ao carregar usuários da API:', error);
      }
    });
  }

}

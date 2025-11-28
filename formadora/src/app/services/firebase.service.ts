import { Injectable, Optional } from '@angular/core';
import { Database, ref, push, query } from '@angular/fire/database';
import { listVal } from '@angular/fire/database';
import { Observable, of } from 'rxjs';

export interface Contato {
  id?: string;
  name: string;
  email: string;
}
//adicione as credenciais do firebase para funcionar
export const firebaseConfig = {
  apiKey: "AIzaSyB5t_rQsmbK9i2yoV5Ijm_foHiBw0cFGbA",
  authDomain: "formadora-4.firebaseapp.com",
  databaseURL: "https://formadora-4-default-rtdb.firebaseio.com",
  projectId: "formadora-4",
  storageBucket: "formadora-4.firebasestorage.app",
  messagingSenderId: "185150678912",
  appId: "1:185150678912:web:01b4a3425b2815f6990365",
  measurementId: "G-Q1GPN50XB4"
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(@Optional() private db?: Database) {}

  // Adicionar um novo contato
  adicionarContato(contato: Contato): Promise<void> {
    if (!this.db) {
      return Promise.reject(new Error('Firebase Database não está configurado'));
    }
    const contatosRef = ref(this.db, 'contatos');
    return push(contatosRef, contato)
      .then(() => {
        console.log('Contato adicionado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao adicionar contato:', error);
        throw error;
      });
  }

  // Listar todos os contatos
  listarContatos(): Observable<Contato[]> {
    if (!this.db) {
      // Retornar lista vazia quando não há configuração do Firebase
      return of([] as Contato[]);
    }
    return listVal<Contato>(query(ref(this.db, 'contatos')));
  }
}
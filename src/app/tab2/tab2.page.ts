import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarefa } from '../models/tarefa'
import { StorageService } from '../services/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  formCadastroTarefa: FormGroup;
  tarefa: Tarefa = new Tarefa();
  dataFormatada = '';
  minDate = new Date();
  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O nome da tarefa deve ter pelo menos 3 caracteres.' },
    ],
    data: [
      { tipo: 'required', mensagem: 'O campo data é obrigatório.' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {
    this.formCadastroTarefa = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      descricao: [''],
      data: ['', Validators.compose([Validators.required])],
    })
  }

  formatarData(e) {
    const dataF = moment(e).format('DD/MM/YYYY');
    this.dataFormatada = dataF;
  }

  salvarTarefas() {
    console.log(this.formCadastroTarefa.valid);

    if (this.formCadastroTarefa.valid) {
      const tarefaId = String(Math.random())
      this.tarefa.id = tarefaId;
      this.tarefa.nome = this.formCadastroTarefa.value.nome;
      this.tarefa.descricao = this.formCadastroTarefa.value.descricao;
      this.tarefa.data = this.formCadastroTarefa.value.data;
      this.tarefa.complete = false;
      this.storageService.set(tarefaId, this.tarefa);
      this.clearData()
      this.route.navigate(['/tabs/tab1'])
    }
  }

  clearData() {
    this.dataFormatada = "";
    this.formCadastroTarefa.reset();
  }
}
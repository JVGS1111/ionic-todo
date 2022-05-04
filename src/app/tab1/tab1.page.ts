import { Component } from '@angular/core';
import * as moment from 'moment';
import { Tarefa } from '../models/tarefa';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaDeTarefas: Tarefa[] = [];


  constructor(private storageStervice: StorageService) { }

  ionViewDidEnter() {
    this.buscarTarefas();
  }

  async buscarTarefas() {
    this.listaDeTarefas = await this.storageStervice.getAll();
  }

  async deletarTarefa(id) {
    await this.storageStervice.remove(id)
    this.buscarTarefas();
  }
  async marcarTarefa(id) {
    const tarefa: Tarefa = await this.storageStervice.get(id);

    tarefa.complete = !tarefa.complete;
    this.listaDeTarefas.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item
    })

    this.storageStervice.set(id, tarefa);

  }
  formatarData(data) {
    return moment(data).format('DD/MM/YYYY');
  }
}

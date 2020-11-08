<template>
  <div>
    <b-form>
      <input id="alunos-id" type="hidden" v-model="alunos.id">
      <b-row>
        <b-col md="3" sm="12">
          <b-form-group label="Nome do aluno:" label-for="alunos-nome">
            <b-form-input
              name="Nome"
              id="alunos-nome"
              type="text"
              v-model="alunos.nome"
              placeholder="Informe o Nome do Aluno..."
            />
          </b-form-group>
        </b-col>
     
      </b-row>
      <b-col xs="12">
        <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
        <b-button variant="success" v-if="mode === 'atualizar'" @click="atualizar">Atualizar</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-col>
    </b-form>
    <hr>
    <b-table hover striped :items="aluno" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadAlunoModo(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/globalSettings";

export default {
  name: "RegisterStudent",
  components: {},
  data: function() {
    return {
      mode: "save",
      alunos: {},
      aluno: [],
      fields: [
        {
          key: "nome",
          label: "Nome do Aluno",
          sortable: true,
          formatter: value => value.toUpperCase()
        },
        {
          key: "email",
          label: "E-mail",
          sortable: true,
          formatter: value => value.toUpperCase()
        },
        { key: "registro_academico", label: "RA", sortable: true },
        { key: "cpf", label: "CPF", sortable: true },
        { key: "actions", label: "Ações" }],

    
    };
  },
  methods: {
  
    reset() {
      this.mode = "save";
      this.alunos = {};
      this.loadalunos();
    },
    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios[method](`${baseApiUrl}/alunos/`, this.alunos)
            .then(() => {
              this.$toasted.global.defaultSuccess({
                msg: "Aluno cadastrada com sucesso!"
              });
              this.reset();
            })
            .catch(showError);
          return;
        }
        this.$toasted.global.defaultError({
          msg: "Você possui problemas no formulário"
        });
      });
      const method = this.alunos.id ? "put" : "post";
      //const id = this.alunos.id ? `/${this.alunos.id}` : "";
    },
    atualizar() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .put(`${baseApiUrl}/alunos/atualizar`, this.alunos, {
              useCredentails: true
            })
            .then(() => {
              this.$toasted.global.defaultSuccess({
                msg: "Raca Atualizada com sucesso!"
              });
              this.reset();
            })
            .catch(showError);
          return;
        }
        this.$toasted.global.defaultError({
          msg: "Você possui problemas no formulário"
        });
      });
    },
    loadalunos() {
      axios
        .get(`${baseApiUrl}/user`)
        .then(res => (this.aluno = res.data));
    },

    loadAlunoModo(alunos, mode = "atualizar") {
      this.mode = mode;
      this.alunos = { ...alunos };
    }
  },
  watch: {},
  mounted() {
    this.loadalunos();
  }
};
</script>

<style>
</style>
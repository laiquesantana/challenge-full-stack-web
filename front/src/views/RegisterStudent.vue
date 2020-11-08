<template>
  <div>
    <b-form>
      <input id="alunos-id" type="hidden" v-model="alunos.id" />
      <b-row>
        <b-col md="3" sm="12">
          <b-form-group label="Nome do aluno:" label-for="alunos-nome">
            <b-form-input
              name="Nome"
              id="alunos-nome"
              type="text"
              v-model="alunos.name"
              placeholder="Informe o Nome do Aluno..."
            />
          </b-form-group>
        </b-col>

        <b-col md="3" sm="12">
          <b-form-group label="E-mail:" label-for="alunos-nome">
            <b-form-input
              name="email"
              id="alunos-email"
              type="text"
              v-model="alunos.email"
              placeholder="Informe o email do Aluno..."
            />
          </b-form-group>
        </b-col>
  
        <b-col md="3" sm="12">
          <b-form-group label="RA do aluno:" label-for="alunos-registo_academico">
            <b-form-input
              name="registo_academico"
              id="alunos-registo_academico"
              type="text"
              v-model="alunos.name"
              placeholder="Informe o Registo Academico do Aluno..."
            />
          </b-form-group>
        </b-col>
 
        <b-col md="3" sm="12">
          <b-form-group label="Nome do aluno:" label-for="alunos-nome">
            <b-form-input
              name="Nome"
              id="alunos-nome"
              type="text"
              v-model="alunos.name"
              placeholder="Informe o Nome do Aluno..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-col xs="12">
        <b-button variant="primary" v-if="mode === 'save'" @click="save"
          >Salvar</b-button
        >
        <b-button
          variant="success"
          v-if="mode === 'atualizar'"
          @click="atualizar"
          >Atualizar</b-button
        >
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-col>
    </b-form>
    <hr />
    <b-table
      hover
      striped
      :items="aluno"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :busy="isBusy"
    >
      <template #cell(actions)="row">

     
       <v-btn color="blue"  @click="loadAlunoModo(row.item)"  >Accept
        <v-icon dark right>check_circle</v-icon>
      </v-btn>
      

      </template>
        


      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      
        
    </b-table>
    <div>
      Sorting By: <b>{{ sortBy }}</b
      >, Sort Direction:
      <b>{{ sortDesc ? "Descending" : "Ascending" }}</b>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/globalSettings";

export default {
  name: "RegisterStudent",
  components: {},
  data: function () {
    return {
      mode: "save",
      sortBy: "name",
      sortDesc: false,
      alunos: {},
      isBusy:false,
      aluno: [],
      fields: [
        {
          key: "name",
          label: "Nome do Aluno",
          sortable: true,

          formatter: (value) => value.toUpperCase(),
        },
        {
          key: "email",
          label: "E-mail",
          sortable: true,
          formatter: (value) => value.toUpperCase(),
        },
        { key: "id", label: "RA",  sortable: true },
        { key: "role", label: "CPF",  sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
     toggleBusy() {
        this.isBusy = !this.isBusy
      },
    reset() {
      this.mode = "save";
      this.alunos = {};
      this.loadalunos();
    },
    save() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios[method](`${baseApiUrl}/alunos/`, this.alunos)
            .then(() => {
              this.$toasted.global.defaultSuccess({
                msg: "Aluno cadastrada com sucesso!",
              });
              this.reset();
            })
            .catch(showError);
          return;
        }
        this.$toasted.global.defaultError({
          msg: "Você possui problemas no formulário",
        });
      });
      const method = this.alunos.id ? "put" : "post";
      //const id = this.alunos.id ? `/${this.alunos.id}` : "";
    },
    atualizar() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios
            .put(`${baseApiUrl}/alunos/atualizar`, this.alunos, {
              useCredentails: true,
            })
            .then(() => {
              this.$toasted.global.defaultSuccess({
                msg: "Raca Atualizada com sucesso!",
              });
              this.reset();
            })
            .catch(showError);
          return;
        }
        this.$toasted.global.defaultError({
          msg: "Você possui problemas no formulário",
        });
      });
    },
    loadalunos() {
      axios.get(`${baseApiUrl}/user`).then((res) => (this.aluno = res.data));
    },

    loadAlunoModo(alunos, mode = "atualizar") {
      this.mode = mode;
      this.alunos = { ...alunos };
    },
  },
  watch: {},
  mounted() {
    this.loadalunos();
  },
};
</script>

<style>
</style>
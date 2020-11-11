<template>
  <div>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="search"
              outlined
              clearable
              label="Pesquisar"
              type="text"
            >
              <template v-slot:append>
                <v-fade-transition leave-absolute>
                  <v-progress-circular
                    v-if="loading"
                    size="24"
                    color="info"
                    indeterminate
                  ></v-progress-circular>
                </v-fade-transition>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-btn
              :loading="loading1"
              :disabled="loading1"
              color="success"
              class="ma-2 white--text"
              @click="searchit"
            >
              Pesquisar
            </v-btn>
             <v-btn color="primary" class="ma-2 white--text" @click="newStudent">
              Cadastrar Aluno
            </v-btn>
          </v-col>

          <v-col cols="3">
           
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <hr />
    <b-table
      hover
      striped
      :items="student"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :busy="isBusy"
    >
      <template #cell(actions)="row">
        <v-btn class="mr-2" color="warning" @click="editStudent(row.item)" dark
          >Editar
          <v-icon dark right>edit</v-icon>
        </v-btn>
        <v-btn color="error" @click="deleteStudent(row.item.id)" dark
          >Deletar
          <v-icon dark right>delete_forever</v-icon>
        </v-btn>
      </template>

      <template #cell(cpf)="row">
        {{ row.item.cpf | VMask("###.###.###-##") }}
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
import { baseApiUrl } from "@/globalSettings";

export default {
  name: "ConsultStudent",
  components: {},
  data: function () {
    return {
      mode: "save",
      search: "",
      sortBy: "name",
      sortDesc: false,
      message: "Hey!",
      loading: false,
      students: {},
      isBusy: false,
      loader: null,
      loading1: false,
      student: [],
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
        { key: "academic_record", label: "RA", sortable: true },
        { key: "cpf", label: "CPF", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },

  methods: {
    searchit() {
      let query = this.search;
      if (query === "" || query === null || query === undefined) {
        this.loadStudents();
      } else {
        axios
          .get(`${baseApiUrl}/student/query/` + query)
          .then((res) => (this.student = res.data,
           this.$toasted.global.defaultSuccess()
          ))
          .catch(() => {
            this.$toasted.global.defaultError({
              msg: "Nenhum aluno encontrado",
            });
          });
      }
    },
    newStudent() {
      this.$router.push({
        name: "Students",
      });
    },

    deleteStudent(id) {
      this.$swal({
        title: "você tem certeza?",
        text: "Está ação não poderá ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Cancelar!",
      }).then((result) => {
        if (result.value) {
          //send request to the server
          axios
            .delete(`${baseApiUrl}/student/` + id)
            .then(() => {
              this.$swal("Deletado!", "Aluno deletado com sucesso!", "success");
              this.loadStudents();
            })
            .catch(() => {
              this.$swal("Falha!", "Problema ao deletar aluno", "error");
            });
        }
      });
    },
    loadStudents() {
      axios
        .get(`${baseApiUrl}/student`)
        .then((res) => (this.student = res.data));
    },

    editStudent(student, mode = "atualizar") {
      this.mode = mode;
      this.$router.push({
        name: "Students",
        query: { aluno: student.id },
      });
    },
  },
  watch: {

    search(newValue) {
      if (newValue === "" || newValue === null || newValue === undefined) {
        this.loadStudents();
      }
    },
  },
  mounted() {
    this.$Progress.start();
    this.loadStudents();
    this.$Progress.finish();
  },
};
</script>

<style>
</style>
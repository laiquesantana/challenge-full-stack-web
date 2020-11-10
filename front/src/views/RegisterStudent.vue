<template>
  <div>
    <v-card class="mx-auto" max-width="100%" color="teal" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <h2 v-if="editMode" class="card-title" id="updateStudentLabel">
            Atualizar Auno
          </h2>
          <h2 v-else class="card-title" id="newStudentLabel">
            Cadastrar Aluno
          </h2>
          <hr />
          <v-list-item-title class="headline mb-1">
            <b-form>
              <input id="students-id" type="hidden" v-model="students.id" />
              <b-row>
                <b-col md="12" sm="12">
                  <b-form-group
                    label="Nome do aluno:"
                    label-for="students-nome"
                  >
                    <b-form-input
                      name="name"
                      id="students-nome"
                      type="text"
                      v-model="students.name"
                      required
                      placeholder="Informe o nome completo"
                    />
                  </b-form-group>
                </b-col>

                <b-col md="12" sm="12">
                  <b-form-group label="E-mail:" label-for="students-nome">
                    <b-form-input
                      name="email"
                      id="students-email"
                      type="email"
                      v-model="students.email"
                      required
                      placeholder="Informe apenas um email"
                    />
                  </b-form-group>
                </b-col>

                <b-col md="12" sm="12">
                  <b-form-group
                    label="RA do aluno:"
                    label-for="students-academic_record"
                  >
                    <b-form-input
                      name="academic_record"
                      id="students-academic_record"
                      type="number"
                      required
                      :disabled="editMode"
                      v-model="students.academic_record"
                      placeholder="Informe o registo acadêmico"
                    />
                  </b-form-group>
                </b-col>

                <b-col md="12" sm="12">
                  <b-form-group label="CPF:" label-for="students-cpf">
                    <b-form-input
                      name="cpf"
                      id="students-cpf"
                      v-mask="'###.###.###-##'"
                      required
                      :disabled="editMode"
                      type="text"
                      v-model="students.cpf"
                      placeholder="Informe o número do documento"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <b-col xs="12">
          <b-button v-if="editMode" variant="primary" @click="updateStudent"
            >Atualizar <v-icon>mdi-pencil</v-icon></b-button
          >
          <b-button v-else variant="primary" @click="createStudent"
            >Salvar
            <v-icon dark right> mdi-checkbox-marked-circle </v-icon></b-button
          >
          <b-button variant="danger" class="ml-2" @click="reset"
            >Cancelar
          </b-button>
        </b-col>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/globalSettings";
import { validate } from "gerador-validador-cpf";

export default {
  editMode: false,
  name: "RegisterStudent",
  components: {},
  data: function () {
    return {
      students: {},
      id: this.$route.query.aluno ? this.$route.query.aluno : null,
    };
  },
  methods: {
    reset() {
      this.$router.push({
        name: "ConsultStudent",
      });
    },
    createStudent() {
      axios
        .post(`${baseApiUrl}/student/`, this.students)
        .then(() => {
          this.$toasted.global.defaultSuccess({
            msg: "Aluno cadastrada com sucesso!",
          });
        })
        .catch(showError);
    },

    loadStudent() {
      axios
        .get(`${baseApiUrl}/student/` + this.id)
        .then((res) => (this.students = res.data))
        .catch(() => {
          this.$toasted.global.defaultError({
            msg: "Nenhum aluno encontrado",
          });
        });
    },

    updateStudent() {
      axios
        .put(`${baseApiUrl}/student/`, this.students)
        .then(() => {
          this.$toasted.global.defaultSuccess({
            msg: "Aluno atualizado com sucesso!",
          });
        })
        .catch(showError);
    },
  },
  computed: {
    editMode() {
      if (this.id === null) {
        return false;
      } else {
        this.loadStudent();
        return true;
      }
    },
  },
};
</script>

<style>
</style>
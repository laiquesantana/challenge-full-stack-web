<template>
  <div>
    <v-card class="mx-auto" max-width="100%" color="" outlined>
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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="students.name"
                :counter="255"
                :rules="nameRules"
                color="teal"
                label="Nome"
                required
              ></v-text-field>

              <v-text-field
                v-model="students.email"
                :rules="emailRules"
                label="E-mail"
                :counter="150"
                required
              ></v-text-field>

              <v-text-field
                v-model="students.academic_record"
                :rules="raRules"
                label="Registro Acadêmico"
                color="primary"
                :counter="50"
                :required="editMode"
                :disabled="editMode"
              ></v-text-field>

              <v-text-field
                class="pt-2"
                v-model="students.cpf"
                :rules="cpfRules"
                :counter="14"
                label="CPF"
                color="purple"
                v-mask="'###.###.###-##'"
                :required="editMode"
                :disabled="editMode"
              ></v-text-field>

              <br />
              <hr />

              <v-btn
                :disabled="!valid"
                v-if="editMode"
                color="success"
                class="mr-4"
                @click="updateStudent"
              >
                Atualizar <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                :disabled="!valid"
                v-else
                color="success"
                class="mr-4"
                @click="createStudent"
              >
                Salvar <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
              </v-btn>

              <v-btn color="red" @click="reset"> Cancelar </v-btn>
            </v-form>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/globalSettings";

export default {
  editMode: false,
  name: "RegisterStudent",
  components: {},
  data: function () {
    return {
      valid: true,
      nameRules: [
        (v) => !!v || "O nome do aluno é obrigatorio !",
        (v) => (v && v.length <= 255) || "Nome deve possuir até 255 caracteres",
      ],
      raRules: [
        (v) => !!v || "O Registro acadêmico do aluno é obrigatorio !",
        (v) =>
          (v && v.length <= 50) ||
          "O Registro acadêmico deve possuir até 255 caracteres",
      ],

      cpfRules: [
        (v) => !!v || "O CPF do aluno é obrigatorio !",
        (v) => (v && v.length <= 14) || "O CPF deve possuir até 255 caracteres",
      ],

      emailRules: [
        (v) => !!v || "O E-mail do aluno é obrigatorio! ",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser um E-mail válido",
        (v) =>
          (v && v.length <= 150) || "O E-mail deve possuir até 255 caracteres",
      ],
      select: null,

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
<template>
  <v-navigation-drawer
    permanent
    class="menu"
    v-show="isMenuVisible"
    width="100%"
    light
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/81.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <router-link :to="{ name: 'ConsultStudent' }" class="nav-link">
            Alunos
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Menu",

  computed: mapState(["isMenuVisible"]),
  data() {
    return {};
  },
};
</script>
<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #1e469a, #49a7c1);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.tree-anchor {
  color: white;
}
.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;

}
.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.tree-arrow.has-child {
  filter: brightness(2);
}
.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}
.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}
.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}
.tree-filter-empty {
  color: #ccc;
  font-size: 1.3rem;
  margin-left: 20px;
}
</style>
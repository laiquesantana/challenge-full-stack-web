<template>
  <div class="content">
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
}
</style>
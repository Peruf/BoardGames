<template>
  <div id="app">
    <md-app>
      <!-- chiamata alla navbar -->
      <navbar slot="md-app-toolbar"></navbar>
      <!-- chiamata alla home -->
      <home></home>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import home from "@/pages/homepage.vue";
import navbar from "@/components/navbar.vue";

export default {
  name: "App",
  components: {
    home: home,
    navbar: navbar
  }
};
</script>


<style>
</style>

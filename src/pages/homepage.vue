<template>
  <div class="home">
    <div class="inTitolo"><span class="md-title black titolo md-align-top-left">Giochi popolari</span></div>
    <!-- Card responsive -->
    <md-card class="md-large-size-10 md-medium-size-5 md-small-size-25" md-with-hover v-for="game in games" :key="game.name">
      <!-- Immagine cliccabile -->
      <md-card-media md-ratio="1-1">
        <router-link :to="'/game/' + game.name">
          <img :src="game.images.original" />
        </router-link>
      </md-card-media>
      <!-- Titolo e anno di pubblicazione -->
      <md-card-header>
        <router-link :to="'/game/' + game.name" class="router">
          <div class="md-title black">{{game.name}}</div>
        </router-link>
        <div class="md-subhead">{{game.year_published}}</div>
      </md-card-header>
    </md-card>
    <!-- Spinner di caricamento -->
    <md-progress-spinner md-mode="indeterminate" :md-diameter="20" :md-stroke="2" v-if="loading" class="md-accent" ></md-progress-spinner>
  </div>
</template>
      
<script>
import DataService from "@/dataservice.js";

export default {
  name: "HomePage",
  data: function() {
    return {
      games: [],
      loading: false,
      limit: 20,
    };
  },
  created: function() {
    this.loading = true;
    DataService.getGames().then(data => {
      this.games = data.data.games;
      
      this.loading = false;
    });
  },
  
};

</script>


<style scoped>
.md-card {
  width: 240px;
  margin: 10px;
  display: inline-block;
}

.home {
  /* Centro le card */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.black {
  color: black;
  text-decoration: none;
}
.router:hover{
    text-decoration: none;
}
.inTitolo{
  width: 100%;
  padding-top: 1em;
  padding-bottom: 2em;
}
.titolo{
  margin-left: 1em;
}
.md-title{
  /* Se il titolo è troppo lungo non va a capo e mette ... al posto del testo in più */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}
@media only screen and (max-width: 600px) {
  .md-card {
    width: 95%;
    margin: 10px;
  }
  .titolo{
    padding-bottom: 1em;
  }
}
</style>


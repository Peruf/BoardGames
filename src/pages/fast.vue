<template>
  <div class="home">
    <div class="inTitolo"><span class="md-title black titolo md-align-top-left">Giochi veloci</span></div>
    <!-- Card responsive -->
    <md-card class="md-large-size-10 md-medium-size-5 md-small-size-25 md-xsmall-size-100" md-with-hover v-for="game in games" :key="game.name">
      <!-- Immagine cliccabile -->
      <md-card-media md-ratio="1-1">
        <router-link :to="'/game/' + game.name">
          <img :src="game.images.original" class="APIimg" />
        </router-link>
      </md-card-media>
      <!-- Titolo e durata del gioco -->
      <md-card-header>
        <router-link :to="'/game/' + game.name" class="router">
          <div class="md-title black ">{{game.name}}</div>
        </router-link>
        <div class="md-subhead ">Durata minima: {{game.min_playtime}}</div>
        <div class="md-subhead ">Durata massima: {{game.max_playtime}}</div>
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
      // fav: false
    };
  },
  created: function() {
    this.loading = true;
    DataService.getGames().then(data => {
        let k = 0;
        for(let i = 0; i < data.data.games.length; i++){
          //se il gioco ha una durata minima di massimo 30 min e una massima di massimo 60 min, 
          //viene reputato come gioco veloce e lo si aggiunge all'array con tutti i giochi
          //se dura di più non viene aggiunto 
            if(data.data.games[i].min_playtime <= 30 && data.data.games[i].max_playtime <= 60){
                this.games[k] = data.data.games[i];
                k++
            }
        }
        //bubblesort per ordinare l'array
        let t = 0
        for(let i = 0; i < this.games.length; i++)  
        { 
            for (let j = 0; j < this.games.length - i - 1; j++)  
            { 

                if (this.games[j].min_playtime > this.games[j+1].min_playtime) 
                { 
                    t = this.games[j]; 
                    this.games[j] = this.games[j+1]; 
                    this.games[j+1] = t; 
                } 
            } 
        } 
        this.loading = false;
    });
  },
  methods: {
  },
};
</script>


<style scoped>
.md-card {
  width: 240px;
  margin: 10px;
}
.home {
  width: 100%;
  display: flex; /* or inline-flex */
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}

@media only screen and (max-width: 600px) {
  .md-card {
    width: 95%;
    margin: 10px;
  }
}
</style>


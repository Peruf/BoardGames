<template>
  <div class="home">
    <div class="inTitolo"><span class="md-title black titolo md-align-top-left">Giochi Top Rated</span></div>
    <!-- Card responsive -->
    <md-card class="md-large-size-10 md-medium-size-5 md-small-size-25 md-xsmall-size-100" md-with-hover v-for="game in games" :key="game.name">
      <!-- Immagine cliccabile -->
      <md-card-media md-ratio="1-1">
        <router-link :to="'/game/' + game.name">
          <img :src="game.images.original" class="APIimg" />
        </router-link>
      </md-card-media>
      <!-- Titolo e user rating arrotondato al primo decimale -->
      <md-card-header>
        <router-link :to="'/game/' + game.name" class="router">
          <div class="md-title black abs">{{game.name}}</div>
        </router-link>
        <div class="md-subhead abs">User rating: {{ Math.round(game.average_user_rating * 10) / 10 }}</div>
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
        let k = 0;
        for(let i = 0; i < data.data.games.length; i++){
            // un gioco si può considerare top rated se ha uno user rating > 3
            if(data.data.games[i].average_user_rating > 3){
                this.games[k] = data.data.games[i];
                k++
            }
        }
        //ordino l'array per l'user rating
        let t = 0
        for(let i = 0; i < this.games.length; i++)  
        { 
            for (let j = 0; j < this.games.length - i - 1; j++)  
            { 

                if (this.games[j].average_user_rating > this.games[j+1].average_user_rating) 
                { 
                    t = this.games[j]; 
                    this.games[j] = this.games[j+1]; 
                    this.games[j+1] = t; 
                } 
            } 
        } 
        //l'array al momento è in ordine crescente, quindi lo inverto
        this.games.reverse();
        this.loading = false;
    });
  },
}
</script>


<style scoped>
.md-card {
  width: 240px;
  margin: 10px;
  display: inline-block;
}

.home {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
@media only screen and (max-width: 600px) {
  .md-card {
    width: 95%;
    margin: 10px;
    display: inline-block;
    vertical-align: top;
  }
}
.black {
  color: black;
  text-decoration: none;
}
.abs{
    position:relative;
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
</style>


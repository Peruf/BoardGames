<template>

  <div class="home">

    <div class="inTitolo"><span class="md-title black titolo md-align-top-left">Giochi preferiti</span></div>

    <!-- Card responsive -->
    <md-card class="md-large-size-10 md-medium-size-5 md-small-size-25 md-xsmall-size-100" md-with-hover v-for="game in gamePreferiti" :key="game.name">

      <!-- Immagine cliccabile -->
      <md-card-media md-ratio="1-1">
        <router-link :to="'/game/' + game.name">
          <img :src="game.images.original" class="APIimg" />
        </router-link>
      </md-card-media>

      <!-- Titolo e anno di pubblicazione -->
      <md-card-header>
        <router-link :to="'/game/' + game.name" class="router">
          <div class="md-title black abs">{{game.name}}</div>
        </router-link>
        <div class="md-subhead abs">{{game.year_published}}</div>
      </md-card-header>


    </md-card>
    
    <!-- Spinner di caricamento -->
    <md-progress-spinner md-mode="indeterminate" :md-diameter="20" :md-stroke="2" v-if="loading" class="md-accent" ></md-progress-spinner>
    <md-empty-state
      v-if="!esistenzaPreferiti"
      md-icon="favorite_border"
      md-label="Preferiti mancanti"
      md-description="Non hai ancora aggiunto nessun gioco ai tuoi preferiti">
    </md-empty-state>
  </div>
</template>
      
<script>
import DataService from "@/dataservice.js";

export default {
  name: "Favorite",
  data: function() {
    return {
      games: [],
      gamePreferiti: [],
      loading: false,
      limit: 20,
      fav: [],
      esistenzaPreferiti: false,
    };
  },
  created: function() {
    
    this.load();

  },
  methods: {
    load: function() {
      
      this.loading=true;
      
      DataService.getFavorite().then(data =>{
        this.fav = [];
        this.gamePreferiti = [];

        // +++++ CONTROLLO CHE SIANO STATI STROVATI DEI PREFERITI NEL DB +++++
        if (data.arrayPreferiti.length > 0) {

            for (let i=0; i<data.arrayPreferiti.length; i++) {
            
                this.fav.push(data.arrayPreferiti[i]); //infilo i preferiti trovati all'interno dell'array
                
            }

            this.esistenzaPreferiti = true;

        } else {
            this.esistenzaPreferiti = false;  // nel caso che non siano stati trovati commenti
        }
        // ^^^^^ CONTROLLO CHE SIANO STATI STROVATI DEI PREFERITI NEL DB ^^^^^
      });

      DataService.getGames().then(data => {
        
        this.games = data.data.games;

        
        for (let i = 0; i <this.games.length; i++) {
          
          for (let j = 0; j < this.fav.length; j++) {

            if (this.games[i].name === this.fav[j]) {
              
              this.gamePreferiti.push(this.games[i]);

            }
          }

        }

       

        this.loading=false;
        
      });

    },
    
  }
};

</script>


<style scoped>
.md-card {
  width: 240px;
  margin: 10px;
  display: inline-block;
}

.home {
  width: 100%;
  display: flex; /* or inline-flex */
  flex-wrap: wrap;
  justify-content: left;
}
@media only screen and (max-width: 600px) {
  .md-card {
    width: 95%;
    margin: 10px;
    display: inline-block;
    vertical-align: top;
  }
  .titolo{
    padding-bottom: 1em;
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
  /* Se il titolo è troppo lungo non va a capo e mette ... al posto del testo in più */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>


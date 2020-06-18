<template>
  <div class="home">
    <!-- Creo un menu con tutti gli anni dal 2020 al 1900, cosicché l'utente possa scegliere i giochi dell'anno che preferisce -->
    <md-menu md-size="small" md-align-trigger class="menuC md-align-top-left" md-close-on-click>
      <md-button md-menu-trigger class="md-title menu"><b>{{anno}}</b><md-icon class="drop">arrow_drop_down</md-icon></md-button>

      <md-menu-content>
        <!-- Quando si sceglie l'anno si fa una chiamata alle api per ritornare tutti i giochi di quell'anno -->
        <md-menu-item v-for="year in years" :key="year" @click="getYear(year)">{{year}}</md-menu-item>
      </md-menu-content>
    </md-menu>
        <!-- Card responsive -->     
            <md-card class="md-large-size-10 md-medium-size-5 md-small-size-25 md-xsmall-size-100" md-with-hover v-for="game in games" :key="game.name">
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
                    <!-- Aggiungi ai preferiti -->
                    <!-- <md-card-actions>
                        <md-button class="md-icon-button" >
                        <md-icon >favorite_outline</md-icon>
                        </md-button>
                    </md-card-actions> -->
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
      //fav: false,
      years: [],
      anno: 2020, //di default l'anno è 2020
    };
  },
  created: function() {
    this.loading = true;
    this.getYear(this.anno);
  },
  methods: {
    // prendo tutti i giochi che sono usciti l'anno inserito dall'utente
    getYear: function(year){
      DataService.getGamesbyYear(year).then(data => {
      this.games = data.data.games;
      this.years = this.yearsPop();
      // imposto l'anno nell'anno scelto così da poterlo visualizzare nel md-menu, che è prima del v-for
      this.anno = year;
      this.loading = false;
    });
    },
    // creo un array con tutti gli anni dal 2020 al 1900
    yearsPop: function(){
        let year = [];
        let k = 0;
        for(let i = 2020; i >= 1900; i--){
            year[k] = i;
            k++;
        }
        return year;
    },
    
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
  width: 100%;
  display: flex; /* or inline-flex */
  flex-wrap: wrap;
  justify-content: space-around;
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
.menuC{
  width: 100%;
}
.titolo{
  margin-left: 1em;
}
.md-menu {
    margin: 24px;
}
.drop{
  margin-left: 10%;
}
.menu{
  border-bottom: solid 3px lightgray;
}
/* Quando il menu ha il focus diventa del verde md-accent */
.menu:focus{
  border-bottom: solid 3px rgb(134,217,71);
  color: rgb(134,217,71);
}
/* Se c'è il focus sul menu, l'icona diventa del verde dell'md-accent e ruota di 180° */
.menu:focus .drop{
  color: rgb(134,217,71);
  transform: rotate(180deg);
  transition-duration: 1s;
  display: inline-block;
  margin-left: 10%;
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
.md-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>


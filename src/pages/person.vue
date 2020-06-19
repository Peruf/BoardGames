<template>
  <div class="home">
    
    <div class="menuC">
        <label> <b> Numero giocatori: </b></label>
        <br>
        <div class="md-layout md-alignment-center-left">
        <label>Da</label>
        <md-menu md-size="small" md-align-trigger class="md-align-top-left" md-close-on-click>
        <md-button md-menu-trigger class="md-title menu"><b>{{min}}</b><md-icon class="drop">arrow_drop_down</md-icon></md-button>

        <md-menu-content>
            <md-menu-item v-for=" n in 20" :key="n" @click="min=n; getPerson(min,max)" >{{n}}</md-menu-item>
        </md-menu-content>
        </md-menu>

        <label>a</label>

        <md-menu md-size="small" md-align-trigger class=" md-align-top-left" md-close-on-click>
        <md-button md-menu-trigger class="md-title menu"><b>{{max}}</b><md-icon class="drop">arrow_drop_down</md-icon></md-button>

        <md-menu-content>
            <md-menu-item v-for=" n in 20" :key="n" @click="max=n; getPerson(min,max)">{{n}}</md-menu-item>
        </md-menu-content>
        </md-menu>
        </div>
    </div>

    
            
        <!-- Card responsive -->     
            <md-card class="md-large-size-10 md-medium-size-5 md-small-size-25 md-xsmall-size-100" md-with-hover v-for="game in games" :key="game.name">
                
                <!-- Immagine cliccabile -->
                    <md-card-media md-ratio="1-1">
                        <router-link :to="'/game/' + game.name">
                        <img :src="game.images.original"  />
                        </router-link>
                    </md-card-media>
                    <!-- Titolo e anno di pubblicazione -->
                    <md-card-header>
                        <router-link :to="'/game/' + game.name" class="router">
                        <div class="md-title black">{{game.name}}</div>
                        </router-link>
                        <div class="md-subhead ">Giocatori minimi: {{game.min_players}}</div>
                        <div class="md-subhead ">Giocatori massimi: {{game.max_players}}</div>
                    </md-card-header>
            </md-card>
        
        <!-- Spinner di caricamento -->
        <md-progress-spinner md-mode="indeterminate" :md-diameter="20" :md-stroke="2" v-if="loading" class="md-accent" ></md-progress-spinner>
        <md-empty-state
                v-if="isVoid"
                md-icon="casino"
                md-label="Giochi non trovati"
                md-description="La ricerca da te effettuata non ha portato nessun risultato :(">
        </md-empty-state>
  </div>
</template>
      
<script>
import DataService from "@/dataservice.js";

export default {
  name: "Person",
  data: function() {
    return {
      games: [],
      loading: false,
      isVoid: false,
      limit: 20,
      min: 1,
      max : 4,
    };
  },
  created: function() {
    this.isVoid= false;
    this.loading = true;
    this.getPerson(this.min,this.max);
  },
  methods: {
    getPerson: function(min,max){
      this.isVoid= false;
      DataService.getGamesbyPerson(min,max).then(data => {
      this.games = data.data.games;      
      this.loading = false;
      if(this.games.length==0){
          this.isVoid=true;
      }
    });
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
.menuC{
  width: 100%;
  margin: 24px;
}
.titolo{
  margin-left: 1em;
}
.md-menu {
    margin: 12px; /* dimezzato per la presenza del testo */
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
.md-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}
@media only screen and (max-width: 600px) {
  .md-card {
    width: 95%;
    margin: 10px;
    display: inline-block;
    vertical-align: top;
  }
}
</style>

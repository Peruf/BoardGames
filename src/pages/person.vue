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
                        <img :src="game.images.original" class="APIimg" />
                        </router-link>
                    </md-card-media>
                    <!-- Titolo e anno di pubblicazione -->
                    <md-card-header>
                        <router-link :to="'/game/' + game.name" class="router">
                        <div class="md-title black abs">{{game.name}}</div>
                        </router-link>
                        <div class="md-subhead abs">Giocatori minimi: {{game.min_players}}</div>
                        <div class="md-subhead abs">Giocatori massimi: {{game.max_players}}</div>
                    </md-card-header>
                    <!-- Aggiungi ai preferiti -->
                    <md-card-actions>
                        <md-button class="md-icon-button" >
                        <md-icon >favorite_outline</md-icon>
                        </md-button>
                    </md-card-actions>
            </md-card>
        
        <!-- Spinner di caricamento -->
        <md-progress-spinner md-mode="indeterminate" :md-diameter="20" :md-stroke="2" v-if="loading" class="md-accent" ></md-progress-spinner>
        <md-empty-state
                v-if="isVoid"
                md-rounded
                md-icon="casino"
                md-label="Giochi non trovati"
                md-description="La ricerca da te effettuata non ha portato nessun risultato :(">
        </md-empty-state>
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
      isVoid: false,
      limit: 20,
      fav: false,
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
    favorite: function() {
      if (this.fav == true) {
        this.fav = false;
      } else {
        this.fav = true;
      }
    },
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
  display: flex; /* or inline-flex */
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
.menu:focus{
  border-bottom: solid 3px rgb(134,217,71);
  color: rgb(134,217,71);
}
.menu:focus .drop{
  color: rgb(134,217,71);
  transform: rotate(180deg);
  transition-duration: 1s;
  display: inline-block;
  margin-left: 10%;
}

</style>

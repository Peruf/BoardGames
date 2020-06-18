<template>

        <!---- pagina sbagliata -->


  <div class="home">
    <div class="inTitolo"><span class="md-title black titolo md-align-top-left">Giochi preferiti</span></div>
    <!-- Card responsive -->
    <md-card class="md-large-size-10 md-medium-size-5 md-small-size-25 md-xsmall-size-100" md-with-hover v-for="game in selectFav" :key="game.name">
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
      <md-card-actions>
        <md-button class="md-icon-button" @click="checkFavorite(game.id)"> 
          <md-icon>{{ (fav[game.id]==true)? 'favorite':'favorite_border' }}</md-icon> <!-- se è true mi mette l'icona piena, se è false me la mette vuota -->
        </md-button>
      </md-card-actions>
    </md-card>
    <!-- Spinner di caricamento -->
    <md-progress-spinner md-mode="indeterminate" :md-diameter="20" :md-stroke="2" v-if="loading" class="md-accent" ></md-progress-spinner>
    <md-empty-state
                v-if="isVoid"
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
      selectFav: [],
      isVoid: false,
      loading: false,
      limit: 20,
      fav: [],
    };
  },
  watch:{ // dovrebbe aggiornarmi i cuori
    fav: function(){
      console.log("e cambiato");
    }
  },
  created: function() {
    this.loading = true;
    DataService.getGames().then(data => {
      this.games = data.data.games;
      console.log(this.games);
      this.fav=DataService.getFavorite();
      this.selectFav=this.getSelectGame();
      this.loading = false;
    });
  },
  methods: {
    checkFavorite: function(id){ // metodo che viene attivato quando si clicca sul cuore 
      console.log("dentro a check "+ id + " - " +!(this.fav[id]) );
      DataService.setFavorite(id,!(this.fav[id]));
      this.fav[id]=!(this.fav[id]); // aggiorno il valore 
      this.fav=DataService.getFavorite(); // risetto fav con i cambiamenti --> parte il watcher
    },
    getSelectGame: function(){
        console.log("ueue");
        let k = 0;
        let arr= [];
        for(let i = 0; i < this.games.length; i++){
          //se il gioco ha una durata minima di massimo 30 min e una massima di massimo 60 min, 
          //viene reputato come gioco veloce e lo si aggiunge all'array con tutti i giochi
          //se dura di più non viene aggiunto 
            if(this.fav[this.games[i].id]!=undefined&&this.fav[this.games[i].id]==true){
                arr[k]=this.games[i];
                k++
            }
        }
        console.log(arr);
        return arr
//         let trovato;
//         let c;
//         if(this.fav.length!=0)
//         {
//             //this.isVoid=false;
//             console.log("0000");
//             console.log(this.fav.__ob);
//             console.log(this.fav);
//             for (let i in this.fav) {
//                 c=0;
//                 trovato=false;
//                 while (!trovato) {
//                     if (this.games[c].id==i) {
//                         console.log(this.games[c]);
//                         this.selectFav[c].push(this.games[c]);
//                         trovato=true;
//                     }
//                     c++;
//                 }
//             }
//         }
//         else
//         {
//             this.isVoid=true;
//         }
     }
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
.titolo{
  margin-left: 1em;
}
</style>


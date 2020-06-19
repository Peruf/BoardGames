<template>

        <!---- pagina sbagliata -->


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
      gamePreferiti: [],
      selectFav: [],
      isVoid: false,
      loading: false,
      limit: 20,
      fav: [],
      esistenzaPreferiti: false
    };
  },
  watch:{ // dovrebbe aggiornarmi i cuori
    fav: function(){
      console.log("e cambiato");
    }
  },
  created: function() {
    
    DataService.getFavorite().then(data =>{
      this.fav = [];

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

      console.log(this.fav);
      console.log(this.fav[0]);
    });

    DataService.getGames().then(data => {
      
      this.games = data.data.games;

      
      for (let i = 0; i <this.games.length; i++) {
        
        // console.log(this.games[i].name);
        
        for (let j = 0; j < this.fav.length; j++) {
          // console.log(this.fav[j]);

          if (this.games[i].name === this.fav[j]) {
            
            this.gamePreferiti.push(this.games[i]);

          }
        }

      }

      console.log(this.gamePreferiti);
      console.log(this.gamePreferiti[0]);
      console.log(this.gamePreferiti[0].name);
      console.log(this.gamePreferiti[1]);
      console.log(this.gamePreferiti[1].name);

      // console.log(this.games.length);
      
      // console.log(this.games[0].name);
      
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


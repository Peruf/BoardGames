<template>
  <div class="md-layout md-alignment-top-center game">
      <!-- voglio che i game siano una card 
        https://www.boardgameatlas.com/api/search?name=Azul&client_id=vuxWmH7cLW per guardare le caratterisctiche dei giochi
      -->
      <md-card class="md-layout-item" v-if="game"> <!-- la card si mostra solo se c'è un game -->
          <md-card-header class="md-layout">
            <div class="md-layout md-gutter">
                <md-card-media md-medium class="md-layout-item md-size-10" >
                    <img :src="game.images.medium" class="media"> <!-- url dinamico del game -->
                </md-card-media>
                <div class="md-layout-item">
                    <md-card-header-text>
                        <span class="md-title md-layout capitalize name"><b>{{game.name}}</b></span> <!-- prendo il nome del game -->
                    </md-card-header-text> 
                    <div class="md-subhead descrizione">{{game.description}}</div><!-- descrizione del game -->
                </div>
            </div>
          </md-card-header>    
          <md-card-content>
              <!-- creo una tabella con tutte le caratteristiche del gioco che possano interessare -->
              <md-table>
                  <md-table-row>
                    <md-table-cell class="upper"><b>Numero giocatori</b></md-table-cell>
                    <md-table-cell>Da {{game.min_players}} a {{game.max_players}}</md-table-cell>
                  </md-table-row>
                  <md-table-row>
                    <md-table-cell class="upper"><b>Età minima</b></md-table-cell>
                    <md-table-cell>{{game.min_age}}</md-table-cell>
                  </md-table-row>
                  <md-table-row>
                    <md-table-cell class="upper"><b>Prezzo</b></md-table-cell>
                    <md-table-cell>{{game.price}} $</md-table-cell>
                  </md-table-row>
                  <md-table-row>
                    <md-table-cell class="upper"><b>Tempo di gioco</b></md-table-cell>
                    <md-table-cell>Da {{game.min_playtime}} a {{game.max_playtime}} minuti</md-table-cell>
                  </md-table-row>
              </md-table>
              <h3 v-if="stats && stats.total > 0">
                    <b>Voti totali:</b>
                    {{stats.total}}
                    <br />
                    <b>Media voti:</b>
                    {{stats.avg}}
                </h3>
                <h3 v-if="stats.total == 0 || !stats">Non ci sono ancora voti</h3>
                <span>Mio voto:</span>
                <span v-for="s in [1,2,3,4,5]" :key="s" @click="vote(s)">
                    <md-icon>{{(stats.userVote >= s) ? 'star' : 'star_outline' }}</md-icon>
                </span>
				<md-card-content class="red md-subhead" v-if="voted">Hai già votato</md-card-content>
          </md-card-content>
      </md-card>
      
  </div>
</template>


<script>
import dataservice from '@/dataservice.js'

export default {
    data: function(){
        return{
            game: null,
            stats: {},
            voted: false
        }
    },
    watch: {
        $route: function(){
            this.load();
        }
    },
    created: function(){
        this.load();
    },
    methods: {
        load: function(){
            dataservice.getGame(this.$route.params.name).then((data) => {
                this.game = data.data.games[0];
                //console.log(this.game);
                dataservice.getVote(this.game.name).then(stats => {
                    this.stats = stats;
                });
                
            });
            
        },
        vote: function(s) {
            if (this.stats.userVote > 0) {
                    this.voted = true;
            } 
            else {
                dataservice.setVote(this.game.name, s).then(() => {
                    this.load();
                });
                this.voted = false;
            }
        },
    }
}
</script>

<style scoped>
.md-layout {
    height: 100%;
}

.name{
    padding-left: 1%;
}
.descrizione{
    margin-top: 1em !important;
    text-align: left;
    padding-left: 1%;
}
.nobot{
    border-bottom-width: 0ch;
}
.red{
    color: red;
}
.game{
    height: 1000px;
}
</style>
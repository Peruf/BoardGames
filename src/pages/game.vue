<template>

    <div class="md-layout md-alignment-top-center game">
        <!-- voglio che i game siano una card 
        https://www.boardgameatlas.com/api/search?name=Azul&client_id=vuxWmH7cLW per guardare le caratterisctiche dei giochi
        -->
        <md-card class="md-layout-item md-large-size-90 md-xsmall-size-95" v-if="game"> <!-- la card si mostra solo se c'è un game -->

                <!--  --------------------   IMMAGINE DEL GIOCO  --------------------- -->
                <md-card-media class="cell" md-radio="1:1">
                        <img :src="game.images.large" alt="Game image"> <!-- url dinamico del game -->
                </md-card-media>
                <!--  ^^^^^^^^^^^^^^^^^^^^   IMMAGINE DEL GIOCO  ^^^^^^^^^^^^^^^^^^^^ -->
                
                <!--  --------------------   TITOLO DEL GIOCO  --------------------- -->
                <md-card-header class="md-layout">
                    <!--  -------------------   IMMAGINE DEL GIOCO  -------------------- -->
                    
                    <md-card-media md-big class="md-layout-item pc">
                        <img :src="game.images.large" alt="Game image" > <!-- url dinamico del game -->
                    </md-card-media>
                    <!--  ^^^^^^^^^^^^^^^^^^^   IMMAGINE DEL GIOCO  ^^^^^^^^^^^^^^^^^^^^ -->
                    <md-card-header-text class="md-layout-item md-xsmall-size-100">
                        <div class="md-caption">{{game.year_published}}</div>
                        <div>
                            <span class="md-title">{{game.name}}</span>
                            <md-button class="md-icon-button fav mls" @click="mettiPreferito()">
                                <md-icon v-if="preferitoSaved==true" class="favorite">favorite</md-icon>
                                <md-icon v-else >favorite_outline</md-icon>
                            </md-button>   
                        </div>
                        
                        <div class="md-subhead">
                            <md-icon>attach_money</md-icon>
                            <span>{{game.price}} $</span> 
                        </div>
                    
                     <!--  ^^^^^^^^^^^^^^^^^^^^^^  TITOLO DEL GIOCO  ^^^^^^^^^^^^^^^^^^^^^ -->
                
                    <!--  ------------------   STELLINE E VALUTAZIONE  ------------------- -->
                    <div>
                        <!-- --------------- ICONE DELLE STELLINE --------------- -->
                        <span v-for="s in [1,2,3,4,5]" :key="s" @click="vote(s)" v-on:mouseover="star_over(s)" v-on:mouseout="star_out()">
                            <md-icon class="star" v-if="stats.userVote >= s && stats.userVote">star</md-icon>
                            <md-icon class="starO" v-else-if="stats.userVote < s && stats.userVote">star_outline</md-icon>
                            <md-icon v-if="stats.avg >= s && !stats.userVote">star</md-icon>
                            <md-icon v-else-if="stats.avg < s && !stats.userVote">star_outline</md-icon>
                        </span>
                        <!-- ^^^^^^^^^^^^^^^ ICONE DELLE STELLINE ^^^^^^^^^^^^^^^ -->
                    
                        <span class="md-caption ml1" v-if="stats && stats.total > 0">Voto medio: {{stats.avg}}</span>
                        <md-icon class="mls" v-if="stats && stats.total > 0">star</md-icon>
                        <span class="md-caption mls" v-if="stats && stats.total > 0">{{stats.total}} voti</span>
                    </div>
                    
                    </md-card-header-text>
                    <!--  ^^^^^^^^^^^^^^^^^^^   STELLINE E VALUTAZIONE  ^^^^^^^^^^^^^^^^^^^ -->
                    
                </md-card-header>     



            <!-- -------------------------- ALTRE INFORMAZIONI SUL GIOCO -------------------------- -->
            <md-card-content>
                <h1 class="md-title mt2">Descrizione</h1>
                <div class="ml1 mt2 mr1 descrizione">{{game.description}}</div> <!-- descrizione del game -->
                <h3 class="md-title mt2">Altre informazioni</h3>
                <div class="mt2">
                    <div class="ml1">
                        <md-icon>people_outline</md-icon>
                        <span class="ml1">Da {{game.min_players}} a {{game.max_players}} giocatori<br /></span> <!-- Numero giocatori minimo e massimo per giocare -->
                    </div>
                    <div class="ml1">
                        <md-icon>face</md-icon>
                        <span class="ml1">Età minima {{game.min_age}} anni <br /></span>                               <!-- Età minima per giocare -->
                    </div>
                    <div class="ml1">
                        <md-icon>access_time</md-icon>
                        <span class="ml1">Da {{game.min_playtime}} a {{game.max_playtime}} minuti</span> <!-- Tempo minimo e massimo per giocare -->
                    </div>
                </div>
            </md-card-content>
            <!-- ^^^^^^^^^^^^^^^^^^^^^^^^^^^ ALTRE INFORMAZIONI SUL GIOCO ^^^^^^^^^^^^^^^^^^^^^^^^^^ -->

            <!-- ---------------------------------- ZONA COMMENTI ----------------------------------- -->
            <md-card-area>

                <md-card-header>

                    <h2 class="md-title">Commenti</h2>

                </md-card-header>

                <md-card-content>

                    <!-- NEL CASO IN CUI NON CI SIANO COMMENTI -->
                    <span v-if="!esistenzaCommenti">Non ci sono commenti per questo gioco al momento. Scrivine uno tu!</span>
                    
                    <!-- ---------- TABELLA CON I COMMENTI ---------- -->
                    <md-table v-if="esistenzaCommenti">
                        <md-table-row v-for="commentoDB in commentiDB" :key="commentoDB"> <!-- mostro ogni commento trovato nel db su questo gioco -->
                            <md-table-cell>
                                {{ commentoDB }}
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                    <!-- ^^^^^^^^^^ TABELLA CON I COMMENTI ^^^^^^^^^^ -->

                </md-card-content>

            </md-card-area>
            <!-- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ZONA COMMENTI ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ -->

            <!-- ---------------------------------- ZONA COMMENTO PERSONALE ---------------------------------- -->
            <md-card-area>

                <md-card-header>

                    <h2 class="md-title">Scrivi il tuo commento</h2>

                </md-card-header>

                <md-card-content>
                    
                    
                    
                    
                    <!-- ------------- CAMPO PER SCRIVERE IL COMMENTO -------------  -->
                    <md-field v-if="!errore">
                        <label>Commento</label>
                        <md-textarea v-model="commento" required></md-textarea>
                    </md-field>
                    <!-- ^^^^^^^^^^^^^ CAMPO PER SCRIVERE IL COMMENTO ^^^^^^^^^^^^^  -->

                    <!-- -------- CAMPO PER SCRIVERE IL COMMENTO CON ERRORI CAMPO INVALIDO --------  -->
                    <md-field v-if="errore" class="md-invalid"> <!-- classe per l'errore -->
                        <label>Commento</label>
                        <md-textarea v-model="commento" required></md-textarea>
                        <span class="md-error">Non hai scritto niente!</span> <!-- messaggio di errore -->
                    </md-field>
                    <!-- ^^^^^^^^ CAMPO PER SCRIVERE IL COMMENTO CON ERRORI CAMPO INVALIDO ^^^^^^^^  -->
                    <!-- ---------- ZONA EVENTUALITA' CHE HA GIA' VOTATO ---------- -->

                    <span v-if="autorePresente" class="red ml1">Hai già commentato questo gioco!</span>

                    <!-- ^^^^^^^^^^ ZONA EVENTUALITA' CHE HA GIA' VOTATO ^^^^^^^^^^ -->
                    <div class="mt2">
                        <md-button v-if="!autorePresente" class="md-primary" v-on:click="salva">Salva commento</md-button> <!-- visibile solo quando non si ha ancora creato un commento -->
                        <md-button v-if="autorePresente" class="md-primary" v-on:click="salva">Modifica commento</md-button> <!-- visibile solo quando si ha già creato un commento -->
                        <md-button v-if="autorePresente" class="md-primary" @click="active = true">Elimina commento</md-button> <!-- visibile solo quando si ha già creato un commento -->
                    </div>
                    <!-- ------------- FINESTRA DI DIALOGO PER CANCELLARE IL COMMENTO -------------  -->
                    <md-dialog-confirm
                        :md-active.sync="active"
                        md-title="Vuoi davvero eliminare il tuo commento?"
                        md-content="Una volta eliminato non potrà più essere recuperato."
                        md-confirm-text="Elimina commento"
                        md-cancel-text="Annulla"
                        @md-confirm="onConfirm" 
                    />
                    <!-- ^^^^^^^^^^^^^ FINESTRA DI DIALOGO PER CANCELLARE IL COMMENTO ^^^^^^^^^^^^^  -->

                </md-card-content>

            </md-card-area>
            <!-- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ZONA COMMENTO PERSONALE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ -->

      </md-card>

    <!-- ---------------------------- SNACKBAR ----------------------------  -->
    <!-- Lo snack bar si mostra solo quando la variabile 'mostraSnackbar' viene messa a true. Poi sparisce da solo -->
    <md-snackbar md-position="center" :md-active.sync="mostraSnackbar" md-persistent> 
        <span> {{ msgSnackbar }} </span> <!-- Il m essaggio all'interno cambia a seconda di quello che si vuole comunicare -->
    </md-snackbar>
    <!-- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ SNACKBAR ^^^^^^^^^^^^^^^^^^^^^^^^^^^^  -->
      
  </div>
</template>


<script>
import dataservice from '@/dataservice.js' // richiamo il file con le funzioni

export default {
    data: function(){
        return{
            game: null, //contiene le informazioni riguardo al gioco
            stats: {},  //contiene le statistiche riguardo ai voti del gioco
            commentiDB: [], //per contenere i commenti provenienti dal DB
            esistenzaCommenti: false, //per controllare se esistono commenti
            autorePresente: false, //per controllare se l'autore ha già scritto o no un commento
            commento: null, // il commento scritto dall'utente
            errore: false, //nel caso che lascino il campo per il commento vuoto
            active: false, //per il messaggio "sei sicuro di voler cancellare?"
            mostraSnackbar: false, //per lo snackbar... in caso si abbia fame
            msgSnackbar: "", // messaggio per lo snackbar
            realVote: null, //per le stelline
            preferitoSaved: false, //per il cuoricino
            fav: [],
            
        }
    },
    watch: {
        $route: function(){
            this.load();
        },
    },
    created: function(){
        this.load();
    },
    methods: {
        load: function(){       // funzione che si attiva all'avvio
            
            this.commento = null;

            dataservice.getGame(this.$route.params.name).then((data) => {       // vado a prendermi i giochi nelle API
                this.game = data.data.games[0];
                
                // PARTE PER I VOTI ++++++++++++++++++++++++++++++++
                dataservice.getVote(this.game.name).then(stats => {
                    this.stats = stats;
                });
                // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

                // PARTE PER Il CUORICINO ++++++++++++++++++++++++++++++++
                dataservice.getFavorite().then(data =>{
                    this.fav = [];

                    // +++++ CONTROLLO CHE SIANO STATI STROVATI DEI PREFERITI NEL DB +++++
                    if (data.arrayPreferiti.length > 0) {

                        for (let i=0; i<data.arrayPreferiti.length; i++) {

                            this.fav.push(data.arrayPreferiti[i]); //infilo i preferiti trovati all'interno dell'array

                        }

                        for (let j = 0; j < this.fav.length; j++) {

                            if (this.fav[j] === this.game.name) {
                                console.log("Varda che sto gioco è nei preferiti!");
                                this.preferitoSaved = true;
                            }

                        }

                    } else {
                        console.log("Questo giono non è nei preferiti!");
                        this.preferitoSaved = false;  // nel caso che non siano stati trovati dei preferiti
                    }
                    // ^^^^^ CONTROLLO CHE SIANO STATI STROVATI DEI PREFERITI NEL DB ^^^^^

                    console.log(this.fav);
                    console.log(this.fav[0]);
                });
                // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



                // PARTE PER I COMMENTI +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                dataservice.cercaCommenti(this.game.name, localStorage.getItem("username")).then(data =>{
                    
                    this.commentiDB = [];

                    // +++++ CONTROLLO CHE SIANO STATI STROVATI DEI COMMENTI NEL DB +++++
                    if (data.arrayCommenti.length > 0) {

                        for (let i=0; i<data.arrayCommenti.length; i++) {
                        
                            this.commentiDB.push(data.arrayCommenti[i]); //infilo i commenti trovati all'interno dell'array
                            
                        }

                        this.esistenzaCommenti = true;

                    } else {
                        this.esistenzaCommenti = false;  // nel caso che non siano stati trovati commenti
                    }
                    // ^^^^^ CONTROLLO CHE SIANO STATI STROVATI DEI COMMENTI NEL DB ^^^^^

                    // +++++ CONTROLLO SE L'UTENTE ABBIA GIA VOTATO +++++
                    this.autorePresente = data.autorePresente;
                    if (this.autorePresente) {
                        
                        this.commento = data.commentoAutore; // se ha già votato allora mi salvo il suo commento specifico

                    }
                    // ^^^^^ CONTROLLO SE L'UTENTE ABBIA GIA VOTATO ^^^^^

                });
                
            });
            this.fav=dataservice.getFavorite();
            
        },
        vote: function(s) {     // FUNZIONE PER GESTIRE I VOTI
            
                dataservice.setVote(this.game.name, s).then(() => {
                    this.load();                
                });                             // SALVO IL VOTO SUL DB
            
        },
        salva: function() {     // FUNZIONE PER SALVARE IL COMMENTO SU DB
            
            if (this.commento) {
                this.errore = false;
                
                dataservice.saveCommento(this.commento, localStorage.getItem("username"), this.game.name);

                this.load();

                // PREPARO LO SNACKBAR PER AVVISARE DELLA BUONA RIUSCITA DEL CARICAMENTO SU DB
                this.msgSnackbar = "Commento postato!";
                this.mostraSnackbar = true;


            } else {
                
                // NEL CASO IN CUI L'UTENTE NON ABBIA SCRITTO NULLA FACCIO APPARIRE I MESSAGGI DI ERRORE
                this.errore = true;
            }

        },
        onConfirm () {  // FUNZIONE PER GESTIRE L'ELIMINAZIONE DEL COMMENTO
            let doc = "";
            doc = localStorage.getItem("username") +"-"+ this.game.name;  // recupero il nome del documento che contiene il commento per eliminarlo
            
            dataservice.cancellaCommento(doc); // passo il doc alla funzione

            this.commento = null; // svuoto il commento
            this.load();
            
            // PREPARO LO SNACKBAR PER AVVISARE DELLA BUONA RIUSCITA DELLA CANCELLAZIONE SU DB
            this.msgSnackbar = "Commento eliminato!";
            this.mostraSnackbar = true;

        },
        star_over: function(index) {
            this.realVote = this.stats.userVote;
            this.stats.userVote = index; 
        },
        star_out: function() {
            this.stats.userVote = this.realVote;
        },
        mettiPreferito: function() {

            if (this.preferitoSaved) {
                let doc = localStorage.getItem("username") + "-" + this.game.name;
                dataservice.cancellaPreferito(doc);

                console.log("LA FUNZIONE HA TERMINATO.");

                this.preferitoSaved = false;

            } else {
                dataservice.savePreferito(this.game.name);

                console.log("LA FUNZIONE HA TERMINATO.");
                this.preferitoSaved = true;
            }

            this.load();
        }
    }
}
</script>

<style scoped> 
.fav{
    vertical-align: super;
}
.md-card {
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}

.md-card-header-text{
    padding-left: 5vh;
}

.star, .favorite{
    color: rgb(134,217,71)!important;
}
.black{
    color: black!important;
}
.red{
    color: red !important;
    opacity: 64%;
}
.mls{
    margin-left: 0.2vw !important;
}
.ml1{
    margin-left: 1vw !important;
}
.mt1{
    margin-top: 1vh !important;
}
.mt2{
    margin-top: 2vh !important;
}
.mr1{
    margin-right: 1vw !important;
}
.descrizione{
    text-align: justify;
}
.cell{
    display: none;
}
@media only screen and (max-width: 600px) {
  img{
    object-fit: scale-down;
  }
  .cell{
    display: inline-block;
  }
  .pc{
      display: none;
  }

  .md-card-header-text{
      padding: 0;
  }
}
</style>
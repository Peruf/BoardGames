<template>

    <div class="md-layout md-alignment-top-center game">
        <!-- voglio che i game siano una card 
        https://www.boardgameatlas.com/api/search?name=Azul&client_id=vuxWmH7cLW per guardare le caratterisctiche dei giochi
        -->
        <md-card class="md-layout-item" v-if="game"> <!-- la card si mostra solo se c'è un game -->

            <md-card-area md-inset>

                <!--  -------------------   IMMAGINE DEL GIOCO  -------------------- -->
                <md-card-media md-ratio="16:9">
                    <img :src="game.images.large" alt="Game image"> <!-- url dinamico del game -->
                </md-card-media>
                <!--  ^^^^^^^^^^^^^^^^^^^   IMMAGINE DEL GIOCO  ^^^^^^^^^^^^^^^^^^^^ -->

                <!--  --------------------   TITOLO DEL GIOCO  --------------------- -->
                <md-card-header>
                    <h1 class="md-title">{{game.name}}</h1> <!-- prendo il nome del game -->

                    <div class="md-subhead">
                        
                        <md-icon>attach_money</md-icon>
                        <span>{{game.price}} $</span>       <!-- prendo il prezzo del game -->

                    </div>

                </md-card-header>
                <!--  ^^^^^^^^^^^^^^^^^^^^^^  TITOLO DEL GIOCO  ^^^^^^^^^^^^^^^^^^^^^ -->

                
                <md-card-content>
                    <!--  ------------------   STELLINE E VALUTAZIONE  ------------------- -->
                    <div>
                        <h3 v-if="stats && stats.total > 0"> <!-- Mostra solo se ci sono voti -->
                            <b>Voti totali:</b>
                            {{stats.total}}
                            <br />
                            <b>Media voti:</b>
                            {{stats.avg}}
                        </h3>

                        <h3 v-if="stats.total == 0 || !stats">Non ci sono ancora voti</h3> <!-- Nel caso non ci siano voti -->

                        <span>Mio voto:</span>

                        <!-- --------------- ICONE DELLE STELLINE --------------- -->
                        <span v-for="s in [1,2,3,4,5]" :key="s" @click="vote(s)">
                            <md-icon>{{(stats.userVote >= s) ? 'star' : 'star_outline' }}</md-icon>
                        </span>
                        <!-- ^^^^^^^^^^^^^^^ ICONE DELLE STELLINE ^^^^^^^^^^^^^^^ -->

                        <span class="red md-subhead" v-if="voted">Hai già votato</span> <!-- Nel caso si provi a votare di nuovo -->

                    </div>
                    <!--  ^^^^^^^^^^^^^^^^^^^   STELLINE E VALUTAZIONE  ^^^^^^^^^^^^^^^^^^^ -->
                    
                    <br>
                    
                    <!-- ---------- DESCRIZIONE GIOCO ---------- -->
                    {{game.description}} <!-- descrizione del game -->
                </md-card-content>

            </md-card-area>

            <!-- -------------------------- ALTRE INFORMAZIONI SUL GIOCO -------------------------- -->
            <md-card-content>

                <h3 class="md-subheading">Altre informazioni</h3>

                <md-icon>people_outline</md-icon>
                <span>Da {{game.min_players}} a {{game.max_players}}</span> <!-- Numero giocatori minimo e massimo per giocare -->

                <md-icon>face</md-icon>
                <span>{{game.min_age}}</span>                               <!-- Età minima per giocare -->

                <md-icon>access_time</md-icon>
                <span>Da {{game.min_playtime}} a {{game.max_playtime}} minuti</span> <!-- Tempo minimo e massimo per giocare -->

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
                    
                    <!-- ---------- ZONA EVENTUALITA' CHE HA GIA' VOTATO ---------- -->

                    <span v-if="autorePresente">Hai già commentato questo gioco!</span>

                    <!-- ^^^^^^^^^^ ZONA EVENTUALITA' CHE HA GIA' VOTATO ^^^^^^^^^^ -->
                    
                    
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

                    <md-button v-if="!autorePresente" class="md-primary" v-on:click="salva">Salva commento</md-button> <!-- visibile solo quando non si ha ancora creato un commento -->
                    <md-button v-if="autorePresente" class="md-primary" v-on:click="salva">Modifica commento</md-button> <!-- visibile solo quando si ha già creato un commento -->
                    <md-button v-if="autorePresente" class="md-primary" @click="active = true">Elimina commento</md-button> <!-- visibile solo quando si ha già creato un commento -->

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
            voted: false, //per controllare se il gioco è stato votato dall'utente
            commentiDB: [], //per contenere i commenti provenienti dal DB
            esistenzaCommenti: false, //per controllare se esistono commenti
            autorePresente: false, //per controllare se l'autore ha già scritto o no un commento
            commento: null, // il commento scritto dall'utente
            errore: false, //nel caso che lascino il campo per il commento vuoto
            active: false, //per il messaggio "sei sicuro di voler cancellare?"
            mostraSnackbar: false, //per lo snackbar... in caso si abbia fame
            msgSnackbar: "", // messaggio per lo snackbar
            
        }
    },
    watch: {
        $route: function(){
            this.load();
            this.voted = false;
        }
    },
    created: function(){
        this.load();
    },
    methods: {
        load: function(){       // funzione che si attiva all'avvio
            
            dataservice.getGame(this.$route.params.name).then((data) => {       // vado a prendermi i giochi nelle API
                this.game = data.data.games[0];
                
                // PARTE PER I VOTI ++++++++++++++++++++++++++++++++
                dataservice.getVote(this.game.name).then(stats => {
                    this.stats = stats;
                });
                // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
            
        },
        vote: function(s) {     // FUNZIONE PER GESTIRE I VOTI
            if (this.stats.userVote > 0) {
                    this.voted = true;          // CONTROLLO SE HA GIA' VOTATO
            } 
            else {
                dataservice.setVote(this.game.name, s).then(() => {
                    this.load();                
                });                             // SALVO IL VOTO SUL DB
                this.voted = false;
            }
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
    }
}
</script>

<style scoped>

</style>
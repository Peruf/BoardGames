<template>

    <div class="md-layout md-alignment-top-center game">
        <!-- voglio che i game siano una card 
        https://www.boardgameatlas.com/api/search?name=Azul&client_id=vuxWmH7cLW per guardare le caratterisctiche dei giochi
        -->
        <md-card class="md-layout-item" v-if="game"> <!-- la card si mostra solo se c'è un game -->

            <md-card-area md-inset>

                <!-- IMMAGINE DEL GIOCO -->
                <md-card-media md-ratio="16:9">
                    <!-- <img src="https://vuematerial.io/assets/examples/card-example.jpg" alt="Coffee House"> -->
                    <img :src="game.images.large" alt="Game image"> <!-- url dinamico del game -->
                </md-card-media>

                <!-- TITOLO GIOCO -->
                <md-card-header>
                    <h1 class="md-title">{{game.name}}</h1> <!-- prendo il nome del game -->

                    <div class="md-subhead">
                        
                        <md-icon>attach_money</md-icon>
                        <span>{{game.price}} $</span>

                    </div>

                </md-card-header>

                <!-- DESCRIZIONE GIOCO -->
                <md-card-content>
                    <div>qui le stelline direi</div>
                    <br>
                    {{game.description}} <!-- descrizione del game -->
                </md-card-content>

            </md-card-area>

            <!-- ALTRE INFORMAZIONI GIOCO -->
            <md-card-content>

                <h3 class="md-subheading">Altre informazioni</h3>



                <md-icon>people_outline</md-icon>
                <span>Da {{game.min_players}} a {{game.max_players}}</span>



                <md-icon>face</md-icon>
                <span>{{game.min_age}}</span>



                <md-icon>access_time</md-icon>
                <span>Da {{game.min_playtime}} a {{game.max_playtime}} minuti</span>

            </md-card-content>

            <!-- ZONA COMMENTI -->
            <md-card-area>

                <md-card-header>

                    <h2 class="md-title">Commenti</h2>

                </md-card-header>

                <md-card-content>

                    <!-- NEL CASO IN CUI NON CI SIANO COMMENTI -->
                    <span v-if="!esistenzaCommenti">Non ci sono commenti per questo gioco al momento. Scrivine uno tu!</span>
                    
                    <!-- TABELLA CON I COMMENTI -->
                    <md-table v-if="esistenzaCommenti">
                        <md-table-row v-for="commentoDB in commentiDB" :key="commentoDB">
                            <md-table-cell>
                                {{ commentoDB }}
                            </md-table-cell>
                        </md-table-row>
                    </md-table>

                </md-card-content>

            </md-card-area>
            <!-- ZONA COMMENTI -->

            <!-- ZONA COMMENTO PERSONALE -->
            <md-card-area>

                <md-card-header>

                    <h2 class="md-title">Scrivi il tuo commento</h2>

                </md-card-header>

                <md-card-content>
                    
                    <span v-if="autorePresente">Hai già commentato questo gioco!</span>
                    
                    <!-- CON ERRORI -->
                    <md-field v-if="errore" class="md-invalid">
                        <label>Commento</label>
                        <md-textarea v-model="commento" required></md-textarea>
                        <span class="md-error">Non hai scritto niente!</span>
                    </md-field>
                    <!-- SENZA ERRORI -->
                    <md-field v-if="!errore">
                        <label>Commento</label>
                        <md-textarea v-model="commento" required></md-textarea>
                    </md-field>

                    <md-button v-if="!autorePresente" class="md-primary" v-on:click="salva">Salva commento</md-button>
                    <md-button v-if="autorePresente" class="md-primary" v-on:click="salva">Modifica commento</md-button>
                    <md-button v-if="autorePresente" class="md-primary" @click="active = true">Elimina commento</md-button>

                    <md-dialog-confirm
                        :md-active.sync="active"
                        md-title="Vuoi davvero eliminare il tuo commento?"
                        md-content="Una volta eliminato non potrà più essere recuperato e bla bla bla"
                        md-confirm-text="Elimina commento"
                        md-cancel-text="Annulla"
                        @md-confirm="onConfirm" 
                    />

                </md-card-content>

            </md-card-area>
            <!-- ZONA COMMENTO PERSONALE -->

      </md-card>

    <md-snackbar md-position="center" :md-active.sync="mostraSnackbar" md-persistent>
        <span> {{ msgSnackbar }} </span>
    </md-snackbar>
      
  </div>
</template>


<script>
import dataservice from '@/dataservice.js'

export default {
    data: function(){
        return{
            game: null,
            stats: {},
            voted: false,
            commentiDB: [], //per contenere i commenti
            esistenzaCommenti: false, //per controllare se esistono commenti
            autorePresente: false, //per controllare se l'autore ha già scritto o no un commento
            commento: null, // il commento scritto dall'utente
            errore: false, //nel caso che lascino il campo per il commento vuoto
            active: false, //per il messaggio "sei sicuro di voler cancellare?"
            mostraSnackbar: false, //per lo snackbar... in caso si abbia fame
            msgSnackbar: "PROVA", // messaggio per lo snackbar
            
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
        load: function(){
            console.log("LOAD");
            
            dataservice.getGame(this.$route.params.name).then((data) => {
                this.game = data.data.games[0];
                console.log("Gioco caricato!");
                
                // PARTE PER I VOTI
                // dataservice.getVote(this.game.name).then(stats => {
                //     this.stats = stats;
                // });

                // PARTE PER I COMMENTI ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                dataservice.cercaCommenti(this.game.name, localStorage.getItem("username")).then(data =>{
                    console.log("<<< Siamo tornati in GAME! >>>");
                    
                    console.log("Questo è l'array che è tornato:");
                    console.log(data.arrayCommenti);
                    console.log("Esso contiene " + data.arrayCommenti.length + " elementi.");

                    this.commentiDB = [];

                    if (data.arrayCommenti.length > 0) {

                        for (let i=0; i<data.arrayCommenti.length; i++) {
                        
                            this.commentiDB.push(data.arrayCommenti[i]);
                            
                        }

                        this.esistenzaCommenti = true;

                    } else {
                        this.esistenzaCommenti = false;
                    }

                    this.autorePresente = data.autorePresente;
                    if (this.autorePresente) {
                        console.log("Abbiamo già commentato!");
                        this.commento = data.commentoAutore;
                    } else {
                        console.log("Possiamo commentare!");
                    }

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
        salva: function() {
            
            if (this.commento) {
                this.errore = false;
                console.log('Questo è il commento che è stato scritto da ' + localStorage.getItem("username") + ': ' + this.commento);
                console.log("Per il gioco: " + this.game.name);

                dataservice.saveCommento(this.commento, localStorage.getItem("username"), this.game.name);

                this.load();

                console.log("TERMINE DEL SALVATAGGIO");
                this.msgSnackbar = "Commento postato!";
                this.mostraSnackbar = true;


            } else {
                console.log("Non è stato scritto nessun commento!");
                this.errore = true;
            }

        },
        onConfirm () {
            let doc = "";
            doc = localStorage.getItem("username") +"-"+ this.game.name;
            
            console.log("Andiamo ad eliminare il doc: " + doc);

            dataservice.cancellaCommento(doc);

            console.log("<<< ELIMINAZIONE EFFETTUATA >>>");

            this.commento = null;
            this.load();
            
            this.msgSnackbar = "Commento eliminato!";
            this.mostraSnackbar = true;

        },
    }
}
</script>

<style scoped>

</style>
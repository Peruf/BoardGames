<template>
    <!-- Creo la navbar che sarà sempre presente e fissa durante la navigazione -->
    <div class="toolbar">
        <md-app-toolbar class="md-primary">

            <!-- SECTION START -->
            <div class="md-toolbar-section-start">

                <!-- ICONA HAMBURGER -->
                <md-button class="md-icon-button" @click="showNavigation = true" v-if="authenticated">
                    <md-icon>menu</md-icon>
                </md-button>

                <!-- TITOLO -->
                <span class="md-title" id="giochi">Giochi</span>

            </div>

            <!-- SECTION END -->
            <div class="md-toolbar-section-end" v-if="authenticated">

                <!-- BARRA DI RICERCA -->
                <md-autocomplete id="autocomplete"
                class="searchBar" 
                md-layout="box" 
                v-model="SelectedGame" 
                :md-options="searchOptions"
                @md-changed="search"
                @md-selected="select"
                >

                <label >Cerca un gioco</label>

                </md-autocomplete>
                <md-button id="search" class="md-icon-button search" @click="mostra()"><md-icon>search</md-icon></md-button>
                <md-button id="close" class="md-icon-button close" @click="chiudi()"><md-icon>clear</md-icon></md-button>
            </div>

        </md-app-toolbar>

        <!-- MENU LATERALE A SCOMPARSA -->
        <md-drawer :md-active.sync="showNavigation" md-swipeable>
            <!-- TITOLO DEL MENU LATERALE -->
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title black">Boardgames</span>
            </md-toolbar>

            <!-- LISTA ELEMENTI DEL MENU -->
            <md-list>
                <md-toolbar class="md-transparent" md-elevation="0">
                    Giochi
                </md-toolbar>
                <md-list-item @click="toPopular">
                    <md-icon>grade</md-icon>
                    <span class="md-list-item-text">Popolari</span>
                </md-list-item>

                <md-list-item @click="toTop">
                    <md-icon>whatshot</md-icon>
                    <span class="md-list-item-text">Top Rated</span>
                </md-list-item>

                <md-list-item @click="toFast">
                    <md-icon>schedule</md-icon>
                    <span class="md-list-item-text">Veloci</span>
                </md-list-item>

                <md-list-item @click="toYear">
                    <md-icon>today</md-icon>
                    <span class="md-list-item-text">Per anno</span>
                </md-list-item>

                <md-list-item @click="toPerson">
                    <md-icon>supervisor_account</md-icon>
                    <span class="md-list-item-text">Per giocatori</span>
                </md-list-item>

                <md-list-item @click="toFavorite">
                    <md-icon>favorite</md-icon>
                    <span class="md-list-item-text">Preferiti</span>
                </md-list-item>
                <md-toolbar class="md-transparent" md-elevation="0">
                    Altro
                </md-toolbar>
                <md-list-item @click="About">
                    <md-icon>info</md-icon>
                    <span class="md-list-item-text">About us</span>
                </md-list-item>
                <md-list-item @click="logout">
                    <md-icon>exit_to_app</md-icon>
                    <span class="md-list-item-text">Logout</span>
                </md-list-item>
            </md-list>

        </md-drawer>

    </div>
</template>

<script>
    import dataservice from '@/dataservice.js';

    export default {
        name: 'App',
        data: function() {
            return {
                showNavigation: false,
                SelectedGame: null,
                searchOptions: [],
                authenticated: dataservice.isAuthenticated(),
                windowWidth: 0, //variabile con il valore della larghezza
            };
        },
        watch: {
            $route: function() {
                this.authenticated = dataservice.isAuthenticated();
            },
            //ogni volta che la finestra cambia di grandezza c'è un watcher che aggiorna gli elementi
            windowWidth: function(){
                //se si fa il resize resetta sempre la visione da telefono e da computer
                if(this.windowWidth > 600){
                    document.getElementById("search").style.display = "none";
                    document.getElementById("giochi").style.display = "block";
                    document.getElementById("close").style.display = "none";
                    document.getElementById("autocomplete").style.display = "block";
                }
                else{
                    document.getElementById("search").style.display = "block";
                    document.getElementById("giochi").style.display = "block";
                    document.getElementById("close").style.display = "none";
                    document.getElementById("autocomplete").style.display = "none";
                }
            }
        },
        methods: {
            toggleMenu () {
                this.menuVisible = !this.menuVisible;
            },
            search: function(term) {
                term = term.charAt(0).toUpperCase() + term.slice(1);
                this.searchOptions = dataservice.searchGioco(term);
            },
            select: function(selected) {
                if (selected === this.$route.params.id) return;
                this.$router.push({path: '/game/' + selected});
            },
            toPopular: function(){
                this.showNavigation = false;
                this.$router.push({path: '/'});
            },
            toYear: function(){
                this.showNavigation = false;
                this.$router.push({path: '/order_by=year'});
            },
            toPerson: function(){
                this.showNavigation = false;
                this.$router.push({path: '/order_by=person'});
            },
            toFavorite: function(){
                this.showNavigation = false;
                this.$router.push({path: '/favorite'});
            },
            toFast: function(){
                this.showNavigation = false;
                this.$router.push({path: '/fast_games'});
            },
            toTop: function(){
                this.showNavigation = false;
                this.$router.push({path: '/top_rated'});
            },
            About: function(){
                this.showNavigation = false;
                this.$router.push({path: '/about_us'});
            },
            logout: function(){
                this.showNavigation = false;
                dataservice.Logout();
                this.$router.push({path: '/login'});
            },
            mostra: function(){
                document.getElementById("search").style.display = "none";
                document.getElementById("giochi").style.display = "none";
                document.getElementById("close").style.display = "block";
                document.getElementById("autocomplete").style.display = "block";
            },
            chiudi: function(){
                document.getElementById("search").style.display = "block";
                document.getElementById("giochi").style.display = "block";
                document.getElementById("close").style.display = "none";
                document.getElementById("autocomplete").style.display = "none";
            }
        },
        //Ogni volta che la finestra cambia dimensioni, la variabile windowWidth diventa la larghezza della finestra
        mounted() {
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
        }
    }
</script>

<style scoped>
.md-app-toolbar{
    flex-wrap: nowrap;
}
.search, .close{
      display:none;
  }
@media only screen and (max-width: 600px) {
  .md-autocomplete, .close{
      display:none;
  }
  .search{
      display: block;
  }
}
</style>

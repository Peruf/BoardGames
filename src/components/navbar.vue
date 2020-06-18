<template>
    <!-- Creo la navbar che sarà sempre presente e fissa durante la navigazione -->
    <div class="toolbar">
        <md-app-toolbar class="md-primary">

            <!-- SECTION START -->
            <div class="md-toolbar-section-start">

                <!-- ICONA HAMBURGER -->
                <md-button class="md-icon-button" @click="showNavigation = true">
                    <md-icon>menu</md-icon>
                </md-button>

                <!-- TITOLO -->
                <router-link to="/"><span class="md-title">Giochi</span></router-link>

            </div>

            <!-- MIDDLE SECTION -->
            
            <!-- -------------- -->


            <!-- SECTION END -->
            <div class="md-toolbar-section-end">

                <!-- BARRA DI RICERCA -->
                <md-autocomplete 
                class="searchBar" 
                md-layout="box" 
                v-model="SelectedGame" 
                :md-options="searchOptions"
                @md-changed="search"
                @md-selected="select"
                >

                <label >Cerca un gioco</label>

                </md-autocomplete>

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

                <md-list-item @click="About">
                    <md-icon>info</md-icon>
                    <span class="md-list-item-text">About us</span>
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
                searchOptions: []
            };
        },
        methods: {
            toggleMenu () {
                console.log("Dentro il menu");
                this.menuVisible = !this.menuVisible
            },
            search: function(term) {
                console.log("Ciao, sei dentro SEARCH");
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
        }
    }
</script>

<style scoped>
.searchBar {
  max-width: 250px;
}
</style>
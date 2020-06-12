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
                <span class="md-title">Giochi</span>

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
                <span class="md-title">My App name</span>
            </md-toolbar>

            <!-- LISTA ELEMENTI DEL MENU -->
            <md-list>
                <md-list-item>
                    <md-icon>move_to_inbox</md-icon>
                    <span class="md-list-item-text">Inbox</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>send</md-icon>
                    <span class="md-list-item-text">Sent Mail</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>delete</md-icon>
                    <span class="md-list-item-text">Trash</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>error</md-icon>
                    <span class="md-list-item-text">Spam</span>
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
            }
        }
    }
</script>

<style scoped>
.searchBar {
  max-width: 100%;
}
</style>
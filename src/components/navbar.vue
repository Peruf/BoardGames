<template>
    <md-app-toolbar class="md-primary nav">
        <md-button to="/" class="md-icon-button ">
            <md-icon>home</md-icon>
        </md-button>
        <!-- <md-button to="/1" class="link">1</md-button>
        <md-button to="/2" class="link ">2</md-button>
        <md-button to="/3" class="link ">3</md-button>
        <md-button to="/4" class="link ">4</md-button>
        <md-button to="/5" class="link  ">5</md-button> 
        <div class="md-toolbar-section-end">
            <md-autocomplete class="md-layout-item search" md-layout="box" v-model="SelectedGame" :md-options="searchOptions" @md-changed="search" @md-selected="go">
                <label class="md-accent">Search...</label>
            </md-autocomplete>
        </div> -->
    </md-app-toolbar>  
</template>

<script>
    import dataservice from '@/dataservice.js'

    export default {
        name: 'Navbar',
        data: function() {
            return {
                showNav: false,
                SelectedGame: null,
                searchOptions: [],
            }
        },
        methods:{
            search: function(text){
                this.searchOptions = dataservice.searchGame(text);
            },
            go: function(found){
                this.$router.push({ path: '/game/' + found});
            }
        },
    }
</script>

<style scoped>
.search{
    max-width: 300px;
}
</style>>
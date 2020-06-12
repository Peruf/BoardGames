<template>
  <div class="home">
    <md-card class=" md-large-size-10 md-medium-size-5 md-small-size-25 md-xsmall-size-100" md-with-hover v-for="game in games" :key="game.name" :to="'/game/' + game.name">
      <!-- <router-link :to="'/game/' + game.name"> -->
        <md-ripple>
          <md-card-media md-ratio="1-1">
            <img :src="game.images.original" class="APIimg">
          </md-card-media>

          <md-card-header>
            <div><b>{{game.name}}</b></div>
          </md-card-header>
        </md-ripple>
      <!-- </router-link> -->
    </md-card>
    <md-progress-spinner md-mode="indeterminate" :md-diameter="20" :md-stroke="2" v-if="loading" class="md-accent" ></md-progress-spinner>
  </div>
</template>
      
<script>
import DataService from '@/dataservice.js'

export default {
  name: 'HomePage',
  data: function(){
    return {
      games: [],
      loading: false,
      limit: 20,
    }
  },
  created: function() {
    this.loading = true;
    DataService.getGames().then(data => {
      this.games = data.data.games;
      this.loading = false;
    });
  }
}

</script>


<style scoped>
.md-card {
    width: 200px;
    margin: 10px;
    display: inline-block;
    vertical-align: top;
  }
.home {
  display: flex; /* or inline-flex */
  flex-wrap: wrap;
  justify-content: center;
}
</style>


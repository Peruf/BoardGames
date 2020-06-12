<template>
  <div class="home">
    <div class="md-layout md-gutter md-alignment-top-space-around">
        <md-card class="card md-layout-item md-medium-size-25 md-small-size-25 md-xsmall-size-95" v-for="game in games" :key="game.name">
          <md-card-media-cover class="md-layout-item">
            <md-card-media class="md-layout md-alignment-center-center"> 
              <img :src="game.images.large" class="card-image md-layout-item">
            </md-card-media>
            <div class="md-layout md-alignment-center-space-around">
              <md-button :to="'/game/' + game.name" class="md-primary md-layout-item">{{game.name}}</md-button>
              <!-- <md-button class="md-primary md-layout-item md-icon-button"><md-icon>favorite_border</md-icon></md-button> -->
            </div>
          </md-card-media-cover>
        </md-card> 
    </div>
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
.card{
  margin-top: 20px;
  max-height: 300px;
  max-width: 400px;
  box-shadow: 0px 0px 34px 0px rgba(0,0,0,0.30);
  border-radius: 5%;
}
.card-image{
  margin-top: 5%;
  height: 150px;
  width: auto;
  object-fit: contain;
}
.md-button{
  margin-bottom: 10px;
}
</style>


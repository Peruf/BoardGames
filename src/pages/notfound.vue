<template >
  <div>
      <div class="error404 md-layout md-gutter md-alignment-center">
        <div class="md-layout-item md-large-size-25 md-medium-size-25 md-small-size-10 sparisci"></div>
        <img src="../../public/dadi.png" class="md-layout-item md-large-size-20 md-medium-size-20 md-small-size-20 md-xsmall-size-50">
        <div class="scritte md-layout-item md-large-size-20 md-medium-size-20 md-small-size-20 md-xsmall-size-75">
            <md-content class="md-display-3 black">Lancio <br> sfortunato!</md-content>
            <md-content class="md-headline error black">E' un errore 404</md-content>
        </div> 
        <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-10 sparisci"></div>
      </div>
      <div class="head">
      <md-content class="md-title">Sembra che quello che hai cercato non esista</md-content>
      <md-content class="md-title">Non abbatterti, lancia di nuovo i dadi!</md-content>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
div{
    text-align: center;
}
.error{
    padding: 5%;
}
.md-gutter{
    margin-top: 7%;
}
.scritte {
    flex-wrap: wrap;
}
.head{
    padding: 7%;
    width: 100%;
    text-align: center;
    opacity: 60%;
} 
.black{
    color: black
}
@media only screen and (max-width: 600px) {
  .sparisci{
      display: none;
  }
  .error{
      justify-content: space-between;
  }
  img{
      margin-top: 5%;
  }
  .scritte{
      margin-top: 10%;
  }
}

</style>
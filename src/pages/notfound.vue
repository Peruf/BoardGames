<template >
  <div>
    <md-empty-state>
      <img src="../../public/dadi.png">
      <md-label class="scritte md-display-3 black">Lancio sfortunato!</md-label>
      <md-label class="md-headline error"> E' un errore 404</md-label>
      <md-description class="md-subhead">Sembra che quello che hai cercato non esista <br /> Non abbatterti, lancia di nuovo i dadi!</md-description>
    </md-empty-state>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
img{
    width: 250px;
}
.error{
    padding: 5%;
}
.scritte {
    margin-top: 10%;
    flex-wrap: wrap;
}
.black{
    color: black !important;
}

</style>
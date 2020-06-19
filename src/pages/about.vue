<template>
  <div class="about">
    <!-- Luca -->
    <md-card class="md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-100">
      <md-card-media md-ratio="1:1">
        <img src="../../public/Luca.jpg" alt="People">
      </md-card-media>

      <md-card-header>
        <div class="md-title">Luca Milano</div>
      </md-card-header>

      <md-card-content>
        Adoro trascorrere il mio tempo in mezzo alle persone. Le mie passioni sono le illustrazioni digitali e gli sport amatoriali, infatti fin da piccolo ne ho praticati molti e attualmente sono un giocatore di Ultimate Frisbee della squadra di Trento. Sono iscritto al corso di Interfacce e Tecnologie della Comunicazione di Rovereto.
      </md-card-content>
    </md-card>
    <!-- Mattia -->
    <md-card class="md-large-size-30 md-medium-size-30 md-small-size-100 md-xsmall-size-100">
      <md-card-media md-ratio="1:1">
        <img src="../../public/Mattia.png" alt="People">
      </md-card-media>

      <md-card-header>
        <div class="md-title">Mattia Peruffo</div>
      </md-card-header>

      <md-card-content>
        Sono una persona solare. Mi piace suonare la chitarra ma sfortunatamente non sono in una band.
        Studio Interfacce e Tecnologie della Comunicazione da fuorisede a Rovereto quindi so essere indipendente e pieno di risorse.
        Sono uno scout e un animatore. Ho giocato a basket per molti anni in molte squadre a Vicenza, quindi 
        me la cavo bene nel lavorare in gruppo.
      </md-card-content>
    </md-card>
    <!-- Andrea -->
    <md-card class="md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-100">
      <md-card-media md-ratio="1:1">
        <img src="../../public/Andrea.jpeg" alt="People">
      </md-card-media>

      <md-card-header>
        <div class="md-title black">Andrea Tampella</div>
      </md-card-header>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.md-card {
  width: 25em;
  margin-top: 2%;
  display: inline-block;
}

.about {
  width: 100%;
  display: flex; /* or inline-flex */
  flex-wrap: wrap;
  justify-content: space-around;
}
@media only screen and (max-width: 600px) {
  .md-card {
    width: 95%;
    margin: 10px;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
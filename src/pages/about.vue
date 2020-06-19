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
        Studente di Interfacce e Tecnologie della Comunicazione dell'Università di Trento con la passione per i muffin al cioccolato.
        <br>Mi piace lavorare in gruppo e provare cose nuove, basta che il formaggio non sia coinvolto... 
        Quello proprio non mi piace.
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
  justify-content: top-left;
}

/* @media only screen and (max-width: 806px) {
  div {
    flex: left;
  }
  
} */
</style>
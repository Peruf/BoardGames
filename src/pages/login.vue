<template>
    <div class="md-layout md-alignment-center-center">
        <md-card class="md-layout-item md-size-30 md-xsmall-size-95 md-medium-size-50">
            <md-card-area>
                <md-card-header>
                    <span class="md-title">Login</span>
                </md-card-header>
                <md-card-content>
                    <md-field>
                        <label>Username</label>
                        <md-input v-model="username"></md-input>
                    </md-field>
                </md-card-content>
                    <md-card-actions name="login">
                        <!-- Il bottone si abilita solo se c'è scritto qualcosa nell'imput username -->
                        <md-button class="md-accent md-raised" :disabled="!username" @click="signIn()">Sign in</md-button>
                    </md-card-actions>
            </md-card-area>
        </md-card>
    </div>    
</template>

<script>
import dataservice from '@/dataservice.js'

export default {
    data: function(){
        return{
            username: ""
        };
    },
    methods:{
        signIn: function(){
            if (this.username.indexOf(" ") >= 0) {
                alert("Scrivi un nome valido");
            } else {
                dataservice.Login(this.username);
                // Una volta fatto il login reindirizzo la navigazione alla home
                this.$router.push({ path: '/' });
            }
        }
    }
}
</script>

<style scoped>

</style>
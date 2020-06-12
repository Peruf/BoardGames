<template>
    <div class="md-layout md-alignment-center-center">
        <md-card class="md-layout-item md-size-30 md-xsmall-side-100 md-medium-size-50">
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
                    <md-card-action name="login">
                        <md-button class="md-accent md-raised" :disabled="!username" @click="signIn()">Sign in</md-button>
                    </md-card-action>
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
            dataservice.Login(this.username);
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style scoped>

</style>
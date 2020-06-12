import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App.vue'
import router from './router.js'
import dataservice from '@/dataservice.js'

//Uso un tema nero e verde 
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false

// Prima di fare qualsiasi cosa controllo se è stato fatto il login. Se è stato fatto allora la navigazione
// può procedere normalmente, altrimenti si viene reindirizzati alla pogina di login

router.beforeEach((to,from,next)=>{
  if(to.name != "Login" && !dataservice.isAuthenticated()){
    next({name: "Login"});
  }
  else{
    next();
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})


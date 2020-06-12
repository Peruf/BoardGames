import VueRouter from 'vue-router'
import Vue from 'vue'
import VueMaterial from 'vue-material'
// import page1 from './pages/page1.vue'
// import page2 from './pages/page2.vue'
// import page3 from './pages/page3.vue'
// import page4 from './pages/page4.vue'
// import page5 from './pages/page5.vue'
import home from '@/pages/homepage.vue'
import game from '@/pages/game.vue'
import Login from './pages/login.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)

const linkActiveClass = 'my-link-active-class'

// pass custom class to Vue Material
Vue.material.router.linkActiveClass = linkActiveClass




export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: home
        },
        // {
        //     path: '/1',
        //     name: '1',
        //     component: page1,
        // },
        // {
        //     path: '/2',
        //     name: '2',
        //     component: page2,
        // },
        // {
        //     path: '/3',
        //     name: '3',
        //     component: page3,
        // },
        // {
        //     path: '/4',
        //     name: '4',
        //     component: page4,
        // },
        // {
        //     path: '/5',
        //     name: '5',
        //     component: page5,
        // },
        {
            path: '/game/:name',
            name: 'Game',
            component: game
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
    ]
})
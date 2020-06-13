import VueRouter from 'vue-router'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import home from '@/pages/homepage.vue'
import game from '@/pages/game.vue'
import Login from './pages/login.vue'
import Year from './pages/year.vue'
import Fast from './pages/fast.vue'
import Top from './pages/toprated.vue'
import About from './pages/about.vue'
// import page5 from './pages/page5.vue'

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
        {
            path: '/order_by=year',
            name: 'OrderByYear',
            component: Year,
        },
        {
            path: '/fast_games',
            name: 'FastGames',
            component: Fast,
        },
        {
            path: '/top_rated',
            name: 'TopRated',
            component: Top,
        },
        {
            path: '/about_us',
            name: 'About',
            component: About,
        },
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
    ]
})
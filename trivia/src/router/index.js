import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: HomeView
    }, {
        path: '/game',
        name: 'game',
        component: () => import('../components/Questions.vue')
    }, {
        path: '/results',
        name: 'results',
        component: () => import('../components/Results.vue')
    }],
});

export default router;

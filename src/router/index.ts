import {createRouter, createWebHistory} from 'vue-router'
import ApplicationScreen from '../screens/ApplicationScreen.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ApplicationScreen,
            meta: {requiresAuth: true}
        },
        {
            path: '/auth',
            name: 'auth',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../screens/AuthorizationScreen.vue')
        }
    ]
})

export default router

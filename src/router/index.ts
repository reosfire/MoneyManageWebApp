import {createRouter, createWebHistory} from 'vue-router'
import ApplicationScreen from '../screens/ApplicationScreen.vue'
import First from "@/screens/application-subscreens/First.vue";
import Second from "@/screens/application-subscreens/Second.vue";
import Third from "@/screens/application-subscreens/Third.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ApplicationScreen,
            meta: { onlyForAuthorized: true },

            children: [
                {
                    path: "/first",
                    component: First
                },
                {
                    path: "/second",
                    component: Second
                },
                {
                    path: "/third",
                    component: Third
                },
            ]
        },
        {
            path: '/auth',
            name: 'auth',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../screens/AuthorizationScreen.vue'),
            meta: { onlyForUnauthorized: true },
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(it => it.meta.onlyForAuthorized)) {
        if (await fetch("./api/isLoggedIn")
            .then(response => !response.ok)) {
            next("/auth")
            return
        }
    }

    if (to.matched.some(it => it.meta.onlyForUnauthorized)) {
        if (await fetch("./api/isLoggedIn")
            .then(response => response.ok)) {
            next("/")
            return
        }
    }

    next()
})

export default router

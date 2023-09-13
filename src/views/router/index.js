import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/home/Index"),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/auth/Index"),
        beforeEnter: guestMiddleware,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("@/views/dashboard/Index"),
        beforeEnter: authMiddleware,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

function authMiddleware(to, from, next) {
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        // Redirect to the previous page if not authenticated
        router.go(-1);
    } else {
        next();
    }
}

function guestMiddleware(to, from, next) {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn) {
        // Redirect to the previous page if already logged in
        router.go(-1);
    } else {
        next();
    }
}

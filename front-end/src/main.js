import {createApp} from "vue";
import {createWebHistory, createRouter} from "vue-router";
import {isAuthenticated} from "@/services/auth.service";

// Importa la función para manejar la redirección al inicio de sesión en caso de token expirado o 401
import {handleUnauthorized} from "@/utils/handleUnauthorized";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app
import App from "@/App.vue";

// layouts
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts
import Tickets from "@/views/admin/Tickets.vue";
import Created from "@/views/admin/ticket/Created.vue";
import Updated from "@/views/admin/ticket/Updated.vue";

// routes
const routes = [
    {
        path: "/admin",
        redirect: "/admin/tickets",
        component: Admin,
        meta: {requiresAuth: true},
        children: [
            {
                path: "/admin/tickets",
                component: Tickets
            },
            {
                path: "/admin/tickets/created",
                component: Created
            },
            {
                path: "/admin/tickets/edit/:id",
                component: Updated
            }
        ],
    },
    {
        path: "/",
        redirect: "login",
        component: Auth,
        children: [
            {
                path: "login",
                component: Login,
            },
            {
                path: "register",
                component: Register,
            },
        ],
    },
    {
        path: "/",
        component: Login,
    },
    {path: "/:pathMatch(.*)*", redirect: "/"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Guardia de navegación para proteger las rutas que requieren autenticación
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated()) {
            // Si no está autenticado, manejar la redirección al inicio de sesión
            await handleUnauthorized();
            next('/auth/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

createApp(App).use(router).mount("#app");

import LandingPage from '../views/general/LandingPage.vue'
import LoginPage from '../views/general/LoginPage.vue'
import RegisterPage from '../views/general/RegisterPage.vue'
import NotFoundPage from '../views/general/NotFoundPage.vue'
import TransactionsListPage from '../views/transactions/TransactionsListPage.vue'
import TransactionPageVue from '../views/transactions/TransactionPage.vue'

export const routes = [
    {
        path: '/',
        name: "Landing",
        component: LandingPage
    },
    {
        path: '/login',
        name: "Login",
        component: LoginPage
    },
    {
        path: '/register',
        name: "Register",
        component: RegisterPage
    },
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: NotFoundPage
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: TransactionsListPage
    },
    {
        path: '/transactions/:id',
        name: 'ConcreteTransaction',
        component: TransactionPageVue
    }
]
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewCampaignView from '@/views/NewCampaignView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      name: "home",
      meta: {"requiresAuth": true}
    },
    {
      path: "/campaigns/new",
      component: NewCampaignView,
      name: "new-campaign",
      meta: {"requiresAuth": true}
    },
    {
      path: "/register",
      component: RegisterView,
      name: "register",
      meta: {"guestsOnly": true}
    },
    {
      path: "/login",
      component: LoginView,
      name: "login",
      meta: {"guestsOnly": true}
    }
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (!auth.isInitialized) {
    await auth.fetchUser();
  }

  console.log(auth.user)

  if (to.meta.requiresAuth && !auth.isAuthentificated) {
    return { name: 'login' }
  }

  if (to.meta.guestsOnly && auth.isAuthentificated) {
    return { name: 'home' }
  }
})

export default router

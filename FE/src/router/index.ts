import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewCampaignView from '@/views/NewCampaignView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView
    },
    {
      path: "/campaigns/new",
      component: NewCampaignView
    },
    {
      path: "/register",
      component: RegisterView
    }
  ],
})

export default router

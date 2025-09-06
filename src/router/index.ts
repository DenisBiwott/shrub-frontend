import { createRouter, createWebHistory } from 'vue-router'
import LeaderboardView from '@/views/LeaderboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'leaderboard',
      component: LeaderboardView
    }
  ],
})

export default router

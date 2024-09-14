import { createRouter, createWebHistory } from 'vue-router'
import UserPost from '../views/UserPost.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'
import Confirm from '../views/Confirm.vue'
import Send from '../views/Send.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: '/users/:username/posts/:postId', component: UserPost },
    { path: '/about', component: About },
    { path: '/profile', component: Profile },
    { path: '/confirm', component: Confirm },
    { path: '/send', component: Send }
  ]
})

export default router

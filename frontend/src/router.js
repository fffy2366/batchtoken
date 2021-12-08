import { createRouter, createWebHistory } from "vue-router";
import UserPost from "./views/UserPost.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Profile from "./views/Profile.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/users/:username/posts/:postId", component: UserPost },

  { path: "/about", component: About },
  { path: "/profile", component: Profile },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

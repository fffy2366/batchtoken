import { createRouter, createWebHistory } from "vue-router";
import UserPost from "./views/UserPost.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Profile from "./views/Profile.vue";
import Confirm from "./views/Confirm.vue";
import Send from "./views/Send.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/users/:username/posts/:postId", component: UserPost },

  { path: "/about", component: About },
  { path: "/profile", component: Profile },
  { path: "/confirm", component: Confirm },
  { path: "/send", component: Send },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

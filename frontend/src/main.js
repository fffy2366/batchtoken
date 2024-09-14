import { Buffer } from 'buffer'
import global from 'global'

window.Buffer = Buffer
window.global = global

if (typeof window !== 'undefined') {
  if (!window.Buffer) {
    window.Buffer = Buffer
  }
  if (!window.global) {
    window.global = window
  }
  if (!window.process) {
    window.process = { env: {} }
  }
}

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './stores'
import Toaster from '@meforma/vue-toaster'

import Codemirror from 'codemirror-editor-vue3'
// plugin-style
import 'codemirror-editor-vue3/dist/style.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
const app = createApp(App)
app.use(store)
app.use(Codemirror)
app.use(Toaster)
app.use(createPinia())
app.use(router)

app.mount('#app')

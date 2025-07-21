import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// Komponenten importieren
import Home from './views/Home.vue'
import VideoPlayer from './views/VideoPlayer.vue'
import Search from './views/Search.vue'
import Settings from './views/Settings.vue'

// Router konfigurieren
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'Search', component: Search },
  { path: '/player/:id', name: 'Player', component: VideoPlayer, props: true },
  { path: '/settings', name: 'Settings', component: Settings }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Pinia Store
const pinia = createPinia()

// App erstellen und mounten
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
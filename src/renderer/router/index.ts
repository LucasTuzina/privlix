import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy load components for better performance
const Home = () => import('../views/Home.vue')
const Search = () => import('../views/Search.vue')
const Settings = () => import('../views/Settings.vue')
const VideoPlayer = () => import('../views/VideoPlayer.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'nav.home'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      title: 'nav.search'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'nav.settings'
    }
  },
  {
    path: '/player/:id',
    name: 'Player',
    component: VideoPlayer,
    props: true,
    meta: {
      title: 'videoPlayer.title',
      hideNavigation: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    // Return to saved scroll position if available, otherwise scroll to top
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  // Set document title based on route meta
  if (to.meta.title) {
    // Title will be handled by i18n in the component
    document.title = `Privlix - ${to.meta.title}`
  }
  
  next()
})

export default router

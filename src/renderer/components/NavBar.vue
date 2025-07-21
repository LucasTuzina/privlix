<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/" class="brand-link">
        <div class="brand-logo">P</div>
        <h1 class="brand-text">Privlix</h1>
      </router-link>
    </div>

    <div class="nav-center">
      <router-link 
        v-for="item in navItems" 
        :key="item.name"
        :to="item.path" 
        class="nav-link"
        :class="{ active: $route.name === item.name }"
      >
        {{ item.label }}
      </router-link>
    </div>

    <div class="nav-right">
      <!-- Suchfeld -->
      <div class="search-container">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          @keyup.enter="performSearch"
          type="text"
          placeholder="Search movies & series..."
          class="search-input"
          :class="{ expanded: isSearchExpanded }"
          @focus="isSearchExpanded = true"
          @blur="handleSearchBlur"
        />
        <button @click="performSearch" class="search-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>

      <!-- Benutzer-Menü -->
      <div class="user-menu">
        <button @click="showSettings" class="user-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMediaStore } from '../stores/mediaStore'

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const mediaStore = useMediaStore()

    const searchQuery = ref('')
    const isSearchExpanded = ref(false)
    const searchTimeout = ref(null)

    const navItems = [
      { name: 'Home', path: '/', label: 'Home' },
      { name: 'Search', path: '/search', label: 'Search' }
    ]

    const handleSearch = () => {
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
      }
      
      searchTimeout.value = setTimeout(() => {
        if (searchQuery.value.trim()) {
          mediaStore.searchMedia(searchQuery.value)
          if (route.name !== 'Search') {
            router.push('/search')
          }
        }
      }, 300)
    }

    const performSearch = () => {
      if (searchQuery.value.trim()) {
        mediaStore.searchMedia(searchQuery.value)
        router.push('/search')
      }
    }

    const handleSearchBlur = () => {
      setTimeout(() => {
        if (!searchQuery.value) {
          isSearchExpanded.value = false
        }
      }, 200)
    }

    const showSettings = () => {
      router.push('/settings')
    }

    // Watch für Route-Änderungen
    watch(route, (newRoute) => {
      if (newRoute.name !== 'Search') {
        searchQuery.value = ''
      }
    })

    return {
      searchQuery,
      isSearchExpanded,
      navItems,
      handleSearch,
      performSearch,
      handleSearchBlur,
      showSettings
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 0 3%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.navbar:hover {
  background: rgba(0, 0, 0, 0.95);
}

.nav-brand {
  display: flex;
  align-items: center;
  min-width: 200px;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.brand-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #e50914 0%, #f40612 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 24px;
  color: white;
  margin-right: 12px;
  box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3);
}

.brand-text {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  color: #ffffff;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: #e50914;
  border-radius: 1px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 200px;
  justify-content: flex-end;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 40px;
  height: 40px;
  padding: 8px 40px 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 20px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
}

.search-input.expanded {
  width: 280px;
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.8);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
  border-color: #e50914;
  box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
}

.search-button {
  position: absolute;
  right: 4px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.search-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.user-menu {
  position: relative;
}

.user-button {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.user-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav-center {
    gap: 20px;
  }
  
  .search-input.expanded {
    width: 220px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 5%;
  }

  .nav-center {
    display: none;
  }

  .search-input.expanded {
    width: 180px;
  }

  .brand-text {
    font-size: 24px;
  }
}
</style>

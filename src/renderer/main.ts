import { createPrivlixApp } from './app'
import './styles/main.css'

// Create and configure the application
const { app } = createPrivlixApp()

// Mount the application
app.mount('#app')

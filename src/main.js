import { createApp } from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import router from './routes.js'
import App from './App.vue'



const app = createApp(App)
app.use(vueAxios, axios)
app.use(router)
app.mount('#app')


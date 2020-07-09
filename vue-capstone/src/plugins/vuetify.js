import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    // overide the standard vuetify color palett
    themes: {
      light: {
        primary: 'F59A98',
        secondary: '#82aac7',
        accent: '#FADCCA',
        error: '#FF5252',
        info: '#F4F2F2',
        success: '#d1e0ea',
        background: '#fde7e7',
        gold: '#f9e7b6'
      }
    }
  }
})

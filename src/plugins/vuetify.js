import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark:false,
    themes:
    {
      light:
      {
        primary: '#1A265C',
        secondary: '#FFFFFF',
        accent: '#E4BA18',
        error: '#e32012',
        info: '#101112',
        success: '#669900',
        warning: '#ffcc00',
      },
      dark:
      {
        
        primary: '#1A265C',
        secondary: '#FFFFFF',
        accent: '#E4BA18',
        error: '#e32012',
        info: '#101112',
        success: '#669900',
        warning: '#ffcc00',
        
      }
    }
   
    
   
  }
});

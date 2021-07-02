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
        secondary: 'white',
        accent: '#E4BA18',
        error: '#e32012',
        info: '#101112',
        success: '#669900',
        warning: '#ffcc00',
      },
      dark:
      {
        
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        
      }
    }
   
    
   
  }
});

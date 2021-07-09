<template>
  <div >
    <v-layout
      row
      wrap
      px-5
      py-0
      ml-0
      align-center
      class="header-wrapper"
      :class="hasScrolled ? '' :'header-transparent'"
      :style="headerStyle"
      
    >
      <v-flex xs3>
        <img src="@/assets/alumx-logo-1.png"  class="mb-2 logo" />
      </v-flex>
      <v-flex xs9 class="text-right">
        <div class="menu-wrapper">
          <ul>
            <!-- <li>
              <a :class="$route.path == '/about' ? 'active' : ''">About</a>
            </li> -->
            <li>
              <a
                :class="$route.path == '/signup' ? 'activee' : ''"
                v-if="$route.path == '/'"
                @click="navtosignup"
              >SignUp</a>
            </li>
            <li>
              <a
                :class="$route.path == '/login' ? 'activee' : ''"
                v-if="$route.path == '/'"
                @click="navtologin"
              >Login</a>
            </li>
            <li>
              <a :class="$route.path == '/' ? 'activee' : ''" @click="navtoHome">Home</a>
            </li>
          </ul>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>



<script>
import data from "@/assets/data";


export default {
  components: {
    
  },
  data() {
    return {
      scrollValue:0,
      eligible:true,
      companyData: data,
      paths: [
        {
          path: "/profile"
        },
        {
          path: "/clearance"
        },
        {
          path: "/careers"
        },
        {
          path: "/documents"
        }
      ]
    };
  },
  computed:{
 
    hasScrolled()
    {
      if(this.$route.path=="/")
      {
            return this.scrollValue>0? true : false
      }
      else
      {
        return true
      }
   
    },
     headerStyle() {
       if(this.handleScroll)
       {
          return {
        
        backgroundImage: 'linear-gradient(to left,'+ this.$vuetify.theme.themes.light.primary+','+this.$vuetify.theme.themes.light.accent+')',
        
      }
       }
     
     
    },

  },
  created() {
    window.addEventListener('scroll', this.handleScroll);

    console.log(this.$route);
  },
  destroyed()
  {
  window.removeEventListener('scroll', this.handleScroll);
  },
  
  methods: {
    handleScroll()
    {
      
     this.scrollValue=window.pageYOffset
     
    },
    navtologin() {
      this.$router.push({ path: "/login" });
    },

    navtosignup() {
      this.$router.push({ path: "/signup" });
    },
    navtoHome() {
      this.$router.push({ path: "/" });
    },
    navtocareers() {
      this.$router.push({ path: "/careers" });
    }
  }
};
</script>

<style>
.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1009;
  
  padding-top: 2px;
  min-height: 50px;
}
.header-transparent{
  background: transparent!important;
}
.menu-wrapper {
  height: 100%;
}
.vertical-align-content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.list-item-12 {
  font-family: "Raleway";
  color: beige;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.header-wrapper li {
  float: right;
  /* border-right:1px solid #bbb; */
}
/* 
li:first-child {
  border-right: none;
} */

li a {
  display: block;
  color: white !important;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  margin-right: 20px;
  font-family: "Roboto", sans-serif !important;
  font-weight: 400;
  transition: 300ms ease-in;
}
li a:hover {
  background-color: rgb(241, 135, 16);
  color: white !important;
  /* font-weight: 600; */
}
.activee {
  /* background-color:  rgb(241,135,16); */
  color:#E4BA18 !important;
  font-weight: 600;
}
.logo{
  height:50px;
  width: auto;
 margin-top: 20px !important;
}

@media screen and (max-width: 992px) {
.logo{
  height:20px;
   width: auto;
 margin-top: 15px !important;
}
li a {
  display: block;
  color: white !important;
  text-align: center;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
  margin-right: 10px;
  font-family: "Lato";
  font-weight: 200;
  transition: 300ms ease-in;
  font-size: 15px;
}
}

/* On screens that are 600px or less, set the background color to olive */
 @media screen and (max-width: 640px) {
.logo{
  height:10px;
   width: auto;
 margin-top: 2px !important;
}
li a {
  display: block;
  color: white !important;
  text-align: center;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
  margin-right: 10px;
  font-family: "Roboto", sans-serif !important;
  font-weight: 200;
  transition: 300ms ease-in;
  font-size: 10px;
}
} 
</style>

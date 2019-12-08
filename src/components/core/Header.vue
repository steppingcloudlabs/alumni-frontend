<template>
  <div style="margin-top: 70px">
    <v-layout
      row
      wrap
      px-5
      py-0
      ml-0
      align-center
      class="header-wrapper"
      style="background:#1A1A1D"
    >
      <v-flex xs5>
        <img src="@/assets/alumx-logo-1.png" height="50" class="my-2" />
      </v-flex>
      <v-flex xs7 class="text-right">
        <div class="menu-wrapper">
          <ul>
            <li>
              <a :class="$route.path == '/about' ? 'active' : ''">About</a>
            </li>
            <li>
              <a
                :class="$route.path == '/signup' ? 'active' : ''"
                v-if="$route.path == '/home'"
                @click="navtosignup"
              >SignUp</a>
            </li>
            <li>
              <a
                :class="$route.path == '/login' ? 'active' : ''"
                v-if="$route.path == '/home'"
                @click="navtologin"
              >Login</a>
            </li>
            <li>
              <a :class="$route.path == '/home' ? 'active' : ''" @click="navtoHome">Home</a>
            </li>
          </ul>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>



<script>
import data from "@/assets/data";
import landingimage from "@/components/core/landingimage";

export default {
  components: {
    landingimage
  },
  data() {
    return {
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
  created() {
    console.log(this.$route);
  },
  methods: {
    navtologin() {
      this.$router.push({ path: "/login" });
    },

    navtosignup() {
      this.$router.push({ path: "/signup" });
    },
    navtoHome() {
      this.$router.push({ path: "/home" });
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
  font-family: "Lato";
  font-weight: 400;
  transition: 300ms ease-in;
}
li a:hover {
  background-color: rgb(241, 135, 16);
  color: white !important;
  /* font-weight: 600; */
}
.active {
  /* background-color:  rgb(241,135,16); */
  color: rgb(241, 135, 16) !important;
  font-weight: 600;
}
</style>

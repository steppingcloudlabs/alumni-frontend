<template>
  <div>
    <v-layout row wrap px-5 py-2  ml-0 class="elevation-9" style="background:#1A1A1D">
      <v-flex xs8>
        <img src="@/assets/logo.png" height="50" />
      </v-flex>
   
      <v-flex xs1>
        <v-list-item link>
          <v-list-item-title
            class="list-item-12"
            style="font-size:12px;color:#DE7D14;"
            @click="navtoHome"
          >Home</v-list-item-title>
        </v-list-item>
      </v-flex>

      <v-flex xs1 v-if="$route.path == '/home'">
        <v-list-item link>
          <v-list-item-title
            class="list-item-12"
            style="font-size:12px;color:#DE7D14;"
            @click="navtologin"
          >Login</v-list-item-title>
        </v-list-item>
      </v-flex>

      <v-flex xs1 v-if="$route.path == '/home'">
        <v-list-item link>
          <v-list-item-title
            class="list-item-12"
            style="font-size:12px;color:#DE7D14;"
            @click="navtosignup"
          >Signup</v-list-item-title>
        </v-list-item>
      </v-flex>
    </v-layout>

    <landingimage v-if="$route.path == '/home'"></landingimage>
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
.vertical-align-content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.list-item-12 {
  font-family: "Raleway";
  color: beige;
}
</style>

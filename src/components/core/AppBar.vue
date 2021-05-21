<template>
  <div>
    <v-toolbar style="position: fixed;z-index: 1009;width: 100%;background-image: linear-gradient(to right,rgba(44, 51, 81, 0.9),rgba(226, 198, 92, 0.5));"
    >
      <v-icon class="drawericon" large @click="getDrawer">mdi-menu</v-icon>
      <img src="@/assets/alumx-logo-1.png" class="mb-5 ml-5 logo" />
      <v-layout row wrap align-center>
        <v-flex xs12>
          <SearchAlumni />
        </v-flex>
      </v-layout>
     
   
      <v-row align="right" class="mx-0">
        <v-col cols="12" sm="8">
        </v-col>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-tour-step="1" icon class="account" v-bind="attrs" v-on="on" >
              <v-icon  color="black">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :to="item.to"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
             <v-list-item
             @click="logout"
            >
              <v-list-item-title> Log Out </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- <v-btn to="/profile/user-profile" icon>
          <v-icon color="white">mdi-account</v-icon>
        </v-btn>-->
      </v-row>
    </v-toolbar>
  </div>
</template>

<script>
// Utilities
import { addTokenToPayload, deleteExpiredToken } from "@/utils/utils";
import SearchAlumni from "@/views/SearchAlumni";

export default {
  data: () => ({
    items: [
      { title: "Change Password", to: "/profile/changepassword" },
      { title: "View Profile", to: "/profile/user-profile" },
      
     
    ],
    search: "",
    notifications: [
      "Mike, John responded to your email",
      "You have 5 new tasks",
      "You're now a friend with Andrew",
      "Another Notification",
      "Another One",
    ],

    responsive: false,
  }),
  components: {
    SearchAlumni,
  },
  watch: {
    $route(val) {
      this.title = val.name;
    },
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  computed: {
    showDrawer: {
      set(data) {
        this.$store.commit("userModule/setshowDrawer", data);
      },
      get() {
        return this.$store.getters["userModule/getshowDrawer"];
      },
    },
  },

  methods: {
      logout() {
      deleteExpiredToken();
      this.$store.commit("userModule/setData", {});
      this.$router.push({ path: "/" });

      console.log("session deleted");
    },
    getDrawer() {
      this.showDrawer = !this.showDrawer;
    },
  
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
  },
};
</script>

<style>
/* Fix coming in v2.0.8 */
#core-app-bar {
  width: auto;
}

#core-app-bar a {
  text-decoration: none;
}
.drawericon {
  visibility: hidden;
}
.account
{
  margin-top: -25px;
}

@media screen and (max-width: 992px) {
  .drawericon {
    visibility: hidden;
  }
}

/* On screens that are 600px or less, set the background color to olive */
@media screen and (max-width: 640px) {
  .drawericon {
    visibility: visible;
  }
  .account
{
  margin-top: -35px;
}
}
</style>

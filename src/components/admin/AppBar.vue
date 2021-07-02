<template>
  <div>
    <v-toolbar style="position: fixed; z-index: 1009; width: 100%;background-image: linear-gradient(to right, rgba(44, 51, 81, 0.9), rgba(226, 198, 92, 0.5))">
      <v-icon class="drawericon" large @click="getDrawer">mdi-menu</v-icon>
      <img src="@/assets/alumx-logo-1.png" class="mb-5 ml-5 logo" />
      <!-- <v-layout row wrap align-center>
        <v-flex xs12>
          <SearchAlumni />
        </v-flex>
      </v-layout> -->
      <v-row align="center" class="mx-0">
        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="info">mdi-account</v-icon>
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
import { mapMutations } from "vuex";
import SearchAlumni from "@/views/SearchAlumni";

export default {
  data: () => ({
    items: [
      { title: "Change Password", to: "/admin/changepassword" },
      { title: "View Dashboard", to: "/admin/dashboard" },
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
  computed: {
    showDrawer: {
      set(data) {
        this.$store.commit("adminModule/setshowDrawer", data);
      },
      get() {
        return this.$store.getters["adminModule/getshowDrawer"];
      },
    },
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  

  methods: {
    getDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
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
}
</style>

<template>
  <div>
    <v-toolbar-title class="white--text font-weight-light align-self-center">
      <v-btn v-if="responsive" icon @click.stop="onClick">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-row align="center" class="mx-0">
        <v-text-field
          class="mb-2"
          v-model="search"
          append-icon="search"
          label="Search"
          dark
          single-line
          filled
          rounded
          dense
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-btn icon to="/profile/dashboard" v-if="$route.path != '/profile/dashboard'">
          <v-icon color="white">mdi-view-dashboard</v-icon>
        </v-btn>

        <v-menu bottom left offset-y transition="slide-y-transition">
          <template v-slot:activator="{ attrs, on }">
            <v-btn class="toolbar-items" icon v-bind="attrs" v-on="on">
              <v-badge color="error" overlap>
                <template slot="badge">{{ notifications.length }}</template>
                <v-icon color="white">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-item-title v-text="notification" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
         
        <v-menu offset-y>
      <template v-slot:activator="{ on,attrs }">
        <v-btn
          icon v-bind="attrs" v-on="on"
        >
          <v-icon color="white">mdi-account</v-icon>
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
        </v-btn> -->
      </v-row>
    </v-toolbar-items>
  </div>
</template>

<script>
// Utilities
import { mapMutations } from "vuex";

export default {
  data: () => ({
     items: [
        { title: 'Change Password',to:'/profile/changepassword' },
        {title:'View Profile',to:'/profile/user-profile'}],
    search: "",
    notifications: [
      "Mike, John responded to your email",
      "You have 5 new tasks",
      "You're now a friend with Andrew",
      "Another Notification",
      "Another One"
    ],

    responsive: false
  }),

  watch: {
    $route(val) {
      this.title = val.name;
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
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
    }
  }
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
</style>

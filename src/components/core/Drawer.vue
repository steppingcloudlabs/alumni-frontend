<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="showDrawer"
    app
    dark
   
    floating
    mobile-break-point="991"
    persistent
    width="260"
    :style="drawerStyle"
   
    
  >
    <!-- <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(226, 198, 92, .7), rgba(26, 38, 92, .7)"
      />
    </template> -->

    <!-- <v-list-item two-line style="height: 75px">
      <img width="150px" class="mx-auto" src="@/assets/logo.png" />
    </v-list-item> -->
    <v-divider class="mx-1 mb-1" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />
      <v-list-item two-line>
        <v-list-item-avatar>
          <img v-if="userimage" :src="userimage" />
           <img v-else src="@/assets/avatar/download.jpg" />
        </v-list-item-avatar>

        <v-list-item-title
          style="
            white-space: inherit;
            font-family: 'Raleway', sans-serif;
            font-weight: bold;
          "
          >Welcome {{userData }}!!</v-list-item-title
        >
      </v-list-item>

      <v-divider class="mx-1 mb-1" />
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
        :data-tour-step="link.step"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
      <!-- <v-list-item @click="logout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { addTokenToPayload, deleteExpiredToken } from "@/utils/utils";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    image: "",
    inputValue: true,
    user: {
      firstname: "hello",
    },
    name:"",

    links: [
      {
        to: "/profile/dashboard",
        icon: "mdi-view-dashboard",
        text: "Dashboard",
       
      },
      // {
      //   to: "/profile/user-profile",
      //   icon: "mdi-account",
      //   text: "My Profile",
      // },

      {
        to: "/profile/document",
        icon: "mdi-clipboard",
        text: "My Documents",
         step:'2'
      },
      {
        to: "/profile/careers",
        icon: "mdi-chart-bubble",
        text: "Careers",
         step:'3'
      },
      {
        to: "/profile/maps",
        icon: "mdi-map-marker",
        text: "Maps",
        step:'4'
      },
      {
        to: "/profile/query",
        icon: "mdi-wechat",
        text: "Ask HR",
         step:'5'
      },
      {
        to: "/profile/faq",
        icon: "mdi-comment-question-outline",
        text: "FAQs",
        step:'6'
       
      }
    ],
  }),

  watch: {},
  beforeMount()
  {
  this.showDrawer=true
 
  },
  methods: {
    logout() {
      deleteExpiredToken();
      this.$store.commit("userModule/setData", {});
      this.$router.push({ path: "/" });

      console.log("session deleted");
    },
  },

  computed: {
    drawerStyle() {
      return {
        backgroundImage: 'linear-gradient(to bottom,'+ this.$vuetify.theme.themes.light.primary+','+this.$vuetify.theme.themes.light.accent+')',
        marginTop: '60px',
        
      }
    },
    userData() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"]
            .FIRST_NAME_PERSONAL_INFORMATION
        : null;
    },
     userimage() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"]
            .PROFILEIMAGE
        : null;
    },
      showDrawer: {
      set(data) {
        this.$store.commit("userModule/setshowDrawer", data);
      },
      get() {
        return this.$store.getters["userModule/getshowDrawer"];
      },
    },
   
  },
};
</script>


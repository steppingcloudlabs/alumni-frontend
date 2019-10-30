<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    src="@/assets/pic1.jpg"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)" />
    </template>

    <v-list-item two-line>
      <img width="150px" class="mx-auto" src="@/assets/logo.png" />
    </v-list-item>
    <v-divider class="mx-1 mb-1" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="@/assets/avatar/download.jpg" />
        </v-list-item-avatar>

        <v-list-item-title style="white-space:inherit;font-family: 'Raleway', sans-serif; font-weight: bold;" >Welcome {{userData}}!!</v-list-item-title>
      </v-list-item>

      <v-divider class="mx-1 mb-1" />
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title  v-text="link.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    image: "",
    inputValue: true,
    user: {
      firstname: "hello"
    },

    links: [
      {
        to: "/profile/dashboard",
        icon: "mdi-view-dashboard",
        text: "Dashboard"
      },
      {
        to: "/profile/user-profile",
        icon: "mdi-account",
        text: "User Profile"
      },

      {
        to: "/profile/document",
        icon: "mdi-clipboard",
        text: "Document Portal"
      },
      {
        to: "/profile/careers",
        icon: "mdi-chart-bubble",
        text: "Careers"
      },
      {
        to: "/profile/maps",
        icon: "mdi-map-marker",
        text: "Maps"
      },
      {
        to: "/profile/query",
        icon: "mdi-wechat",
        text: "Ask HR"
      },
      {
        to: "/home",
        icon: "mdi-logout",
        text: "Logout"
      }
    ]
  }),

  watch: {},

  methods: {},

  computed: {
    userData() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"]
            .first_name_personal_information
        : null;
    }
  }
};
</script>


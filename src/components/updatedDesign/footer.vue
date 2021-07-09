<template>
  <v-footer
    light
    width="100%"
    :style="appbarStyle"
  >
    <v-card
      flat
      tile
      class="black--text text-center"
      color="transparent"
      width="100%"
    >
      <v-card-text>
        <v-btn v-for="(icon,i) in icons" :key="i" :href="links[i]" target="_blank" class="mx-4 black--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="pt-0" style="color: black">
        <v-layout row wrap>
          <v-flex xs6 sm6 md6 lg6 xl6>
            <v-subheader class="text--center"> WHY JOIN US</v-subheader>
          </v-flex>
          <v-flex xs6 sm6 md6 lg6 xl6>
            <v-subheader style="text-align: center">ADDRESS</v-subheader>
            <li
              class="mb-5 ml-5"
              v-for="(item, i) in items"
              :key="i"
              style="text-align: left; list-style-type: none"
            >
              <span><v-icon v-text="item.icon" ></v-icon>{{ item.text }}</span>
            </li>
            <!-- <v-list-item-group>
          
                            <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        >
                        <v-list-item-content>
                            <v-list-item-title > </v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    </v-list> -->
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="black--text">
        {{ new Date().getFullYear() }} — <strong>Stepping Cloud</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin"],
    links:[" https://www.facebook.com/steppingcloudconsulting/?ref=bookmarks", "https://twitter.com/SteppingCloud","https://www.linkedin.com/company/stepping-cloud-consulting-private-limited/?viewAsMember=true"],
    items: [
      {
        text:
          "     Mohan Cooperative Industrial Estate, Badarpur, New Delhi - 110044",
        icon: "mdi-map-marker",
      },
      {
        text: "   114 Lavender Street, 11-88 CT Hub 2 Singapore - 387293",
        icon: "mdi-map-marker",
      },
    
      { text: "     askme@steppingcloud.com", icon: "mdi-email" },
      { text: "     011 4132 6689", icon: "mdi-phone" },
    ],
  }),
  computed:
  {
    appbarStyle() {
      
          return {
        
        backgroundImage: 'linear-gradient(to top,'+ this.$vuetify.theme.themes.light.primary+','+this.$vuetify.theme.themes.light.accent+')',
       
       }
     
     
    },
  }
};
</script>
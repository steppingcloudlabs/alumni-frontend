<template>
  <div class="ml-5 mr-5">
    <v-toolbar color="primary">
      <v-tabs v-model="tab" fixed-tabs dark icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-5-1">
          Esclation Manager
          <v-icon>mdi-account-star</v-icon>
        </v-tab>

        <v-tab href="#tab-5-2">
          Admin Management
          <v-icon>mdi-account-settings</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item :value="'tab-5-1'">
        <companysetting></companysetting>
      </v-tab-item>
      <v-tab-item :value="'tab-5-2'">
       <addAdmin></addAdmin>
      </v-tab-item>
    </v-tabs-items>
  </div>

</template>
<script>
import companysetting from "@/components/admin/companySetting.vue";
import addAdmin from "@/components/admin/addAdmin.vue";
export default {
  components: {
    companysetting,
   addAdmin
  },
  methods: {},
  beforeMount() {},
  destroyed() {},
  computed: {},
  data() {
    return {
      dialog: false,

      tab: null
    };
  }
};
</script>
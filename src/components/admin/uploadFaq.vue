<template>
  <v-layout row wrap>
    <v-dialog v-model="showFaqDialog" persistent max-width="700px">
      <v-card class="card">
         <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Upload FAQ</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
         
      
        <v-card-text>
          <v-container>
            <ManualFaq />

           

            <p bold class="text-center">OR</p>

            

            <FileFAQ />
          </v-container>
          <small style="margin-left: 52px;">*Required Fields are mandatory</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-flex xs4></v-flex>
          <!--<v-btn color="blue-darken-1" text @click="closeDialog"> save</v-btn>-->
          <v-btn color="error darken-1" text @click="closeFaqDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ManualFaq from "@/components/admin/ManualFAQ.vue";
import FileFAQ from "@/components/admin/FileFAQ.vue";
export default {
  components: {
    ManualFaq,
    FileFAQ
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeFaqDialog() {
      this.$store.commit("adminModule/closeFaqDialog");
    }
  },
  computed: {
    showFaqDialog: {
      get() {
        return this.$store.getters["adminModule/getShowFaqDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowFaqDialog", data);
      }
    }
  },

  data() {
    return {};
  }
};
</script>
<style >
.row {
  margin-right: 15px;
}
</style>
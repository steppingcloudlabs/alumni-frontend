 <<template>

 <v-dialog v-model="viewJob" fullscreen hide-overlay transition="dialog-bottom-transition" style="margin-top:2vh!important">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
         
          <v-toolbar-title>Job Description</v-toolbar-title>
           <v-spacer></v-spacer>
           <v-toolbar-items>
            <v-btn dark text >Apply</v-btn>
          </v-toolbar-items>
         </v-toolbar>
          <v-card-title>{{viewJobData.JOBTITLE}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      <v-col cols="12" sm="2"> 
        <div class="grey--text ml-4"><v-icon color="blue" v-if="viewJobData.LOCATION">mdi-map-marker</v-icon> {{viewJobData.LOCATION}}</div>
      </v-col>
       <v-col cols="12" sm="2">
        <div class="grey--text ml-4">Posting ID:{{viewJobData.JOBPOSTINGID}}</div>
      </v-col>
       <v-col cols="12" sm="2">
        <div class="grey--text ml-4">Req ID:{{viewJobData.JOBREQID}}</div>
      </v-col>
      </v-row>
      <v-row>
         <v-col cols="12"
        sm="3">
        <div class="grey--text ml-4"> <v-icon color="blue" v-if="viewJobData.POSTINGENDDATE">mdi-calendar</v-icon> End Date: {{viewJobData.POSTINGENDDATE}}</div>
      </v-col>
       <v-col cols="12" sm="3">
        <div class="grey--text ml-4"> <v-icon color="blue" v-if="viewJobData.POSTINGSTARTDATE">mdi-calendar</v-icon>Start Date: {{viewJobData.POSTINGSTARTDATE}}</div>
      </v-col>
      </v-row>

      <div class="my-4 subtitle-1 black--text">
        <v-icon color="blue" v-if="viewJobData.DEPARTMENT">mdi-domain</v-icon>{{viewJobData.DEPARTMENT}}
      </div>
      <div>{{viewJobData.JOBDESCRIPTION}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

   
    <v-card-actions>
      <v-btn
        color="deep-purple accent-4"
        text
      
      >
       Apply
      </v-btn>
    </v-card-actions>
        
      </v-card>
              </v-dialog>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$store.commit("userModule/closeViewJob");
    },
  },
  computed: {
    viewJob: {
      get() {
        return this.$store.getters["userModule/getViewJob"];
      },
      set(data) {
        this.$store.commit("userModule/setViewJob", data);
      },
    },
    viewJobData: {
      get() {
        return this.$store.getters["userModule/getViewJobData"];
      },
      set(data) {
        this.$store.commit("userModule/setViewJobData", data);
      },
    },
  },
};
</script>
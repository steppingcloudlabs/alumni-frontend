<template>
  <div class="status">
    <v-card-title style="color:white; text-align:center">Document Status</v-card-title>
    <v-divider class="mr-5 mb-5" style="background:rgb(241, 135, 16);"></v-divider>
    <v-row class="alert">
      <v-alert
        min-width="100%"
        min-height="50px"
        dense
        outlined
        type="success"
        v-if="DocumentStatus.FORM16=='Available'"
      >
        Form 16 is
        <strong>Available</strong> in Document Section
      </v-alert>
      <v-alert min-width="100%" min-height="50px" dense outlined type="error" v-else>
        Form 16 is
        <strong>Pending</strong> from Company.Not Available Yet
      </v-alert>
    </v-row>

    <v-row class="alert">
      <v-alert
        min-width="100%"
        min-height="50px"
        dense
        outlined
        type="success"
        v-if="DocumentStatus.FIRSTMONTHSALARY=='Available'"
      >
        Full n Final is
        <strong>Available</strong> in Document Section
      </v-alert>
      <v-alert min-width="100%" min-height="50px" dense outlined type="error" v-else>
        Full n Final is
        <strong>Pending</strong> from Company.Not Available Yet
      </v-alert>
    </v-row>
    <v-row class="alert">
      <v-alert
        min-width="100%"
        min-height="50px"
        dense
        outlined
        type="success"
        v-if="DocumentStatus.SECONDMONTHSALARY=='Available'"
      >
        Salary Slip is
        <strong>Available</strong> in Document Section
      </v-alert>
      <v-alert min-width="100%" min-height="50px" dense outlined type="error" v-else>
        Salary Slip is
        <strong>Pending</strong> from Company.Not Available Yet
      </v-alert>
    </v-row>
    <v-row class="alert">
      <v-alert
        min-width="100%"
        min-height="50px"
        dense
        outlined
        type="success"
        v-if="DocumentStatus.THIRDMONTHSALARY=='Available'"
      >
        pf Document is
        <strong>Available</strong> in Document Section
      </v-alert>
      <v-alert min-width="100%" min-height="50px" dense outlined type="error" v-else>
        pf Clearance is
        <strong>Pending</strong> from Company.Not Available Yet
      </v-alert>
    </v-row>
  </div>
  <!-- <v-flex xs4>
        <v-icon   v-if="DocumentStatus.fnfStatus=='Available'" size="40px">mdi-checkbox-marked-circle-outline</v-icon>
        <v-icon v-else size="40px">mdi-exclamation</v-icon>
       
  </v-flex>-->
  <!-- <v-flex xs12>
     <v-alert
      dense
      outlined
      type="error"
    >
      I'm a dense alert with the <strong>outlined</strong> prop and a <strong>type</strong> of error
    </v-alert>
     </v-flex>
      <v-flex xs12>
        <v-alert
      dense
      outlined
      type="error"
    >
      I'm a dense alert with the <strong>outlined</strong> prop and a <strong>type</strong> of error
    </v-alert>
      </v-flex>
  -->
</template>
<script>
import { addTokenToPayload, getAlumniId } from "@/utils/utils";
export default {
  computed: {
    DocumentStatus: {
      get() {
        return this.$store.getters["userModule/getStatusData"];
      },
      set(data) {
        this.$store.commit("userModule/setStatusData",data);
      }
    }
  },
  methods: {
    getStatus() {
      let vm=this
      let data = {
        payload: {
          userid: getAlumniId()
        }
      };
      this.$store.dispatch("userModule/getStatus", data).then(response => {
        if(response.status==200)
        {
       vm.DocumentStatus=response.data.result
       console.log(vm.DocumentStatus)
        }
        
      });
    }
  },
  beforeMount() {
    this.getStatus();
  }
};
</script>

<style scoped>
.alert {
  margin-left: 0px;
  margin-right: unset;
}

</style>
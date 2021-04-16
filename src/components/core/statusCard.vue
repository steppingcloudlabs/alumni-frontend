<template>
  <div class="status">
    <v-card-title class="dashboard_header mt-3" style=" text-align:center">Document Status</v-card-title>
    <v-divider class="mr-5 mb-5" style="background:rgb(241, 135, 16);"></v-divider>
    <v-row class="alert mt-3">
      <v-alert
        min-width="100%"
       
        dense
        outlined
        type="success"
        v-if="DocumentStatus.FORM16=='Available'"
      >
        Form 16 is
        <strong>Available</strong> in Document Section
      </v-alert>
      <v-alert min-width="100%"  dense outlined type="error" v-else>
        Form 16 is
        <strong>Pending</strong> from Company.Not Available Yet
      </v-alert>
    </v-row>

    <v-row class="alert">
      <v-alert
        class="alertdata"
        min-width="100%"
       
        dense
        outlined
        type="success"
        v-if="DocumentStatus.RELIEVINGLETTER=='Available'"
      >
        Relieving Letter is
        <strong>Available</strong> in Document Section
      </v-alert>
      <v-alert min-width="100%"  dense outlined type="error" v-else>
        Relieving Letter is
        <strong>Pending</strong> from Company.Not Available Yet
      </v-alert>
    </v-row>
    <v-row class="alert">
      <v-alert
       class="alertdata"
        min-width="100%"
       
        dense
        outlined
        type="success"
        v-if="DocumentStatus.FIRSTMONTHSALARY=='Available'"
      >
        Salary Slip is
        <strong>Available</strong> in Document Section
      </v-alert>
      <v-alert min-width="100%" dense outlined type="error" v-else>
        Salary Slip is
        <strong>Pending</strong> from Company.Not Available Yet
      </v-alert>
    </v-row>
    <v-row class="alert">
      <v-alert
       class="alertdata"
        min-width="100%"
       
        dense
        outlined
        type="success"
        v-if="DocumentStatus.EXPERIENCELETTER=='Available'"
      >
        Experience Letter is
        <strong>Available</strong> in Document Section
      </v-alert>
      <v-alert min-width="100%" dense outlined type="error" v-else>
       Experience Letter is
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
.v-alert {
    display: block;
    font-size: 15px;
    margin-bottom: 16px;
    padding: 16px;
    position: relative;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    min-height: 50px;
}
@media screen and (max-width: 992px) {

.v-alert {
    display: block;
    font-size: 15px;
    margin-bottom: 16px;
    padding: 16px;
    position: relative;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    min-height: 50px;
}
}

/* On screens that are 600px or less, set the background color to olive */
 @media screen and (max-width: 640px) {
 
.v-alert {
    display: block;
    font-size: 12px;
    margin-bottom: 20px;
    padding: 10px;
    position: relative;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    min-height: 20px;
}
.dashboard_header
{
  font-size: 1.15rem;
}
} 

</style>
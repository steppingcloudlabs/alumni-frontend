<template>
  <v-layout row wrap style="margin-left:unset;" v-if="getjobs.length">
    <v-flex xs6 class="pl-3 pt-3" v-for="(item, i) in getjobs" :key="i">
      <v-hover v-slot:default="{ hover }">
        <v-card class="job_class" :elevation="hover? 24:1" min-height="150px">
          <v-card-title style="color:#232B2B">{{item.jobTitle}}</v-card-title>
          <v-layout row wrap style="margin-left:unset;">
            <v-flex xs5 class="my-0">
              <v-card-text>
                <v-icon color="blue" v-if="item.location">mdi-map-marker</v-icon>
                {{item.location}}
              </v-card-text>
            </v-flex>
            <v-flex xs5>
              <v-card-text>
                <v-icon color="blue" v-if="item.department">mdi-domain</v-icon>
                {{item.department}}
              </v-card-text>
            </v-flex>
            <v-flex xs9></v-flex>
             <v-flex xs3>
             <v-btn color="primary" text @click="openJob(item)">View More</v-btn>
             </v-flex>
          </v-layout>
          
         
          
        </v-card>
      </v-hover>
    </v-flex>
    <viewjob/>
  </v-layout>
</template>

<script>
import { addTokenToPayload, getAlumniId } from "@/utils/utils";
import viewjob from "@/components/core/viewjobDialog.vue";
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    viewjob
  },
  beforeMount() {
    let data = {
      payload: {
        skip: 0,
        limit: 10,
        userId: getAlumniId()
      }
    };
    this.jobData(data);
  },
  destroyed()
  {
    this.$store.commit("userModule/setJobs", {});
  },
  computed: {
    getjobs: {
      get() {
        return this.$store.getters["userModule/getJobs"];
      },
      set(data) {
        this.$store.commit("userModule/setJobs", this.data);
      }
    }
  },
  methods: {
    jobData(data) {
      this.skip = 0;
      let data1 = {
        payload: {
          skip: 0,
          limit: 10,
          userId: getAlumniId()
        }
      };
      console.log(this.getjobs.length);
      this.$store.dispatch("userModule/getJob", data1);
    },
    jobMoreData(data) {
      this.skip = this.skip + 1;
      let data1 = {
        payload: {
          skip: this.skip,
          limit: 10,
          userId: this.getAlumniId()
        }
      };
      console.log(this.getjobs.length);
      this.$store.dispatch("userModule/getMoreJob", data1);
    },
    openJob(data) {
      this.$store.commit("userModule/showViewJob",data);
    }
  },
  data() {
    return {
      search: {
        country: null,
        skill: null
      },
      country: null,
      skill: null,
      skip: 0
    };
  }
};
</script>
<style >
.v-data-table {
  border-top: "none";
}
</style>
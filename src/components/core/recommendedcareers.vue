<template>
 <div>
     <div v-if="showjobBar==true" >
      <v-layout style="margin-top:25%">
        <v-flex xs5>
        </v-flex>
          <v-flex xs5>
             <v-progress-circular class="text--center" color="orange" indeterminate size="44"></v-progress-circular>
        </v-flex>
   
      <v-flex xs2>
        </v-flex>
      </v-layout>
    </div>
    <div v-else> 
  <v-layout row wrap style="margin-left: unset" v-if="getjobs.length">
    <v-flex xs12 class="pl-3 pt-5" v-for="(item, i) in getjobs" :key="i">
      <v-hover v-slot:default="{ hover }">
        <v-card class="job_class" :elevation="hover ? 24 : 1" min-height="100px" style="margin-top:15px !important">
              <v-card-title style="color: #232b2b">{{item.JOBTITLE}}</v-card-title>
              <v-layout row wrap style="margin-left: unset">
                    <v-card-text>
                            <v-row align="center" class="mx-0">
        
                                <v-col cols="12" sm="2" v-if="item.LOCATION"> 
                                  <div class="grey--text ml-4"><v-icon color="blue" >mdi-map-marker</v-icon> {{item.LOCATION}}</div>
                                </v-col>
                                  
                                   <v-col cols="12" sm="3" v-if="item.POSTINGENDDATE">
                                  <div class="grey--text ml-4"> <v-icon color="blue" >mdi-calendar</v-icon> End Date: {{item.POSTINGENDDATE.substring(0,10)}}</div>
                                </v-col>
                                <v-col cols="12" sm="3" v-if="item.POSTINGSTARTDATE">
                                  <div class="grey--text ml-4"> <v-icon color="blue" >mdi-calendar</v-icon>Start Date: {{item.POSTINGSTARTDATE.substring(0,10)}}</div>
                                </v-col>
                              </v-row>
                              <v-row>
                                  <v-col cols="12" sm="2">
                                    <div class="grey--text ml-4">Posting ID:{{item.JOBPOSTINGID}}</div>
                                  </v-col>
                                  <v-col cols="12" sm="2">
                                    <div class="grey--text ml-4">Req ID:{{item.JOBREQID}}</div>
                                  </v-col>
                              </v-row>
                      </v-card-text>    
           
                    <v-flex xs5 v-if="item.DEPARTMENT">
                      <v-card-text>
                              <v-icon color="blue" >mdi-domain</v-icon>
                              {{ item.DEPARTMENT }}
                        </v-card-text>
                    </v-flex>
                  <v-flex xs8 class="ml-5">
                          {{ item.JOBDESCRIPTION.substring(0,10) }}
                              <span id="dots">
                                ...
                              
                              </span>   
                   </v-flex>
                  <v-flex xs3 class="mb-2">
                      <v-btn color="primary" text @click="openJob(item)">View More</v-btn>
                  </v-flex>
          </v-layout>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12  style="margin-top:35px!important">
       <p class="text-center">
          <pagination :next="next" :prev="prev" :totalLength="pagination.TOTALPAGES" @pageClicked="pageClicked"></pagination>
       </p>
    </v-flex>
       <viewjob />
  </v-layout>
  <div v-else class="subtitle-1 mt-5">
    <p class="white--text text-center">
      NoJobs Available
      <v-img
        style="margin-right: auto; margin-left: auto"
        width="100"
        height="100"
        src="@/assets/waiting.gif"
      ></v-img>
    </p>
  </div>
    </div>
 </div>
</template>

<script>
import { addTokenToPayload, getAlumniId } from "@/utils/utils";
import viewjob from "@/components/core/viewjobDialog.vue";
import pagination from "@/components/material/CommonPagination.vue"
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    viewjob,
    pagination
  },
  beforeMount() { 
    this.showjobBar=true
    this.jobData(3,0);
  },
  destroyed() {
    this.$store.commit("userModule/setJobs", {});
  },
  computed: {
    getjobs: {
      get() {
        return this.$store.getters["userModule/getJobs"];
      },
      set(data) {
        this.$store.commit("userModule/setJobs", this.data);
      },
    },
  },
  methods: {
    pageClicked(data)
    {
       let lim=(data-1)*3
      this.jobData(3,lim)
    },
    next()
    {
      this.pagination.LIMIT+=0
      this.pagination.OFFSET+=this.pagination.LIMIT;
      this.jobData(this.pagination.LIMIT,this.pagination.OFFSET)
    },

     prev()
    {
      this.pagination.LIMIT-=0
      this.pagination.OFFSET-=this.pagination.LIMIT;
      this.jobData(this.pagination.LIMIT,this.pagination.OFFSET)
    },
    jobData(limit,offset) {
     let userId=getAlumniId()
      console.log(this.getjobs.length);
       this.$store.dispatch("userModule/recommendedJob", { payload: { limit:limit,offset:offset,userId:userId } }).then((response) => {
        if (response.status == 200) {
          this.showjobBar=false
          this.showLoader = false;
          this.pagination=response.data.pagination 
         this.pagination = Object.assign({}, this.someObject, response.data.pagination )
        }
      });

    },
    jobMoreData(data) {
      this.skip = this.skip + 1;
      let data1 = {
        payload: {
          skip: this.skip,
          limit: 10,
          userId: getAlumniId(),
        },
      };
      console.log(this.getjobs.length);
      this.$store.dispatch("userModule/getMoreRecommendedJob", data1);
    },
    openJob(data) {
      this.$store.commit("userModule/showViewJob", data);
    },
  },
  data() {
    return {
      showjobBar:false,
       pagination:{
        LIMIT:3,
        OFFSET:0,
      },
      search: {
        country: null,
        SKILL: null,
      },
      country: null,
      SKILL: null,
      skip: 0,
    };
  },
};
</script>
<style >
.v-data-table {
  border-top: "none";
}
</style>
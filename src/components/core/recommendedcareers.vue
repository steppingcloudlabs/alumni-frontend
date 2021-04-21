<template>
  <div>
    <div v-if="showjobBar == true">
      <v-layout style="margin-top: 25%">
        <v-flex xs5> </v-flex>
        <v-flex xs5>
          <v-progress-circular
            class="text--center"
            color="orange"
            indeterminate
            size="44"
          ></v-progress-circular>
        </v-flex>

        <v-flex xs2> </v-flex>
      </v-layout>
    </div>
    <div v-else>
      <!--
  <v-layout row wrap style="margin-left: unset;width:1200px;" v-if="getjobs.length">
    <v-flex xs12 class="pl-3 pt-5" v-for="(item, i) in getjobs" :key="i">
      <v-hover v-slot:default="{ hover }">
        <v-card class="job_class" :elevation="hover ? 24 : 1" min-height="100px" 
        style="margin-top:15px !important;box-shadow:  15px 15px 40px -10px #808080;background-color:#1A265C;transition: all 0.5s ease-in
        ">
              <v-card-title style="color: orange">{{item.JOBTITLE}}</v-card-title>
              <v-layout row wrap 
              style="margin-left: unset;
              background-color:white;
              box-shadow:  15px 15px 20px -15px #808080;
              width:100%">
                    <v-card-text>
                            <v-row align="center" class="mx-0">
                                <v-col cols="12" sm="2" v-if="item.LOCATION"> 
                                  <div class="black--text ml-4" ><v-icon color="blue" >mdi-map-marker</v-icon> {{item.LOCATION}}</div>
                                </v-col>
                                <v-col cols="12" sm="3" v-if="item.POSTINGENDDATE">
                                  <div class="black--text ml-4" color="white"> <v-icon color="blue" >mdi-calendar</v-icon> End Date: {{item.POSTINGENDDATE.substring(0,10)}}</div>
                                </v-col>
                                <v-col cols="12" sm="3" v-if="item.POSTINGSTARTDATE">
                                  <div class="black--text ml-4"> <v-icon color="blue" >mdi-calendar</v-icon>Start Date: {{item.POSTINGSTARTDATE.substring(0,10)}}</div>
                                </v-col>
                                
                      <v-flex xs3 v-if="item.DEPARTMENT" >
                      <v-card-text>
                              <v-icon color="blue" >mdi-domain</v-icon>
                              {{ item.DEPARTMENT }}
                      </v-card-text>
                      </v-flex>
                      
                                <v-col cols="12" sm="4">
                                    <div class="black--text ml-4">Posting ID:{{item.JOBPOSTINGID}}</div>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <div class="black--text ml-4">Req ID:{{item.JOBREQID}}</div>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    {{ item.JOBDESCRIPTION.substring(0,10) }}
                              <span id="dots">
                                ...
                              
                              </span> 
                                      <v-btn color="primary" text @click="openJob(item)">View More</v-btn>
                                
                                </v-col>
                              
                         
                      
                      
                  </v-row>
                  </v-card-text> 
                  
                  
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
  -->
      <v-layout
        row
        wrap
        style="margin-left: 10px; width: 98%"
        v-if="recentData.length"
      >
        <v-flex
          xs12
          sm6
          md6
          lg6
          xl6
          class="pl-3 pt-5"
          v-for="(item, i) in recentData"
          :key="i"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="job_class"
              :elevation="hover ? 24 : 1"
              style="
                margin-top: 15px !important;
                box-shadow: 15px 15px 40px -10px #808080;
                transition: all 0.5s ease-in;
              "
            >
              <v-img
                height="200px"
                src="@/assets/opportunities_bg.jpg"
                class="img_transparent pa-5"
              >
                <v-overlay absolute color="#2A3151">
                  <v-card-title
                    class="jobtitle"
                    style="color: white; align: center; padding-top: 25px"
                    v-if="item.JOBTITLE"
                    >{{ item.JOBTITLE }}</v-card-title>

                     <v-card-title
                    class="jobtitle"
                    style="color: white; align: center; padding-top: 25px"
                    v-else
                    >Software Developer</v-card-title>

                  <v-flex xs6 >
                    <div class="white--text ml-4 pb-3">
                      <v-icon class="jobicon" color="white">mdi-calendar</v-icon
                      >Start Date: <span v-if="item.POSTINGSTARTDATE"> {{ item.POSTINGSTARTDATE.substring(0, 10) }}</span>
                      <span v-else>Not Available</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 >
                    <div class="white--text ml-4 pb-3" color="white">
                      <v-icon class="jobicon" color="white"
                        >mdi-calendar</v-icon
                      >
                      End Date:<span v-if="item.POSTINGENDDATE"> {{ item.POSTINGENDDATE.substring(0, 10) }}</span>
                       <span v-else>Not Available</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 >
                    <div class="white--text ml-4 ">
                      <v-icon class="jobicon" color="white"
                        >mdi-map-marker</v-icon><span v-if="item.LOCATION">{{ item.LOCATION }}</span>
                         <span v-else>Not Available</span>
                    </div>
                  </v-flex>
                  
                   <v-flex xs12 class="pb-5 ">
                          <v-btn
                          text
                          color="#E4BA18"
                          class="text-capitalize"
                          style="float:right"
                          @click="openJob(item)"
                          >View Description</v-btn
                        >
                  </v-flex>
                 
                </v-overlay>
              </v-img>

              <!-- <v-layout
                row
                wrap
                mt-0
                class="jobdesc"
                style="
                  margin-left: unset;
                  background-color: white;

                  width: 100%;
                "
              > -->
                <!-- <v-flex xs6 v-if="item.LOCATION" > 
                                  <div class="black--text ml-4 pt-3 pb-3" ><v-icon class="jobicon" color="blue" >mdi-map-marker</v-icon>{{item.LOCATION}}</div>
                                </v-flex>
                                <v-flex xs6 v-if="item.DEPARTMENT" >
                                    <div class="black--text ml-4 pt-3 pb-3" ><v-icon class="jobicon" color="blue" >mdi-domain</v-icon>{{item.DEPARTMENT}}</div>
                      
                                </v-flex>
                                <v-flex xs6 v-if="item.POSTINGENDDATE">
                                  <div class="black--text ml-4 pb-3" color="white"> <v-icon class="jobicon" color="blue" >mdi-calendar</v-icon> End Date: {{item.POSTINGENDDATE.substring(0,10)}}</div>
                                </v-flex>
                                <v-flex xs6 v-if="item.POSTINGSTARTDATE">
                                  <div class="black--text ml-4 pb-3"> <v-icon class="jobicon" color="blue" >mdi-calendar</v-icon>Start Date: {{item.POSTINGSTARTDATE.substring(0,10)}}</div>
                                </v-flex> -->
                <!-- <v-flex xs12 ml-3 mr-3 mt-3 style="font-size: 12px" v-html="item.JOBDESCRIPTION.substring(0, 200)">
                
                </v-flex>
                <v-flex xs3 sm8 md8 lg8 xl8> </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4 style="margin: auto">
                  <v-btn
                    text
                    color="#E4BA18"
                    class="text-capitalize"
                    @click="openJob(item)"
                    >View Description</v-btn
                  >
                </v-flex> -->
                <!--
                                <v-col cols="12" sm="4">
                                    {{ item.JOBDESCRIPTION.substring(0,10) }}
                              <span id="dots">
                                ...
                              
                              </span> 
                                      <v-btn color="primary" text @click="openJob(item)">View More</v-btn>
                                
                                </v-col>
                                -->
              <!-- </v-layout> -->
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 style="margin-top: 35px !important">
          <p class="text-center">
            <pagination
              :next="next"
              :prev="prev"
              :totalLength="pagination.TOTALPAGES"
              @pageClicked="pageClicked"
            ></pagination>
          </p>
        </v-flex>
        <viewjob />
      </v-layout>
      <div v-else class="subtitle-1 mt-5">
        <p class=" text-center">
          No Jobs Available
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
import pagination from "@/components/material/CommonPagination.vue";
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    viewjob,
    pagination,
  },
  beforeMount() {
    this.showjobBar = true;
    this.jobData(6, 0);
    
  },
  destroyed() {
    this.$store.commit("userModule/setrecomJobs", {});
  },
  computed: {
    getjobs: {
      get() {
        return this.$store.getters["userModule/getrecomJobs"];
      },
      set(data) {
        this.$store.commit("userModule/setrecomJobs", data);
      },
    },
  },
  watch:{
      getjobs()
      {
        console.log(this.getjobs.length)
      }
  },
  methods: {
    pageClicked(data) {
    
      let lim = (data - 1) * 6;
        if(this.getjobs.length<=lim)
           {
               this.jobData(6, lim);
           }
        else
           {
              this.recentData=this.getjobs.slice(lim)
          }

    },
    next() {
      this.pagination.LIMIT += 0;
      this.pagination.OFFSET += this.pagination.LIMIT;
       if(this.getjobs.length<=this.pagination.OFFSET)
           {
              this.jobData(this.pagination.LIMIT, this.pagination.OFFSET);
           }
        else
           {
              this.recentData=this.getjobs.slice((this.pagination.OFFSET-this.pagination.LIMIT))
          }
      
    },

    prev() {
      this.pagination.LIMIT -= 0;
      this.pagination.OFFSET -= this.pagination.LIMIT;
       if(this.getjobs.length<=this.pagination.OFFSET)
           {
              this.jobData(this.pagination.LIMIT, this.pagination.OFFSET);
           }
        else
           {
              this.recentData=this.getjobs.slice((this.pagination.OFFSET-this.pagination.LIMIT))
          }
    },
    jobData(limit, offset) {
      let userId = getAlumniId();
      let listlen=this.getjobs.length
      this.$store
        .dispatch("userModule/recommendedJob", {
          payload: { limit: limit, offset: offset, userId: userId },
        })
        .then((response) => {
          if (response.status == 200) {
            // Array.prototype.push.apply(this.getjobs, response.data.result);
          
             console.log(this.getjobs)
              console.log("hiieelo"+this.getjobs.length);
              if(this.getjobs.length<offset)
              {
                  this.recentData=this.getjobs.slice(listlen)
              }
              else
              {
                this.recentData=this.getjobs.slice(offset-limit)
              }
            
              console.log("hiieelo"+this.getjobs.length);
             console.log(this.recentData)
            this.showjobBar = false;
            this.showLoader = false;
            this.pagination = response.data.pagination;
            this.pagination = Object.assign(
              {},
              this.someObject,
              response.data.pagination
            );
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
      recentData:[],
      showjobBar: false,
      pagination: {
        LIMIT: 6,
        OFFSET: 0,
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
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
/* .job_class:hover .jobicon
{
   color: transparent !important;
}
     */
/* .jobtitle {
    opacity: none;
  } */
.v-overlay__content {
  width: 100%;
}
.v-application--wrap {
  min-height: 100vh;
  justify-content: center;
}
.jobdesc {
  height: 120px;
  box-shadow: 15px 15px 20px -15px #808080;
}
.job_class {
  min-height: 200px;
  width: 450px;
}
@media screen and (max-width: 640px) {
  .jobtitle {
    font-size: 0.99rem !important;
  }
  .jobdesc {
    height: 250px;
    box-shadow: 15px 15px 20px -15px #808080;
  }
  /* .job_class {
    min-height: 260px;
  } */
}
</style>
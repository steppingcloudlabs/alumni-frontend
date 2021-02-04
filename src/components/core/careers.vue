<template >
  <div style="background-color:white" class="ma-0 pa-0">
    <!-- <v-img height="500px" src="@/assets/career_bg.jpg">
      <core-app-bar ></core-app-bar>
    </v-img>
    <v-toolbar elevation="0" color="#1A1A1D">
      <v-toolbar-title style="font-family: Raleway;color:#5097DD">Recommended Careers</v-toolbar-title>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="jobs"
      :sort-by="['date']"
      :sort-desc="[true]"
      hide-default-header
      hide-default-footer
      multi-sort
      height="auto"
      dark
      style="background:#1A1A1D;border-bottom:none;"
    ></v-data-table>-->

    <v-card
      color="rgb(0,0,0,0.5)"
      min-height="100%"
      width="100%"
      class="ma-0 pa-0"
      flat
      tile
     
    >
      <v-img
        height="200px"
        src="@/assets/pic1.jpg"
        gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.8)"
       cover
      >
        <v-card-title
          class="title"
          style="margin-left:3%; margin-top:1%; color:white"
          >Search Jobs</v-card-title>
        <p class="text--center">
          <v-layout row wrap >
            <v-flex xs12 sm3 md3 lg3 xl3 class="searchField" >
              <v-text-field
                v-model="search.SKILL"
                label="Search By Keywords"
                solo
                dense
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm3 md3 lg3 xl3 class="searchField" >
              <v-text-field
                v-model="search.country"
                label="Search By Location"
                solo
                dense
              ></v-text-field>
            </v-flex>

            <v-flex class="searchFlex" xs12 sm3 md3 lg3 xl3 style="margin-top: 0%; margin-left: 5%">
              <v-btn
                color="blue"
                style="color: White"
                large
                type="text"
                @click="jobMoreData(3,0)"
                class="text-capitalize searchbtn"
                >Search</v-btn
              >
            </v-flex>
          </v-layout>
        </p>
      </v-img>
    </v-card>

    <v-card-title style="color: black">Current Openings</v-card-title>
    <v-divider style="background: rgb(241, 135, 16)"></v-divider>
    <div class="text-center" v-if="showLoader">
      <v-progress-circular
        style="margin-top: 100px"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div>
      <v-layout
        row
        wrap
        style="margin-left: unset; "
        v-if="getjobs.length && !showLoader"
      >
        <v-flex  xs12 sm6 md6 lg6 xl6  class="pl-0 pt-5" v-for="(item, i) in getjobs" :key="i">

          <v-hover v-slot:default="{ hover }">
             
            <v-card 
             
              :elevation="hover ? 24 : 1"
              
              style="margin-top:15px !important;margin-left:4%;width:90%;box-shadow:15px 15px 40px -10px !important;background-color:white;transition: all 0.5s ease-in"
            
            >
            <!-- <v-img height="300px" src="@/assets/opportunities_bg.jpg" style="opacity:30%" class="img_transparent"> -->
           <v-layout row wrap>
            <v-flex xs3 style="background-color:#1A265C;">
            <div class="white--text pt-5 pb-5 pl-5 pr-5 mt-5" style="text-align:center" >
                    <v-icon  x-large class="jobicon" color="white" v-if="item.LOCATION"
                      >mdi-map-marker</v-icon
                    >
                    <p>{{ item.LOCATION }}</p>
                  </div>
            </v-flex>
            <v-flex xs9>
            <v-card-title class="jobtitle" style="color:black">
              
              {{
                item.JOBTITLE
              }}</v-card-title>
              <v-layout row wrap>
              <v-flex xs12 >
                  <div class="black--text pl-2 pb-3">
                    <v-icon class="jobicon" color="black" v-if="item.DEPARTMENT"
                      >mdi-calendar</v-icon
                    >
                   Start Date {{ item.POSTINGSTARTDATE.substring(0,10) }}
                  </div>
                </v-flex>
                <v-flex xs5 >
                  <div class="black--text pl-2">
                    <v-icon class="jobicon" color="black" v-if="item.LOCATION"
                      >mdi-calendar</v-icon
                    >
                    End Date:{{ item.POSTINGENDDATE.substring(0,10) }}
                  </div>
                </v-flex>
              
                <v-flex xs6 style="text-align:end;margin-right:2px;padding-bottom:20px" >
                 <v-btn color="#E4BA18" class="text-capitalize"  @click="openJob(item)"
                      >View More</v-btn>
                </v-flex>
              </v-layout>

                            </v-flex>
           </v-layout>
                 
          
            <!-- </v-img> -->
           
              
              
              <!-- <v-layout mt-0 row wrap style="margin-left: unset;
              background-color:white;
              box-shadow:  15px 15px 20px -15px #808080;
              width:100%;
              height:200px
              "> -->


              <!-- <v-col cols="12" sm="12" style="font-size:12px">
                                    {{ item.JOBDESCRIPTION.substring(0,500) }}
                              <span id="dots">
                                ...
                              
                              </span> 
                                
                      
                      
                    </v-col> -->
               
                
                <!-- <v-flex xs6  >
                  <div class="black--text ml-4 pt-5 pb-3">
                    <v-icon class="jobicon" color="blue" v-if="item.DEPARTMENT"
                      >mdi-domain</v-icon
                    >
                    {{ item.DEPARTMENT }}
                  </div>
                </v-flex> -->
                 
              <!-- </v-layout> -->
              <!--<div class="pa-5">
                <p style="font-size: 15px">
                  {{ item.JOBDESCRIPTION.substring(0,10) }}
                  <span id="dots">
                    ...
                    <v-btn color="primary" text @click="openJob(item)"
                      >View More</v-btn
                    >
                  </span>
                </p>
              </div>
              -->
              <!-- <v-card-text>
                <span
                  v-for="(SKILL,j) in jobs[i].compentency"
                  :key="j"
                >{{jobs[i].compentency[j]}},&nbsp;</span>
              </v-card-text>-->

              <!-- <v-flex xs2>
                  <v-card-actions>
                    <v-btn color="primary" outlined @click="openJob(item)">View</v-btn>
                  </v-card-actions>
              </v-flex>-->
              <!-- <v-flex xs2>
                  <v-card-actions>
                   <v-btn color="primary">Refer</v-btn>
                  </v-card-actions>
              </v-flex>-->
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12>
          <p class="text-center" style="padding-top:40px">
           <pagination :next="next" :prev="prev" :totalLength="pagination.TOTALPAGES" @pageClicked="pageClicked"></pagination>
          </p>
        </v-flex>
      </v-layout>
      <div v-if="!getjobs.length && !showLoader" class="subtitle-1 mt-5">
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
    <viewjob></viewjob>
  </div>
</template>

<script>
import viewjob from "@/components/core/viewjobDialog.vue";
import pagination from "@/components/material/CommonPagination.vue"
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    viewjob,
    pagination
  },
  beforeMount() {
    this.showLoader = true;
    this.country = "null";
    this.SKILL = "null";
    let data = {
      country: this.country,
      SKILL: this.SKILL,
    };
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
      this.jobData(data)
    },
    next()
    {
      this.pagination.LIMIT+=3
      this.pagination.OFFSET+=1
      this.jobData(this.pagination.LIMIT,this.pagination.OFFSET)
    },

     prev()
    {
      this.pagination.LIMIT-=3
      this.pagination.OFFSET-=1
      this.jobData(this.pagination.LIMIT,this.pagination.OFFSET)
    },
    jobData(limit,offset) {
     
      console.log(this.getjobs.length);
      this.$store.dispatch("userModule/getJob", { payload: { limit:limit,offset:offset } }).then((response) => {
        if (response.status == 200) {
          this.showLoader = false;
          this.pagination=response.data.pagination 
         this.pagination = Object.assign({}, this.someObject, response.data.pagination )
        }
      });

      (this.search.country = null), (this.search.SKILL = null);
    },
    jobMoreData(limit,offset) {
      this.showLoader=true
      console.log(this.getjobs.length);
      this.$store.dispatch("userModule/getSearchJob", { payload: { limit:limit,offset:offset,skill:this.search.SKILL,country:this.search.country } }).then((response) => {
        if (response.status == 200) {
          this.showLoader = false;
          this.pagination=response.data.pagination 
         this.pagination = Object.assign({}, this.someObject, response.data.pagination )
        }
      });
      (this.search.country = null), (this.search.SKILL = null);
    },
    openJob(data) {
      this.$store.commit("userModule/showViewJob", data);
    },
  },
  data() {
    return {
      showLoader: false,
      pagination:{
        LIMIT:3,
        OFFSET:0,
        TOTALPAGES:0
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
/* .v-application--is-ltr .v-responsive__sizer~.v-responsive__content {
    margin-left:0% !important;
} */
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .6;
    position: absolute;
    width: 100%;
    
}

.v-application--wrap {
    min-height: 100vh;
    justify-content: center;
}
.searchField{
margin-top: 0%;
 margin-left: 5%
}

@media screen and (max-width: 640px) {
  .searchField{
margin-top: 0%;
 margin-left: 5%;
 margin-right: 5%;
}
.searchbtn
{
 margin-top: -20px;
 height: 30px  !important;
 width: 100px !important;
 
}
.searchFlex
{
  text-align: center;
  margin-right: 15px;
  padding-bottom: 2px;
}
}
</style>
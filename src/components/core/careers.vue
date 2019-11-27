<template>
  <div class="ma-0 pa-0">
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
      style="margin-left:auto;margin-right:auto"
    >
      <v-img
        height="200px"
        src="@/assets/pic1.jpg"
        gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.8)"
      >
        <v-card-title class="title" style="margin-left:3%;margin-top:1%;color:white">Search Jobs</v-card-title>
        <p class="text--center">
          <v-layout style="margin-left:auto;margin-right:auto">
            <v-flex xs4 style="margin-top:0%;margin-left:5%">
              <v-text-field label="Search By Keywords" solo dense></v-text-field>
            </v-flex>
            <v-flex xs4 style="margin-top:0%;margin-left:5%">
              <v-text-field label="Search By Location" solo dense></v-text-field>
            </v-flex>

            <v-flex xs4 style="margin-top:0%;margin-left:5%">
              <v-btn color="blue" style="color:White" large>Search</v-btn>
            </v-flex>
          </v-layout>
        </p>
      </v-img>
    </v-card>

    <v-card-title style="color:white">Current Openings</v-card-title>
    <v-divider style="background:rgb(241, 135, 16);"></v-divider>
    <div>
      <v-layout row wrap style="margin-left:unset;">
        <v-flex xs6 class="pl-3 pt-3" v-for="(item, i) in jobs" :key="i">
          <v-hover v-slot:default="{ hover }">
            <v-card class="job_class" :elevation="hover? 24:1">
              <v-card-title style="color:#232B2B">{{jobs[i].name}}</v-card-title>
              <v-card-text>
                <span
                  v-for="(skill,j) in jobs[i].compentency"
                  :key="j"
                >{{jobs[i].compentency[j]}},&nbsp;</span>
              </v-card-text>

              <v-layout row wrap style="margin-left:unset;">
                <v-flex xs4>
                  <v-card-text>
                    <v-icon color="blue">mdi-map-marker</v-icon>
                    {{jobs[i].location}}
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-card-text>
                    <v-icon color="blue">mdi-calendar</v-icon>
                    {{jobs[i].date}}
                  </v-card-text>
                </v-flex>
                <v-flex xs2>
                  <v-card-actions>
                    <v-btn color="primary" outlined>Apply</v-btn>
                  </v-card-actions>
                </v-flex>
                <!-- <v-flex xs2>
                  <v-card-actions>
                   <v-btn color="primary">Refer</v-btn>
                  </v-card-actions>
                </v-flex>-->
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar")
  },
  data() {
    return {
      headers: [
        {
          text: "POSTION",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "LOCATION", value: "location" },
        { text: "DEPARTMENT", value: "department" },
        { text: "DATE", value: "date" }
      ],
      jobs: [
        {
          name: "Associate Consultant",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        },
        {
          name: "Developer",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        },
        {
          name: " Deputy Manager",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        },
        {
          name: "IT Consultant",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        },
        {
          name: "Senior Consultant",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        },

        {
          name: "Associate Consultant",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        }
      ]
    };
  }
};
</script>
<style >
.v-data-table {
  border-top: "none";
}
.job_class:hover {
}
</style>
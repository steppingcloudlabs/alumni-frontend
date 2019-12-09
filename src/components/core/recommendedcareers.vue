<template>
  <v-layout row wrap style="margin-left:unset;">
    <v-flex xs6 class="pl-3 pt-3" v-for="(item, i) in jobs" :key="i">
      <v-card>
        <v-card-title>{{jobs[i].name}}</v-card-title>
        <v-card-text>
          <span v-for="(skill,j) in jobs[i].compentency" :key="j">{{jobs[i].compentency[j]}},&nbsp;</span>
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
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
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
        }
      ]
    };
  }
};
</script>
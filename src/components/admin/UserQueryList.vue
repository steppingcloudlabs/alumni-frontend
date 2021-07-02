<template>
  <v-layout row wrap class="ma-0 pa-0">
    <v-flex xs12>
      <v-card class="mx-auto" min-height="250px">
        <!-- <v-toolbar fixed >
          <v-toolbar-title class="ml-5" >
            <span class="mr-5">
              <i class="fas fa-arrow-left" style="cursor:pointer" @click="backToList"></i>
            </span>
            <span>Queries</span>
          </v-toolbar-title>
        </v-toolbar> -->
        <v-list shaped v-if="queryList.length">
          <v-list-item-group v-model="selectedQuery">
            <v-list-item
              two-line
              v-for="(item, i) in queryList"
              :key="i"
              @click="queryItemClicked(item, i)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.TITLE">
                 
                </v-list-item-title>
                <v-list-item-subtitle
                  style="font-size: 12px"
                  v-text="getDateFromTimeStamp(item.LASTMODIFIEDAT)"
                ></v-list-item-subtitle>
              </v-list-item-content>
               <v-list-item-icon v-if="item.RESOLVED">
                            <v-chip
                      
                      color="success"
                      text-color="secondary" >
                      <v-avatar left>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      Closed
                    </v-chip>
            </v-list-item-icon>
              <v-list-item-icon v-else>
                            <v-chip
                          
                     
                      color="error"
                      text-color="secondary"
                      label >
                      <v-avatar left>
                        <v-icon>mdi-information</v-icon>
                      </v-avatar>
                      Open
                    </v-chip>
            </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div v-else>
          <p class="text-center" style="font-size: 18px; margin-top: 30px">
            No Tickets
          </p>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
 
<script>
import moment from "moment";
export default {
  name: "UserQueryList",
  data() {
    return {
      selectedQuery: {},
    };
  },
  props: {
    queryList: {
      type: Array,
      default: undefined,
    },
  },

  computed: {
    userId() {
      return this.$store.getters["userModule/getSavedUserObjectId"];
    },
  },

  methods: {
    getDateFromTimeStamp(date) {
      return moment.unix(parseInt(date / 1000)).format("LL");
    },
    queryItemClicked(item, index) {
      this.$emit("queryItemClicked", { messageObj: item, messageIndex: index });
    },
  },
};
</script>

<style>
</style>
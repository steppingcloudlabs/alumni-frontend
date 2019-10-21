<template>
  <div>
    <v-layout row wrap mt-4 v-for="(item,i) in getAlumniList" :key="i">
      <v-row>
        <v-col cols="12" md="3">
          <span>item.user_id</span>
        </v-col>
        <v-col cols="12" md="3">
          <span>item.firstName</span>
        </v-col>
        <v-col cols="12" md="3">
          <span>item.lastName</span>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    getAlumniList: {
      get() {
        return this.$store.getters["adminModule/getAlumniList"];
      },
      set(data) {
        this.$store.commit("adminModule/setAlumniList", this.data);
      }
    }
  },

  data() {
    return {
      count: 1
    };
  },
  methods: {
    showEventDialog(index) {
      this.$store.commit(
        "adminModule/showEventDialog",
        JSON.parse(JSON.stringify(this.getEventList[index]))
      );
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedEvents",
        deleteActionToDispatch: "deleteEvents"
      });
    }
  },
  beforeMount() {
    this.$store.dispatch("adminModule/getAllAlumni");
  }
};
</script>
<template>
  <v-layout row wrap class="pa-5" v-if="render">
    <v-flex xs12>
      <v-card v-if="escalationManager && escalationManager.level" min-height="200px" light>
        <div
          class="title pt-4 pl-3 text-capitalize"
        >{{escalationManager.level.replace("_manager_", " level ")}}</div>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title
              class="subtitle-1 mb-1"
            >{{escalationManager.esclation_manager_id.email}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn fab small text @click="showDeleteDialog()">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
          <v-btn fab small text @click="addManagerDialog()">
            <v-icon color="blue">edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else light min-height="200px" class="pa-0 ma-0">
        <v-card-title class="title pt-4 pl-3">Escalation Level 1</v-card-title>
        <div class="text-center">
          <v-card-text style="color: black; height: 110px; line-height: 80px">No manager added</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text-center" color="primary" @click="addManagerDialog">Add Manager</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "EscalationManagerCard",
  data() {
    return {};
  },
  props: {
    escalationManager: {
      type: Object,
      default: undefined
    },
    arrayIndex: {
      type: Number,
      default: undefined
    },
    render: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    escalationManager() {
      console.log(this.escalationManager);
    }
  },
  methods: {
    addManagerDialog() {
      this.$emit("addManagerDialog", this.arrayIndex);
    },
    showDeleteDialog() {
      this.$emit("showDeleteDialog", this.arrayIndex);
    }
  }
};
</script>
<style>
</style>
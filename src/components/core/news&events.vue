<template>
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <v-row>
    <v-col cols="12" md="8">
      <v-flex xs8>
        <v-toolbar elevation="0" color="#1A1A1D">
          <v-toolbar-title style="font-family: Raleway;color:#66FCF1">News</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-card class="scroll" height="200" color="#1A1A1D" dark elevation="0">
        <v-list-item three-line v-for="(item,i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
            <v-list-item-subtitle>{{item.text}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" md="4">
      <v-flex xs6>
        <v-toolbar elevation="0" color="#1A1A1D">
          <v-toolbar-title style="font-family: Raleway;color:#66FCF1">Events</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-card height="200" color="#1A1A1D" dark elevation="0" class="scroll">
        <v-list-item three-line v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
            <v-list-item-subtitle>{{item.text}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: "news1", text: "asdfgjkvvbnn" },
        { title: "news2", text: "asdfgjkvvbnn" },
        { title: "news3", text: "asdfgjkvvbnn" },
        { title: "news4", text: "asdfgjkvvbnn" }
      ]
    };
  }
};
</script>
<style >
.scroll {
  overflow-y: auto;
  background: "#66FCF1";
}
</style>
<template>
  <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item icon="check" fill-dot v-if="items[0].status==1" class="mr-3 ml-3">
      <v-card color="success" dark>
        <v-card-text class="white text--primary">
          <p>Clearance From Company</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item icon-color="grey" v-else color="grey" fill-dot class="mr-3 ml-3">
      <v-card color="success" dark>
        <v-card-text class="white text--primary">
          <p>Pending From Company</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>

    <v-timeline-item icon="check" fill-dot v-if="items[1].status==1" class="mr-3 ml-3">
      <v-card color="success" dark>
        <v-card-text class="white text--primary">
          <p>FnF status Available</p>
          <v-btn color="success" class="mx-0" outlined>Download</v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item icon-color="grey" v-else color="grey" fill-dot class="mr-3 ml-3">
      <v-card :color="items[1].color" dark>
        <v-card-text class="white text--primary">
          <p>FnF status yet to be Available</p>
          <!-- <v-btn :color="items[1].color" class="mx-0" outlined>Download</v-btn> -->
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          color: "purple darken-1",
          text: "Pending",
          status: 1
        },
        {
          color: "red lighten-2",
          text: "Available",
          status: 0
        }
      ]
    };
  }
};
</script>
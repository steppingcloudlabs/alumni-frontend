<template>
  <v-container>
    <v-layout>
      <v-row>
        <v-col>
          <v-card class="mx-auto" max-width="300">
            <v-img
              class="white--text"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>When AI Meets Alumni Portal</v-card-title>
            </v-img>
            <v-card-text>
              <span>Number 10</span>
              <br />
              <span class="text--primary">
                <span>Whitehaven Beach</span>
                <br />
                <span>Whitsunday Island, Whitsunday Islands</span>
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col><v-card class="mx-auto" max-width="300">
            <v-img
              class="white--text"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>When AI Meets Alumni Portal</v-card-title>
            </v-img>
            <v-card-text>
              <span>Number 10</span>
              <br />
              <span class="text--primary">
                <span>Whitehaven Beach</span>
                <br />
                <span>Whitsunday Island, Whitsunday Islands</span>
              </span>
            </v-card-text>
          </v-card>
          </v-col>
         
        <v-col><v-card class="mx-auto" max-width="300">
            <v-img
              class="white--text"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>When AI Meets Alumni Portal</v-card-title>
            </v-img>
            <v-card-text>
              <span>Number 10</span>
              <br />
              <span class="text--primary">
                <span>Whitehaven Beach</span>
                <br />
                <span>Whitsunday Island, Whitsunday Islands</span>
              </span>
            </v-card-text>
          </v-card></v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
      alignment: "center",
      dense: false,
      justifyAvailable: [
        "start",
        "center",
        "end",
        "space-around",
        "space-between"
      ],
      justify: "center"
    };
  }
};
</script>
<template>

    
      <v-row>
        <v-col>
          <v-card class="mx-auto" max-width="370" elevation='1'>
            <v-img
              class="white--text"
              height="200px"
              src="@/assets/back4.jpg"
            >
            <v-card-title  class='text-center' style="font-family:Raleway;color:#1A1A1D">Activity1</v-card-title>
            </v-img>
            <v-card-text>
              <span>Number 10</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col><v-card class="mx-auto" max-width="370" elevation='1'>
            <v-img
              class="white--text"
              height="200px"
              src="@/assets/back4.jpg"
            >
             <v-card-title  class='text-center' style="font-family:Raleway;color:#1A1A1D">Activity2</v-card-title>
            </v-img>
            <v-card-text>
              <span>Number 10</span>
             
            </v-card-text>
          </v-card>
          </v-col>
         
        <v-col><v-card class="mx-auto" max-width="370" elevation='1'>
            <v-img
              class="white--text"
              height="200px"
              src="@/assets/back4.jpg"
            >
              <v-card-title  class='text-center' style="font-family:Raleway;color:#1A1A1D">Activity3</v-card-title>
            </v-img>
            <v-card-text>
              <span>Number 10</span>
              
            </v-card-text>
          </v-card></v-col>
      </v-row>
  
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
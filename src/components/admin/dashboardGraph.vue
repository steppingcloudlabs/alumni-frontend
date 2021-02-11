<template>
  <v-card
    class="mx-auto text-center"
    color="#1A265C"
    dark
    max-width="90%"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
         :labels="label"
        :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
          
        >
          <!-- <template v-slot:label="item">
            {{ item.label }}
          </template> -->
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">
       Active Users Last 1 week
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn
        block
        text
      >
        Go to Report
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
     label: [
       "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat",
        "Sun",
      ],
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],

    }),
  }
</script>
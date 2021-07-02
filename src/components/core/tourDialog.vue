<template>
  <div class="text-center">
    <v-dialog
      v-model="tourDialog"
      width="500"
    >
    
      <v-card>
        <v-card-title class="headline primary lighten-2" style="color:white">
         Welcome to AlumX
        </v-card-title>

        <v-card-text class="mt-4">
          We are immensely delighted to have you as part of our AlumX community.We would certainly want your continued and valued association with our esteemed organization.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="startTour"
          >
            Start Tour
          </v-btn>
           <v-btn
            color="primary"
            text
            @click="skipTour"
          >
           Skip Tour
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
       
      }
    },
    computed:
    {
        tourDialog:
        {
            get()
            {
               return this.$store.getters["userModule/getTourDialog"]
            },
            set(data)
            {
              this.$store.commit("userModule/setTourDialog",data)
            }
        }
    },
    methods:
    {
        startTour()
        {
             this.$store.commit("userModule/closeTourDialog")
              this.$tours['myTour'].start();
        },
        skipTour()
        {
             this.$store.commit("userModule/closeTourDialog")
        }
    }
  }
</script>
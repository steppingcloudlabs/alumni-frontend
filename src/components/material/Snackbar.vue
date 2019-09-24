<template>
    <v-snackbar
        v-model="showSnackbar"
        :color="snackbarColor"
        :timeout="snackbarDuration"
            >
      {{ snackbarMessage }}
      <v-btn
        color="Red"
        text
        @click="snackbar = false"
      >
      <v-icon>
        mdi-close
      </v-icon>
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    props: {

    },
    computed: {
        showSnackbar: {
            get() {
                return this.$store.getters.getShowSnackbar
            },
            set(data) {
                this.$store.commit('setShowSnackbar', data)
            }
        },
        snackbarDuration: {
            get() {
                 return this.$store.getters.getSnackbarDuration
            },
            set(data) {
                this.$store.commit('setSnackbarDuration', data)
            }
           
        },
        snackbarMessage: {
             get() {
                 return this.$store.getters.getSnackbarMessage
            },
            set(data) {
                this.$store.commit('setSnackbarMessage', data)
            }

            
        },
        snackbarHeading: {
             get() {
                 return this.$store.getters.getSnackbarHeading
            },
            set(data) {
                this.$store.commit('setSnackbarHeading', data)
            }

            
        },
        snackbarColor:{
            get() {
                 return this.$store.getters.getSnackbarColor
            },
            set(data) {
                this.$store.commit('setSnackbarColor', data)
            }

            
        }, 
    },
    data() {
        return {

        }
    }
}
</script>
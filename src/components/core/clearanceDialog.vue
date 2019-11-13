 <<template>
     
 
 <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
         </v-toolbar>
         <user></user>
      </v-card>
              </v-dialog>
</template>

<script>
import user from "@/views/UserProfile1";
export default {
  components: {
    user
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeClearanceDialog");
    }
  }
};
</script>
 <<template>
     
 
 <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Clearance Status</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text @click="closeDialog">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Status</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>F&F status</v-list-item-title>
              <v-list-item-subtitle>Your F&F status is pending</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Payslips</v-list-item-title>
              <v-list-item-subtitle>Your payslips are available</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-card>
              </v-dialog>
</template>

<script>

export default {
    props:{
        dialog:{
            type:Boolean,
            default:false
        },
    
    },
     methods: {
        closeDialog() {
            this.$emit('closeClearanceDialog');
        },
       
    }
}
</script>
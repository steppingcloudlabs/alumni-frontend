<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-dialog v-model="showEmailDialog" persistent width="400px" height="300px">
        <v-card>
          <v-card-title>
            <span class="headline pb-2">Add Email</span>
          </v-card-title>
          <v-card-text class="py-0">
            <v-col cols="12" class="pb-0">
              <v-select
                :items="escalationList"
                item-value="_id"
                item-text="email"
                v-model="editEsclationData.EMAIL"
                label="Select Email"
                outlined
                @change="checks"
                clearable
              ></v-select>
                <!-- <v-text-field
                          v-model="editEsclationData.EMAIL"
                          label="Email"
                          shaped
                          outlined 
                        ></v-text-field> -->
            </v-col>
             <v-col cols="12" class="pb-0">
                            <v-autocomplete
                             v-model="editEsclationData.LEVELMANAGER"
                            :items="level"
                            label="Select Level"
                            shaped
                            outlined
                            item-text="name"
                            item-value="name"
                           >
                            </v-autocomplete>

             </v-col>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1"  text @click="saveDialog">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      tempName: "",
      tempEmail: "",
      selectedItem: undefined,
      //escalationList: [],
      level:["1","2","3"],
      selectedLevel:"Select",
      email:""
    };
  },
  props: {
    editEsclationData: {
      type: Object
    },
    showEmailDialog: {
      type: Boolean
    },
    escalationList: {
      type: Array,
      default()
      {
        return[]
      }
    }
  },
  watch: {
    // showEmailDialog() {
    //   if (this.showEmailDialog) {
    //   //   this.$store
    //   //     .dispatch("userModule/getAllEsclationManagers", {})
    //   //     .then(response => {
    //   //       this.escalationList = response.result;
    //   //     });
    //   // }
    },
  
  beforeMount()
  {
     console.log("hello")
      
  },
  methods: {
    closeDialog() {
      this.selectedItem = undefined;
      this.$emit("closeDialog");
    },
    checks() {
      console.log(this.selectedItem);
    },
    saveDialog() {
      this.$emit(
        "saveEsclationData",
        JSON.parse(JSON.stringify(this.editEsclationData))
      );
      setTimeout(() => {
        this.selectedItem = undefined;
      }, 1000);
    }
  }
};
</script>
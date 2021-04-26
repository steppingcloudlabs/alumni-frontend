<template>
  <v-layout row wrap class="ma-0">
    <v-flex xs12>
      <v-card-text
        class="subtitle"
        style="margin-left: 0px !important; line-height: 2px !important"
      >
        <span v-if="!linkedInlinkProfileLink">
          <a class="pa-2" @click="showlinkedInlinkInput = true">Add LINKEDIN Profile Link</a>
        </span>
        <span v-else >
          <v-icon class="LINKEDIN-edit-wrapper" color="blue" @click="openlinkedInlinkProfile">mdi-linkedin</v-icon
          >
          <v-icon
            @click="showlinkedInlinkInput = true"
            small
            class="LINKEDIN-edit-icon"
            >edit</v-icon
          >
        </span>
      </v-card-text>
    </v-flex>
    <v-flex xs12>
      <v-scale-transition>
        <v-form ref="form" v-model="validForm" lazy-validation>
          <v-text-field
            v-if="showlinkedInlinkInput"
            v-model="templinkedInlinkProfileLink"
            :disabled="showLoading"
            @keyup.esc="showlinkedInlinkInput = false"
            outlined
            shaped
            :rules="profileRule"
            placeholder="Paste your profile link"
            append-icon="check"
            @click:append="savelinkedInlink"
            label="Profile Link"
            class="mb-0 pb-0 px-5 text-center"
          ></v-text-field>
        </v-form>
      </v-scale-transition>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "AddEditlinkedInlink",
  data() {
    return {
      templinkedInlinkProfileLink: "",
      validForm: "",
      showLoading: false,
      showlinkedInlinkInput: false,
      profileRule: [(v) => !!v || "Profile Link is required",
       v =>/.((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/.test(v) ||
          "Invalid LinkedIn Profile",],
    };
  },
  props: {
    linkedInlinkProfileLink: {
      type: String,
      default: null,
    },
  },
  watch: {
    linkedInlinkProfileLink() {
      this.templinkedInlinkProfileLink = this.linkedInlinkProfileLink;
    },
  },
  mounted() {
    this.templinkedInlinkProfileLink = this.linkedInlinkProfileLink;
  },
  methods: {
    openlinkedInlinkProfile() {
      window.open(this.linkedInlinkProfileLink, "_blank");
    },
    savelinkedInlink() {
      if(this.$refs.form.validate())
      {
         this.showLoading = true;
      this.showlinkedInlinkInput = false;
       this.showLoading = false;
      this.$emit("saveProfileLink", this.templinkedInlinkProfileLink);
      }
    
    },
  },
};
</script>

<style>
.LINKEDIN-edit-wrapper {
  visibility: visible !important;
}
.LINKEDIN-edit-icon {
  visibility: visible !important;
}
</style>
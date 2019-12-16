<template>
  <v-layout row wrap class="ma-0">
    <v-flex xs12>
      <v-card-text class="subtitle" style="margin-left: 0px!important;line-height: 2px !important;">
        <span v-if="!linkedInProfileLink">
          <a class="pa-2" @click="showLinkedInInput=true">Add LinkedIn Profile Link</a>
        </span>
        <span v-else class="linkedin-edit-wrapper">
          <v-icon color="blue" @click="openLinkedInProfile" class="mr-1">mdi-linkedin</v-icon>
          <v-icon @click="showLinkedInInput=true" small class="linkedin-edit-icon">edit</v-icon>
        </span>
      </v-card-text>
    </v-flex>
    <v-flex xs12>
      <v-scale-transition>
        <v-form ref="form" v-model="validForm" lazy-validation>
          <v-text-field
            v-if="showLinkedInInput"
            v-model="tempLinkedInProfileLink"
            :disabled="showLoading"
            @keyup.esc="showLinkedInInput=false"
            outlined
            shaped
            :rules="profileRule"
            placeholder="Paste your profile link"
            append-icon="check"
            @click:append="saveLinkedInLink"
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
  name: "AddEditLinkedInLink",
  data() {
    return {
      tempLinkedInProfileLink: "",
      validForm: "",
      showLoading: false,
      showLinkedInInput: false,
      profileRule: [v => !!v || "Profile Link is required"]
    };
  },
  props: {
    linkedInProfileLink: {
      type: String,
      default: null
    }
  },
  watch: {
    linkedInProfileLink() {
      this.tempLinkedInProfileLink = this.linkedInProfileLink;
    }
  },
  mounted() {
    this.tempLinkedInProfileLink = this.linkedInProfileLink;
  },
  methods: {
    openLinkedInProfile() {
      window.open(this.linkedInProfileLink, "_blank");
    },
    saveLinkedInLink() {
      this.showLoading = true;
      this.$emit("saveProfileLink", this.tempLinkedInProfileLink);
    }
  }
};
</script>

<style>
.linkedin-edit-wrapper:hover .linkedin-edit-icon {
  visibility: visible !important;
  transition: all 1s ease-in;
}
.linkedin-edit-icon {
  visibility: hidden !important;
}
</style>
<template>
  <v-layout row wrap class="ma-0">
    <v-flex xs12>
      <v-card-text class="subtitle" style="margin-left: 0px!important;line-height: 2px !important;">
        <a
          v-if="!linkedInProfileLink"
          class="pa-2"
          @click="showLinkedInInput=true"
        >Add LinkedIn Profile Link</a>
        <v-icon v-else color="blue">mdi-linkedin</v-icon>
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
  methods: {
    saveLinkedInLink() {
      this.showLoading = true;
      this.$emit("saveProfileLink", this.tempLinkedInProfileLink);
    }
  }
};
</script>

<style>
</style>
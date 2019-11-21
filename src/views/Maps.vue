
<template>
  <!-- <div>
    <div class="mapouter">
      <div class="gmap_canvas">
        <iframe
          id="gmap_canvas"
          width="100%"
          height="100%"
          src="https://maps.google.com/maps?q=google&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        />
      </div>
    </div>
  </div>-->
  <div id="app">
    <google-map />
  </div>
</template>

<script>
import { addTokenToPayload, getAlumniId } from "@/utils/utils";
import GoogleMap from "@/components/core/googlemaps";

export default {
  components: {
    GoogleMap
  },
  methods: {
    getAlumniData() {
      let data = {
        payload: {
          userid: getAlumniId()
        }
      };
      this.$store.dispatch("userModule/getAlumniById", data);
    }
  },
  beforeMount() {
    this.getAlumniData();
  }
};
</script>





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
    <!-- <google-map /> -->
    <h3>My Google Maps Demo</h3>
    <!--The div element for the map -->
    <div id="map"></div>
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
    },
    initMap() {
      var uluru = { lat: -25.344, lng: 131.036 };
      // The map, centered at Uluru
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru
      });
      // The marker, positioned at Uluru
      var marker = new google.maps.Marker({ position: uluru, map: map });
    }
  },
  beforeMount() {
    this.getAlumniData();
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style>
#map {
  height: 400px; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
}
</style>




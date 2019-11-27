
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
  data() {
    return {
      places: ["New Delhi", "Haryana", "Gurgaon"],
      marker: [],
      person: ["Daraksha", "Rahil", "Abid"]
    };
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
        zoom: 8,
        center: uluru,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ]
      });
      // The marker, positioned at Uluru
      var image = {
        url: require("@/assets/enrichment.jpg"),
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };

      var geocoder = new google.maps.Geocoder();
      var infowindow = new google.maps.InfoWindow({
       
      });

      var markers = new google.maps.Marker({ position: uluru, map: map });
      for (let i = 0; i < this.places.length; i++) {
        geocoder.geocode({ address: this.places[i] }, (results, status) => {
          if (status == "OK") {
            map.setCenter(results[0].geometry.location);
            this.marker[i] = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: this.person[i],
              // icon: image
            });
            this.marker[i].addListener("click", () => {
              infowindow.setContent(this.person[i])
              infowindow.open(map, this.marker[i]);
            });
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      }
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




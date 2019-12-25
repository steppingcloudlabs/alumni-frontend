
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
    <!-- <h3>My Google Maps Demo</h3> -->
    <!--The div element for the map -->
    <div id="map"></div>
  </div>
</template>
<script>
import { addTokenToPayload, getAlumniId } from "@/utils/utils";
import GoogleMap from "@/components/core/googlemaps";
function myfunction() {
  console.log("hello");
}
function smoothZoom(map, max, cnt) {
  if (cnt >= max) {
    return;
  } else {
    var z = google.maps.event.addListener(map, "zoom_changed", function(event) {
      google.maps.event.removeListener(z);
      smoothZoom(map, max, cnt + 1);
    });
    setTimeout(function() {
      map.setZoom(cnt);
    }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
  }
}
export default {
  components: {
    GoogleMap
  },
  computed: {
    getAlumniList: {
      get() {
        return this.$store.getters["adminModule/getAlumniList"];
      },
      set(data) {
        this.$store.commit("adminModule/setAlumniList", this.data);
      }
    }
  },
  // watch: {
  //   getAlumniList() {
  //     var geocoder = new google.maps.Geocoder();
  //     var infowindow = new google.maps.InfoWindow({});
  //     var image = {
  //       url: require("@/assets/marker.png"),
  //       // This marker is 20 pixels wide by 32 pixels high.
  //       size: new google.maps.Size(20, 32),
  //       // The origin for this image is (0, 0).
  //       origin: new google.maps.Point(0, 0),
  //       // The anchor for this image is the base of the flagpole at (0, 32).
  //       anchor: new google.maps.Point(0, 32)
  //     };
  //      var shape = {
  //         coords: [1, 1, 1, 20, 18, 20, 18, 1],
  //         type: 'poly'
  //       };

  //     // var markers = new google.maps.Marker({ position: uluru, map: this.map });
  //     for (let i = 0; i < this.getAlumniList.length; i++) {
  //       geocoder.geocode(
  //         { address: this.getAlumniList[i].city_addresses },
  //         (results, status) => {
  //           if (status == "OK") {
  //             this.map.setCenter(results[0].geometry.location);
  //             this.marker[i] = new google.maps.Marker({
  //               map: this.map,
  //               position: results[0].geometry.location,
  //               title: this.person[i],
  //               animation: google.maps.Animation.DROP,
  //               // icon: image,
  //               // shape: shape,
  //             });
  //             var infowincontent =
  //               "<a href='/#/profile/search/" +
  //               this.getAlumniList[i].user_id +
  //               "'>" +
  //               this.getAlumniList[i].first_name_personal_information +
  //               " " +
  //               this.getAlumniList[i].last_name_personal_information +
  //               "</a>" +
  //               "<p>" +
  //               this.getAlumniList[i].city_addresses +
  //               "</p>";

  //             this.marker[i].addListener("click", () => {
  //               // this.map.setZoom(8);
  //               smoothZoom(this.map, 10, this.map.getZoom(), true);
  //               infowindow.setContent(infowincontent);
  //               infowindow.open(this.map, this.marker[i]);
  //             });
  //           } else {
  //             alert(
  //               "Geocode was not successful for the following reason: " + status
  //             );
  //           }
  //         }
  //       );
  //     }
  //     var markerCluster = new MarkerClusterer(this.map, this.marker, {
  //       imagePath:
  //         "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  //     });
  //   }

  data() {
    return {
      places: ["New Delhi", "Haryana", "Gurgaon"],
      marker: [],
      person: ["Daraksha", "Rahil", "Abid"],
      firstname: [],
      lastname: [],
      userid: [],
      place: [],
      // alumniList: [],
      user_id: 11098,
      map: {},
      position: []
    };
  },
  methods: {
    openAlumniProfile() {
      let data = {
        payload: {
          keyword: userid
        }
      };
      this.$store.dispatch("adminModule/getAllAlumni", data).then(response => {
        this.alumniList = response.data.result;

        console.log(this.alumniList[0]);
      });
      this.$store.commit("userModule/setSearchData", this.alumniList[0]);
      this.$router.push({ path: "/profile/search" });
    },
    collectData() {
      this.place = alumniCity();
      this.firstname = alumniFirstName();
      this.lastname = alumniLastName();
      this.userid = alumniId();
    },

    getAlumniData() {
      let data = {
        payload: {
          userid: getAlumniId()
        }
      };
      this.$store.dispatch("userModule/getAlumniById", data);
    },

    initMap() {
      // var AlumniList = alumniList();
      // console.log(AlumniList);
      var uluru = { lat: -25.344, lng: 131.036 };
      // The map, centered at Uluru

      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
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
        url: require("@/assets/marker.png"),
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };

      var geocoder = new google.maps.Geocoder();
      var infowindow = new google.maps.InfoWindow({
        maxWidth: 400
      });
      let vm = this;
      new Promise((resolve, reject) => {
        for (let i = 0; i < vm.getAlumniList.length; i++) {
          geocoder.geocode(
            { address: vm.getAlumniList[i].city_addresses },
            (results, status) => {
              if (status == "OK") {
                 var latitude=results[0].geometry.location.lat()+(Math.random()/20);
                var longitude= results[0].geometry.location.lng()+(Math.random()/20);
                var mylatlng={lat:latitude,lng:longitude};
                console.log(mylatlng)
                //  vm.position[i]= results[0].geometry.location
                vm.map.setCenter(results[0].geometry.location);
                vm.marker[i] = new google.maps.Marker({
                  map: vm.map,
                  position:mylatlng,
                  title: vm.person[i],
                  animation: google.maps.Animation.DROP
                });
                var infowincontent =
                  "<a href='/#/profile/search/" +
                  vm.getAlumniList[i].user_id +
                  "'>" +
                  vm.getAlumniList[i].first_name_personal_information +
                  " " +
                  vm.getAlumniList[i].last_name_personal_information +
                  "</a>" +
                  "<p>" +
                  vm.getAlumniList[i].city_addresses +
                  "</p>";

                vm.marker[i].addListener("click", () => {
                  // vm.map.setZoom(8);
                  smoothZoom(vm.map, 4, vm.map.getZoom(), true);
                  infowindow.setContent(infowincontent);
                  infowindow.open(vm.map, vm.marker[i]);
                });
                if (i == vm.getAlumniList.length - 1) {
                  var markerCluster = new MarkerClusterer(vm.map, vm.marker, {
                    maxZoom:10,
                    imagePath:
                      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                  });
                }
              } else {
                alert(
                  "Geocode was not successful for the following reason: " +
                    status
                );
              }
            }
          );
        }
        resolve("hello");
      }).then(response => {});
    }
  },

  beforeMount() {
    this.getAlumniData();
    this.$store
      .dispatch("adminModule/getAllAlumni", {
        payload: {}
      })
      .then(response => {
        this.initMap();
      });
  },
  mounted() {}
};
</script>
 
    

<style>
#map {
  height: 600px; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
}
</style>




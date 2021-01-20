<template>
  <v-layout row wrap class="ma-0" style="min-height:600px; padding-bottom: 5%;background:#F5F5F5">
    <v-flex xs12 style="text-align: center; margin-top: 8%">
      <span class="headline font-weight-bold">Bring together and engage your community</span>
    </v-flex>
    <v-flex
      style="margin-top: 1%"
      xs12
      sm4
      md4
      lg4
      xl4
      class="pa-5"
      v-for="(card, i) in cards"
      :key="i"
    >
      <v-card
        style="
          font-size: 20px;
          border-radius: 6px;
          box-shadow: 15px 15px 40px -10px #d3d3d3;
          margin-top: 5px;
          background-color: white;
          text-align: center
          min-height:190px
        "
      >
        <v-card-title>
          <v-icon large left color="#E4BA18"> {{ card.icon }}</v-icon>
          <br />
          <span class="title font-weight-light" style="color:#E4BA18">{{ card.text}}</span>
        </v-card-title>
        <v-card-text>
         {{card.body}}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md12 lg12 xl12 style="text-align: center;padding-bottom:10px">
      <v-btn
        x-large
        tile
        color="#E4BA18"
        style="margin-top: 10px;"
        @click="navtologin"
        >LOG IN TO ALUMNI DASHBOARD</v-btn
      >
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          icon: "mdi-message",
          text: "Article & Events",
          body:" The AlumX features have been designed to be simple and intuitive! You and your members can create and share news and events, therefore your community is animated in a collaborative way"
        },
        { icon: "mdi-account-outline", text: "Update My Information",body:"Alumni can update their profile whenever they wish. This means you will always have the most up to date information relating your former employees."},
        { icon: "mdi-account-search", text: "Search Alumni Directory" ,body:"The alumni directory allows ex-employees to connect easily with other talents of your network. Both network members and external recruiters can submit job offers to the community."},
      ],
    };
  },
  methods: {
    navtologin() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style>
.div-15 {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 215px;
  height: 52px;
  color: rgba(0, 0, 0, 1);
  font-size: 40px;
  letter-spacing: 53%;
  text-align: left;
  font-family: Roboto;
}
</style>
<template>
  <div class="desktop-5" >
    <div class="rectangle-9-two" style="background-color:white">
    <p class="titlenews" style="text-align:center">{{ getRenderNews.TITLE }}</p>
    <p class="date">{{ getRenderNews.DATE }}</p>
    <!-- <p class="titlenews" style="text-align:center">SuccessFactors announces XYZ ABC </p>
    <p class="date">12/05/1997</p>  -->
    <v-img
      alt=""
      class="newspic"
      :src="getRenderNews.PHOTO"
    ></v-img>
    <div >
    <p class="newstext">
      {{getRenderNews.CONTENT}}
    </p>
    <!-- <p class="newstext">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula leo at magna vestibulum, nec vehicula ante sagittis. Sed vestibulum est ut metus egestas pretium. Integer ac dui tempor, volutpat justo sed, finibus lectus. Ut lacus erat, consequat sed metus vitae, congue vestibulum justo. Fusce aliquet lorem in nulla pharetra mollis. In consectetur mollis justo. Curabitur feugiat ante non dolor pulvinar, aliquet faucibus magna consectetur. Curabitur sed commodo urna, non rhoncus justo. Nullam semper enim eget sagittis auctor. Mauris vehicula rhoncus nibh sed finibus. Praesent vel diam mi. Sed dignissim, odio vel dapibus tristique, felis purus pellentesque massa, nec molestie erat libero sed massa.

Praesent pharetra scelerisque nunc vitae varius. Maecenas lorem ligula, egestas in nibh id, dictum laoreet arcu. Duis nec commodo ligula. Ut sit amet urna at metus finibus eleifend. Praesent ac luctus nisi, sed ultricies diam. Donec consequat elit ac orci aliquam, eget bibendum neque dictum. Phasellus nec hendrerit erat. Praesent feugiat faucibus ex eu convallis. Nulla auctor elementum nulla, malesuada tempus lacus tempus id. Phasellus vitae pellentesque augue, in imperdiet diam. Maecenas finibus est non magna aliquet, quis euismod tortor venenatis.

Duis auctor blandit libero at laoreet. Curabitur at imperdiet libero. Nunc faucibus posuere neque, eget pretium augue ullamcorper ac. Fusce tempus scelerisque est, ut convallis neque. Etiam non sem a augue aliquet scelerisque vulputate eu dolor. Integer sodales lectus ac maximus consectetur. Duis pellentesque arcu in dui volutpat placerat.</p> -->





    <!-- <p style="background-color:grey;margin-left:20px;margin-top:15px;margin-top"></p> -->
    </div>
    </div>
  


    <!-- <v-card v-if="!this.empty" class="rectangle-9" style="background-color:grey">
    <v-btn class="ellipse-4" style="background-color:red">
        <v-img
                class="directorImage"
                style="border-radius: 10%; margin: auto"
                
              ></v-img>
    </v-btn>
    


    
    
    </v-card> -->
    


  </div>
</template>

<script>
//import moment from "moment";


export default{
    beforeMount()
    {
      this.getRenderNews= JSON.parse(localStorage.getItem("render"))
      console.log(this.getRenderNews)
    },
    computed: {
    getRenderNews: {
      get() {
        return this.$store.getters["userModule/getRenderNews"];
      },
      set(data) {
        this.$store.commit("userModule/setRenderNews", data);
      },
    },
  },


}
</script>


<style>
/* .desktop-5 {
  background-color: white;
  padding: 118px 183px 187px;
  width: 100%;
} */
/* .ellipse-4 {
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 4px 0 black;
  left: -20px;
  top: 50px;
  transition-property: width;
  transition-duration: 1s;
  text-align:center;
}

.ellipse-4:hover{
width: 190px;
border-radius: 0%;
} */

/* .rectangle-9 {
  width: 138px;
  height: 394px;
  background-color: midnightblue;
  border-radius: 13px;
  position: absolute;
  right: 70px;
  top: 118px;
} */

.rectangle-9-two{
  /* width: 905px; */
  /* margin-left:-150px; */
  margin-top:-140px;
  
}

.newspic {
  height:450px;
  width:100%;
  
  border-radius: 15px;
  margin-left:30px;
  margin-top:20px; 
}

.titlenews {
  
  color: black;
  margin-top:25%;
  margin-left: 30px;
  font-size:30px;
}

.date {
    /* width:820px; */
    
  text-align:center;
  color: black;
  margin-top:0px;
  margin-left: 30px;
}

.newstext {
  
   width: 100%;
  margin-top:20px;
  margin-left:30px;
  text-align:justify;
}


@media screen and (max-width: 640px) {
  .rectangle-9-two {
    font-size: 1rem !important;
    /* width:430px; */
    text-align: center;

    
  }

  .newstext{
      /* width:430px; */
      margin-left:2%;
  }
  .newspic{
      /* width:430px; */
      margin-left:2%;
  }
  .titlenews
  {
      /* width:430px; */
      margin-left:2%;
      
  }
  .date
  {
      /* width:470px; */
      margin-left:8%;
  }
}
</style>
<template>
  <v-card  class="rectangle-9"  >
      <img
      alt=""
      class="mainimg"
      src="@/assets/newstag.jpg"
      style="box-shadow: 0 4px 4px 0 black;width: 270px;
  height: 120px"/>
      <v-list style="font-size:15px;background-color:white">
          
          <v-list-item   @click="newslist(item)" v-for="(item, i) in getNewsList"
        :key="i" 
        style="font-size:15px">
        <v-img
      
      :src="item.PHOTO"
      class="newsimg"
      
    ></v-img>
    
        <p style="margin-left:10px;margin-top:10px">{{ item.TITLE }}</p>
         
          </v-list-item>
         
           
          
          <!-- <v-list-item style="height:80px">
              <img
      alt=""
      
      src="@/assets/dash1.jpg"
      style="box-shadow: 0 4px 4px 0 black;width: 50px;
  height: 50px"
    />
            <p style="margin-left:10%">List1</p>

          </v-list-item> -->
          
          <!-- <v-divider class="mx-5 mb-1" />
          <v-list-item>
            <p>List2</p>
          </v-list-item>
          <v-divider class="mx-1 mb-1" />
          <v-list-item>
            <p>List3</p>
          </v-list-item>
          <v-divider class="mx-1 mb-1" />
          <v-list-item>
            <p>List4</p>

          </v-list-item>
          <v-divider class="mx-1 mb-1" />
          <v-list-item>
            <p>List5</p>

          </v-list-item>
          <v-divider class="mx-1 mb-1" />
          <v-list-item>
            <p>List6</p>

          </v-list-item>
          <v-divider class="mx-1 mb-1" />
          <v-list-item>
            <p>List7</p>

          </v-list-item>
          <v-divider class="mx-1 mb-1" />
          <v-list-item>
            <p>List8</p>
          </v-list-item> -->
      </v-list>
      
    <!-- <v-btn  @click="newslist(item)" v-for="(item, i) in getNewsList"
        :key="i" 
        class="ellipse-4" 
        style="background-color:red">
        <p >{{ item.TITLE }}</p>
        
    </v-btn> -->
    </v-card>
</template>
<script>
export default {
    beforeMount()
    {
         if(this.getNewsList.length<=0)
         {
             this.$store
      .dispatch("userModule/getAllNews", { payload: { offset: 0, limit: 10 } })
      .then((response) => {
       
        if (response.data.result.length > 0) {
          this.empty = false;
        }
      });
         }
    },
    computed:{
    getNewsList: {
      get() {
        return this.$store.getters["userModule/getNewsList"];
      },
      set(data) {
        this.$store.commit("userModule/setNewsList", this.data);
      },
    },
    getRenderNews: {
      get() {
        return this.$store.getters["userModule/getRenderNews"];
      },
      set(data) {
        this.$store.commit("userModule/setRenderNews", data);
      },
    },
    },
    

methods: {
newslist(item){
     
    this.getRenderNews =item;   
     localStorage.setItem("render", JSON.stringify(this.getRenderNews));
}





}

}

</script>
<style>

/* .ellipse-4 {
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 4px 0 black;
  position: absolute;
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

.rectangle-9 {
  width: 270px;
  background-color: red;
  border-radius: 13px;
  position: absolute;
  right: 20px;
  top: 21%;
}

.newsimg{
    box-shadow: 0 4px 4px 0 black;
    width: 70px;
    height: 60px;
}

@media screen and (max-width: 640px) {
  .rectangle-9 {
    font-size: 1.15rem !important;
    width:100% !important;
    position: relative;
     top: 10%;
      right:0px;
   
  }
  .newsimg{
      width:150px;
      height:100px!important;
  }

  .mainimg{
      min-width:100%;
      
  }
}
</style>
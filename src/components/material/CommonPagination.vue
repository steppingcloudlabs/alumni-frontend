<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalLength"
      @next="next"
      @previous="prev"
      @input="pageClicked()"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,

      }
    },
    props:
    {
     next:
     {
       type:Function
     },
     prev:
     {
         type:Function
     },
     totalLength:
     {
       type: Number,
       default: 4
     }
    },
    methods:{
       pageClicked()
       {
         console.log(this.page)
         this.$emit("pageClicked",this.page)
       }
    },
    // computed: {
    //   totalLength() {
    //     // console.log("Total Page Length",this.totalLength)
    //     return this.totalLength
    //   }
    // }
  }
</script>
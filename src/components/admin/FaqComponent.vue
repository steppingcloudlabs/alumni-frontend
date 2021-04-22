<template>
  <v-card outlined  style="border-radius: 0px;">
    <p class="text-end mr-5 text-white">
      <v-btn left class="mt-3 ml-3" color="blue" dark @click="openAddFaqDialog">
        <i class="fas fa-plus-circle mr-2"></i> Add FAQ
      </v-btn>
    </p>
    <div v-for="(item,i) in recentData" :key="i">
      <v-list-item three-line>
        <v-list-item-content>
          <v-flex xs10>
            <v-list-item-title class=" mb-2">
              <p>{{item.QUESTION}}</p>
            </v-list-item-title>
          </v-flex>
          <v-flex xs2>
            <div class="flex-grow-1"></div>

            <v-icon style="margin:10px" @click="showDeleteDialog(item)">delete</v-icon>

            <v-icon style="margin-left:10px" @click="showFaqDialog(i)">edit</v-icon>
          </v-flex>
          <v-list-item-subtitle>{{item.ANSWER}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
    <p class="text-center text-white">
    <pagination
        :next="next"
        :prev="prev"
        :totalLength="pagination.TOTALPAGES"
        @pageClicked="pageClicked"
      ></pagination>
    </p>
  </v-card>
</template>
<script>
import FAQ from "@/components/admin/uploadFaq.vue";
import pagination from "@/components/material/CommonPagination.vue";

export default {
  components: {
    FAQ,
    pagination
  },
  methods: {
     pageClicked(data) {
       let lim=(data-1)*10
         if(this.getFaqList.length<=lim)
           {
                  this.getFAQs(10,lim);
           }
        else
           {
              this.recentData=this.getFaqList.slice(lim,lim+10)
          }
    
    },
    setSelectedFAQ(item) {
      this.selectedFAQ = item;
      this.showMore = true;
    },
    getFAQs(limit, offset) {
      let listlen=this.getFaqList.length
     let vm=this
      this.$store
        .dispatch("adminModule/getAllFaq", {
          payload: { limit: limit, offset: offset },
        })
        .then((response) => {
          if (response.data.result.length > 0) {
           vm.empty = false;
           
            // for (var i = 0; i < this.getFaqList.length; i++) {
            //   this.getFList[i].DATE = moment
            //     .unix(this.getFAQList[i].DATE / 1000)
            //     .format("LL");
            // }
             
                  this.recentData=this.getFaqList.slice(listlen,listlen+10)
             
           vm.pagination = response.data.pagination;
            vm.pagination = Object.assign( {}, this.someObject, response.data.pagination);
            console.log(this.pagination)
          } else {
            this.empty = true;
          }
        });
    },
    next() {
      this.pagination.LIMIT += 0;
       this.pagination.OFFSET += this.pagination.LIMIT;
        if(this.getFaqList<=this.pagination.OFFSET)
           {
               this.getFAQs(this.pagination.LIMIT, this.pagination.OFFSET);
           }
        else
           {
              this.recentData=this.getFaqList.slice((this.pagination.OFFSET-this.pagination.LIMIT))
          }
     
    },

    prev() {
      this.pagination.LIMIT -= 0;
      this.pagination.OFFSET -= this.pagination.LIMIT;
       if(this.getFaqList<=this.pagination.OFFSET)
           {
               this.getFAQs(this.pagination.LIMIT, this.pagination.OFFSET);
           }
        else
           {
              this.recentData=this.getFaqList.slice((this.pagination.OFFSET-this.pagination.LIMIT))
          }
    },
   
    closeFaqDialog() {
      this.$store.commit("adminModule/closeFaqDialog");
    },
    showFaqDialog() {
      let FaqData = {
        question: "",
        answer: ""
      };
      this.$store.commit("adminModule/showFaqDialog", {});
    },
    openAddFaqDialog() {
      let FaqData = {
        question: "",
        answer: ""
      };
      this.$store.commit("adminModule/showFaqDialog", FaqData);
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedFaq",
        deleteActionToDispatch: "deleteFaq"
      });
    },
    showFaqDialog(index) {
      this.$store.commit(
        "adminModule/showFaqDialog",
        JSON.parse(JSON.stringify(this.getFaqList[index]))
      );
    }
  },
  beforeMount() {
    this.showMore = false;
    this.getFAQs(10,0)
  },
  destroyed() {
    this.$store.commit("adminModule/setFaqList", {});
    this.showMore = false;
  },
  computed: {
    getFaqList: {
      get() {
        return this.$store.getters["adminModule/getFaqList"];
      },
      set(data) {
        this.$store.commit("adminModule/setFaqList", this.data);
      }
    }
  },
  data() {
    return {
       recentData:[],
      model: {},
      pagination: {
        LIMIT: 10,
        OFFSET: 0,
        TOTALPAGES:0
      },
      showMore: false,
      empty: false,
      selectedFAQ: {},
      showFAQs: false,
      tab: null
    };
  }
};
</script>
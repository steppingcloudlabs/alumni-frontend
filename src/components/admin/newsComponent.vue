<template>
  <div>
    <div v-if="!empty">
      <v-layout row wrap mt-4 px-5 v-for="(item,i) in getNewsList" :key="i">
        <v-flex xs4 class="px-5">
          <v-img height="200px" v-if="getNewsList[i].PHOTO" :src="getNewsList[i].PHOTO"></v-img>
          <v-img height="200px" v-else src="@/assets/news.png"></v-img>
        </v-flex>
        <v-flex xs8>
          <v-card-title class="pt-0">{{getNewsList[i].TITLE}}</v-card-title>
          <v-card-text style="font-size:15px">{{getNewsList[i].CONTENT}}</v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-card-actions>
            <v-flex xs10></v-flex>
            <v-flex xs1>
              <v-icon @click="showDeleteDialog(getNewsList[i])">mdi-delete</v-icon>
            </v-flex>
            <v-flex xs1>
              <v-icon @click="showNewsDialog(i)">edit</v-icon>
            </v-flex>
          </v-card-actions>
        </v-flex>
        <v-flex xs12 class="mt-5">
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="pb-5 pt-5">
        <v-flex xs12 class="mr-5 text-center">
          <pagination
        :next="next"
        :prev="prev"
        :totalLength="pagination.TOTALPAGES"
        @pageClicked="pageClicked"
      ></pagination>
        </v-flex>
      </v-layout>
    </div>
    <div v-else style="margin-bottom: 30px;
    margin-left: 350px;
    margin-right: 100px;">
      <span class="subtitle-1 mr-5 ml-5">No News to Show</span>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/material/CommonPagination.vue";
import moment from "moment"
export default {
  components:{
  pagination
  },
  computed: {
    getNewsList: {
      get() {
        return this.$store.getters["adminModule/getNewsList"];
      },
      set(data) {
        this.$store.commit("adminModule/setNewsList", this.data);
      }
    },
    newsListLength() {
      return this.$store.getters["adminModule/getNewsList"].length;
    }
  },
  beforeMount() {
    this.showMore = true;
    this.limit = 10;
    this.skip = 0
     this.$store.commit("showProgressBar", {});
     this.getNews(3,0)
   
  },
  watch: {
    newsListLength() {
      if (this.newsListLength == 0) {
        this.count = 0;
        this.empty = true;
      } else {
        this.count = 1;
        this.empty = false;
      }
    }
  },

  data() {
    return {
       pagination: {
        LIMIT: 3,
        OFFSET: 0,
      
      },
      showMore: false,
      empty: false,
      selectedNews: {},
      showNews: false,
      
      dialog: false,
      count: 0,
      showAll: false,
      empty: false
    };
  },
  methods: {
      pageClicked(data) {
        let lim=(data-1)*3
      this.getNews(3,lim);
    },
    setSelectedNews(item) {
      this.selectedNews = item;
      this.showMore = true;
    },
    getNews(limit, offset) {
      let vm=this
      this.$store
        .dispatch("adminModule/getAllNews", {
          payload: { limit: limit, offset: offset },
        })
        .then((response) => {
          if (response.data.result.length > 0) {
            vm.empty = false;
              vm.$store.commit("closeProgressBar", {});
            for (var i = 0; i < vm.getNewsList.length; i++) {
              vm.getNewsList[i].DATE = moment
                .unix(vm.getNewsList[i].DATE / 1000)
                .format("LL");
            }
           vm.pagination = response.data.pagination;
vm.pagination = Object.assign( {}, this.someObject, response.data.pagination);
            console.log(this.pagination)
          } else {
            vm.empty = true;
          }
        });
    },
    next() {
      this.pagination.LIMIT += 3;
      this.pagination.OFFSET += this.pagination.LIMIT;
      this.getNews(this.pagination.LIMIT, this.pagination.OFFSET);
    },

    prev() {
      this.pagination.LIMIT -= 3;
       this.pagination.OFFSET -= this.pagination.LIMIT;
      this.getNews(this.pagination.LIMIT, this.pagination.OFFSET);
    },
  
  
    showNewsDialog(index) {
      this.$store.commit(
        "adminModule/showNewsDialog",
        JSON.parse(JSON.stringify(this.getNewsList[index]))
      );
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedNews",
        deleteActionToDispatch: "deleteNews"
      });
    }
  }
};
</script>
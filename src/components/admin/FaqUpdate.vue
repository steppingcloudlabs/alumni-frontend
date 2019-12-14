<template>
  <v-layout row wrap>
    <v-flex xs12>
      <QueryWindowWrapper></QueryWindowWrapper>
    </v-flex>
    <v-flex xs12>
      <div>
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-card outlined dark>
              <v-toolbar>
                <v-toolbar-title>FAQ</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn class="button" color="primary" dark @click="openAddFaqDialog">
                  <i class="fas fa-plus-circle mr-2"></i>Upload FAQ
                </v-btn>
              </v-toolbar>
              <div v-for="(item,i) in getFaqList" :key="i">
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-flex xs10>
                      <v-list-item-title class="headline mb-2">
                        <p>{{item.question}}</p>
                      </v-list-item-title>
                    </v-flex>
                    <v-flex xs2>
                      <div class="flex-grow-1"></div>

                      <v-icon style="margin:10px" @click="showDeleteDialog(getFaqList[i])">delete</v-icon>

                      <v-icon style="margin-left:10px" @click="showFaqDialog(i)">edit</v-icon>
                    </v-flex>
                    <v-list-item-subtitle>{{item.answer}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <p class="text-center text-white">
          <v-btn v-if="showMore" color="blue" style="margin-top:10px" @click="getMore(4)">Load More</v-btn>
        </p>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import FAQ from "@/components/admin/uploadFaq.vue";
import QueryWindowWrapper from "@/components/core/QueryWindowWrapper";
export default {
  components: {
    FAQ,
    QueryWindowWrapper
  },
  methods: {
    getMore(data) {
      this.limit = this.limit + data;

      this.showMore = false;
      let actionToCall = "getAllFaq";
      this.$store
        .dispatch("adminModule/getMoreData", {
          actionToCall: actionToCall,
          limit: this.limit
        })
        .then(response => {
          if (
            response.data.status == 200 &&
            response.data.result.length < this.limit
          ) {
            this.showMore = false;
          } else {
            this.showMore = true;
          }
        });
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
    this.$store
      .dispatch("adminModule/getAllFaq", {
        payload: { skip: 0, limit: 3 }
      })
      .then(response => {
        this.limit = 3;
        this.showMore = true;
      });
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
      dialog: false,
      limit: 2,
      showMore: true
    };
  }
};
</script>
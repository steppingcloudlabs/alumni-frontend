<template>
  <div>
    <v-layout row wrap mt-4 v-for="(item,i) in count" :key="i">
      <v-flex xs4>
        <v-avatar tile size="200">
          <v-img src="@/assets/news.jpg"></v-img>
        </v-avatar>
      </v-flex>
      <v-flex xs8>
        <v-card-title class="pt-0">{{getNewsList[i].title}}</v-card-title>
        <v-card-text style="font-size:15px">{{getNewsList[i].content}}</v-card-text>
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
      <v-flex xs12 class="mr-5 text-right">
        <v-btn
          color="primary"
          dark
          v-if="count == 1 && count != newsListLength"
          @click="count=newsListLength"
        >View All</v-btn>
        <v-btn
          color="primary"
          dark
          v-if="count != 1 && count == newsListLength"
          @click="count=1"
        >Close All</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
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
    this.$store.dispatch("adminModule/getAllNews").then(response => {
      this.count = 1;
    });;
  },
  watch: {
    newsListLength() {
      if (this.count != 1) {
        this.count = this.getNewsList.length;
      }
    }
  },

  data() {
    return {
      dialog: false,
      count: 0,
      showAll: false
      //      news: [
      //   { headLine: 'Where does it come from?',Date:'20/06/2019',body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
      //   { headLine: 'Where does it come from?',Date:'20/06/2019',body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'  },
      //   { headLine: 'Where does it come from?',Date:'20/06/2019',body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
      //   { headLine: 'Where does it come from?',Date:'20/06/2019',body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'  },

      // ],
    };
  },
  methods: {
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
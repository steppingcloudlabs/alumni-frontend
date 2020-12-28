<template>
  <div>
    <v-toolbar dark>
      <v-tabs v-model="tab" fixed-tabs dark icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-5-1">
          User Queries
          <v-icon>mdi-newspaper</v-icon>
        </v-tab>

        <v-tab href="#tab-5-2">
          FAQ
          <v-icon>mdi-file-document</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item :value="'tab-5-1'">
        <QueryWindowWrapper></QueryWindowWrapper>
      </v-tab-item>
      <v-tab-item :value="'tab-5-2'">
        <FAQComponent></FAQComponent>
      </v-tab-item>
    </v-tabs-items>
  </div>
  <!-- <v-flex xs12>
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
  </v-flex>-->
</template>
<script>
import FAQComponent from "@/components/admin/FaqComponent.vue";
import QueryWindowWrapper from "@/components/admin/QueryWindowWrapper";
export default {
  components: {
    FAQComponent,
    QueryWindowWrapper
  },
  methods: {},
  beforeMount() {},
  destroyed() {},
  computed: {},
  data() {
    return {
      dialog: false,

      tab: null
    };
  }
};
</script>
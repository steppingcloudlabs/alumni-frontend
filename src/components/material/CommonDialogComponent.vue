<template>
  <v-layout row wrap>
    <v-flex>
      <AlumniDialog></AlumniDialog>
      <EventDialog></EventDialog>
      <NewsDialog></NewsDialog>
      <UploadDocument></UploadDocument>
      <Faq></Faq>
      <DeleteDialog></DeleteDialog>
      <EmailDialog></EmailDialog>
      <QueryDialog></QueryDialog>
    </v-flex>
  </v-layout>
</template>

<script>
import AlumniDialog from "@/components/admin/AddAlumniDialog";
import EventDialog from "@/components/admin/AddEventDialog";
import NewsDialog from "@/components/admin/AddNewsDialog";
import UploadDocument from "@/components/admin/UploadDocumentDialog";
import Faq from "@/components/admin/uploadFaq";
import DeleteDialog from "@/components/material/DeleteDialog";
import EmailDialog from "@/components/material/AddEmail";
import QueryDialog from "@/components/admin/queryDialog";

export default {
  components: {
    AlumniDialog,
    EventDialog,
    NewsDialog,
    UploadDocument,
    Faq,
    DeleteDialog,
    EmailDialog,
    QueryDialog
  }
};
</script>

<style>
</style>
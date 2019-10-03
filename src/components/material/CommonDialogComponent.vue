<template>
    <v-layout row wrap>
        <v-flex>
            <AlumniDialog></AlumniDialog>
            <EventDialog></EventDialog>
            <NewsDialog></NewsDialog>
            <UploadDocument></UploadDocument>
            <Faq></Faq>
        </v-flex>
    </v-layout>
</template>

<script>
import AlumniDialog from '@/components/admin/AddAlumniDialog'
import EventDialog from '@/components/admin/AddEventDialog'
import NewsDialog from '@/components/admin/AddNewsDialog'
import UploadDocument from '@/components/admin/UploadDocumentDialog'
import Faq from '@/components/admin/uploadFaq'




export default {
    components:{
       AlumniDialog,
       EventDialog,
       NewsDialog,
       UploadDocument,
       Faq
    }

}
</script>

<style>

</style>
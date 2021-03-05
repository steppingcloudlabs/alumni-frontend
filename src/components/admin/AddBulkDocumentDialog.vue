<template>
  <v-layout row wrap >
    <v-dialog v-model="showBulk" width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Upload Bulk Document </v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
         
            <v-subheader style="text-align: center">Special Instructions</v-subheader>
            <li
              class=" ml-5"
              v-for="(item, i) in items"
              :key="i"
              style="text-align: left;font-size:10px;color:red"
            >
              <span>{{ item.text }}</span>
            </li>
           <v-file-input
           :rules="rules"
           :disabled="checkbox"
           class="mt-5"
            ref="file"
            accept=".zip"
            prepend-icon="mdi-attachment"
            label="Upload Zip Folder"
            type="file"
            @change="handleFileUpload"
          ></v-file-input>

         <v-checkbox
         v-model="checkbox"
      :label="`Please tick if you have uploaded documents in SFTP server`"
    ></v-checkbox>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveDialog">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
//import axios from "axios";
export default {
  data() {
    return {
      items:[{text:"Upload the files in SFTP Server or Upload Zip Folder in the dialog"},{text:"File name should be UserId_fileType_. For example:1234_FIRSTMONTHSALARY"},{text:"There are 5 types of file that can be uploaded(Name should be in CAPS)"},{text:"FIRSTMONTHSALARY,SECONDMONTHSALARY,THIRDMONTHSALARY,EXPERIENCELETTER,RELIEVINGLETTER"}],
      checkbox:false,
      uploadId:"",
      uploadArray:[],
      rules: [
        value => !value || value.size < 500000000 || 'Zip File size should be less than 5 gB!',
      ],
     
    
    };
  },
  computed: {
   
    showBulk: {
      get() {
        return this.$store.getters["adminModule/getshowBulkDocument"];
      },
      set(data) {
        this.$store.commit("adminModule/setshowBulkDocument", data);
      },
    },
    userData() {
      return this.$store.getters["userModule/getUserData"];
    },
  },
  methods: {
    handleFileUpload(file) {
      // this.file = this.$refs.file.files[0];
      this.file=file
      console.log(this.file)
      console.log(file.fileType)
    },
    getBase64(file) {
      //console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.avatar.profile = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    closeDialog() {
      this.$store.commit("adminModule/setshowBulkDocument",false);
    },
    saveDialog() {
     let data={
       fileName:this.file.name,
       fileType:this.file.type
     }
     this.$store.commit("showProgressBar", {});

     this.$store.dispatch("adminModule/startUpload",data).then((response)=>
     {
       this.$store.commit("closeProgressBar",{})
       if(response.status=="200")
       {
          this.$store.commit("showSnackbar", {
            message:"Uploading...",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
          this.uploadId=response.result.UPLOADID
          this.uploadMultiPart()
       }
       else{
          this.$store.commit("showSnackbar", {
            message:response.result,
            color: "success",
            heading: "Success",
            duration: 3000,
          });
       }
     })




      // this.$store.commit("showProgressBar", {});
      //  this.$store.commit("adminModule/setshowBulkDocument",false);
      // let data=""
      // this.$store.dispatch("adminModule/bulkUploadADocumentCount", data).then((response) => {
      //   if (response.status == 200) {
      //      this.$store.commit("closeProgressBar", {});
      //     this.$store.commit("showSnackbar", {
      //       message: response.result,
      //       color: "success",
      //       heading: "Success",
      //       duration: 3000,
      //     });
      //     this.$store.dispatch("adminModule/bulkUploadTrigger",data).then((response)=>
      //     {
      //         if (response.status == 200) 
      //         {
         
      //        this.$store.commit("showSnackbar", {
      //                message: "Upload Succesfully",
      //                color: "success",
      //               heading: "Success",
      //               duration: 3000,
      //                })
      //         }
      //     })
      //   } else {
      //     this.$store.commit("showSnackbar", {
      //       color: "red",
      //       duration: 1000,
      //       message: "Correct Errors",
      //       heading: "Error",
      //     });
      //   }
      // });
    },

 async uploadMultiPart()
    {
      const CHUNK_SIZE=6000000 //10MB
      const fileSize=this.file.size
      const CHUNK_COUNT=Math.floor(fileSize/CHUNK_SIZE)+1
      let promiseArray
      let final=[]
      let start,end,blob

      for(let index=1;index<CHUNK_COUNT+1;index++)
      {
        //let preSignedUrl
        start=(index-1)*CHUNK_SIZE
        end=(index)*CHUNK_SIZE
        blob=(index<CHUNK_COUNT)?this.file.slice(start,end):this.file.slice(start)
        console.log(blob)
        let data={
          fileName:this.file.name,
          partNumber:index,
          uploadId:this.uploadId,
          type:this.file.type

        }
        let x= await this.$store.dispatch("adminModule/partUpload",data)
        
        let preSignedUrl=x.result.URL
           
        let request= await this.$store.dispatch("adminModule/signedUrl",{payload:{url:preSignedUrl,chunk:blob}})
                
      //  console.log(x)
        final.push(request.result)

      
        
    
      }
    
      let resolvedArray = await Promise.all(final)
      
       console.log(resolvedArray, ' resolvedAr')

      let uploadPartsArray = []
      resolvedArray.forEach((resolvedPromise, index) => {
        uploadPartsArray.push({
          ETag: resolvedPromise.etag,
          PartNumber: index + 1
        })
      })

      // CompleteMultipartUpload in the backend server
       let dat={
         payload:{
            filename:this.file.name,
         parts:uploadPartsArray,
         uploadid:this.uploadId
         }
        
       }
      this.$store.dispatch("adminModule/completeUpload",dat).then((response)=>{
         if(response.status="200")
         {
             this.$store.commit("showSnackbar", {
                     message: " File Uploaded Succesfully",
                     color: "success",
                    heading: "Success",
                    duration: 3000,
                     })
         }
         else{
            this.$store.commit("showSnackbar", {
                     message: response.result,
                     color: "Error",
                    heading: "Error",
                    duration: 3000,
                     })
         }
      })
    
      
    
      
         
    }
  },
};
</script>
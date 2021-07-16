<template>
     <v-card>
                <v-card-text>
           <v-row justify="center" align="center">
               <v-col md="4" class="shrink" >
                 <v-img
                  
                  :src="logo?logo:'@/assets/avatar/download.jpg'"
                  style="
                    
                    border: 3px solid red;
                    width: 100px;
                    max-height:50px;
                    margin:auto
                  "
                  
                ></v-img>
            </v-col>
			<v-col md="4" class="shrink" >
                Logo
            </v-col>
            <v-col md="4" class="shrink" >
                 <v-btn  class="primary" @click="openInput('logo')">Select</v-btn>
                <v-file-input  id="logo" accept="image/png, image/jpeg, image/bmp" @change="updateImagelogo" style="display: none"></v-file-input>
                <v-icon medium class="ml-5" color="primary" @click="saveDialog(logo,'LOGO')">fas fa-upload</v-icon>
            </v-col>
           </v-row>
           <v-row justify="center" align="center">
               <v-col md="4" class="shrink" >
                <v-img
                  
                 
                   :src="l1?l1:'@/assets/avatar/download.jpg'"
                  style="
                   
                    border: 3px solid red;
                    width: 100px;
                    max-height:50px;
                    margin:auto
                  "
                  
                ></v-img>
            </v-col>
			<v-col md="4" class="shrink" >
                Landing Image 1
            </v-col>
            <v-col md="4" class="shrink" >
               <v-btn class="primary" @click="openInput('landing1')">Select</v-btn>
                <v-file-input  id="landing1" accept="image/png, image/jpeg, image/bmp" @change="updateImage1"  style="display: none"></v-file-input>
                 <v-icon medium class="ml-5" color="primary" @click="saveDialog(l1,'LANDINGIMAGE1')" >fas fa-upload</v-icon>
            </v-col>
           </v-row>
           <v-row justify="center" align="center">
               <v-col md="4" class="shrink" >
                <v-img
                  
                 
                   :src="l2?l2:'@/assets/avatar/download.jpg'"
                  style="
                   
                    border: 3px solid red;
                    width: 100px;
                    max-height:50px;
                    margin:auto
                  "
                  
                ></v-img>
            </v-col>
			<v-col md="4" class="shrink" >
               Landing Image 2
            </v-col>
            <v-col md="4" class="shrink" >
                  <v-btn class="primary" @click="openInput('landing2')">Select</v-btn>
                <v-file-input  id="landing2" accept="image/png, image/jpeg, image/bmp"  @change="updateImage2" style="display: none"></v-file-input> 
                 <v-icon medium class="ml-5" color="primary" @click="saveDialog(l2,'LANDINGIMAGE2')" >fas fa-upload</v-icon>
            </v-col>
           </v-row>
            <v-row justify="center" align="center">
                <v-col md="4" class="shrink" >
                <v-img
                  
                  
                   :src="l3?l3:'@/assets/avatar/download.jpg'"
                  style="
                   
                    border: 3px solid red;
                    width: 100px;
                    max-height:50px;
                    margin:auto
                  "
                  
                ></v-img>
            </v-col>
			<v-col md="4" class="shrink" >
               Landing Image 3
            </v-col>
            <v-col md="4" class="shrink" >
                  <v-btn class="primary" @click="openInput('landing3')">Select</v-btn>
                <v-file-input  id="landing3" accept="image/png, image/jpeg, image/bmp" @change="updateImage3"  style="display: none"></v-file-input>
                 <v-icon medium class="ml-5" color="primary" @click="saveDialog(l3,'LANDINGIMAGE3')">fas fa-upload</v-icon>
            </v-col>
           </v-row>
            <v-row justify="center" align="center">
                <v-col md="4" class="shrink" >
                <v-img
                  
                 
                   :src="l4?l4:'@/assets/avatar/download.jpg'"
                  style="
                    
                    border: 3px solid red;
                    width: 100px;
                    max-height:50px;
                    margin:auto
                  "
                  
                ></v-img>
            </v-col>
			<v-col md="4" class="shrink" >
               Landing Image 4
            </v-col>
            <v-col md="4" class="shrink" >
                  <v-btn class="primary" @click="openInput('landing4')">Select</v-btn>
                <v-file-input  id="landing4" accept="image/png, image/jpeg, image/bmp" @change="updateImage4" style="display: none"></v-file-input>
                 <v-icon medium class="ml-5" color="primary" @click="saveDialog(l4,'LANDINGIMAGE4')" >fas fa-upload</v-icon>
            </v-col>
           </v-row>
                </v-card-text>
             <v-card-actions>
          <div class="flex-grow-1"></div>
         
          <v-btn color="error darken-1" @click="closeDialog" text >Close</v-btn>
          <v-btn color="primary darken-1" @click="saveDialog" text >Save</v-btn>
        </v-card-actions>
     </v-card>
</template>
<script>
export default {
   data()
   {
      return{
       logo:"",
       l1:"",
       l2:"",
       l3:"",
       l4:""
   }
   },
    computed: {
    
    showTheme: {
      get() {
        return this.$store.getters["adminModule/getshowThemeDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowTheme", data);
      },
    },
  },
   beforeMount()
  {
    
  
    
  },
  
    methods:
    {
          openInput(id)
    {
        console.log(id)
     var elem=document.getElementById(id)
     elem.click()
    },
    saveDialog(file,filename)
    {
      
        let payload={}
       payload["KEY"]=filename
       payload["FILE"]=file
          this.$store.dispatch('adminModule/updateDynamicImage',{payload}).then((response)=>
    {
      if(response.status=="200")
      {
        this.$store.commit("showSnackbar", {
                                color: "success",
                                duration: 1000,
                                message: response.result,
                                heading: "Success"
                                })
      }
      else
      {
          this.$store.commit("showSnackbar", {
                                color: "error",
                                duration: 1000,
                                message: error,
                                heading: "error"
                                })
      }
     }).catch((error)=> {
           
                this.$store.commit("showSnackbar", {
                                color: "error",
                                duration: 1000,
                                message: error,
                                heading: "error"
                                })
       })
    },
    closeDialog()
    {
       this.showTheme=false
    },
     updateImage1(file) {
      var vm=this
      console.log(file)
      
       var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
      
        this.l1 = reader.result;
       
      }
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
     
    },
     updateImage2(file) {
      var vm=this
      console.log(file)
      
       var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
       this.l2 = reader.result;
        
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
     
    },
     updateImage3(file) {
      var vm=this
      console.log(file)
      
       var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.l3 = reader.result;
        
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
     
    },
     updateImage4(file) {
      var vm=this
      console.log(file)
      
       var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
      
        this.l4 = reader.result;
       
    
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
     
    },
     updateImagelogo(file) {
      var vm=this
      console.log(file)
      
       var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
       
       this.logo = reader.result;
      
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
     
    },
    }
}
</script>
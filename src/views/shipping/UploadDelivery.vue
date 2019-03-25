<template>
 <div class="animated fadeIn">
   <b-row>
     <b-col md="12">
       <b-card>
         <b-input-group-append>
           <b-row>
             <b-col>
               <b-form-file v-model="file" :state="Boolean(file)" placeholder="选择文件..." plain style="width: 240px;"></b-form-file>
             </b-col>
             <b-col>
               <b-button variant = "success" style="height:36px;margin-left: 10px" @click="validateFile">上传</b-button>
             </b-col>

           </b-row>
         </b-input-group-append>
       </b-card>
     </b-col>
   </b-row>
 </div>
</template>

<script>
  export default {
    name: 'uploadDelivery',
    data: () => {
      return {
        file: null
      }
    },
    methods: {
      validateFile () {
        // let flag = true
        console.log(this.file)
        if (this.file) {
          let pointIndex = (this.file.name).lastIndexOf('.')
          let fileType = (this.file.name).substr(pointIndex + 1)
          console.log(fileType)
          if ((fileType !== 'xls') && (fileType !== 'xlsx')) {
            alert('上传的文件必须为excel文件')
          } else {
            this.uploadFile()
          }
        } else {
          alert('请先选择要上传的xls文件')
        }
      },
      uploadFile () {
        console.log('uploadFile')
      }
    }
  }
</script>

<style scoped>

</style>

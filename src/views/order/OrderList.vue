<template>
  <div class="animated fadeIn">
    <h1></h1>

  </div>

</template>

<script>
  import '@/config/dateFormat.js'
  export default {
    name: 'orderList',
    data () {
      return {

      }
    },
    methods: {
      formatDate (date) {
        let parseDate = Date.parse(date)
        let reqDate = (new Date(parseDate)).FormatDate('yyyy-MM-dd hh:mm:ss')
        return reqDate
      }
    },
    created(){
      console.log(this.formatDate(new Date()))
    }
  }
</script>

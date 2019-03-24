<template>
  <div class="animated fadeIn">
    <h1>主页</h1>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data: function () {
    return {
      src: '',
      userInfo: {}
    }
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    },
    formatNumber (value) {
      return (Number(value) / 100).toFixed(2)
    }
  },
  mounted () {

  }
}
</script>

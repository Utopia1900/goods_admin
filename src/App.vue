<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "app"
};
</script>


<style lang="scss">
// Import Main styles for this application
@import "./scss/style";
</style>
<style>
/* Import Bootstrap Vue Styles */
@import "bootstrap-vue/dist/bootstrap-vue.css";
@import "font-awesome/css/font-awesome.min.css";
table.responsive {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #cccccc;
  border-collapse: collapse;
  /**
    box-shadow: 0 0 10px 0 rgba(0,0,0,5);
    **/
}
table.responsive th,
table.responsive td {
  border: 1px solid #cccccc;
  padding: 0.5em 1em;
  text-align: center;
}
/*设置表头背景色*/
table.responsive th {
  background-color: #ffffff;
}
</style>


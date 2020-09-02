<template>
  <div>
    <div class="layout-sonbox-top-item" v-for="item in usedTable">
      ●
      <span class="layout-sonbox-top-item2">123</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "used",
  props: {},
  components: {},
  data() {
    return {
      usedTable:[]
    };
  },
  methods: {},
  mounted() {
    this.usedTable = localStorage.getItem("usedTable")
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>
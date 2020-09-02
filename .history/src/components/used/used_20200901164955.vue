<template>
  <div>
    <div class="layout-sonbox-top-item" v-for="item in uesdTabs" :key="item.path">
      ●
      <span class="layout-sonbox-top-item2">{{item.authName}}</span>
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
    this.uesdTabs = localStorage.getItem("uesdTabs")
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>
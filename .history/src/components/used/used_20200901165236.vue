<template>
  <div>
    <div class="layout-sonbox-top">
      <div class="layout-sonbox-top-item" v-for="item in Tabs" :key="item.path">
        ●
        <span class="layout-sonbox-top-item2">{{item.authName}}</span>
      </div>
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
      Tabs: []
    };
  },
  methods: {},
  mounted() {
    if (localStorage.getItem("uesdTabs")) {
      this.Tabs = localStorage.getItem("uesdTabs");
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>
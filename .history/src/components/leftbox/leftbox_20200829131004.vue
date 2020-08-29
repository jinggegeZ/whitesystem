<template>
  <div>ddadsda</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    ...userActions(["getMenus"])
  },
  mounted() {
    console.log(this.getMenus());
  },
  watch: {},
  computed: {
    ...userState(["menus"])
  }
};
</script>

<style scoped lang='scss'>
</style>
<template>
  <section class="app-main-container">
    <router-view :key="key" />
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.app-main-container {
  margin: 36px;
}
</style>

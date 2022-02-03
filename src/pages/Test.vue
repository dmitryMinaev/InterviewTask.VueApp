<template>
  <div>
    <app-form></app-form>
    <app-test></app-test>
  </div>
</template>

<script>
import Form from "../components/test/Form.vue";
import Test from "../components/test/TestsListPage.vue";

export default {
  components: {
    appForm: Form,
    appTest: Test
  }
};
</script>

<style></style>

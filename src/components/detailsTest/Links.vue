<template>
  <div>
    <p class="text-center fw-lighter font-monospace text-capitalize fontsize">
      {{ title }}
    </p>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <span>Link</span>
          </th>
          <th scope="col" v-if="isResponseTime">
            <span>Response time</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in urls" :key="item.id">
          <td>
            <span>{{ item.url }}</span>
          </td>
          <td class="text-center" v-if="isResponseTime">
            <span>{{ item.responseTime }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="height:100px;"></div>
  </div>
</template>

<script>
export default {
  props: {
    urls: Array,
    title: String,
    isResponseTime: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.fontsize {
  font-size: 170%;
}
</style>

<template>
  <tr class="align-middle">
    <td>
      <span>{{ test.baseUrl }}</span>
    </td>
    <td>
      <span>{{ test.parsingDate | dateConversion }}</span>
    </td>
    <td>
      <router-link
        :to="{ name: 'details', params: { id: test.id } }"
        class="nav-link active"
      >
        Details
      </router-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["test"]
};
</script>

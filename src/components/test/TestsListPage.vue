<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <span>Base url</span>
          </th>
          <th scope="col">
            <span>Parsing date</span>
          </th>
          <th scope="col">
            <span>List all links</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <table-row
          v-for="item in tests"
          :key="item.id"
          :test="item"
        ></table-row>
      </tbody>
    </table>

    <div class="custom-control" v-if="maxPage > 1">
      <button
        class="btn | btn-outline-secondary"
        :disabled="page == 1"
        @click="page--"
      >
        <span aria-hidden="true">&laquo;</span>
      </button>

      <button
        v-for="item in maxPage"
        :key="item"
        class="btn | btn-outline-secondary"
        :disabled="item == page"
        @click="page = item"
      >
        {{ item }}
      </button>

      <button
        class="btn | btn-outline-secondary"
        :disabled="page == maxPage"
        @click="page++"
      >
        <span aria-hidden="true">&raquo;</span>
      </button>
    </div>
  </div>
</template>

<script>
import RowTest from "../rowTable/TableRowTest.vue";

export default {
  components: {
    tableRow: RowTest
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      maxPage: 0,
      tests: []
    };
  },
  methods: {
    pageTest() {
      var resource = this.$resource(
        "Test/",
        {},
        {
          getPageTest: {
            method: "GET",
            url: "Test/?CurrentPage={page}&PageSize={pageSize}"
          }
        }
      );

      resource
        .getPageTest({ page: this.page, pageSize: this.pageSize })
        .then(response => response.json())
        .then(response => {
          this.maxPage = response.totalPage;
          this.tests = response.list;
        });
    }
  },
  watch: {
    page: function() {
      this.pageTest();
    }
  },
  created() {
    this.pageTest();
  }
};
</script>

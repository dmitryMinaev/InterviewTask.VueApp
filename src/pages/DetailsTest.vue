<template>
  <div>
    <div v-if="!isLoading">
      <div v-if="isFound">
        <router-link :to="{ name: 'crawling' }" class="btn btn-dark">
          Back
        </router-link>

        <links :urls="detailsTest | filterWebsite" :title="'website'"></links>
        <links :urls="detailsTest | filterSitemap" :title="'sitemap'"></links>
        <links
          :urls="detailsTest"
          :title="'Timing website(ms)'"
          :isResponseTime="true"
        ></links>

        <div class="text-center fw-lighter font-monospace fontsize">
          <span>
            Urls(html documents) found after crawling a website:
            {{ detailsTest | filterCountWebsite }}
          </span>
          <br>
          <span>Urls found in sitemap: {{ detailsTest | filterCountSitemap }}</span>
        </div>
      </div>

      <div v-else class="page-wrap d-flex flex-row align-items-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12 text-center">
              <span class="display-1 d-block">404</span>
              <div class="mb-4 lead">
                {{ errorMessage }}
              </div>
              <router-link :to="{ name: 'crawling' }" class="nav-link active">
                Back
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Links from "../components/detailsTest/Links.vue";

export default {
  data() {
    return {
      id: this.$route.params["id"],
      detailsTest: [],
      isFound: true,
      isLoading: true,
      errorMessage: ""
    };
  },
  filters: {
    filterSitemap(value) {
      return value.filter(s => !s.isLinkFromHtml && s.isLinkFromSitemap);
    },
    filterWebsite(value) {
      return value.filter(s => s.isLinkFromHtml && !s.isLinkFromSitemap);
    },
    filterCountSitemap(value) {
      return value.filter(s => s.isLinkFromSitemap).length;
    },
    filterCountWebsite(value) {
      return value.filter(s => s.isLinkFromHtml).length;
    }
  },
  components: {
    Links
  },
  created() {
    this.$resource("test/{id}/details")
      .get({ id: this.id })
      .then(
        response => {
          this.detailsTest = response.body.sort(function(a, b) {
            return a.responseTime - b.responseTime;
          });
        },
        responseError => {
          if (responseError.status === 404) {
            this.isFound = false;
            this.errorMessage = responseError.body.Message;
          }
        }
      )
      .then(response => (this.isLoading = false));
  }
};
</script>

<style scoped>
.page-wrap {
  min-height: 50vh;
}
.fontsize {
  font-size: 170%;
}
</style>

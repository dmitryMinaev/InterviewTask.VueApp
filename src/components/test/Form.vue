<template>
  <div class="overflow-hidden row gy-3">
    <form class="ptr-3 form-style">
      <h5 class="form-label">Input url:</h5>
      <div class="col-md-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': $v.url.$error }"
            @input="isServerValidation = true"
            @blur="$v.url.$touch()"
            placeholder="https://example.com/"
            v-model="url"
          />

          <button
            class="btn btn-outline-secondary"
            @click.prevent="onSubmit"
            :disabled="Processing"
          >
            submit
          </button>
        </div>

        <div class="text-danger" v-if="!$v.url.required && $v.url.$error">
          The input field cannot be empty
        </div>
        <div class="text-danger" v-if="!$v.url.url">
          The URL is not in the correct format
        </div>
        <div class="text-danger" v-if="!$v.url.serverValidation">
          {{ errorMessage }}
        </div>
      </div>
    </form>

    <loader v-if="isProcessing" />

    <table v-if="test != null" class="table">
      <tbody>
        <table-row :test="test" class="table-primary align-middle"></table-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import { required, url } from "vuelidate/lib/validators";
import Loader from "../test/Loader.vue";
import RowTest from "../rowTable/TableRowTest.vue";

export default {
  components: {
    Loader,
    tableRow: RowTest
  },
  data() {
    return {
      url: "",
      errorMessage: "",
      isServerValidation: true,
      isProcessing: false,
      test: null
    };
  },
  methods: {
    onSubmit() {
      this.test = null;
      this.isServerValidation = true;
      this.isProcessing = true;
      
      if (!this.$v.url.$invalid) {
        var resource = this.$resource("test/");
        resource.save({ link: this.url }).then(
          response => {
            this.test = response.body;
            this.isProcessing = false;
          },
          errorResponse => {
            this.errorMessage = errorResponse.body.Message;
            this.isServerValidation = false;
            this.isProcessing = false;
          }
        );
      }
    }
  },
  computed: {
    Processing() {
      return this.$v.url.$invalid || this.isProcessing;
    }
  },
  validations: {
    url: {
      required,
      url,
      serverValidation: function() {
        return this.isServerValidation;
      }
    }
  }
};
</script>

<style scoped>
.form-style {
  margin: 20px 335px;
}
</style>

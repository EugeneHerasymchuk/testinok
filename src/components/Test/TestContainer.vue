<template>
  <el-row type="flex" align="middle" justify="center" class="test-container">
    <el-col :span="12">
      <div v-if="!codeProvided">
        Please provide your userCode
        <el-input v-model="userCode" placeholder="Code..." />

        <el-button :disabled="userCode.length < 3" @click="provideCode">
          Enter a code
        </el-button>
      </div>

      <ApolloQuery
        v-else
        :query="require('./graphql/GetStudentByUserCode.gql')"
        :variables="{
          user_code: userCode,
        }"
        clientId="student"
        @error="
          () => {
            codeProvided = false;
            $notify({
              message: 'Error occured. Please try again',
              type: 'error',
            });
          }
        "
      >
        <template v-slot="{ result: { data }, isLoading }">
          <div v-if="isLoading">
            <i class="el-icon-loading"></i>
          </div>

          <QuestionIterator
            v-else-if="
              data &&
              data.Students.length &&
              data.Students[0].Students_Tests[0].Test.questions
            "
            :questionsMap="data.Students[0].Students_Tests[0].Test.questions"
          />
        </template>
      </ApolloQuery>
    </el-col>
  </el-row>
</template>
<script>
import { HASURA_CODE_HEADER } from "../../constants/hasura.constants";
import QuestionIterator from "./QuestionIterator.vue";
export default {
  props: ["testId"],
  name: "TestContainer",
  components: {
    QuestionIterator,
  },
  data() {
    return {
      userCode: "",
      codeProvided: false,
    };
  },
  mounted() {
    const token = localStorage.getItem(HASURA_CODE_HEADER);
    if (token) {
      this.codeProvided = true;
      this.userCode = token;
    }
  },
  methods: {
    changeCode() {
      this.userCode = "";
      localStorage.removeItem(HASURA_CODE_HEADER);
      this.codeProvided = false;
    },
    provideCode() {
      localStorage.setItem(HASURA_CODE_HEADER, this.userCode);
      this.codeProvided = true;
    },
  },
};
</script>
<style scoped>
.test-container {
  height: 80vh;
}
</style>
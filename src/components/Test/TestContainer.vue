<template>
  <el-row type="flex" align="top" justify="center" class="test-container">
    <el-col :span="12">
      <div v-if="!codeProvided">
        Please provide your Student Code
        <el-input v-model="userCode" placeholder="Code..." />

        <el-button
          class="test-container__code-button"
          :disabled="userCode.length < 3"
          @click="provideCode"
        >
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
              message: 'Error occured. Please contact your teacher',
              type: 'error',
            });
          }
        "
      >
        <template v-slot="{ result: { data }, isLoading }">
          <div v-if="isLoading">
            <i class="el-icon-loading"></i>
          </div>

          <div v-else-if="data && !data.Students.length">
            Wrong Student code
            <el-button type="text" @click="codeProvided = false"
              >Change the code</el-button
            >
          </div>

          <div
            v-else-if="
              data &&
              data.Students.length &&
              !data.Students[0].Students_Tests.length
            "
          >
            {{ data.Students[0].first_name }} {{ data.Students[0].last_name }},
            please contact a teacher to assign you to a test
          </div>

          <div
            v-else-if="
              data &&
              data.Students.length &&
              !Object.values(data.Students[0].Students_Tests[0].Test.questions)
                .length
            "
          >
            {{ data.Students[0].first_name }} {{ data.Students[0].last_name }},
            please contact a teacher to add questions to the test
          </div>

          <QuestionIterator
            v-else
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
<style lang="sass" scoped>
.test-container
  margin-top: 20%
  height: 80vh


  &__code-button
    margin-top: 1rem
</style>
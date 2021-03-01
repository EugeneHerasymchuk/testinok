<template>
  <div>
    <ApolloQuery
      :query="require('./graphql/GetTestById.gql')"
      :variables="{
        id: testId,
      }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">
          <i class="el-icon-loading"></i>
        </div>

        <div v-else-if="error">An error occurred during loading</div>

        <div v-else-if="data">
          <el-row>
            <el-col :span="12"
              ><div>Test: {{ data.Tests_by_pk.title }}</div>
            </el-col>
            <el-col :span="12">
              <el-row>
                <ApolloMutation
                  :mutation="require('./graphql/UpdateTest.gql')"
                  :variables="{
                    id: testId,
                    is_published: !data.Tests_by_pk.is_published,
                  }"
                  :update="updateCacheAfterTogglePublish"
                  class="form"
                  @done="
                    () => {
                      $message({
                        message: `Test '${data.Tests_by_pk.title}' was ${
                          data.Tests_by_pk.is_published
                            ? 'published'
                            : 'unpublished'
                        }`,
                        type: 'success',
                        showClose: true,
                      });
                    }
                  "
                  @error="
                    () => {
                      $message({
                        message: 'Error occured. Please try again',
                        type: 'error',
                        showClose: true,
                      });
                    }
                  "
                >
                  <template slot-scope="{ mutate, loading }">
                    <el-button
                      size="medium"
                      :type="data.Tests_by_pk.is_published ? 'info' : 'success'"
                      :icon="
                        data.Tests_by_pk.is_published
                          ? 'el-icon-bottom-left'
                          : 'el-icon-top-right'
                      "
                      :loading="loading"
                      @click="mutate"
                      round
                      plain
                      >{{
                        data.Tests_by_pk.is_published ? "Unpublish" : "Publish"
                      }}</el-button
                    >
                  </template>
                </ApolloMutation>
                <div
                  class="builder__copy-link"
                  v-if="data.Tests_by_pk.is_published"
                >
                  <el-button type="primary" size="mini" @click="copyTestLink">
                    Copy link to test
                    <i class="student-code__icon el-icon-copy-document"></i>
                  </el-button></div
              ></el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              :data="data.Tests_by_pk.questions"
              stripe
              style="width: 100%"
            >
              <el-table-column label="Title">
                <template slot-scope="scope">
                  <span>{{ scope.row.title }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <div>Add test with template</div>
            <el-select v-model="selectedQuestionTypeToCreate" placeholder="Select">
              <el-option
                v-for="questionType in questionTypes"
                :key="questionType.value"
                :label="questionType.label"
                :value="questionType.value"
              >
                <span style="float: left">{{ questionType.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  questionType.icon
                }}</span>
              </el-option>
            </el-select>
          </el-row>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
export default {
  props: ["testId"],
  name: "TestBuilderContainer",
  data() {
    return {
      selectedQuestionTypeToCreate: '',
      currentSelectedQuestion: {}
    };
  },
  methods: {
    saveCurrentQuestion(question) {
      console.log("question was saved", question);
    },
    copyTestLink() {
      const link = process.env.VUE_APP_DEV_DOMAIN + "/test/" + this.testId;
      this.copyTextToClipboardMixin(link);
    },
    updateCacheAfterTogglePublish(
      store,
      {
        data: {
          update_Tests_by_pk: { is_published },
        },
      }
    ) {
      const query = {
        query: require("./graphql/GetTestById.gql"),
        variables: {
          id: this.testId,
        },
      };

      const data = store.readQuery(query);

      data.Tests_by_pk.is_published = is_published;

      store.writeQuery({
        ...query,
        data,
      });
    },
  },
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.builder__copy-link {
  margin-top: 1rem;
}
</style>
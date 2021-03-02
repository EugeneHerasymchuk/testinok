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
              <el-row type="flex" align="middle">
                <el-col :span="5">
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
                        $notify({
                          message: `Test '${data.Tests_by_pk.title}' was ${
                            data.Tests_by_pk.is_published
                              ? 'published'
                              : 'unpublished'
                          }`,
                          type: 'success',
                        });
                      }
                    "
                    @error="
                      () => {
                        $notify({
                          message: 'Error occured. Please try again',
                          type: 'error',
                        });
                      }
                    "
                  >
                    <template slot-scope="{ mutate, loading }">
                      <el-button
                        size="medium"
                        :type="
                          data.Tests_by_pk.is_published ? 'info' : 'success'
                        "
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
                          data.Tests_by_pk.is_published
                            ? "Unpublish"
                            : "Publish"
                        }}</el-button
                      >
                    </template>
                  </ApolloMutation>
                </el-col>
                <el-col :span="5">
                  <div
                    class="builder__copy-link"
                    v-if="data.Tests_by_pk.is_published"
                  >
                    <el-button type="primary" size="mini" @click="copyTestLink">
                      Copy link to test
                      <i class="student-code__icon el-icon-copy-document"></i>
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- <el-row>
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
          </el-row> -->
          <el-row>
            <el-table :data="data.Students" stripe style="width: 100%">
              <el-table-column label="Student Name">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.first_name + " " + scope.row.last_name
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="`Assign student to test: ${data.Tests_by_pk.title}`"
              >
                <template slot-scope="scope">
                  <ApolloMutation
                    :mutation="
                      isStudentAssigned(
                        data.Tests_by_pk.Students_Tests,
                        scope.row.id
                      )
                        ? require('./graphql/UnAssignStudentTest.gql')
                        : require('./graphql/AssignStudentTest.gql')
                    "
                    :variables="{
                      test_id: testId,
                      student_id: scope.row.id,
                    }"
                    :update="updateCacheAfterTogglePublish"
                    class="form"
                    @done="
                      () => {
                        $notify({
                          message: `${scope.row.first_name} ${
                            scope.row.last_name
                          } was ${
                            isStudentAssigned(
                              data.Tests_by_pk.Students_Tests,
                              scope.row.id
                            )
                              ? 'assigned'
                              : 'unassigned'
                          } to a test`,
                          type: 'success',
                        });
                      }
                    "
                    @error="
                      () => {
                        $notify({
                          message: 'Error occured. Please try again',
                          type: 'error',
                        });
                      }
                    "
                  >
                    <template slot-scope="{ mutate, loading }">
                      <el-switch
                        :value="
                          isStudentAssigned(
                            data.Tests_by_pk.Students_Tests,
                            scope.row.id
                          )
                        "
                        @change="mutate"
                        :disabled="loading"
                        active-text="Assigned"
                        inactive-text="Unassigned"
                      >
                      </el-switch>
                    </template>
                  </ApolloMutation>
                </template>
              </el-table-column>
            </el-table>
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
      selectedQuestionTypeToCreate: "",
      currentLoadingStudentId: "",
    };
  },
  methods: {
    isStudentAssigned(studentsList, studentId) {
      return studentsList.some(({ student_id }) => student_id === studentId);
    },
    copyTestLink() {
      const link = process.env.VUE_APP_DEV_DOMAIN + "/test/" + this.testId;
      this.copyTextToClipboardMixin(link);
    },
    updateCacheAfterTogglePublish(
      store,
      {
        data: {
          update_Tests_by_pk,
          delete_Students_Tests,
          insert_Students_Tests,
        },
      }
    ) {
      try {
        const query = {
          query: require("./graphql/GetTestById.gql"),
          variables: {
            id: this.testId,
          },
        };

        const data = store.readQuery(query);

        if (update_Tests_by_pk) {
          data.Tests_by_pk.is_published = update_Tests_by_pk.is_published;
        }

        if (delete_Students_Tests && delete_Students_Tests.returning.length) {
          const removedStudentIndex = data.Tests_by_pk.Students_Tests.findIndex(
            ({ student_id }) =>
              student_id === delete_Students_Tests.returning[0].student_id
          );
          if (removedStudentIndex !== -1) {
            data.Tests_by_pk.Students_Tests.splice(removedStudentIndex, 1);
          }
        }

        if (insert_Students_Tests && insert_Students_Tests.returning.length) {
          data.Tests_by_pk.Students_Tests.push(
            insert_Students_Tests.returning[0]
          );
        }

        store.writeQuery({
          ...query,
          data,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
</style>
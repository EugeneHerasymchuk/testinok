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
            <el-col :span="12">
              <ApolloMutation
                :mutation="require('./graphql/UpdateTest.gql')"
                :update="updateCacheAfterTogglePublish"
                class="form"
                @done="
                  () => {
                    $notify({
                      message: `Title for the test '${data.Tests_by_pk.title}' was updated`,
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
                  <el-input
                    autosize
                    size="medium"
                    ref="testNameInput"
                    v-if="testNameInputVisible"
                    v-model="temporaryTestNameValue"
                    @keyup.enter.native="() => (testNameInputVisible = false)"
                    @blur.prevent="() => (testNameInputVisible = false)"
                    @change="
                      () =>
                        updateTestTitleWithCallback(
                          data.Tests_by_pk.title,
                          mutate.bind(null, {
                            variables: {
                              id: testId,
                              title: temporaryTestNameValue,
                            },
                          })
                        )
                    "
                  />
                  <el-button
                    v-else
                    class="group-name-input"
                    size="medium"
                    @click="showTestNameInput(data.Tests_by_pk.title)"
                    plain
                    :loading="loading"
                    icon="el-icon-edit"
                  >
                    {{ data.Tests_by_pk.title }}
                  </el-button>
                </template>
              </ApolloMutation>
            </el-col>
            <el-col :span="12">
              <el-row type="flex" align="middle">
                <el-col :span="5">
                  <ApolloMutation
                    :mutation="require('./graphql/UpdateTest.gql')"
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
                        @click="
                          publishTestWithCallback(
                            data.Tests_by_pk,
                            mutate.bind(null, {
                              variables: {
                                id: testId,
                                title: data.Tests_by_pk.title,
                                is_published: !data.Tests_by_pk.is_published,
                              },
                            })
                          )
                        "
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
                    <el-button
                      type="primary"
                      size="mini"
                      @click="copyTestLink(testId)"
                    >
                      Copy link to test
                      <i class="student-code__icon el-icon-copy-document"></i>
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="Assign Students" name="1">
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
            </el-collapse-item>
            <el-collapse-item title="Questions" name="2">
              <ApolloMutation
                :mutation="require('./graphql/UpdateQuestion.gql')"
                :update="updateCacheAfterTogglePublish"
                class="form"
                @done="
                  () => {
                    $notify({
                      message: `Done`,
                      type: 'success',
                    });
                    toggleEditingMode();
                  }
                "
                @error="
                  (e) => {
                    $notify({
                      message: e,
                      type: 'error',
                    });
                  }
                "
              >
                <template slot-scope="{ mutate, loading }">
                  <div v-if="loading">
                    <i class="el-icon-loading"></i>
                  </div>

                  <div v-else-if="error">An error occurred during loading</div>

                  <div v-else>
                    <QuestionFactoryContainer
                      v-if="editingMode"
                      :questionPayload="questionPayload"
                      @close-without-saving="toggleEditingMode"
                      @save-question="
                        (questions) => {
                          mutate({
                            variables: { questions, id: testId },
                          });
                        }
                      "
                    />

                    <div v-else>
                      <el-dropdown @command="addNewQuestion">
                        <el-button type="primary">
                          Add new question
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="QUESTION_TYPES.RightOrder"
                          >
                            Right Order in sentence
                          </el-dropdown-item>
                          <el-dropdown-item :command="QUESTION_TYPES.CrossOut">
                            Cross out word
                          </el-dropdown-item>
                          <el-dropdown-item
                            :command="QUESTION_TYPES.TextMatching"
                          >
                            Match halves
                          </el-dropdown-item>
                          <el-dropdown-item
                            :command="QUESTION_TYPES.CompleteTable"
                          >
                            Complete the table
                          </el-dropdown-item>
                          <el-dropdown-item
                            :command="QUESTION_TYPES.ChooseAlternatives"
                          >
                            Choose alternatives
                          </el-dropdown-item>
                          <el-dropdown-item command="more" disabled>
                            More coming...
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>

                      <el-table
                        :data="Object.values(data.Tests_by_pk.questions)"
                        stripe
                        style="width: 100%"
                        empty-text="Please, add questions to see it in the list"
                      >
                        <el-table-column label="Question Title">
                          <template slot-scope="scope">
                            <span>{{ scope.row.meta.title }}</span>
                          </template>
                        </el-table-column>

                        <el-table-column>
                          <template slot-scope="scope">
                            <el-button
                              @click="editQuestion(scope.row)"
                              icon="el-icon-edit"
                              circle
                            ></el-button>
                          </template>
                        </el-table-column>

                        <el-table-column>
                          <template slot-scope="scope">
                            <ApolloMutation
                              :mutation="
                                require('./graphql/RemoveQuestion.gql')
                              "
                              class="form"
                              :update="updateCacheAfterTogglePublish"
                              @error="
                                () => {
                                  $notify({
                                    message: 'Error occured',
                                    type: 'error',
                                  });
                                }
                              "
                            >
                              <template slot-scope="{ mutate }">
                                <el-popconfirm
                                  confirm-button-text="Delete"
                                  cancel-button-text="No"
                                  icon="el-icon-info"
                                  icon-color="red"
                                  title="Are you sure to delete this question?"
                                  @confirm="
                                    removeQuestionWithCallback(
                                      data.Tests_by_pk,
                                      mutate.bind(null, {
                                        variables: {
                                          id: testId,
                                          deleteQuestionKey: scope.row.meta.id,
                                        },
                                      })
                                    )
                                  "
                                >
                                  <el-button
                                    size="mini"
                                    slot="reference"
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                  ></el-button>
                                </el-popconfirm>
                              </template>
                            </ApolloMutation>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </template>
              </ApolloMutation>
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import QuestionFactoryContainer from "./QuestionFactoryContainer.vue";
export default {
  components: { QuestionFactoryContainer },
  props: ["testId"],
  name: "TestBuilderContainer",
  data() {
    return {
      activeName: "0",
      editingMode: false,
      testNameInputVisible: false,
      temporaryTestNameValue: "",
    };
  },
  methods: {
    isStudentAssigned(studentsList, studentId) {
      return studentsList.some(({ student_id }) => student_id === studentId);
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
          data.Tests_by_pk.questions = update_Tests_by_pk.questions;
          data.Tests_by_pk.title = update_Tests_by_pk.title;
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
        this.$notify({
          message: "Error occured during updating. Please contact support",
          type: "error",
        });
      }
    },
    addNewQuestion(questionType) {
      this.questionPayload = {
        type: questionType,
      };
      this.editingMode = true;
    },
    editQuestion(questionPayload) {
      this.questionPayload = questionPayload;
      this.editingMode = true;
    },
    toggleEditingMode() {
      this.questionPayload = null;
      this.editingMode = !this.editingMode;
    },
    publishTestWithCallback({ questions, is_published }, callback) {
      if (!is_published && !Object.values(questions).length) {
        this.$notify({
          message: "Please add questions before publishing",
          type: "error",
        });
      } else {
        callback();
      }
    },
    removeQuestionWithCallback({ questions, is_published }, callback) {
      if (is_published && Object.values(questions).length === 1) {
        this.$notify({
          message:
            "Please unpublish the test before removing the last question",
          type: "error",
        });
      } else {
        callback();
      }
    },
    showTestNameInput(value) {
      this.temporaryTestNameValue = value;
      this.testNameInputVisible = true;

      this.$nextTick(() => {
        this.$refs["testNameInput"].focus();
      });
    },
    updateTestTitleWithCallback(oldTitle, callback) {
      if (
        this.temporaryTestNameValue.length &&
        this.temporaryTestNameValue !== oldTitle
      ) {
        callback();
      }
      this.testNameInputVisible = false;
    },
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
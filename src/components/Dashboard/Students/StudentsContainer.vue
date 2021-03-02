<template>
  <div>
    <ApolloQuery :query="require('./GetStudents.gql')">
      <template v-slot="{ result: { error, data }, isLoading, query }">
        <div v-if="isLoading">
          <i class="el-icon-loading"></i>
        </div>

        <div v-else-if="error">
          An error occurred during loading
        </div>

        <div v-else-if="data">
          <ApolloMutation
            :mutation="require('./AddStudent.gql')"
            :variables="{
              firstName: studentForm.firstName,
              lastName: studentForm.lastName,
              userCode: generateUserCode(5),
            }"
            class="form"
            @done="
              () => {
                resetStudentForm();
                query.refetch();
              }
            "
            @error="
              () => {
                $notify({
                  message: 'Error occured. Please try again',
                  type: 'error',
                  showClose: true,
                });
              }
            "
          >
            <template slot-scope="{ mutate, loading }">
              <el-row>
                <el-col :span="12">
                  <el-form
                    :model="studentForm"
                    :rules="studentFormRules"
                    ref="studentForm"
                  >
                    <el-form-item label="First name" prop="firstName">
                      <el-input v-model="studentForm.firstName"></el-input>
                    </el-form-item>
                    <el-form-item label="Last name" prop="lastName">
                      <el-input v-model="studentForm.lastName"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="submitStudentForm(mutate)"
                        :disabled="loading"
                        >Create student</el-button
                      >
                      <el-button size="mini" @click="resetStudentForm()">
                        Reset
                      </el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </template>
          </ApolloMutation>
          <el-table :data="data.Students" stripe style="width: 100%">
            <el-table-column label="Name">
              <template slot-scope="scope">
                <span>{{
                  scope.row.first_name + " " + scope.row.last_name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Student Code">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="copyTextToClipboardMixin(scope.row.user_code)"
                  >{{ scope.row.user_code }}
                  <i class="student-code__icon el-icon-copy-document"></i
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <ApolloMutation
                  :mutation="require('./RemoveStudent.gql')"
                  :variables="{
                    id: scope.row.id,
                  }"
                  class="form"
                  @done="() => query.refetch()"
                  @error="
                    () => {
                      $notify({
                        message: 'Error occured',
                        type: 'error'
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
                      title="Are you sure to delete this student?"
                      @confirm="mutate()"
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

        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import { nanoid } from "nanoid";

export default {
  name: "StudentsContainer",
  data() {
    return {
      studentForm: {
        firstName: "",
        lastName: "",
      },
      studentFormRules: {
        firstName: [
          {
            required: true,
            message: "Please provide at least firstName of the Student",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    generateUserCode: (length) => nanoid(length),
    submitStudentForm(submitCallback) {
      this.$refs["studentForm"].validate((valid) => {
        if (valid) {
          submitCallback();
        } else {
          return false;
        }
      });
    },
    resetStudentForm() {
      this.$refs["studentForm"].resetFields();
    }
  },
};
</script>
<style>
.student-code__icon {
  margin-left: 0.5rem;
}
</style>
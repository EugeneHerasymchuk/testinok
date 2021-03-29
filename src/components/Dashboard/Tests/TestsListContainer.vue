<template>
  <div>
    <ApolloQuery :query="require('./graphql/GetTestsSummary.gql')">
      <template v-slot="{ result: { error, data }, isLoading, query }">
        <div v-if="isLoading" class="loading apollo">
          <i class="el-icon-loading"></i>
        </div>

        <div v-else-if="error" class="error apollo">
          An error occurred during loading
        </div>

        <div v-else-if="data" class="result apollo">
          <ApolloMutation
            :mutation="require('./graphql/AddTest.gql')"
            :variables="{
              title: testForm.title,
            }"
            class="form"
            @done="
              () => {
                resetTestForm();
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
                    :model="testForm"
                    :rules="testFormRules"
                    ref="testForm"
                    @submit.native.prevent
                  >
                    <el-form-item label="Title" prop="title">
                      <el-input v-model="testForm.title"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="submitTestForm(mutate)"
                        :disabled="loading"
                        >Create test</el-button
                      >
                      <el-button size="mini" @click="resetTestForm()">
                        Reset
                      </el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </template>
          </ApolloMutation>
          <el-table :data="data.Tests" stripe style="width: 100%">
            <el-table-column sortable prop="title" label="Title">
            </el-table-column>
            <el-table-column label="Published">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.is_published"
                  size="mini"
                  type="success"
                  icon="el-icon-check"
                  circle
                  disabled
                ></el-button>
                <el-button
                  v-else
                  size="mini"
                  type="info"
                  icon="el-icon-close"
                  circle
                  disabled
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column sortable prop="created_at" label="Created" :formatter="(row) => formatTimeStampMixin(row.created_at)">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="4">
              
                <ApolloMutation
                  :mutation="require('./graphql/RemoveTest.gql')"
                  :variables="{
                    id: scope.row.id,
                  }"
                  class="form"
                  @done="() => query.refetch()"
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
                      title="Are you sure to delete this test. All questions inside will be removed?"
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
                  </el-col>
                  <el-col :span="4">
                <router-link
                  :to="{
                    name: 'TestEditing',
                    params: { testId: scope.row.id },
                  }"
                  custom
                  v-slot="{ navigate }"
                >
                  <el-button
                    tag="button"
                    size="mini"
                    slot="reference"
                    circle
                    icon="el-icon-edit-outline"
                    @click="navigate"
                  >
                  </el-button>
                </router-link>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
export default {
  name: "TestsListContainer",
  data() {
    return {
      testForm: {
        title: "",
      },
      testFormRules: {
        title: [
          {
            required: true,
            message: "Please provide title for test",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitTestForm(submitCallback) {
      this.$refs["testForm"].validate((valid) => {
        if (valid) {
          submitCallback();
        } else {
          return false;
        }
      });
    },
    resetTestForm() {
      this.$refs["testForm"].resetFields();
    },
  },
};
</script>
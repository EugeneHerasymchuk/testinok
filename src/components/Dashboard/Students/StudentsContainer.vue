<template>
  <div>
    <ApolloQuery :query="require('./GetStudents.gql')">
      <template v-slot="{ result: { error, data }, isLoading, query }">
        <div v-if="isLoading" class="loading apollo">
          <i class="el-icon-loading"></i>
        </div>

        <div v-else-if="error" class="error apollo">
          An error occurred during loading
        </div>

        <div v-else-if="data" class="result apollo">
          <el-table :data="data.Students" stripe style="width: 100%">
            <el-table-column label="Name">
              <template slot-scope="scope">
                <span>{{
                  scope.row.first_name + " " + scope.row.last_name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="User Code">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="copyCodeToClipboard"
                  >{{ scope.row.user_code }}
                  <i class="el-icon-copy-document"></i
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
                    this.$message({
                      message: 'Error occured',
                      type: 'error',
                      showClose: true,
                    })
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
export default {
  name: "StudentsContainer",
  methods: {
    copyCodeToClipboard() {
      this.$message({ message: "Copied", type: "success", showClose: true });
    },
  },
};
</script>
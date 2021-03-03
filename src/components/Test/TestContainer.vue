<template>
  <div>
    <div v-if="!codeProvided">
      Please provide your userCode
      <el-input v-model="userCode" placeholder="Code..." />

      <el-button :disabled="userCode.length < 3" @click="codeProvided = true">
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
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">
          <i class="el-icon-loading"></i>
        </div>

        <div v-else-if="error">An error occurred during loading</div>

        <div v-else-if="data">
          <el-row>
            <el-col :span="12">
              <el-table :data="data.Students" stripe style="width: 100%">
                <el-table-column label="Name">
                  <template slot-scope="scope">
                    <span>{{
                      scope.row.first_name + " " + scope.row.last_name
                    }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-button @click="codeProvided = false">
                Change the code
              </el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
export default {
  props: ["testId"],
  name: "TestContainer",
  data() {
    return {
      userCode: "",
      codeProvided: false,
    };
  },
};
</script>
<template>
  <div>
    <ApolloQuery
      :query="require('./GetTestById.gql')"
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
          <el-row :gutter="20">
            <el-col :span="16">Test: {{ data.Tests_by_pk.title }}</el-col>
            <el-col :span="8">
              <ApolloMutation
                :mutation="require('./UpdateTest.gql')"
                :variables="{
                  id: testId,
                  is_published: !data.Tests_by_pk.is_published,
                }"
                :update="updateCacheAfterTogglePublish"
                class="form"
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
  name: "TestBuilderContainer",
  methods: {
    updateCacheAfterTogglePublish(
      store,
      {
        data: {
          update_Tests_by_pk: { is_published },
        },
      }
    ) {
      const query = {
        query: require("./GetTestById.gql"),
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
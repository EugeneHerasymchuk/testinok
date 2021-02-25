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
            <el-col :span="16"
              ><div>Test: {{ data.Tests_by_pk.title }}</div>
            </el-col>
            <el-col :span="8">
              <ApolloMutation
                :mutation="require('./UpdateTest.gql')"
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
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div>Assign students to this test(not ready)</div>
              <el-cascader
                placeholder="Type name of the student"
                :options="options"
                :props="{ multiple: true }"
                filterable
                collapse-tags
                clearable
              >
                <template slot-scope="{ node, data }">
                  <span>{{ data.label }}</span>
                  <span v-if="!node.isLeaf">
                    ({{ data.children.length }})
                  </span>
                </template>
              </el-cascader>
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
  data() {
    return {
      options: [
        {
          value: "guide",
          label: "Group 1",
          children: [
            {
              value: "disciplines",
              label: "Yev Her",
            },
            {
              value: "disciplines",
              label: "Der Had",
            },
            {
              value: "disciplines",
              label: "Hay Yet",
            },
            {
              value: "disciplines",
              label: "Hw rr",
            },
            {
              value: "disciplines",
              label: "Disciplines",
            },
            {
              value: "disciplines",
              label: "Disciplines",
            },

            {
              value: "navigation",
              label: "Navigation",
            },
          ],
        },
      ],
    };
  },
  methods: {
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
<style>
.builder__copy-link {
  margin-top: 1rem;
}
</style>
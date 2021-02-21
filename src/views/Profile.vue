<template>
  <div>
    <div>
      <img :src="$auth.user.picture" />
      <h2>{{ $auth.user.name }}</h2>
      <p>{{ $auth.user.role }}</p>
    </div>

    <ApolloQuery
      :query="
        (gql) => gql`
          query {
            Students {
              userCode
              firstName
              lastName
            }
          }
        `
      "
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">{{ data.Students[0].lastName + ' ' + data.Students[0].firstName}}</div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {};
</script>
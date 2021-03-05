import Vue from "vue";
import VueApollo from "vue-apollo";
import { createApolloClient } from "vue-cli-plugin-apollo/graphql-client";
import { getInstance } from "../auth/index";
import { setContext } from "apollo-link-context";
import { HASURA_CODE_HEADER } from "../constants/hasura.constants";

// Install the vue plugin
Vue.use(VueApollo);

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP;
// Files URL root
export const filesRoot = httpEndpoint.substr(
  0,
  httpEndpoint.indexOf("/graphql")
);

Vue.prototype.$filesRoot = filesRoot;

const authLink = setContext(async (_, { headers }) => {
  const authService = getInstance();
  const token = await authService.getTokenSilently();
  const authHeader = (await authService.getUser())[
    process.env.VUE_APP_DEV_DOMAIN
  ];

  return {
    headers: {
      ...headers,
      ...authHeader,
      Authorization: "Bearer " + token
    }
  };
});

const notAuthLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem(HASURA_CODE_HEADER);
  return {
    headers: {
      ...headers,
      [HASURA_CODE_HEADER]: token
    }
  };
});

// Config
const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  persisting: false,
  ssr: false,
  link: authLink
};

// Call this in the Vue app file
export function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient } = createApolloClient({
    ...defaultOptions,
    ...options
  });

  const studentApolloClient = createApolloClient({
    httpEndpoint,
    link: notAuthLink,
    ...options
  });

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    clients: {
      student: studentApolloClient.apolloClient
    },
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      }
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message
      );
    }
  });

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClient) {
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}

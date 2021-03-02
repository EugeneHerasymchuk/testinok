import Vue from "vue";
import VueApollo from "vue-apollo";
import { createApolloClient } from "vue-cli-plugin-apollo/graphql-client";
import { getInstance } from "../auth/index";
import { setContext } from "apollo-link-context";

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

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,

  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  link: authLink

  // Override default cache
  // cache: myCache

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
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

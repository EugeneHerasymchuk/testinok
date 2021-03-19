import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createProvider } from "./plugins/vue-apollo";
import "./plugins/element.js";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import { Auth0Plugin } from "./auth";
import copyToClipboardMixin from "./mixins/copyToClipboardMixin";
import questionFactoryMixin from "./mixins/questionFactoryMixin";
import trimSentenceMixin from "./mixins/trimSentenceMixin";

Vue.use(ElementUI, { locale });
Vue.mixin(copyToClipboardMixin);
Vue.mixin(questionFactoryMixin);
Vue.mixin(trimSentenceMixin);

Vue.use(Auth0Plugin, {
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  render: (h) => h(App)
}).$mount("#app");

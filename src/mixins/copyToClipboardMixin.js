export default {
  methods: {
    async copyTextToClipboardMixin(code) {
      try {
        await navigator.clipboard.writeText(code);
        this.$notify({ message: "Copied", type: "success", showClose: true });
      } catch (e) {
        this.$notify({
          message: "Erro during copying",
          type: "error",
          showClose: true
        });
      }
    },
    copyTestLink(testId) {
      const link = process.env.VUE_APP_DEV_DOMAIN + "/test/" + testId;
      this.copyTextToClipboardMixin(link);
    }
  }
};

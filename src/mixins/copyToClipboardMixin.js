export default {
  methods: {
    async copyTextToClipboardMixin(code) {
      try {
        await navigator.clipboard.writeText(code);
        this.$message({ message: "Copied", type: "success", showClose: true });
      } catch (e) {
        this.$message({
          message: "Erro during copying",
          type: "error",
          showClose: true
        });
      }
    }
  }
};

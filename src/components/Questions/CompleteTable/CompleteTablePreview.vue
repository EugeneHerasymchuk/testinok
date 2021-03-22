<template>
  <div class="complete-table-preview"></div>
</template>
<script>
export default {
  name: "CompleteTablePreview",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      textMatchingSelection: [],
    };
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang="sass" scoped>
</style>
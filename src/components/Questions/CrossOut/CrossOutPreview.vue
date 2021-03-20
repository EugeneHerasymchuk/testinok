<template>
  <div>
    <el-radio-group v-model="questionConfig.attempt.selection" size="medium">
      <el-radio-button
        v-for="answer in questionConfig.meta.list"
        :key="answer"
        :label="answer"
      ></el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: "CrossOutPreview",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  components: {},
  methods: {},
};
</script>
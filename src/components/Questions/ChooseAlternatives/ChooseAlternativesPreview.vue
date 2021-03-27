<template>
  <div class="choose-alternatives-preview">
    <span
      v-for="(groupItem, index) in questionConfig.attempt.groups"
      :key="index"
    >
      <span v-if="groupItem.type === 'text'">
        {{ groupItem.text }}
      </span>
      <el-radio-group v-else v-model="groupItem.selection" size="mini">
        <el-radio-button
          v-for="(option, optionIndex) in groupItem.options"
          :key="optionIndex"
          :label="optionIndex + 1"
        ></el-radio-button>
      </el-radio-group>
    </span>
  </div>
</template>
<script>
export default {
  name: "ChooseAlternativesPreview",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      groupItems: [],
    };
  },
  created() {
    this.questionConfig.attempt.groups = [
      ...this.questionConfig.meta.groups.map((groupItem) => {
        return groupItem.type === "text"
          ? groupItem
          : { ...groupItem, selection: null };
      }),
    ];
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
</style>
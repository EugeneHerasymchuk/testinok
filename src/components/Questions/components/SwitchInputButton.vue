<template>
  <span class="switch-input">
    <el-input
      size="medium"
      :ref="inputRefName"
      v-if="groupItemInputVisible"
      v-model="group.text"
      @keyup.enter.native="handleGroupItemInputConfirm"
      @blur.prevent="handleGroupItemInputConfirm"
      :placeholder="placeholder"
    />
    <el-button
      v-else
      class="group-name-input"
      size="medium"
      @click="showItemInput()"
      plain
      icon="el-icon-edit"
    >
      <span v-if="group.text">
        {{ group.text }}
      </span>
    </el-button>
  </span>
</template>
<script>
export default {
  name: "SwitchInputButton",
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      inputRefName: "groupNameInput-" + Math.random(),
      groupItemInputVisible: false,
    };
  },
  methods: {
    handleGroupItemInputConfirm() {
      this.group.text = this.trimSentence(this.group.text);
      this.groupItemInputVisible = false;
    },
    showItemInput() {
      this.groupItemInputVisible = true;

      this.$nextTick(() => {
        this.$emit("groupNameInputChange");
        this.$refs[this.inputRefName].focus();
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.switch-input
  max-width: 20rem
  & > .el-input
    width: unset
    min-width: 2rem
.group-name-input
  width: 100%
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
</style>
<template>
  <div>
    <el-input
      size="medium"
      :ref="inputRefName"
      v-if="groupItemInputVisible"
      v-model="group.name"
      @keyup.enter.native="handleGroupItemInputConfirm"
      @blur.prevent="handleGroupItemInputConfirm"
      placeholder="Provide group name"
    />
    <el-button
      v-else
      class="group-name-input"
      size="medium"
      @click="showItemInput()"
      plain
      icon="el-icon-edit"
    >
      <span v-if="group.name">
        {{ group.name }}
      </span>
      <span v-else> (Provide group name) </span>
    </el-button>
  </div>
</template>
<script>
export default {
  name: "CompleteTableGroupItemInput",
  props: {
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
      this.group.name = this.trimSentence(this.group.name);
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
.group-name-input
  width: 100%
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
</style>
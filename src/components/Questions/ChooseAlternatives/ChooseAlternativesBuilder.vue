<template>
  <div class="choose-alternatives-builder">
    <el-dropdown trigger="click" @command="(type) => addGroupItem(0, type)">
      <span class="el-dropdown-link">
        <el-button type="success" icon="el-icon-plus" size="mini" circle />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="text">Continue Writing</el-dropdown-item>
        <el-dropdown-item :command="2">Two alternatives</el-dropdown-item>
        <el-dropdown-item :command="3">Three alternatives</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div
      v-for="(groupItem, index) in questionConfig.meta.groups"
      :key="index"
      class="group-item"
    >
      <!-- <el-input
        class="group-item__input"
        v-if="groupItem.type === 'text'"
        v-model="groupItem.text"
      /> -->

      <SwitchInputButton
        placeholder="Provide alternative"
        v-if="groupItem.type === 'text'"
        :group="groupItem"
        @groupNameInputChange="dropQuestionFormValidation"
      />

      <span
        class="group-item__alternative-option"
        v-else
        v-for="(option, optionIndex) in groupItem.options"
        :key="optionIndex"
      >
        <el-radio
          size="mini"
          v-model="groupItem.selection"
          @change="dropQuestionFormValidation"
          :label="optionIndex + 1"
          >{{ " " }}
        </el-radio>
        <SwitchInputButton
          placeholder="Provide alternative"
          :group="option"
          @groupNameInputChange="dropQuestionFormValidation"
        />
      </span>
      <el-button
        @click="removeGroupItem(index)"
        icon="el-icon-delete"
        size="mini"
        circle
        type="danger"
        plain
        label="Remove group"
        class="group-item__remove-group-button"
      >
      </el-button>
      <el-dropdown
        class="group-item__add-group-button"
        trigger="click"
        @command="(type) => addGroupItem(index + 1, type)"
      >
        <span class="el-dropdown-link">
          <el-button type="success" icon="el-icon-plus" size="mini" circle />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="text">Continue Writing</el-dropdown-item>
          <el-dropdown-item :command="2">Two alternatives</el-dropdown-item>
          <el-dropdown-item :command="3">Three alternatives</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import SwitchInputButton from "../components/SwitchInputButton";
export default {
  name: "ChooseAlternatives",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
    parentForm: {
      required: true,
      type: Object,
    },
  },
  components: {
    SwitchInputButton,
  },
  data() {
    return {};
  },
  methods: {
    removeGroupItem(groupItemIndex) {
      this.dropQuestionFormValidation();
      this.questionConfig.meta.groups.splice(groupItemIndex, 1);
    },
    addGroupItem(index, type) {
      this.dropQuestionFormValidation();
      this.questionConfig.meta.groups.splice(index, 0, {
        type,
        ...(type === "text"
          ? { text: "" }
          : {
              options: Array.from({ length: type }, () => ({
                text: "",
              })),
              selection: null,
            }),
      });
    },
    dropQuestionFormValidation() {
      this.parentForm.clearValidate();
    },
  },
};
</script>
<style lang="sass">
.el-input__inner
    height: 36px
</style>
<style lang="sass" scoped>
.choose-alternatives-builder
    display: flex
    flex-wrap: wrap
    flex-wrap: wrap
.group-item
    display: flex
    flex-wrap: nowrap
    padding-left: 1rem

    &__remove-group-button
        align-self: flex-start
        padding: 0.2rem
        margin: 0 0.5rem

    &__alternative-option
        margin: 0 0.5rem
        display: flex
        flex-wrap: nowrap
        justify-content: center
        align-items: center
        .el-radio
            margin: 0 -0.2rem
        &__label
            width: 0
</style>
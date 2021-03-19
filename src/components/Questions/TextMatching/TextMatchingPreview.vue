<template>
  <div class="textmatching-preview">
    <div
      class="textmatching-preview__list-item"
      v-for="(matchingGroup, index) in questionConfig.attempt.list"
      :key="index"
    >
      <el-tag effect="plain">{{ matchingGroup.first }}</el-tag>
      <drop
        :class="{
          'textmatching-preview__list-item-drop': true,
          'textmatching-preview__list-item-drop--empty': !matchingGroup.second,
        }"
        @drop="(e) => (matchingGroup.second = e.data)"
      >
        <el-tag type="warning" effect="plain">
          <i v-if="!matchingGroup.second" class="el-icon-full-screen"></i>
          {{ matchingGroup.second }}
        </el-tag>
      </drop>
    </div>

    <div class="textmatching-preview__bucket">
      <div v-for="(bucketItem, index) in textMatchingSelection" :key="index">
        <drag
          :key="index"
          :data="bucketItem.value"
          @copy="
            () => {
              bucketItem.used = true;
            }
          "
        >
          <el-tag :type="!bucketItem.used ? 'success' : 'info'" effect="plain">
            {{ bucketItem.value }}
          </el-tag>
        </drag>
      </div>
    </div>
  </div>
</template>
<script>
import { Drop, Drag } from "vue-easy-dnd";

export default {
  name: "TextMatchingPreview",
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
  components: {
    Drop,
    Drag,
  },
  created() {
    this.questionConfig.attempt.list = [
      ...this.questionConfig.meta.list.map(({ option, matching }) => {
        this.textMatchingSelection.push({ value: matching, used: false });
        return {
          first: option,
          second: null,
        };
      }),
    ];

    this.textMatchingSelection = this.shuffleArray(this.textMatchingSelection);
  },
  methods: {
    useBucketItem() {},
    onInsert(event) {
      this.questionConfig.attempt.arrayLine.splice(event.index, 0, event.data);
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
};
</script>
<style lang="sass">
.drop-in
  border-radius: 4px
  box-shadow: 0 0 5px rgba(0, 255, 0, 0.4)
  transition: 0.2s
.drop-allowed > span.el-tag
  background-color: rgba(0, 255, 0, 0.1)
</style>
<style lang="sass" scoped>
.textmatching-preview
  &__bucket
    display: flex
    justify-content: space-around
    border: 1px dashed #f5dab1
    border-radius: 4px
    padding: 1rem

  &__list-item-drop
    &--empty > span.el-tag
      border-style: dashed
    & > span.el-tag
      min-height: 32px
      white-space: unset
      height: unset
      border-style: dashed

  &__list-item
    display: flex
    align-items: center
    margin-bottom: 1rem
    & > span.el-tag
      min-height: 32px
      white-space: unset
      height: unset
      margin-right: 1rem
</style>
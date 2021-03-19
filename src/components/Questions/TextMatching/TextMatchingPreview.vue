<template>
  <div>
    <div class="wrapper">
      <drop-list
        :items="questionConfig.attempt.arrayLine"
        class="list"
        @insert="onInsert"
        @reorder="$event.apply(questionConfig.attempt.arrayLine)"
        :accepts-data="allowDropCurrentList"
      >
        <template v-slot:item="{ item, reorder }">
          <drag class="item" :key="item.key">
            <el-tag :type="reorder ? 'success' : ''">{{ item.value }}</el-tag>
          </drag>
        </template>
        <template v-slot:feedback="{ data }">
          <div class="item feedback" :key="data.key">{{ data.value }}</div>
        </template>
      </drop-list>
    </div>
  </div>
</template>
<script>
import { Drag, DropList } from "vue-easy-dnd";

export default {
  name: "TextMatchingPreview",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  components: {
    Drag,
    DropList,
  },
  created() {
    this.questionConfig.attempt.arrayLine = this.shuffleArray([
      ...this.questionConfig.meta.sentence
        .split(" ")
        .map((x, i) => ({ value: x, key: i })),
    ]);
  },
  methods: {
    allowDropCurrentList(d) {
      return this.questionConfig.attempt.arrayLine.includes(d);
    },
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
<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.item {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
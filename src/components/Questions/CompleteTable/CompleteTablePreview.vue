<template>
  <div class="complete-table-preview">
    <drop-list
      :items="groupItems"
      class="complete-table-preview__bucket flex-wrap"
      @reorder="$event.apply(groupItems)"
      @insert="(e) => onInsertToList(e, groupItems)"
      mode="cut"
    >
      <template v-slot:item="{ item, reorder }">
        <drag
          :key="item"
          :data="item"
          @cut="onRemoveFromList(item, groupItems)"
        >
          <el-tag
            class="complete-table-preview__item full-width"
            :type="reorder ? 'success' : ''"
          >
            {{ item }}
          </el-tag>
        </drag>
      </template>
      <template v-slot:feedback="{ data }">
        <el-tag
          class="complete-table-preview__item"
          :type="'success'"
          :key="data"
        >
          {{ data }}
        </el-tag>
      </template>
    </drop-list>

    <el-row class="flex-wrap" type="flex" justify="space-around">
      <el-col
        class="complete-table-preview__group-zone"
        v-for="(group, index) in questionConfig.attempt.groups"
        :key="index"
      >
        <span>{{ group.name }}</span>
        <el-divider></el-divider>
        <drop-list
          :items="group.list"
          class="complete-table-preview__drop"
          @reorder="$event.apply(group.list)"
          @insert="(e) => onInsertToList(e, group.list)"
          mode="cut"
        >
          <template v-slot:item="{ item, reorder }">
            <drag
              :key="item"
              :data="item"
              @cut="onRemoveFromList(item, group.list)"
            >
              <el-tag
                class="complete-table-preview__item full-width"
                :type="reorder ? 'success' : ''"
                >{{ item }}</el-tag
              >
            </drag>
          </template>
          <template v-slot:feedback="{ data }">
            <el-tag
              class="complete-table-preview__item"
              type="success"
              :key="data"
              >{{ data }}</el-tag
            >
          </template>
        </drop-list>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { DropList, Drag } from "vue-easy-dnd";

export default {
  name: "CompleteTablePreview",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  components: {
    DropList,
    Drag,
  },
  data() {
    return {
      groupItems: [],
    };
  },
  created() {
    const { groupItems, emptyGroups } = this.questionConfig.meta.groups.reduce(
      (acc, { name, list }) => {
        acc.groupItems.push(...list);
        acc.emptyGroups.push({ name, list: [] });
        return acc;
      },
      { groupItems: [], emptyGroups: [] }
    );
    this.questionConfig.attempt.groups = emptyGroups;
    this.groupItems = this.shuffleArrayMixin(groupItems);
  },
  methods: {
    onInsertToList(event, list) {
      list.splice(event.index, 0, event.data);
    },
    onRemoveFromList(value, list) {
      let index = list.indexOf(value);
      list.splice(index, 1);
    },
  },
};
</script>

<style lang="sass" scoped>
.complete-table-preview
  &__group-zone
    max-width: 25rem
    border: 1px solid #d9ecff
    border-radius: 4px
    padding: 1rem
    margin: 1rem
  &__drop
    flex-direction: column
  &__drop, &__bucket
    display: flex
    justify-content: space-around
    border: 1px dashed #f5dab1
    border-radius: 4px
    padding: 1rem
  &__item
    white-space: break-spaces
    min-height: 2rem
    height: unset
    margin: 0 0.5rem 0.5rem 0
    &.full-width
      width: 100%
</style>
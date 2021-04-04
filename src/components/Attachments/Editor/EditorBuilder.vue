<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click.prevent="commands.bold"
        >
          <b>B</b>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click.prevent="commands.italic"
        >
          <em>I</em>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click.prevent="commands.strike"
        >
          <s>S</s>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click.prevent="commands.underline"
        >
          <u>U</u>
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>
<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { Bold, Italic, Strike, Underline } from "tiptap-extensions";

export default {
  name: "EditorBuilder",
  props: {
    attachmentConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [new Bold(), new Italic(), new Strike(), new Underline()],
        content: this.attachmentConfig.content || ``,
        onUpdate: ({ getJSON }) => {
          this.attachmentConfig.content = getJSON();
        },
      }),
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style lang="sass" scoped>
.editor__content
  padding: 1rem
  line-height: 1
.menubar__button
  display: inline-flex
  background: transparent
  border: 0
  padding: .2rem .5rem
  margin-right: .2rem
  border-radius: 3px
  cursor: pointer

  &.is-active
    background-color: rgba(0,0,0,.1)
</style>
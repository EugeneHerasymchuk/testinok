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

        <el-button
          :plain="!isActive.strike()"
          type="info"
          circle
          @click.prevent="commands.strike"
        >
          <i><s>S</s></i>
        </el-button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click.prevent="commands.underline"
        >
          <u>U</u>
        </button>
        <el-button
        type="info"
          plain
          circle
          icon="el-icon-minus"
          @click.prevent="commands.horizontal_rule"
        >
        </el-button>

        <button class="menubar__button" @click.prevent="commands.undo">
          <i class="el-icon-refresh-left" />
        </button>

        <button class="menubar__button" @click.prevent="commands.redo">
          <i class="el-icon-refresh-right" />
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>
<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Bold,
  Italic,
  Strike,
  Underline,
  HorizontalRule,
  History,
} from "tiptap-extensions";

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
        extensions: [
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new HorizontalRule(),
          new History(),
        ],
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
<style lang="sass">
div.ProseMirror
  outline: unset
  & > p
    margin: 0
</style>

<style lang="sass" scoped>
.editor__content
  padding: .5rem 2rem
  border: 1px solid black
  text-align: left
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
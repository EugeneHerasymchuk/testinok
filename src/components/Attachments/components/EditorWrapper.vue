<template>
  <div class="editor">
    <editor-menu-bar v-if="editable" :editor="editor" v-slot="{ commands, isActive }">
      <div class="editor__header">
        <div>
          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.bold() }"
            @click.prevent="commands.bold"
          >
            <b>B</b>
          </button>

          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.italic() }"
            @click.prevent="commands.italic"
          >
            <em>I</em>
          </button>

          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.strike() }"
            @click.prevent="commands.strike"
          >
            <s>S</s>
          </button>

          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.underline() }"
            @click.prevent="commands.underline"
          >
            <u>U</u>
          </button>
          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click.prevent="commands.bullet_list"
          >
            L
          </button>

          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click.prevent="() => commands.heading({ level: 2 })"
          >
            H1
          </button>

          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click.prevent="() => commands.heading({ level: 3 })"
          >
            H2
          </button>

          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.heading({ level: 4 }) }"
            @click.prevent="() => commands.heading({ level: 4 })"
          >
            H3
          </button>

          <button
            class="editor__controller"
            :class="{ 'is-active': isActive.blockquote() }"
            @click.prevent="commands.blockquote"
          >
            <i class="el-icon-chat-dot-round" />
          </button>

          <button
            class="editor__controller"
            @click.prevent="commands.horizontal_rule"
          >
            <i class="el-icon-minus" />
          </button>

          <button class="editor__controller" @click.prevent="commands.undo">
            <i class="el-icon-refresh-left" />
          </button>

          <button class="editor__controller" @click.prevent="commands.redo">
            <i class="el-icon-refresh-right" />
          </button>
        </div>

        <remove-attachment-button v-on="$listeners" />
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
  BulletList,
  ListItem,
  HorizontalRule,
  History,
  Heading,
  Blockquote,
} from "tiptap-extensions";
import RemoveAttachmentButton from "./RemoveAttachmentButton.vue";

export default {
  name: "EditorWrapper",
  props: {
    attachmentConfig: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
    },
  },
  components: {
    EditorContent,
    EditorMenuBar,
    RemoveAttachmentButton,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new BulletList(),
          new ListItem(),
          new HorizontalRule(),
          new History(),
          new Blockquote(),
          new Heading({ levels: [1, 2, 3] }),
        ],
        content: this.attachmentConfig.content || ``,
        editable: this.editable,
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
    & p, ul, blockquote, li > p,
    li > ol,
    li > ul
        margin: 0
    blockquote
        border-left: 3px solid rgba(black, 0.1)
        color: rgba(black, 0.8)
        padding-left: 0.8rem
        font-style: italic
</style>

<style lang="sass" scoped>
.editor
    margin: 1rem 0
    &__header
        display: flex
        justify-content: space-between
        margin: 0 0 .2rem
    &__content
        padding: .5rem 2rem
        border: 1px solid #d3d4d6
        border-radius: 6px
        text-align: left
    &__controller
        background: transparent
        border: 0
        padding: .2rem .5rem
        margin-right: .2rem
        border-radius: 6px
        cursor: pointer

        &.is-active
            background-color: rgba(0,0,0,.1)
</style>
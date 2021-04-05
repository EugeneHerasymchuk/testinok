<template>
  <div class="editor">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>
<script>
import { Editor, EditorContent } from "tiptap";
import {
  Bold,
  Italic,
  Strike,
  Underline,
  BulletList,
  ListItem,
  HorizontalRule,
} from "tiptap-extensions";

export default {
  name: "EditorPreview",
  props: {
    attachmentConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    EditorContent,
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
        ],
        content: this.attachmentConfig.content,
        editable: false,
      }),
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style lang="sass" scoped>
.editor
  margin: 1rem 0
  &__content
    padding: .5rem 2rem
    border: 1px solid #d3d4d6
    border-radius: 6px
    text-align: left
</style>
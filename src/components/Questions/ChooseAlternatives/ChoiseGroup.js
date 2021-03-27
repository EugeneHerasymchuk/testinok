import { Node } from "tiptap";
// import ImmutableInputSwitch from "./ImmutableInputSwitch";
import CompleteTableGroupNameInput from "../CompleteTable/components/CompleteTableGroupNameInput";

export default class ChoiseGroup extends Node {
  get name() {
    return "alternatives";
  }

  get schema() {
    return {
      attrs: {
        selected: {
          default: null
        },
        selectionOptions: {
          default: []
        },
        optionsAmount: {
          default: null
        }
      },
      group: "inline",
      inline: true,
      draggable: true,
      content: "paragraph+",
      toDOM: (node) => [
        "div",
        {
          selected: node.attrs.selected,
          optionsAmount: node.attrs.optionsAmount,
          selectionOptions: node.attrs.selectionOptions,
          "data-type": this.name
        },
        0
      ],
      parseDOM: [
        {
          tag: `[data-type="${this.name}"]`,
          getAttrs: (dom) => {
            return {
              optionsAmount: Number(dom.getAttribute("amount"))
            };
          }
        }
      ]
    };
  }
  get view() {
    return {
      props: ["node", "updateAttrs", "view", "options"],
      components: {
        CompleteTableGroupNameInput
      },
      computed: {
        selected: {
          get() {
            return this.node.attrs.selected;
          },
          set(selected) {
            this.updateAttrs({
              selected
            });
          }
        },
        optionsAmount: {
            get() {
              return this.node.attrs.optionsAmount;
            }
          },
        selectionOptions: {
          get() {
            return this.node.attrs.selectionOptions;
          },
          set(value) {
            this.updateAttrs({
              selectionOptions: value
            });
          }
        }
      },
      template: `
        <div data-type="drag_item" contenteditable="false">
                <el-radio
                v-model="selected" size="medium"
                v-for="(value, index) in [23, 4]"
                :key="index"
                :label="value"
                ><CompleteTableGroupNameInput /></el-radio>
        </div>
      `
    };
  }
}

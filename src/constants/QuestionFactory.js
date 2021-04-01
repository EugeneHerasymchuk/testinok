import { nanoid } from "nanoid";

export const QUESTION_TYPES = {
  RightOrder: "RightOrder",
  CrossOut: "CrossOut",
  TextMatching: "TextMatching",
  CompleteTable: "CompleteTable",
  ChooseAlternatives: "ChooseAlternatives"
};

export const ATTACHMENT_TYPES = {
  Audio: "Audio",
  Video: "Video",
  HTML: "HTML"
};

export const getNewQuestionMeta = (questionType) => {
  const META = {
    [QUESTION_TYPES.RightOrder]: {
      meta: {
        id: "",
        title: "Write the words in sentence in the correct order",
        sentence: ""
      },
      attempt: {
        arrayLine: []
      },
      validate(rule, { sentence } /* meta object */, callback) {
        const res =
          sentence
            .split(" ")
            .map((x) => x.trim())
            .filter((x) => x.length).length > 1;

        if (!res) {
          callback(new Error("Please add at least two words for the sentence"));
        } else {
          callback();
        }
      },
      check() {
        return (
          this.attempt.arrayLine
            .map((resultWord) => resultWord.value)
            .join(" ") === this.meta.sentence
        );
      }
    },
    [QUESTION_TYPES.CrossOut]: {
      meta: {
        id: "",
        title: "Cross out the word that does not fit the group...",
        list: [],
        selection: ""
      },
      attempt: {
        selection: ""
      },
      validate(rule, { list, selection } /* meta object */, callback) {
        const res = list.length > 1;

        if (!res) {
          callback(new Error("Please add at least two words for the list"));
        } else if (!selection) {
          callback(new Error("Please select the correct answer"));
        } else {
          callback();
        }
      },
      check() {
        return this.meta.selection === this.attempt.selection;
      }
    },
    [QUESTION_TYPES.TextMatching]: {
      meta: {
        id: "",
        title: "Match two halves",
        list: []
      },
      attempt: {
        list: []
      },
      validate(rule, { list } /* meta object */, callback) {
        const res = list.length > 1;

        if (!res) {
          callback(new Error("Please add at least two options for the list"));
        } else {
          callback();
        }
      },
      check() {
        return this.meta.list.every(
          ({ option, matching }) =>
            (
              this.attempt.list.find(
                (attemptGroup) => attemptGroup.option === option
              ) || {}
            ).matching === matching
        );
      }
    },
    [QUESTION_TYPES.CompleteTable]: {
      attachments: {},
      meta: {
        id: "",
        title: "Complete the table with the words below",
        groups: []
      },
      attempt: {
        groups: []
      },
      validate(rule, { groups } /* meta object */, callback) {
        const multipleGroupsValidation = groups.length > 1;
        const uniqueGroupsNameValidation =
          new Set(groups.map(({ name }) => name).filter((name) => name.length))
            .size === groups.length;

        const groupItemsFlatList = groups
          .map(({ list }) => list)
          .reduce((acc, val) => acc.concat(val), []);

        const uniqueGroupItemsNameValidation =
          new Set(groupItemsFlatList).size === groupItemsFlatList.length;

        const groupItemsValidation = groups.every(({ list }) => list.length);

        if (!multipleGroupsValidation) {
          callback(new Error("Please add at least two groups for the table"));
        } else if (!groupItemsValidation) {
          callback(new Error("Please add at least one item per group"));
        } else if (!uniqueGroupsNameValidation) {
          callback(new Error("Group should have unique names"));
        } else if (!uniqueGroupItemsNameValidation) {
          callback(
            new Error("Group items should be unique inside and across groups")
          );
        } else {
          callback();
        }
      },
      check() {
        return this.attempt.groups.every(({ name, list }) => {
          const targetGroup = this.meta.groups.find(
            (attemptGroup) => attemptGroup.name === name
          );

          return targetGroup?.list.every((item) => list.includes(item));
        });
      }
    },
    [QUESTION_TYPES.ChooseAlternatives]: {
      meta: {
        id: "",
        title: "Choose alternatives",
        groups: []
      },
      attempt: {
        groups: []
      },
      validate(rule, { groups } /* meta object */, callback) {
        const alternativeGroupValidation = groups.some(
          (groupItem) => groupItem.type !== "text"
        );
        const allTextsFilled = groups.every((groupItem) => {
          return groupItem.type === "text"
            ? groupItem.text.length
            : groupItem.options.every(({ text }) => text.length) &&
                groupItem.selection;
        });

        if (!alternativeGroupValidation) {
          callback(new Error("Please add at least one group with selections"));
        } else if (!allTextsFilled) {
          callback(
            new Error("Please fill all sections and select all correct options")
          );
        } else {
          callback();
        }
      },
      check() {
        return this.attempt.groups.every((groupItem, index) =>
          groupItem.type === "text"
            ? true
            : groupItem.selection === this.meta.groups[index].selection
        );
      }
    }
  };

  return META[questionType];
};

export class Question {
  type;
  attempt = {};
  constructor(questionType, { questionMeta, questionAttachments }) {
    this.type = questionType;
    const { meta, attempt, validate, check } = getNewQuestionMeta(questionType);

    this.attempt = attempt;
    this.validate = validate;
    this.check = check;

    if (questionMeta) {
      this.meta = { ...questionMeta };
      this.attachments = [ ...questionAttachments ];
    } else {
      this.meta = meta;

      this.attachments = [];
      this.meta.id = nanoid();
    }
  }
}

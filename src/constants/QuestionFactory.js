import { nanoid } from "nanoid";

export const QUESTION_TYPES = {
  CorrectOrder: "CorrectOrder",
  CrossOut: "CrossOut",
  TextMatching: "TextMatching",
  PictureMatching: "PictureMatching",
  SingleChoice: "SingleChoice",
  MultipleChoice: "MultipleChoice",
  RightOrder: "RightOrder"
};

// export const QUESTION_OPTIONS = [
//   {
//     value: QUESTION_TYPES.CrossOut,
//     label: "Cross out the word in each group which does not ...",
//     icon: "el-icon-s-ticket"
//   }
// ];

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
      validate() {},
      check() {
        return this.attempt.arrayLine.join(" ") === this.meta.sentence;
      }
    }
  };

  return META[questionType];
};

export class Question {
  type;
  attempt = {};
  constructor(questionType, questionMeta) {
    this.type = questionType;
    const { meta, attempt, validate, check } = getNewQuestionMeta(questionType);

    this.attempt = attempt;
    this.validate = validate;
    this.check = check;

    if (questionMeta) {
      this.meta = { ...questionMeta };
    } else {
      this.meta = meta;

      this.meta.id = nanoid();
    }
  }
}

export const QUESTION_TYPES = {
  CorrectOrder: "CorrectOrder",
  CrossOut: "CrossOut",
  TextMatching: "TextMatching",
  PictureMatching: "PictureMatching",
  SingleChoice: "SingleChoice",
  MultipleChoice: "MultipleChoice",
  RightOrder: "RightOrder"
};

export const QUESTION_OPTIONS = [
  {
    value: QUESTION_TYPES.CrossOut,
    label: "Cross out the word in each group which does not ...",
    icon: "el-icon-s-ticket"
  },
  {
    value: QUESTION_TYPES.CorrectOrder,
    label: "Write the words in the correct order ...",
    icon: "el-icon-s-ticket"
  }
];

export const QUESTION_META_FACTORY = {
  [QUESTION_TYPES.RightOrder]: {
    title: "This is a title for the right order"
  }
};

export class Question {
  questionType;
  constructor(questionType, questionMeta) {
    this.questionType = questionType;
    if (questionMeta) {
      this.questionMeta = questionMeta;
    } else {
      this.questionMeta = QUESTION_META_FACTORY[questionType];
    }
  }
}

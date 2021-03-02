export const QUESTION_TYPES = {
  CorrectOrder: "CorrectOrder",
  CrossOut: "CrossOut",
  TextMatching: "TextMatching",
  PictureMatching: "PictureMatching",
  SingleChoice: "SingleChoice",
  MultipleChoice: "MultipleChoice"
};

export const QUESTION_OPTIONS = [
  {
    value: QUESTION_TYPES.CrossOut,
    label: "Cross out the word in each group which does not ...",
    icon: 'el-icon-s-ticket'
  },
  {
    value: QUESTION_TYPES.CorrectOrder,
    label: "Write the words in the correct order ...",
    icon: 'el-icon-s-ticket'
  }
];

export class Question {
  type;
  constructor(type, orderNumber) {
    this.type = type;
    this.orderNumber = orderNumber;
  }
}

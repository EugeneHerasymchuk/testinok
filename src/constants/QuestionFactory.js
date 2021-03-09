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
      id: "",
      title: "Write the words in sentence in the correct order",
      sentence: ""
    }
  };

  return META[questionType];
};

export class Question {
  type;
  constructor(questionType, questionMeta) {
    this.type = questionType;
    if (questionMeta) {
      this.meta = { ...questionMeta };
    } else {
      this.meta = getNewQuestionMeta(questionType);

      this.meta.id = nanoid();
      //TODO: create an ID for the question
    }
  }
}

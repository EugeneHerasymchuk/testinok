import { QUESTION_OPTIONS, QUESTION_TYPES, Question } from "./QuestionFactory";
export default {
  data() {
    return {
      QUESTION_OPTIONS: QUESTION_OPTIONS,
      QUESTION_TYPES: QUESTION_TYPES
    };
  },
  methods: {
    newQuestion(questionType, questionMeta) {
      return new Question(questionType, questionMeta);
    }
  }
};

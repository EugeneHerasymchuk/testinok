import {
  QUESTION_OPTIONS,
  QUESTION_TYPES,
  Question
} from "../constants/QuestionFactory";
import RightOrderBuilder from "../components/Questions/RightOrder/RightOrderBuilder";
import RightOrderPreview from "../components/Questions/RightOrder/RightOrderPreview";

export default {
  data() {
    return {
      QUESTION_OPTIONS: QUESTION_OPTIONS,
      QUESTION_TYPES: QUESTION_TYPES,
      componentsMap: {
        [QUESTION_TYPES.RightOrder]: {
          builder: RightOrderBuilder,
          preview: RightOrderPreview
        }
      }
    };
  },
  methods: {
    newQuestion(questionType, questionMeta) {
      return new Question(questionType, questionMeta);
    }
  }
};

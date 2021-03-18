import { QUESTION_TYPES, Question } from "../constants/QuestionFactory";
import RightOrderBuilder from "../components/Questions/RightOrder/RightOrderBuilder";
import RightOrderPreview from "../components/Questions/RightOrder/RightOrderPreview";
import CrossOutBuilder from "../components/Questions/CrossOut/CrossOutBuilder";
import CrossOutPreview from "../components/Questions/CrossOut/CrossOutPreview";
import TextMatchingPreview from "../components/Questions/TextMatching/TextMatchingPreview";
import TextMatchingBuilder from "../components/Questions/TextMatching/TextMatchingBuilder";

export default {
  data() {
    return {
      QUESTION_TYPES: QUESTION_TYPES,
      componentsMap: {
        [QUESTION_TYPES.RightOrder]: {
          builder: RightOrderBuilder,
          preview: RightOrderPreview
        },
        [QUESTION_TYPES.CrossOut]: {
          builder: CrossOutBuilder,
          preview: CrossOutPreview
        },
        [QUESTION_TYPES.TextMatching]: {
          builder: TextMatchingBuilder,
          preview: TextMatchingPreview
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

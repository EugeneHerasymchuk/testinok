import {
  QUESTION_TYPES,
  ATTACHMENT_TYPES,
  Question
} from "../constants/QuestionFactory";
import RightOrderBuilder from "../components/Questions/RightOrder/RightOrderBuilder";
import RightOrderPreview from "../components/Questions/RightOrder/RightOrderPreview";
import CrossOutBuilder from "../components/Questions/CrossOut/CrossOutBuilder";
import CrossOutPreview from "../components/Questions/CrossOut/CrossOutPreview";
import TextMatchingPreview from "../components/Questions/TextMatching/TextMatchingPreview";
import TextMatchingBuilder from "../components/Questions/TextMatching/TextMatchingBuilder";
import CompleteTablePreview from "../components/Questions/CompleteTable/CompleteTablePreview";
import CompleteTableBuilder from "../components/Questions/CompleteTable/CompleteTableBuilder";
import ChooseAlternativesBuilder from "../components/Questions/ChooseAlternatives/ChooseAlternativesBuilder";
import ChooseAlternativesPreview from "../components/Questions/ChooseAlternatives/ChooseAlternativesPreview";
import EditorBuilder from "../components/Attachments/Editor/EditorBuilder";
import EditorPreview from "../components/Attachments/Editor/EditorPreview";
import AudioBuilder from "../components/Attachments/Audio/AudioBuilder";
import AudioPreview from "../components/Attachments/Audio/AudioPreview";
import VideoBuilder from "../components/Attachments/Video/VideoBuilder";
import VideoPreview from "../components/Attachments/Video/VideoPreview";

export default {
  data() {
    return {
      QUESTION_TYPES: QUESTION_TYPES,
      ATTACHMENT_TYPES: ATTACHMENT_TYPES,
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
        },
        [QUESTION_TYPES.CompleteTable]: {
          builder: CompleteTableBuilder,
          preview: CompleteTablePreview
        },
        [QUESTION_TYPES.ChooseAlternatives]: {
          builder: ChooseAlternativesBuilder,
          preview: ChooseAlternativesPreview
        }
      },
      attachmentsMap: {
        [ATTACHMENT_TYPES.HTML]: {
          builder: EditorBuilder,
          preview: EditorPreview
        },
        [ATTACHMENT_TYPES.Audio]: {
          builder: AudioBuilder,
          preview: AudioPreview
        },
        [ATTACHMENT_TYPES.Video]: {
          builder: VideoBuilder,
          preview: VideoPreview
        }
      }
    };
  },
  methods: {
    newQuestion(questionType, questionMeta, questionAttachments) {
      return new Question(questionType, {
        questionMeta,
        questionAttachments
      });
    }
  }
};

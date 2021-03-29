import copyToClipboardMixin from "./copyToClipboardMixin";
import questionFactoryMixin from "./questionFactoryMixin";
import trimSentenceMixin from "./trimSentenceMixin";
import shuffleArrayMixin from "./shuffleArrayMixin";
import formatTimeStampMixin from "./formatTimeStampMixin";

export function injectMixins(instance) {
  instance.mixin(copyToClipboardMixin);
  instance.mixin(questionFactoryMixin);
  instance.mixin(trimSentenceMixin);
  instance.mixin(shuffleArrayMixin);
  instance.mixin(formatTimeStampMixin);
}

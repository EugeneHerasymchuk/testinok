export default {
  methods: {
    trimSentence(sentence) {
      return sentence
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x.length)
        .join(" ");
    }
  }
};

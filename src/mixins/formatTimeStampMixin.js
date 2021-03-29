import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default {
  methods: {
    formatTimeStampMixin(timeStamp) {
      const date = dayjs.utc(timeStamp);
      return date.local().format('DD/MM/YYYY HH:mm');
    }
  }
};

import axios from "axios";

export const postFeedback = (content) =>
  call("/feedback", { content: content });

const call = (uri, content) =>
  axios
    .post(uri, content)
    .then((response) => console.log("Response:" + response.data));
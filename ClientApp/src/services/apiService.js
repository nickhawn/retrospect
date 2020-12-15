import axios from "axios";

export const postFeedback = (content) =>
    post("/api/feedback", { content: content });

export const getFeedback = async (content) => {
    return new Promise(async function (resolve, reject) {
        await axios.get('/api/feedback')
            .then(response => {
                resolve(response.data.reverse());
            })
            .catch(error => {
                reject(error.response);
            })
    })
}

export const deleteFeedback = (id) => {
    axios.delete(`/api/feedback/${id}`);
}

const post = (uri, content) =>
    axios
        .post(uri, content)
        .then((response) => console.log("Response:" + response.data));
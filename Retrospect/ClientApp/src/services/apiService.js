import axios from "axios";

export const getFeedback = async () =>
    new Promise(async function (resolve, reject) {
        await axios.get('/api/Feedback/GetFeedback')
            .then(response => {
                resolve(response.data.reverse());
            })
            .catch(error => {
                reject(error.response);
            })
    })

export const postFeedback = (content, feedbackId) =>
    post("/api/feedback/PostFeedback/", { content: content, type: feedbackId });

export const postVote = id => axios.post(`/api/feedback/PostVote/${id}`);

export const deleteFeedback = id => axios.delete(`/api/feedback/DeleteFeedback/${id}`);

const post = (uri, content) => axios.post(uri, content)
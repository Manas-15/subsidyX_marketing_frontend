import api from "../api";

export const questionService = {
  getQuestion,
};

async function getQuestion() {
  return await api.get(`industry/industries`);
}

import api from "../api";

export const contactUsService = {
  createSubscribe,
  createContact,
};

async function createSubscribe(data) {
  return await api.post(`contact/create_subscribe`, data);
}
async function createContact(data) {
  return await api.post(`contact/create_contact`, data);
}

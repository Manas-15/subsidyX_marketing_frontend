import api from "../api";

export const talukaManagementService = {
  getTalukas,
  // createTaluka,
  // updateTaluka,
  // deleteTaluka,
};

async function getTalukas(ID) {
  let params = ID ? "&district_id=" + ID : "";
  return await api.get(`taluka/?page=1&page_size=1000${params}`);
}

// async function createTaluka(talukaData) {
//   return await api.post(`taluka/create`, talukaData, {
//     headers: authHeader(),
//   });
// }

// async function updateTaluka({ id, editData }) {
//   return await api.patch(`taluka/?taluka_id=${id}`, editData, {
//     headers: authHeader(),
//   });
// }

// async function deleteTaluka(ID) {
//   return await api.delete(`taluka/?taluka_id=${ID}`, {
//     headers: authHeader(),
//   });
// }

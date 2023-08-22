import api from "../api";

export const districtManagementService = {
  getDistricts,
  // createDistrict,
  // updateDistrict,
  // deleteDistrict,
};

async function getDistricts(pageData) {
  let params = pageData?.id ? "&state_id=" + pageData?.id : "";
  return await api.get(
    `district/?page=${pageData?.pagination?.page || 1}&page_size=${
      pageData?.pagination?.pageSize || 1000
    }${params}`
  );
}

// async function createDistrict(districtData) {
//   return await api.post(`district/create`, districtData, {
//     headers: authHeader(),
//   });
// }

// async function updateDistrict({ id, editData }) {
//   return await api.patch(`/district/?district_id=${id}`, editData, {
//     headers: authHeader(),
//   });
// }

// async function deleteDistrict(ID) {
//   return await api.delete(`district/?district_id=${ID}`, {
//     headers: authHeader(),
//   });
// }

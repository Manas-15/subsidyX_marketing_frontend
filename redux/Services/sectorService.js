import api from "../api";

export const sectorService = {
  getSectorList,
};

async function getSectorList(pageData) {
  const params = pageData ? `&industry_category_id=${pageData}` : "";
  return await api.get(
    `industry_sector/?page=${pageData?.pagination?.page || 1}&page_size=${
      pageData?.pagination?.pageSize || 500
    }${params}`
  );
}

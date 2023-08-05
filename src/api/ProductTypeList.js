import axios from 'axios';

const API_URL = 'https://localhost:7225/api/ProductTypes';

// GET: /api/ProductTypes
export const getProductTypesApi = () => {
  return axios.get(API_URL);
};

// GET: /api/ProductTypes/{id}
export const getProductTypeApi = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// POST: /api/ProductTypes
export const createProductTypeApi = (productType) => {
  return axios.post(API_URL, productType)
    .then(response => {
      console.log('Product type created:', response.data);
      return response.data; // Trả về dữ liệu sản phẩm đã tạo
    })
    .catch(error => {
      console.error('Failed to create product type:', error);
      throw error; // Ném ra lỗi để hàm gọi xử lý
    });
};

// PUT: /api/ProductTypes/{id}
export const updateProductTypeApi = (id, productType) => {
  return axios.put(`${API_URL}/${id}`, productType);
};

// DELETE: /api/ProductTypes/{id}
export const deleteProductTypeApi = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

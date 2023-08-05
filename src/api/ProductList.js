import axios from 'axios';

const API_URL = 'https://localhost:7225/api/Products';

// GET: /api/Products
export const getProductsApi = () => {
    return axios.get(API_URL);
};

// GET: /api/Products/{id}
export const getProductApi = (id) => {
    return axios.get(`${API_URL}/${id}`);
  };

  export const createProducts = (product) => {
    return axios.post(API_URL, product)
      .then(response => {
        console.log('Product created:', response.data);
        return response.data; // Trả về dữ liệu sản phẩm đã tạo
      })
      .catch(error => {
        console.error('Failed to create product:', error);
        throw error; // Ném ra lỗi để hàm gọi xử lý
      });
  };
  export const createImg = (product) => {
    return axios.post(API_URL, product)
      .then(response => {
        console.log('Product type created:', response.data);
        return response.data; // Trả về dữ liệu sản phẩm đã tạo
      })
      .catch(error => {
        console.error('Failed to create product:', error);
        throw error; // Ném ra lỗi để hàm gọi xử lý
      });
  };
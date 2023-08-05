import axios from 'axios';

const API_URL = 'https://localhost:7225/api/ProductImages';
const API_URLs = 'https://localhost:7225/api/ProductImages/api/productimages';
// GET: /api/Products
export const getProductsApi = () => {
    return axios.get(API_URL);
};

// GET: /api/Products/{id}
export const getProductApi = (id) => {
    return axios.get(`${API_URL}/${id}`);
  };
  export const getImg = (id) => {
    return axios.get(`${API_URLs}/${id}`);
  };

  export const createProducts = (product) => {
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
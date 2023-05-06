import axiosClient from "./axiosClient";

class UploadApi {
  getAll = (params) => {
    const url = "/upload";
    return axiosClient.get(url, { params });
  };
}

const UploadApi = new UploadApi();

export default UploadApi;

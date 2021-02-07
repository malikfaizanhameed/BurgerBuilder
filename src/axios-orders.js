import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-db-3ddd2-default-rtdb.firebaseio.com/",
});

export default instance;

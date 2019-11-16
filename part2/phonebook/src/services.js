import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const data = await request;
  return data;
};

const create = async newObject => {
  const request = axios.post(baseUrl, newObject);
  const res = await request;
  return res;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const res = await request;
  return res;
};

const deleteperson = async id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const res = await request;
  return res;
};

export default { getAll, create, update, deleteperson };

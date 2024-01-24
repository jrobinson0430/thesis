import axios from 'axios';

// Login/Sign-Up
const logout = () => axios.put('/user/logout');
const verifyLogin = (payload) => axios.post('/user/login', payload);
const createUser = (payload) => axios.post('/user/create_user', payload);

const updateUser = (payload) => axios.post('/user/update_account', payload);

// Authorization
const hasUserAccess = (pageAccess) => axios.post('/access/user', pageAccess);
const hasStoreManagerAccess = (pageAccess) => axios
  .post('/access/store_manager', pageAccess);

// Animals
const getAnimals = () => axios.get('/animal/get_animals');
const deleteAnimal = (id) => axios.delete(`/animal/delete_animal/${id}`);
const updateAnimal = (payload, id) => axios
  .put(`/animal/update_animal/${id}`, payload);
const addNewAnimal = (payload) => axios
  .post('/animal/add_new_animal', payload);

// Donations
const getAllDonations = () => axios.get('/donate/get_all_donations');
const getUserDonations = () => axios.post('/donate/get_user_donations');
const createDonation = (payload) => axios
  .post('/donate/create_donation', payload);

// Adoptions
const getAllAdoptions = () => axios.get('/adopt/get_all_adoptions');
const getUserAdoptions = () => axios.post('/adopt/get_user_adoptions');

const updateAdoptionStatus = (payload, id) => axios
  .put(`/adopt/update_status/${id}`, payload);
const createAdoption = (payload) => axios
  .post('/adopt/create_adoption', payload);

const axiosAPI = {
  createUser,
  verifyLogin,
  updateUser,
  logout,

  getAnimals,
  addNewAnimal,
  deleteAnimal,
  updateAnimal,

  createAdoption,
  getAllAdoptions,
  getUserAdoptions,
  updateAdoptionStatus,

  hasUserAccess,
  hasStoreManagerAccess,

  createDonation,
  getAllDonations,
  getUserDonations,
};

export default axiosAPI;

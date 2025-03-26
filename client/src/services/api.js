import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -------------------------    Auth  ------------------------------- */

export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const signup = (data) => api.post("/auth/register", data);

/* -------------------------    Portfolio  ------------------------------- */

export const getPublicPortfolio = (username) =>
  api.get(`/portfolio/${username}`);

export const getUserPortfolio = () => api.get(`/portfolio`);

export const updatePortfolioVisibility = (data) =>
  api.put(`/portfolio/visibility`, data);

export const updatePortfolio = (data) => {
  return api.put(`/portfolio`, {
    summary: data.summary,
    resume: data.resume,
  });
};

/* -------------------------    User Profile  ------------------------------- */

export const updateProfile = (data) => {
  return api.put(`/user`, {
    username: data.username,
    email: data.email,
    password: data.password,
    name: data.name,
    phone: data.phone,
    location: data.location,
  });
};

export const deleteProfile = () => {
  return api.delete(`/user`);
};

/* -------------------------    Contact  ------------------------------- */

export const addContact = (data) => {
  return api.post(`/contact`, {
    name: data.name,
    email: data.email,
    message: data.message,
  });
};

export const listContact = () => {
  return api.get(`/contact`);
};

export const getContact = (id) => {
  return api.get(`/contact/${id}`);
};

export const deleteContact = (id) => {
  return api.delete(`/contact/${id}`);
};

/* -------------------------    Experience  ------------------------------- */

export const addExperience = (data) => api.post(`/experience`, data);

export const updateExperience = (data) => {
  return api.put(`/experience/${data._id}`, {
    title: data.title,
    company: data.company,
    startDate: data.startDate,
    endDate: data.endDate,
    description: data.description,
    technologies: data.technologies,
  });
};

export const deleteExperience = (id) => api.delete(`/experience/${id}`);

/* -------------------------    Education  ------------------------------- */

export const addEducation = (data) => api.post(`/education`, data);

export const updateEducation = (data) => {
  return api.put(`/education/${data._id}`, {
    degree: data.degree,
    institution: data.institution,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
  });
};

export const deleteEducation = (id) => api.delete(`/education/${id}`);

/* -------------------------    Project  ------------------------------- */

export const addProject = (data) => api.post(`/project`, data);

export const updateProject = (data) => {
  return api.put(`/project/${data._id}`, {
    name: data.name,
    description: data.description,
    technologies: data.technologies,
  });
};

export const deleteProject = (id) => api.delete(`/project/${id}`);

/* -------------------------    Skill  ------------------------------- */

export const addSkill = (data) => api.post(`/skill`, data);

export const updateSkill = (data) => {
  return api.put(`/skill/${data._id}`, { name: data.name, type: data.type });
};

export const deleteSkill = (id) => api.delete(`/skill/${id}`);

/* -------------------------    Social Link   ------------------------------- */

export const addSocialLink = (data) => api.post(`/social-link`, data);

export const updateSocialLink = (data) => {
  return api.put(`/social-link/${data._id}`, {
    platform: data.platform,
    url: data.url,
  });
};

export const deleteSocialLink = (id) => api.delete(`/social-link/${id}`);

export default api;

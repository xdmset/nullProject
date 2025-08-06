import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para añadir el token de autenticación a cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar la expiración de tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/api/token/refresh/`, { refresh: refreshToken });
        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// --- Funciones de Servicio ---
export const login = (username, password) => apiClient.post('/api/token/', { username, password });

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  delete apiClient.defaults.headers.common['Authorization'];
};

// --- Funciones de Datos ---
export const getMe = () => apiClient.get('/api/v1/usuarios/me/');
export const getUserStats = () => apiClient.get('/api/v1/usuarios/me/stats/');
export const getRoles = () => apiClient.get('/api/v1/roles/');
export const getContenido = () => apiClient.get('/api/v1/mundos/');
export const getProgresoEstudiantes = () => apiClient.get('/api/v1/progresos/');
export const getUsuariosAdmin = () => apiClient.get('/api/v1/usuarios/?rol__nombre__in=Administrador,Asesor');
export const getAvailableAvatars = () => apiClient.get('/api/v1/recompensas/');
export const getMundoData = (mundoId) => apiClient.get(`/api/v1/mundos/${mundoId}/`);
export const getMundoProgreso = (mundoId) => apiClient.get(`/api/v1/progresos/?mundo=${mundoId}`);
export const getMaterialDidactico = () => apiClient.get('/api/v1/materiales/');
export const getUserDetail = (userId) => apiClient.get(`/api/v1/usuarios/${userId}/`);
export const getProgressByUserId = (userId) => apiClient.get(`/api/v1/progresos/?usuario=${userId}`);

// --- ESTA ES LA FUNCIÓN QUE FALTABA ---
export const getUserProgress = () => apiClient.get('/api/v1/progresos/');

// --- Funciones de Acciones ---
export const createUser = (userData) => apiClient.post('/api/v1/usuarios/crear/', userData);
export const updateUserProfile = (profileData) => apiClient.patch('/api/v1/perfil/update/', profileData);
export const updateProgreso = (mundoId) => apiClient.post('/api/v1/progreso/update/', { mundo_id: mundoId });
export const updateMaterial = (id, formData) => apiClient.patch(`/api/v1/materiales/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteMaterial = (id) => apiClient.delete(`/api/v1/materiales/${id}/`);

// --- Funciones de Exportación ---
export const exportUsersCSV = () => apiClient.get('/api/v1/export/users-csv/', { responseType: 'blob' });
export const exportProgresoCSV = () => apiClient.get('/api/v1/export/progreso-csv/', { responseType: 'blob' });
export const exportMaterialCSV = () => apiClient.get('/api/v1/export/material-csv/', { responseType: 'blob' });

// --- Funciones de Gestión del Sistema ---
export const triggerBackup = () => apiClient.post('/api/management/backup/full/', null, { responseType: 'blob' });
export const triggerFullRestore = (formData) => apiClient.post('/api/management/restore/full/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const triggerTableBackup = (tableName) => apiClient.post('/api/management/backup/table/', { table_name: tableName }, { responseType: 'blob' });
export const triggerTableRestore = (formData) => apiClient.post('/api/management/restore/table/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const triggerResetDatabase = () => apiClient.post('/api/management/reset/');
export const getDashboardStats = () => apiClient.get('/api/management/dashboard-stats/');
export const getActivityChartData = () => apiClient.get('/api/management/activity-chart/');
export const getMaterialTypeChartData = () => apiClient.get('/api/management/material-type-chart/');
export const getMonthlyRegistrationsChartData = () => apiClient.get('/api/management/monthly-registrations-chart/');
export const getWorldProgress = () => apiClient.get('/api/v1/progress/by-world/');
export const getCategorias = () => apiClient.get('/api/v1/categorias/');
export const createMaterial = (formData) => apiClient.post('/api/v1/materiales/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const getWorldProgressChartData = () => apiClient.get('/api/management/world-progress-chart/');
export const getCurrentUserProgress = () => apiClient.get('/api/v1/progresos/');
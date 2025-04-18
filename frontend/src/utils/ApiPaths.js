export const BASE_URL = "https://expense-tracker-backend-c8j1.onrender.com";
// export const BASE_URL = "http://localhost:5174";
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
        GET_SUMMARY: "/api/v1/dashboard/generateSummary"
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/delete/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/download",
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/delete/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/download",
    }
};
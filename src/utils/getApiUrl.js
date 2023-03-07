export const apiBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_API_SERVER
    } else {
        return "http://localhost:3000/api/v1";
    }
}

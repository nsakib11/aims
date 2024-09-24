import apiRequest from "@/lib/apiRequest";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "../slices/authSlice";
// Register action
export const registration = (dataObject) => async (dispatch) => {
    dispatch(registerStart());
    try{
        console.log(dataObject);
        const response = apiRequest({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
            data: dataObject
        });
        const data = response.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(registerSuccess(data));
    } catch (error){
        dispatch(registerFailure(error.message));
        toast.error(error.message)
    }
};

// Login action
export const login = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try{
        console.log(credentials);
        const response = apiRequest({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            data: credentials
        });
        console.log(response);
        const data = response.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(loginSuccess(data));
    } catch (error){
        dispatch(loginFailure(error.message));
        toast.error(error.message)
    }
};
// Logout action
export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout())
}
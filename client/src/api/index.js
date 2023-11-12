import axios from "axios"

export const baseURL = "http://127.0.0.1:5001/restaurant-app-d5d40/us-central1/app";

export const validateUserJWTToken = async (token) => {
    try{
        const res =await axios.get(`${baseURL}/api/user/jwtverification`,{
            headers:{Authorization:"Bearer "+ token },
        });
        return res.data;
    }catch(err){
        return null;
    }
}
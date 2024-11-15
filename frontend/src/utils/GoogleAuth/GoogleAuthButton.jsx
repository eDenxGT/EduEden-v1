import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { axiosInstance } from "../../api/axiosConfig";

/* eslint-disable */
const GoogleAuthButton = ({ onSuccessRedirect }) => {
    const handleGoogleSuccess = async (response) => {
        try {
            const res = await axiosInstance.post("/auth/google", {
                token: response.credential,
            });
            toast.success(res?.data?.message);
            onSuccessRedirect(); 
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleGoogleFailure = () => {
        toast.error("Google sign-in was unsuccessful.");
    };

    return (
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
        />
    );
};

export default GoogleAuthButton;

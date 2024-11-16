import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { axiosInstance } from "../../api/axiosConfig";

const GoogleAuthButton = ({ onSuccessRedirect, role, isDarkMode }) => {
    const handleGoogleSuccess = async (response) => {
        try {
            const res = await axiosInstance.post("/auth/google", {
                token: response.credential,
                role
            });
            toast.success(res?.data?.message);
            onSuccessRedirect(); 
        } catch (error) {
            console.log("Google Auth Button error : ",error);
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
            theme={isDarkMode ? "filled_black" : "outline"}
            size="large"
            shape="rectangular"
            text="continue_with"
        />
    );
};

export default GoogleAuthButton;
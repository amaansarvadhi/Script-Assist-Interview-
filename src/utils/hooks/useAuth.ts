import { useNavigate } from "react-router-dom";
import { SignInCredential } from "@/@types/auth";
import { apiSignIn } from "@/services/AuthService";
import useAuthStore from "@/store/slices/authSlice";

type Status = "success" | "failed";

function useAuth() {
  const { signInSuccess, signOutSuccess } = useAuthStore();
  const navigate = useNavigate();
  const token = null;
  const signIn = async (
    values: SignInCredential
  ): Promise<
    | {
        status: "success" | "failed";
        message: string;
      }
    | undefined
  > => {
    try {
      const resp = await apiSignIn(values);
      if (resp?.data) {
        const data: any = resp.data;
        console.log(data, "Will Verify Data");
        signInSuccess(data);
        navigate("/");
        return {
          status: "success",
          message: "Login successful",
        };
      }
    } catch (errors: any) {
      return {
        status: "failed",
        message:
          errors?.response?.data?.message ||
          errors.message ||
          "Something went wrong",
      };
    }
  };

  const handleSignOut = () => {
    signOutSuccess();
    navigate("/login");
  };

  const signOut = async () => {
    try {
      // await apiSignOut()
      handleSignOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return {
    authenticated: token,
    signIn,
    signOut,
  };
}

export default useAuth;

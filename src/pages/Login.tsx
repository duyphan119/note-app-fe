import { useDocumentTitle } from "@/hooks";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { BiLogoGoogle } from "react-icons/bi";
type Props = {};

const Login: FC<Props> = () => {
  useDocumentTitle("Đăng nhập");
  const auth = getAuth();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  };

  // const handleLoginWithFacebook = async () => {
  //   const provider = new FacebookAuthProvider();

  //   await signInWithPopup(auth, provider);
  // };

  // const handleLoginWithGithub = async () => {
  //   const provider = new GithubAuthProvider();

  //   await signInWithPopup(auth, provider);
  // };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-4">
      <h3 className="text-3xl">Login to Note App</h3>
      <button
        onClick={handleLoginWithGoogle}
        type="button"
        className="min-w-[260px] px-4 py-2 bg-google text-white rounded-sm flex items-center gap-2"
      >
        <BiLogoGoogle />
        <span className="flex-1 text-center">Login with Google</span>
      </button>
      {/* <button
        onClick={handleLoginWithFacebook}
        type="button"
        className="min-w-[260px] px-4 py-2 bg-facebook text-white rounded-sm flex items-center gap-2"
      >
        <BiLogoFacebook />
        <span className="flex-1 text-center">Login with Facebook</span>
      </button>
      <button
        onClick={handleLoginWithGithub}
        type="button"
        className="min-w-[260px] px-4 py-2 bg-github text-white rounded-sm flex items-center gap-2"
      >
        <BiLogoGithub />
        <span className="flex-1 text-center">Login with Github</span>
      </button> */}
    </div>
  );
};

export default Login;

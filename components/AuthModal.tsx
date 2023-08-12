import React, { useEffect } from "react";
import Modal from "./Modal";
import useAuthModalStore from "@/store/AuthModalStrore";
import { Button } from "./ui/button";
import Image from "next/image";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import SignupUsernameAndPassword from "./SignupUsernameAndPassword";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
const AuthModal = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [userSate, userSatetLoading, userStateError] = useAuthState(auth);

  const authModal = useAuthModalStore();

  useEffect(() => {
    authModal.close();
  }, [userSate]);
  return (
    <Modal
      isOpen={authModal.isOpen}
      onChange={authModal.toggle}
      title={
        authModal.view === "resetPassword"
          ? "Reset Password"
          : authModal.view === "login"
          ? "Login"
          : authModal.view === "signup"
          ? "Sign Up"
          : "Create your username and password"
      }
    >
      {authModal.view === "login" || authModal.view === "signup" ? (
        <div>
          <p className="text-sm">
            By continuing, you are setting up a Reddit account and agree to our
            <span className="text-blue-500"> User Agreement</span> and
            <span className="text-blue-500"> Privacy Policy</span>.
          </p>

          <div className="flex flex-col gap-5 mt-8">
            <Button
              isLoading={loading}
              disabled={loading}
              onClick={() => signInWithGoogle()}
              variant="outline"
            >
              <Image
                className="object-cover "
                src="/images/googlelogo.png"
                width={24}
                height={24}
                alt="Google Logo Image."
              />
              <p className="flex flex-1 items-center justify-center font-semibold">
                Continue with google.
              </p>
            </Button>
            <Button variant="outline">
              <Image
                className="object-cover "
                src="/images/apple-logo.svg"
                width={24}
                height={24}
                alt="Google Logo Image."
              />
              <p className="flex flex-1 items-center justify-center font-semibold">
                Continue with apple.
              </p>
            </Button>
          </div>

          <div className="flex items-center px-2 my-8">
            <span className="flex-[0.5] h-px bg-gray-500"></span>
            <span className="px-2 text-mutedText font-bold text-lg">OR</span>
            <span className="flex-[0.5] h-px bg-gray-500"></span>
          </div>

          {authModal.view === "login" && <Login />}
          {authModal.view === "signup" && <Signup />}
        </div>
      ) : authModal.view === "resetPassword" ? (
        <ResetPassword />
      ) : (
        <SignupUsernameAndPassword />
      )}
    </Modal>
  );
};

export default AuthModal;

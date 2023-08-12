import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useAuthModalStore from "@/store/AuthModalStrore";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/lib/validators/formValidators";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import Image from "next/image";

const ResetPassword = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const authModal = useAuthModalStore();
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    if (!form.formState.isValid) {
      return form.setError("email", {
        type: "required",
        message: "Missing fields.",
      });
    }

    const success = await sendPasswordResetEmail(values.email);
    if (success) {
      setIsEmailSent(true);
    }
  };
  return (
    <Form {...form}>
      {isEmailSent ? (
        <div className="flex flex-col items-center justify-center mt-8 gap-6">
          <Image
            src="/images/redditFace.svg"
            width={40}
            height={40}
            alt="Reddit Logo"
          />
          <p className="text-center">
            Success! An email has been sent to the provided address with
            instructions on how to reset your password.
          </p>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <p className="text-sm text-gray-300">
            Tell us the email address associated with your Reddit account, and
            we’ll send you an email with a link to reset your password.
          </p>
          <div className="flex flex-col gap-6 mt-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 rounded-full px-6 border-2 border-gray-500 focus:border-solid focus:border-gray-400"
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              isLoading={sending}
              disabled={!form.formState.isValid || sending}
              className="rounded-full"
            >
              Reset Password
            </Button>
          </div>
        </form>
      )}
      <div className="flex gap-4 mt-8">
        <span
          onClick={() => authModal.changeView("signup")}
          className="text-sm text-blue-500 underline underline-offset-2 cursor-pointer"
        >
          Sign Up
        </span>
        <span
          onClick={() => authModal.changeView("login")}
          className="text-sm text-blue-500 underline underline-offset-2 cursor-pointer"
        >
          Login
        </span>
      </div>
    </Form>
  );
};

export default ResetPassword;

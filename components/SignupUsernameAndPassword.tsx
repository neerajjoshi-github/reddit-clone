import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useAuthModalStore from "@/store/AuthModalStrore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  usernameSchema,
  passwordSchema,
} from "@/lib/validators/formValidators";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useFormStore from "@/store/formStore";
import { auth } from "../firebase/firebase.config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "../firebase/firebaseErrors";

const usernamePasswordSchema = usernameSchema.merge(passwordSchema);

const SignupUsernameAndPassword = () => {
  const authModal = useAuthModalStore();
  const formStore = useFormStore();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const form = useForm<z.infer<typeof usernamePasswordSchema>>({
    resolver: zodResolver(usernamePasswordSchema),
    defaultValues: {
      password: "",
      username: "",
    },
    mode: "all",
  });

  const onSubmit = async (values: z.infer<typeof usernamePasswordSchema>) => {
    if (!form.formState.isValid) {
      return form.setError("password", {
        type: "required",
        message: "Missing fields.",
      });
    }
    await createUserWithEmailAndPassword(formStore.email, values.password);
    if (error) {
      return form.setError("password", {
        message: FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS],
      });
    }
    if (!error && !loading) {
      formStore.setEmail("");
      authModal.changeView("signup");
      form.reset();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          onClick={() => authModal.changeView("signup")}
          className="absolute top-2 left-2 p-2 hover:bg-slate-900 rounded-full cursor-pointer"
        >
          <AiOutlineArrowLeft size={20} />
        </div>

        <p className="text-sm text-gray-300">
          Reddit is anonymous, so your username is what you’ll go by here.
          Choose wisely—because once you get a name, you can’t change it.
        </p>
        <div className="flex flex-col gap-8 mt-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="h-12 rounded-full px-6 border-2 border-gray-500 focus:border-solid focus:border-gray-400"
                    placeholder="Username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="h-12 rounded-full px-6 border-2 border-gray-500 focus:border-solid focus:border-gray-400"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isValid || loading}
            isLoading={loading}
            className="rounded-full"
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupUsernameAndPassword;

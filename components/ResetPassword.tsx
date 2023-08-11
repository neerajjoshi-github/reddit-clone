import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useAuthModalStore from "@/store/AuthModalStrore";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema, emailSchema } from "@/lib/validators/formValidators";
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

const emailUsernameSchema = emailSchema.merge(usernameSchema);

const ResetPassword = () => {
  const authModal = useAuthModalStore();
  const form = useForm<z.infer<typeof emailUsernameSchema>>({
    resolver: zodResolver(emailUsernameSchema),
    defaultValues: {
      email: "",
      username: "",
    },
    mode: "all",
  });

  const onSubmit = (values: z.infer<typeof emailUsernameSchema>) => {
    // TODO Reset Password up user.
    if (!form.formState.isValid) {
      return form.setError("root", {
        type: "required",
        message: "Missing fields.",
      });
    }
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <p className="text-sm text-gray-300">
          Tell us the username and email address associated with your Reddit
          account, and we’ll send you an email with a link to reset your
          password.
        </p>
        <div className="flex flex-col gap-6 mt-8">
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
          <Button disabled={!form.formState.isValid} className="rounded-full">
            Reset Password
          </Button>
        </div>
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
      </form>
    </Form>
  );
};

export default ResetPassword;

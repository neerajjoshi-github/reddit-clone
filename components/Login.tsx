import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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

const usernamePasswordSchema = usernameSchema.merge(passwordSchema);

const Login = () => {
  const authModal = useAuthModalStore();
  const form = useForm<z.infer<typeof usernamePasswordSchema>>({
    resolver: zodResolver(usernamePasswordSchema),
    defaultValues: {
      password: "",
      username: "",
    },
    mode: "all",
  });

  const onSubmit = (values: z.infer<typeof usernamePasswordSchema>) => {
    // TODO Login user.
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
        <div className="flex flex-col gap-6">
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
          <Button disabled={!form.formState.isValid} className="rounded-full">
            Login
          </Button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm">
            New to Reddit?{" "}
            <span
              onClick={() => authModal.changeView("signup")}
              className="text-blue-500 underline underline-offset-2 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
          <p className="text-sm">
            Forgot{" "}
            <span
              onClick={() => authModal.changeView("resetPassword")}
              className="text-blue-500 underline underline-offset-2 cursor-pointer"
            >
              password
            </span>
            ?
          </p>
        </div>
      </form>
    </Form>
  );
};

export default Login;

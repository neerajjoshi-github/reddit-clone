import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import useFormStore from "@/store/formStore";

const Signup = () => {
  const authModal = useAuthModalStore();
  const formStore = useFormStore();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: formStore.email,
    },
    mode: "all",
  });

  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    if (!form.formState.isValid) {
      return form.setError("email", {
        type: "required",
        message: "Invalid Email.",
      });
    }
    formStore.setEmail(values.email);
    authModal.changeView("signupUsernameAndPassword");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-8">
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
            disabled={!form.formState.isValid}
            type="submit"
            className="rounded-full"
          >
            Continue
          </Button>
        </div>
        <p className="text-sm mt-4">
          Already a redditor?{" "}
          <span
            onClick={() => authModal.changeView("login")}
            className="text-blue-500 underline underline-offset-2 cursor-pointer"
          >
            Log In
          </span>
        </p>
      </form>
    </Form>
  );
};

export default Signup;

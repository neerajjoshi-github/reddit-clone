import React from "react";
import Modal from "./Modal";
import useCreateCommunityStore from "@/store/CreateCommunityModalStore";
import { Label } from "@radix-ui/react-label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { BiSolidUser, BiSolidLockAlt } from "react-icons/bi";
import { VscEye } from "react-icons/vsc";
import { Checkbox } from "@/components/ui/checkbox";

const communityTypeOptions = [
  {
    value: "public",
    icon: BiSolidUser,
    title: "Public",
    description: "Anyone can view, post, and comment to this community",
  },
  {
    value: "restricted",
    icon: VscEye,
    title: "Restricted",
    description:
      "Anyone can view this community, but only approved users can post",
  },
  {
    value: "private",
    icon: BiSolidLockAlt,
    title: "Private",
    description: "Only approved users can view and submit to this community",
  },
] as const;

type CommunityTypeOptionsType = (typeof communityTypeOptions)[number]["value"];

const CommunityTypeValues: [
  CommunityTypeOptionsType,
  ...CommunityTypeOptionsType[]
] = [
  communityTypeOptions[0].value,
  ...communityTypeOptions.slice(1).map((p) => p.value),
];

const communityFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Community name should be between 3 to 50 charaters" })
    .max(50, { message: "Community name should be between 3 to 50 charaters" }),
  communityType: z.enum(CommunityTypeValues),
  isNSFW: z.boolean(),
});

const CreateComunityModal = () => {
  const createCommunityModal = useCreateCommunityStore();

  const form = useForm<z.infer<typeof communityFormSchema>>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      name: "",
      communityType: "public",
      isNSFW: false,
    },
  });

  function onSubmit(values: z.infer<typeof communityFormSchema>) {
    console.log(values);
  }
  return (
    <Modal
      title="Create Community"
      isOpen={createCommunityModal.isOpen}
      onChange={createCommunityModal.toggle}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 border-t border-borderPrimary py-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Name</FormLabel>
                <FormControl>
                  <div className="border-2 border-borderPrimary flex items-center rounded-md px-2">
                    <span className="text-mutedText">r/</span>
                    <Input className="bg-transparent" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="communityType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base">Community type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {communityTypeOptions.map((option) => {
                      return (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <div className="flex items-center gap-1">
                              <option.icon size={20} />
                              <span className="text-sm">{option.title}</span>
                              <p className="text-xs text-mutedText">
                                {option.description}
                              </p>
                            </div>
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isNSFW"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-base">Adult content</FormLabel>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="w-5 h-5"
                    />
                  </FormControl>
                  <FormLabel className="flex gap-2 items-center">
                    <div className="inline bg-red-500 font-semibold text-xs rounded-md py-[2px] px-1 ">
                      NSFW
                    </div>
                    <p>18+ year old community</p>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              onClick={createCommunityModal.close}
              variant="outline"
            >
              Close
            </Button>
            <Button variant="reverse">Create Community</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default CreateComunityModal;

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth, firestoreDb } from "@/firebase/firebase.config";
import useCreateCommunityStore from "@/store/CreateCommunityModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BiSolidLockAlt, BiSolidUser } from "react-icons/bi";
import { VscEye } from "react-icons/vsc";
import * as z from "zod";
import Modal from "../ui/Modal";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
import { useRouter } from "next/navigation";

const privacyTypeOptions = [
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

type PrivacyTypeOptionsType = (typeof privacyTypeOptions)[number]["value"];

const privacyTypeValues: [PrivacyTypeOptionsType, ...PrivacyTypeOptionsType[]] =
  [
    privacyTypeOptions[0].value,
    ...privacyTypeOptions.slice(1).map((p) => p.value),
  ];

const communityFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Community name should be between 3 to 21 charaters" })
    .max(21, {
      message: "Community name should be between 3 to 21 charaters",
    }),
  privacyType: z.enum(privacyTypeValues),
  isNSFW: z.boolean(),
});

const CreateComunityModal = () => {
  const [user] = useAuthState(auth);
  const createCommunityModal = useCreateCommunityStore();
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof communityFormSchema>>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      name: "",
      privacyType: "public",
      isNSFW: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof communityFormSchema>) => {
    setIsLoading(true);
    try {
      const communityRef = doc(firestoreDb, "communities", values.name);

      await runTransaction(firestoreDb, async (transaction) => {
        // Checking if community already exist
        const communityDoc = await transaction.get(communityRef);
        if (communityDoc.exists()) {
          form.setError("name", {
            message: `Sorry, r/${values.name} is taken. Try another`,
          });
          return setIsLoading(false);
        }

        // Creating community
        transaction.set(communityRef, {
          name: values.name,
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: values.privacyType,
          isNSFW: values.isNSFW,
        });

        // Creating community snnippet on user doc
        transaction.set(
          doc(firestoreDb, `users/${user?.uid}/communitySnippets`, values.name),
          {
            communityId: values.name,
            isModerator: true,
          }
        );
      });
      createCommunityModal.close();
      router.push(`/r/${values.name}`);
      form.reset();
    } catch (e: any) {
      console.error("Error adding document: ", e);
      form.setError("isNSFW", {
        message: "Something went wrong please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
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
                <FormLabel className="text-base !text-white">Name</FormLabel>
                <FormControl>
                  <div className="border-2 border-borderPrimary flex items-center rounded-md px-2">
                    <span className="text-mutedText">r/</span>
                    <Input
                      max={21}
                      maxLength={21}
                      className="bg-transparent"
                      {...field}
                    />
                  </div>
                </FormControl>
                <p
                  className={`${
                    form.watch("name").length === 21
                      ? "text-red-600"
                      : "text-mutedText"
                  } text-xs`}
                >
                  {21 - form.watch("name").length} Characters remaining
                </p>
                <FormMessage className="left-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="privacyType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base">Community type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {privacyTypeOptions.map((option) => {
                      return (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
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
            <Button
              variant="reverse"
              isLoading={isloading}
              disabled={isloading}
            >
              Create Community
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default CreateComunityModal;

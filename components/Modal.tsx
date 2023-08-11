import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onChange, title }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content className="z-[50] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700 drop-shadow-md max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:max-w-[450px] md:w-[90vw] py-12 px-8 rounded-md bg-secondary focus:outline-none">
          <Dialog.Title className="text-2xl font-bold mb-4 mt-2">
            {title}
          </Dialog.Title>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="text-neutral-400 hover:text-white absolute top-2 right-2 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:outline-none">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

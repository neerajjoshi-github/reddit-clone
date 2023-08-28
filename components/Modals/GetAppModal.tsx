import React from "react";
import Modal from "../ui/Modal";
import Link from "next/link";
import Image from "next/image";
import useGetAppModalStore from "@/store/getAppModalStore";

const GetAppModal = () => {
  const getAppModalStore = useGetAppModalStore();
  return (
    <Modal
      isOpen={getAppModalStore.isOpen}
      onChange={getAppModalStore.toggle}
      title=" Get the Reddit app"
    >
      <div className="w-full h-full flex flex-col items-center justify-center mt-4 gap-4">
        <p className="text-white font-semibold">
          Scan this QR code to download the app now
        </p>
        <div className="w-40 h-40 border-2 border-white relative">
          <Image src="/images/reddit-qr-code.svg" alt="Qr Code" fill />
        </div>
        <p className="text-white font-semibold">
          Or check it out in the app stores
        </p>
        <div className="flex gap-2">
          <Link href="#" className="relative w-32 h-10">
            <Image src="/images/app-store.svg" alt="Apple" fill />
          </Link>
          <Link href="#" className="relative w-32 h-10">
            <Image src="/images/google-play.svg" alt="Apple" fill />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default GetAppModal;

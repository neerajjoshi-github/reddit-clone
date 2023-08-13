"use client";
import AuthModal from "@/components/AuthModal";
import CreateComunityModal from "@/components/CreateComunityModal";
import GetAppModal from "@/components/GetAppModal";
import React from "react";

const ModalProvider = () => {
  return (
    <>
      <GetAppModal />
      <AuthModal />
      <CreateComunityModal />
    </>
  );
};

export default ModalProvider;

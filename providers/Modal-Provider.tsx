"use client";
import AuthModal from "@/components/Modals/AuthModal";
import CreateComunityModal from "@/components/Modals/CreateComunityModal";
import GetAppModal from "@/components/Modals/GetAppModal";
import SearchModal from "@/components/Modals/SearchModal";
import React from "react";

const ModalProvider = () => {
  return (
    <>
      <GetAppModal />
      <AuthModal />
      <CreateComunityModal />
      <SearchModal />
    </>
  );
};

export default ModalProvider;

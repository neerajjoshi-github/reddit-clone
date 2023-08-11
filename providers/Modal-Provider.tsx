"use client";
import AuthModal from "@/components/AuthModal";
import GetAppModal from "@/components/GetAppModal";
import React from "react";

const ModalProvider = () => {
  return (
    <>
      <GetAppModal />
      <AuthModal />
    </>
  );
};

export default ModalProvider;

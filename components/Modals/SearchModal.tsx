import React from "react";
import Modal from "../ui/Modal";
import useSearchModalStore from "@/store/SearchModal";
import Search from "../Header/Search";

const SearchModal = () => {
  const searchModalStore = useSearchModalStore();
  return (
    <Modal
      isOpen={searchModalStore.isOpen}
      onChange={searchModalStore.toggle}
      title="Search...."
    >
      <Search className="border-b border-borderPrimary rounded-none" />
    </Modal>
  );
};

export default SearchModal;

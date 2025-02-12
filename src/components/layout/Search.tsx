import Modal from "../elements/Modal";

import GlobalSearch from "../elements/globalSearch/GlobalSearch";

export default function Search({ handleSearchModal }: any) {
  return (
    <Modal onClose={handleSearchModal}>
      <div className="max-w-xl pt-10 md: mb-40">
        <GlobalSearch />
      </div>
    </Modal>
  );
}

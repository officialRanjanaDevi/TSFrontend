const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center backdrop-blur">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white mx-3 md:mx-0 border-2 border-[#EB8105] px-1 py-3 rounded-md">
          <div className="">{children}</div>

          <button
            className="px-5 bg-[#EB8105] py-2 font-bold flex ml-4 rounded-md"
            onClick={onClose}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

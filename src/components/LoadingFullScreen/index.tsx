function index({ blur = true }: { blur?: boolean }) {
  return blur ? (
    <dialog id="loading-spnner" className="modal bg-[#0006] pl-56" open>
      <button
        className="btn btn-xl disabled:!bg-transparent disabled:!border-0 disabled:!outline-0 disabled:shadow-none"
        disabled
      >
        <span className="loading loading-spinner text-primary w-[2.5rem]"></span>
      </button>
    </dialog>
  ) : (
    <dialog id="loading-spnner" className="modal bg-[#fff] z-[99999]" open>
      <button
        className="btn btn-xl disabled:!bg-transparent disabled:!border-0 disabled:!outline-0 disabled:shadow-none"
        disabled
      >
        <span className="loading loading-spinner text-primary w-[2.5rem]"></span>
      </button>
    </dialog>
  );
}

export default index;

function index() {
  return (
    <div
      className="fixed top-0 left-0 z-10 w-full h-full"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <div className="pl-56 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <span className="loading text-info loading-lg"></span>
      </div>
    </div>
  );
}

export default index;

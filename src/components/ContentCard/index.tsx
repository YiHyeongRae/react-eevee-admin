import { ReactNode } from "react";

function index({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${
        className || ""
      }  rounded-lg hero bg-base-100 border border-base-300 place-items-start`}
    >
      <div className="hero-content">{children}</div>
    </div>
  );
}

export default index;

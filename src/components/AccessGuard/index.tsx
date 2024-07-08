import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingFullScreen from "../LoadingFullScreen";
import { AccessGuardTypes } from "../../data/types/components";

const AccessGuard = ({ data, role, children }: AccessGuardTypes) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentRequireAccess, setCurrentRequireAccess] = useState<string[]>([
    "",
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const target = data.filter((item: any) =>
      location.pathname.includes(item.key)
    );
    setCurrentRequireAccess(target[0]?.access);
    setLoading(false);
  }, [location]);

  if (currentRequireAccess?.includes(role)) {
    return (
      <>
        {loading && <LoadingFullScreen blur={false} />}
        {children}
      </>
    );
  } else {
    return (
      <div className="h-full hero bg-base-100">
        {loading && <LoadingFullScreen blur={false} />}
        <div className="text-center hero-content">
          <div className="max-w-md">
            {/* <h1 className="text-4xl font-bold">접근 불가</h1> */}
            <p className="py-6">
              접근 권한이 없습니다. 아래 버튼을 눌러 홈으로 돌아가 주세요.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/dashboard")}
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default AccessGuard;

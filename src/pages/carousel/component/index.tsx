import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function index() {
  const copyAndPaste = async (target: "Component" | "Types" | "Function") => {
    const text = document.getElementsByClassName(target);

    await navigator.clipboard.writeText(text[0].textContent || "");
    alert(`${target} copy complete !`);
  };

  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-2 gap-2 overflow-hidden h-3/4 max-md:grid-cols-1 max-md:h-dvh">
        <div className="grid col-span-1 overflow-auto">
          <div className="flex flex-wrap col-span-1 gap-2 mr-1">
            <div className="badge badge-outline max-sm:text-xs">
              {t("common.component")}
            </div>
            <div
              className="cursor-pointer badge badge-primary max-sm:text-xs"
              onClick={() => copyAndPaste("Component")}
            >
              {t("common.copy")}
            </div>
          </div>
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            className="Component"
          >
            {`import React, { useEffect, useRef, useState } from "react";
import { CarouselTypes } from "#/data/types/components";

export default function Carousel({
  initialIndexValue,
  getCurrentIndex,
  children,
  infinite,
  interval,
}: CarouselTypes) {
  
  const array = React.Children.toArray(children);
  const slideList = [array.at(-1), ...array, array.at(0)];

  const [downPoint, setDownPoint] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [movingAmount, setMovingAmount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(initialIndexValue ?? 1);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [isSwipe, setIsSwipe] = useState(false);

  const [isAniamte, setIsAnimate] = useState(true);

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsAnimate(true);
    setDownPoint(e.pageX);
    setIsSwipe(true);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSwipe) {
      setMovingAmount(e.pageX);
    } else return false;
  };

  const mouseUpHandler = () => {
    const mouseMoveAmount = movingAmount !== 0 ? downPoint - movingAmount : 0;
    const halfWidth = sliderWidth / 2;
    const standard = Math.round((mouseMoveAmount / halfWidth) * 100);

    setIsSwipe(false);

    setDownPoint(0);
    setMovingAmount(0);

    if (standard < 0 && standard < -50) {
      if (!(currentIndex - 1 < 0)) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
    if (standard > 0 && standard > 50) {
      if (!(currentIndex + 1 > (infinite ? slideList : array).length - 1)) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const touchDownHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsAnimate(true);
    setDownPoint(Math.floor(e.targetTouches[0].pageX));
    setIsSwipe(true);
  };
  const touchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isSwipe) {
      setMovingAmount(Math.floor(e.targetTouches[0].pageX));
    } else return false;
  };
  const touchEndHandler = () => {
    const mouseMoveAmount = movingAmount !== 0 ? downPoint - movingAmount : 0;
    const halfWidth = sliderWidth / 2;
    const standard = Math.round((mouseMoveAmount / halfWidth) * 100);
    setIsSwipe(false);
    setDownPoint(0);
    setMovingAmount(0);

    if (standard < 0 && standard < -50) {
      if (!(currentIndex - 1 < 0)) {
        setCurrentIndex((prev) => prev - 1);
      }
    }


    if (standard > 0 && standard > 50) {
      if (!(currentIndex + 1 > (infinite ? slideList : array).length - 1)) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const infiniteLoop = () => {
    setIsAnimate(false);

    if (currentIndex === slideList.length - 1) {
      setCurrentIndex(1);
    }
    if (currentIndex === 0) {
      setCurrentIndex(slideList.length - 2);
    }
  };
  useEffect(() => {
    if (sliderRef.current !== null) {
      setSliderWidth(sliderRef.current.clientWidth);
    }
  }, [sliderRef]);

  useEffect(() => {
    if (infinite) {
      getCurrentIndex &&
        getCurrentIndex(
          currentIndex === slideList.length - 1 ? 1 : currentIndex
        );
    } else {
      getCurrentIndex && getCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (speed) {
      const newIndex =
        currentIndex + 1 > slideList?.length - 2 ? 1 : currentIndex + 1;
      const timer = setInterval(() => {
        setCurrentIndex && setCurrentIndex(newIndex);
      }, speed);

      return () => {
        clearInterval(timer);
      };
    }
  }, [currentIndex]);
  return (
    <div className="w-full">
      {infinite ? (
        <div
          id="carousel-wrap"
          className="overflow-hidden touch-pan-y"
          ref={sliderRef}
          onMouseDown={(e) => mouseDownHandler(e)}
          onMouseMove={(e) => mouseMoveHandler(e)}
          onMouseUp={() => mouseUpHandler()}
          onTouchStart={(e) => touchDownHandler(e)}
          onTouchMove={(e) => touchMoveHandler(e)}
          onTouchEnd={() => touchEndHandler()}
          onMouseLeave={() => mouseUpHandler()}
          onTouchCancel={() => touchEndHandler()}
          onTransitionEnd={() => {
            infiniteLoop();
          }}
        >
          <div
            id="content-wrap"
            className="flex flex-nowrap"
            style={{
              width: \`\${100 * slideList.length}%\`,
              marginLeft: \`-\${currentIndex * 100}%\`,
              transform: \`\translateX(\${
                movingAmount !== 0 ? (downPoint - movingAmount) * -1 : 0
              }px)\`,
              transition: isAniamte
                ? \`all \${!isSwipe ? "200" : "0"}ms ease-in-out 0s\`
                : "",
            }}
          >
            {slideList.map((item, i) => {
              return (
                <div
                  key={\`\${item}-\${i}\`}
                  className="flex items-center justify-center w-full"
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          id="carousel-wrap"
          className="overflow-hidden touch-pan-y"
          ref={sliderRef}
          onMouseDown={(e) => mouseDownHandler(e)}
          onMouseMove={(e) => mouseMoveHandler(e)}
          onMouseUp={() => mouseUpHandler()}
          onTouchStart={(e) => touchDownHandler(e)}
          onTouchMove={(e) => touchMoveHandler(e)}
          onTouchEnd={() => touchEndHandler()}
          onMouseLeave={() => mouseUpHandler()}
          onTouchCancel={() => touchEndHandler()}
        >
          <div
            id="content-wrap"
            className="flex flex-nowrap"
            style={{
              width: \`\${100 * array.length}%\`,
              marginLeft: \`-\${currentIndex * 100}%\`,
              transform: \`translateX(\${
                movingAmount !== 0 ? (downPoint - movingAmount) * -1 : 0
              }px)\`,
              transition: isAniamte
                ? \`all \${!isSwipe ? "200" : "0"}ms ease-in-out 0s\`
                : "",
            }}
          >
            {array.map((item, i) => {
              return (
                <div
                  key={\`\${item}-\${i}\`}
                  className="flex items-center justify-center w-full"
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
            
`}
          </SyntaxHighlighter>
        </div>

        <div className="grid grid-cols-1 col-span-1 gap-2 overflow-hidden max-md:grid-cols-1">
          <div className="flex flex-col overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="badge badge-outline max-sm:text-xs">
                {t("common.types")}
              </div>
              <div
                className="cursor-pointer badge badge-primary max-sm:text-xs"
                onClick={() => copyAndPaste("Component")}
              >
                {t("common.copy")}
              </div>
            </div>
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              className="flex-auto Types"
            >
              {`type CarouselInfinite = {
  initialIndexValue?: number;
  getCurrentIndex?: Function;
  children: ReactNode;
  infinite?: boolean;
  interval?: never;
};
type CarouselInterval = {
  initialIndexValue?: number;
  getCurrentIndex?: Function;
  children: ReactNode;
  infinite?: never;
  interval?: number;
};
type CarouselTypes = CarouselInterval | CarouselInfinite;
`}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="badge badge-outline">Basic Usage</div>

        <ul className="grid gap-1">
          <li className="grid justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="col-span-12 text-md">
              initialIndexValue로 Carousel의 최초 slide 설정 가능
            </p>
          </li>
          <li className="grid justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="col-span-12 text-md">
              getCurrnetIndex로 slider의 현재 index를 부모에게 전달
            </p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">
              Carousel 커스텀의 용이를 위해서 slide를 children으로 받고, 배열화
              해서 사용
            </p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">infinite 여부 설정</p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">
              Interval 만큼 자동으로 slide 넘김
            </p>
          </li>
          <li className="grid justify-start grid-flow-col-dense gap-2 text-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="col-span-12 text-md">
              Interval 과 Infinite는 동시 사용 불가
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default index;

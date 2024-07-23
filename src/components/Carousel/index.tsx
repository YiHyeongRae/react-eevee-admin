import React, { useEffect, useRef, useState } from "react";
import { CarouselTypes } from "../../data/types/components";
// 캐러셀을 loop 돌리려면 infinite=true
// 캐러셀 사용하는곳에서 현재인덱스가 필요하다면 getCurrentIndex={(params)=>{}}
// 미리보기중 누른 사진의 인덱스로 캐러셀을 띄워주고싶다면 initialIndexValue에 해당 사진의 인덱스 설정

export default function Carousel({
  initialIndexValue,
  getCurrentIndex,
  children,
  infinite,
  interval,
}: CarouselTypes) {
  // infinite 아니면 아래 배열 사용
  // React.Children.toArray method 미사용시 children은 유사배열로 array method 사용 불가
  const array = React.Children.toArray(children);
  // infinite면 아래 배열 사용
  // 실제 배열의 앞뒤에 첫째번째와 마지막 아이템 추가
  const slideList = [array.at(-1), ...array, array.at(0)];

  // 마우스,터치 다운 시점을 기록, 포인터 움직임의 양을 계산하기 위함
  const [downPoint, setDownPoint] = useState(0);
  // 기준점 계산에 필요한 현재 객체의 width
  const [sliderWidth, setSliderWidth] = useState(0);
  // 마우스가 이동한 양
  const [movingAmount, setMovingAmount] = useState(0);
  // 현재 슬라이드의 인덱스
  const [currentIndex, setCurrentIndex] = useState(
    initialIndexValue ?? infinite ? 1 : 0
  );
  // 객체의 width를 가져오기 위한 ref 선언
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // 마우스다운,터치다운 시 마우스무브,터치무브 작동하게하기 위한 state,
  // debounce와 throttle 대체
  const [isSwipe, setIsSwipe] = useState(false);

  // infinite 설정 시 트릭을 위한 transition 꺼주는 state
  const [isAniamte, setIsAnimate] = useState(true);

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsAnimate(true);
    // 마우스가 다운된 시점의 좌표기록
    setDownPoint(e.pageX);

    // 마우스무빙 체크가 시작되게 해주는 state
    setIsSwipe(true);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSwipe) {
      // 마우스 다운 이후에만 마우스무빙이 작동하고, 값 추출
      setMovingAmount(e.pageX);
    } else return false;
  };

  const mouseUpHandler = () => {
    // downPoint === 첫 마우스 다운지점
    // movingAmount === 마우스가 이동한 X좌표 양
    // 두 값 계산해서 스와이프 동작의 범위 측정
    const mouseMoveAmount = movingAmount !== 0 ? downPoint - movingAmount : 0;
    const halfWidth = sliderWidth / 2;

    // 기준점 50% 이상 혹은 -50% 이상
    const standard = Math.round((mouseMoveAmount / halfWidth) * 100);

    // 마우스 업과 함께 스와이프 해제
    setIsSwipe(false);

    // 값계산 완료했으니까 초기값으로 리셋
    setDownPoint(0);
    setMovingAmount(0);

    // 기준점통해서 슬라이드 넘겨줄지 말지 정함
    if (standard < 0 && standard < -50) {
      if (!(currentIndex - 1 < 0)) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
    // 기준점통해서 슬라이드 넘겨줄지 말지 정함
    if (standard > 0 && standard > 50) {
      // infinite 분기처리
      if (!(currentIndex + 1 > (infinite ? slideList : array).length - 1)) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  // 마우스다운핸들러와 동일
  const touchDownHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsAnimate(true);
    setDownPoint(Math.floor(e.targetTouches[0].pageX));
    setIsSwipe(true);
  };
  // 마우스무브핸들러와 동일
  const touchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isSwipe) {
      setMovingAmount(Math.floor(e.targetTouches[0].pageX));
    } else return false;
  };
  // 마우스업핸들러와 동일
  const touchEndHandler = () => {
    const mouseMoveAmount = movingAmount !== 0 ? downPoint - movingAmount : 0;
    const halfWidth = sliderWidth / 2;
    const standard = Math.round((mouseMoveAmount / halfWidth) * 100);

    if (standard < 0 && standard < -50) {
      if (!(currentIndex - 1 < 0)) {
        setCurrentIndex((prev) => prev - 1);
      }
    }

    // infinite 분기처리
    if (standard > 0 && standard > 50) {
      if (!(currentIndex + 1 > (infinite ? slideList : array).length - 1)) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
    setIsSwipe(false);
    setDownPoint(0);
    setMovingAmount(0);
  };

  // infinite 설정 시 배열위치 재정렬 해주는 트릭용 함수
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
      getCurrentIndex?.(
        currentIndex === slideList.length - 1 ? 1 : currentIndex
      );
    } else {
      getCurrentIndex?.(currentIndex + 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (interval) {
      const newIndex =
        currentIndex + 1 > slideList?.length - 3 ? 0 : currentIndex + 1;

      const timer = setInterval(() => {
        setCurrentIndex(newIndex);
      }, interval);

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
          // Mouse Down,Move,Up 순으로 이벤트 실행
          onMouseDown={(e) => mouseDownHandler(e)}
          onMouseMove={(e) => mouseMoveHandler(e)}
          onMouseUp={() => mouseUpHandler()}
          // Touch Start,Move,End 순으로 이베늩 실행
          onTouchStart={(e) => touchDownHandler(e)}
          onTouchMove={(e) => touchMoveHandler(e)}
          onTouchEnd={() => touchEndHandler()}
          // Leave,Cancel을 걸어주지 않으면 객체 범위 밖으로 마우스,터치동작이 나가도 터치상대가 유지됨,
          // 즉 onMouseUp,onTouchEnd이벤트가 실행되지않아 고장날 수 있음
          onMouseLeave={() => mouseUpHandler()}
          onTouchCancel={() => {
            setIsSwipe(false);
            setDownPoint(0);
            setMovingAmount(0);
          }}
          // infinite loop때 트릭을위해 TransitionEnd때 함수 실행
          onTransitionEnd={() => {
            infiniteLoop();
          }}
        >
          <div
            id="content-wrap"
            className="flex flex-nowrap"
            style={{
              width: `${100 * slideList.length}%`,
              marginLeft: `-${currentIndex * 100}%`,
              transform: `translateX(${
                movingAmount !== 0 ? (downPoint - movingAmount) * -1 : 0
              }px)`,
              transition: !isSwipe
                ? `all ${isAniamte ? "100" : "0"}ms linear 0s`
                : "",
            }}
          >
            {slideList.map((item, i) => {
              return (
                <div
                  key={`${item}-${i}`}
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
          // Mouse Down,Move,Up 순으로 이벤트 실행
          onMouseDown={(e) => mouseDownHandler(e)}
          onMouseMove={(e) => mouseMoveHandler(e)}
          onMouseUp={() => mouseUpHandler()}
          // Touch Start,Move,End 순으로 이벤트 실행
          onTouchStart={(e) => touchDownHandler(e)}
          onTouchMove={(e) => touchMoveHandler(e)}
          onTouchEnd={() => touchEndHandler()}
          // Leave,Cancel을 걸어주지 않으면 객체 범위 밖으로 마우스,터치동작이 나가도 터치상대가 유지됨,
          // 즉 onMouseUp,onTouchEnd이벤트가 실행되지않아 고장날 수 있음
          onMouseLeave={() => mouseUpHandler()}
          onTouchCancel={() => {
            setIsSwipe(false);
            setDownPoint(0);
            setMovingAmount(0);
          }}
        >
          <div
            id="content-wrap"
            className="flex flex-nowrap"
            style={{
              width: `${100 * array.length}%`,
              marginLeft: `-${currentIndex * 100}%`,
              transform: `translateX(${
                movingAmount !== 0 ? (downPoint - movingAmount) * -1 : 0
              }px)`,
              // transition: isAniamte
              //   ? `all ${!isSwipe ? "200" : "0"}ms ease-in-out 0s`
              //   : "",
              transition: !isSwipe
                ? `all ${isAniamte ? "100" : "0"}ms linear 0s`
                : "",
            }}
          >
            {array.map((item, i) => {
              return (
                <div
                  key={`${item}-${i}`}
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

import React, { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import { Grid, Logo, Button, List, ListItem as Item } from "@components/ui";
import { MenuIcon, LightBulbIcon } from "@components/icons";
import { NETWORKS_DATA } from "constants/networksData";

const Home: NextPage = () => {
  const [screenSize, setScreenSize] = useState<number>(0);
  const [initialSlider, setSlider] = useState<sliderInterface>({
    sliderTitle: "ETH",
    sliderDescription: "Wow",
    radiusLength: 300,
    activeId: 0,
    sliderItems: [...NETWORKS_DATA],
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [introIsLoading, setIntroIsLoading] = useState<boolean>(true);

  const radianSectionDeg =
    ((360 / initialSlider.sliderItems.length) * Math.PI * 2) / 360;
  let rotation = 0;

  const changeActiveItem = (elId: number) => {
    const sliderItemsArr = [...initialSlider.sliderItems];
    const currentIndex = sliderItemsArr.findIndex((item) => item.id === elId);
    if (currentIndex === -1) elId = sliderItemsArr[0].id;

    const newTitle = sliderItemsArr.find((item) => item.id === elId)?.key;
    const newDescription = sliderItemsArr.find(
      (item) => item.id === elId
    )?.description;

    setSlider({
      ...initialSlider,
      sliderTitle: newTitle !== undefined ? newTitle.toUpperCase() : "Unknown",
      sliderDescription: newDescription,
      activeId: elId,
    });
  };

  const changeRadius = (radius: number) => {
    itemsRef.current.map((item) => {
      item.style.height = `${radius / 3}px`;
      item.style.width = `${radius / 3}px`;
    });
    setSlider({
      ...initialSlider,
      radiusLength: radius,
    });
  };

  useEffect(() => {
    if (!introIsLoading) {
      const currentContainer = containerRef.current;

      setScreenSize(window.innerWidth);
      currentContainer && changeRadius(currentContainer.offsetHeight / 1.95);

      window.addEventListener("resize", () => {
        setScreenSize(window.innerWidth);
        currentContainer && changeRadius(currentContainer.offsetHeight / 1.95);
      });

      return () => {
        window.removeEventListener("resize", () => {
          setScreenSize(window.innerWidth);
          currentContainer &&
            changeRadius(currentContainer.offsetHeight / 1.95);
        });
      };
    }
  }, [introIsLoading]);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      changeActiveItem(initialSlider.activeId + 1);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [initialSlider]);

  const [introSrc, setIntroSrc] = useState<number>(0);

  useEffect(() => {
    setIntroSrc(window.innerWidth);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIntroIsLoading(false);
    }, 10000);

    return () => {};
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      {introIsLoading && (
        <div className="fixed z-30 w-screen h-screen flex items-center justify-center bg-[#e0e2e3]">
          {introSrc >= 600 ? (
            <video playsInline autoPlay muted>
              <source src="/static/videos/intro.mp4" />
            </video>
          ) : (
            ""
          )}
          {introSrc < 600 ? (
            <video playsInline autoPlay muted>
              <source src="/static/videos/intro-mobile.mp4" />
            </video>
          ) : (
            ""
          )}
        </div>
      )}
      {!introIsLoading && (
        <Grid layout="A">
          <div className="landing__left-sec bg-white shadow-lg w-full md:row-span-2 lg:row-span-[unset] lg:col-span-2 z-10 rounded-b-2xl lg:rounded-none mlscreen:row-span-1">
            <div className="px-4 py-5 xs:px-6 xs:py-6 sm:px-12 sm:py-10 space-y-14 ml-auto lg:max-w-3xl">
              <header className="flex items-center justify-between">
                <Logo />
                <MenuIcon />
              </header>
              <div className="space-y-3 text-center lg:text-left">
                <h2 className="text-heading-3 font-semibold text-type-700">
                  Welcome to <span className="text-primary">O</span>raclez Token
                  Generator
                </h2>
                <p className="text-body-2 font-light text-type-600">
                  It does not matter what type of token you want and what
                  features you need. Oraclez is the best way to enter the
                  professional world of cryptocurrency. The next few minutes can
                  be the beginning of your business success.
                </p>
              </div>
              <div className="sm:max-w-[73%] sm:min-w-[400px]">
                <h5 className="mb-8 sm:mb-9 flex items-center space-x-2 text-type-700 text-body-2">
                  <LightBulbIcon />
                  <span>How to create token Step by Step:</span>
                </h5>
                <List>
                  <li className="flex space-x-1.5 items-start">
                    <svg
                      className="pt-0.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_di_398_1165)">
                        <path
                          d="M8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10Z"
                          fill="#F7931A"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_di_398_1165"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 0.6 0 0 0 0 0.00392157 0 0 0 0.83 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_398_1165"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_398_1165"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect2_innerShadow_398_1165"
                          />
                        </filter>
                      </defs>
                    </svg>

                    <p className="text-type-600 font-light text-body-4">
                      Simple, quick, and practical.
                    </p>
                  </li>
                  <li className="flex space-x-1.5 items-start">
                    <svg
                      className="pt-0.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_di_398_1168)">
                        <path
                          d="M8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10Z"
                          fill="#5444BD"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_di_398_1168"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.329412 0 0 0 0 0.266667 0 0 0 0 0.741176 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_398_1168"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_398_1168"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect2_innerShadow_398_1168"
                          />
                        </filter>
                      </defs>
                    </svg>

                    <p className="text-type-600 font-light text-body-4">
                      No programming skills necessary.
                    </p>
                  </li>
                  <li className="flex space-x-1.5 items-start">
                    <svg
                      className="pt-0.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_di_398_1171)">
                        <path
                          d="M8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10Z"
                          fill="#14AEC5"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_di_398_1171"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.0862745 0 0 0 0 0.694118 0 0 0 0 0.776471 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_398_1171"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_398_1171"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect2_innerShadow_398_1171"
                          />
                        </filter>
                      </defs>
                    </svg>

                    <p className="text-type-600 font-light text-body-4">
                      Obtain complete ownership of all produced tokens.
                    </p>
                  </li>
                  <li className="flex space-x-1.5 items-start">
                    <svg
                      className="pt-0.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_di_398_1174)">
                        <path
                          d="M8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10Z"
                          fill="#00D796"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_di_398_1174"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.847059 0 0 0 0 0.592157 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_398_1174"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_398_1174"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect2_innerShadow_398_1174"
                          />
                        </filter>
                      </defs>
                    </svg>

                    <p className="text-type-600 font-light text-body-4">
                      Personalized token name, symbol, and supply
                    </p>
                  </li>
                  <li className="flex space-x-1.5 items-start">
                    <svg
                      className="pt-0.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_di_398_1177)">
                        <path
                          d="M8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10Z"
                          fill="#00D796"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_di_398_1177"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.847059 0 0 0 0 0.592157 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_398_1177"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_398_1177"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect2_innerShadow_398_1177"
                          />
                        </filter>
                      </defs>
                    </svg>

                    <p className="text-type-600 font-light text-body-4">
                      automatically vetted and released source code for the
                      contract
                    </p>
                  </li>

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:mt-4">
                    <Button isLink href="/create" type="default" variant="main">
                      Let{"'"}s Go!
                    </Button>
                    <Button
                      isLink
                      href="/documentation"
                      type="default"
                      variant="transparent"
                    >
                      Documentation
                    </Button>
                  </div>
                  <div className="flex gap-2 items-center justify-between">
                    <div className="social-networks flex items-center gap-2 text-body-3 font-medium">
                      <span>Follow Us on:</span>
                      <a
                        href="https://twitter.com/oraclez_io"
                        rel="noreferrer"
                        target={"_blank"}
                        className="drop-shadow"
                      >
                        <svg
                          width="27"
                          height="24"
                          viewBox="0 0 27 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.35683 1.39457C2.87578 1.33682 3.38394 1.57163 3.6763 2.00424C5.73325 5.04808 8.21631 6.32283 10.9773 6.62433C11.1191 5.44322 11.4441 4.27718 12.049 3.25224C12.9362 1.74842 14.3722 0.645386 16.4175 0.245719C19.2435 -0.306546 21.3877 0.727073 22.6285 1.98569L25.1483 1.52826C25.6866 1.43057 26.2326 1.65415 26.5477 2.10128C26.8628 2.54842 26.8898 3.13781 26.6167 3.61184L24.1787 7.84504C24.3669 13.9737 22.6418 18.241 18.9959 21.1682C17.0618 22.7208 14.3014 23.5928 11.275 23.8506C8.22491 24.1105 4.78058 23.7589 1.36013 22.7407C0.760041 22.562 0.35058 22.0079 0.356074 21.3818C0.361556 20.7557 0.780655 20.2088 1.38378 20.0407C3.1091 19.5598 4.42255 19.1431 5.61169 18.4096C3.93261 17.5068 2.69808 16.3317 1.82697 14.9948C0.616234 13.1366 0.174489 11.0698 0.0943835 9.20734C0.014291 7.3451 0.292357 5.62214 0.582229 4.37909C0.747236 3.67148 0.939362 2.96071 1.20261 2.28215C1.39378 1.79309 1.8379 1.45232 2.35683 1.39457Z"
                            fill="#33CCFF"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCS1hl0cPxaMwtS7ZZpKkKkA"
                        rel="noreferrer"
                        target={"_blank"}
                        className="drop-shadow"
                      >
                        <svg
                          width="28"
                          height="22"
                          viewBox="0 0 28 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14 0C15.1976 0 16.4243 0.0308257 17.6143 0.0794295L19.0206 0.145452L20.3664 0.223532L21.6266 0.308658L22.7759 0.395821C25.3491 0.600902 27.417 2.5567 27.6686 5.10275L27.7243 5.68649L27.8293 6.93766C27.9275 8.23461 28 9.64883 28 11C28 12.3512 27.9275 13.7654 27.8293 15.0623L27.7243 16.3135C27.706 16.5133 27.6873 16.7081 27.6686 16.8972C27.417 19.4433 25.3491 21.3991 22.7759 21.6041L21.6266 21.6913L20.3664 21.7764L19.0206 21.8545L17.6143 21.9205C16.4243 21.9692 15.1976 22 14 22C12.8024 22 11.5757 21.9692 10.3857 21.9205L8.9794 21.8545L7.63355 21.7764L6.37336 21.6913L5.2241 21.6041C2.65091 21.3991 0.58296 19.4433 0.331352 16.8972L0.27569 16.3135L0.170692 15.0623C0.0725138 13.7654 0 12.3512 0 11C0 9.64883 0.0725138 8.23461 0.170692 6.93766L0.27569 5.68649C0.294037 5.4867 0.312664 5.29184 0.331352 5.10275C0.58296 2.5567 2.65091 0.600902 5.2241 0.395821L6.37336 0.308658L7.63354 0.223532L8.9794 0.145452L10.3857 0.0794295C11.5757 0.0308257 12.8024 0 14 0ZM11.2 7.6658V14.3342C11.2 14.9694 11.9 15.3662 12.46 15.0487L18.34 11.7144C18.9 11.397 18.9 10.603 18.34 10.2856L12.46 6.95133C11.9 6.63378 11.2 7.03072 11.2 7.6658Z"
                            fill="#FF0000"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/oraclez.io/"
                        rel="noreferrer"
                        target={"_blank"}
                        className="drop-shadow"
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.1483 0.451396C23.0829 0.547279 26.1949 3.8147 26.099 7.74936L25.8213 19.1483C25.7254 23.083 22.4579 26.1949 18.5233 26.0991L7.12434 25.8213C3.18968 25.7254 0.0777205 22.4579 0.173604 18.5233L0.451386 7.12435C0.54727 3.18969 3.81469 0.0777297 7.74935 0.173614L19.1483 0.451396ZM13.2752 7.43685C10.1275 7.36015 7.51355 9.84971 7.43684 12.9974C7.36014 16.1451 9.8497 18.7591 12.9974 18.8358C16.1451 18.9125 18.7591 16.4229 18.8358 13.2752C18.9125 10.1275 16.4229 7.51356 13.2752 7.43685ZM13.2058 10.2866C14.7797 10.3249 16.0244 11.6319 15.9861 13.2058C15.9477 14.7797 14.6408 16.0244 13.0669 15.9861C11.493 15.9477 10.2482 14.6408 10.2866 13.0669C10.3249 11.493 11.6319 10.2482 13.2058 10.2866ZM19.7392 5.4558C18.9523 5.43662 18.2988 6.05902 18.2796 6.84595C18.2604 7.63288 18.8828 8.28636 19.6698 8.30554C20.4567 8.32472 21.1102 7.70232 21.1294 6.91539C21.1485 6.12847 20.5262 5.47498 19.7392 5.4558Z"
                            fill="url(#paint0_linear_437_238)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_437_238"
                              x1="25.1547"
                              y1="26.2607"
                              x2="0.132053"
                              y2="-0.0120134"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FBE18A" />
                              <stop offset="0.21" stopColor="#FCBB45" />
                              <stop offset="0.38" stopColor="#F75274" />
                              <stop offset="0.52" stopColor="#D53692" />
                              <stop offset="0.74" stopColor="#8F39CE" />
                              <stop offset="1" stopColor="#5B4FE9" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </a>
                      {/* <a
                        href="https://facebook.com"
                        rel="noreferrer"
                        target={"_blank"}
                        className="drop-shadow"
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.3032 26.8385C21.7291 26.0314 26.7723 20.6265 26.9349 13.9557C27.114 6.60636 21.3013 0.503376 13.9521 0.324282C6.60275 0.145186 0.499773 5.95779 0.320677 13.3071C0.158114 19.978 4.93213 25.622 11.3111 26.7412L11.5344 17.5749L9.53837 17.5262C8.43597 17.4994 7.56408 16.5839 7.59094 15.4815C7.61781 14.3792 8.53325 13.5072 9.63565 13.5341L11.6317 13.5827L11.6966 10.9213C11.7593 8.34906 13.8953 6.31465 16.4676 6.37734L17.1329 6.39355C18.2353 6.42041 19.1072 7.33586 19.0803 8.43826C19.0535 9.54066 18.138 10.4125 17.0356 10.3857L16.3703 10.3695C16.0029 10.3605 15.6977 10.6511 15.6887 11.0186L15.6239 13.68L17.6199 13.7287C18.7223 13.7555 19.5942 14.671 19.5673 15.7734C19.5405 16.8757 18.625 17.7477 17.5226 17.7208L15.5266 17.6722L15.3032 26.8385Z"
                            fill="#337FFF"
                          />
                        </svg>
                      </a> */}
                    </div>
                    <a href="https://oraclez.io/contact">
                      <Button
                        type="default"
                        variant="transparent"
                        extendClasses="rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                          />
                        </svg>
                      </Button>
                    </a>
                  </div>
                </List>
              </div>
            </div>
          </div>
          <div className="landing__right-sec bg-[#f8f9fd] overflow-hidden lg:col-span-2 w-full h-full lg:min-h-screen relative">
            <div className="max-h-screen -translate-x-1/2 -translate-y-1/2 absolute top-[85%] left-1/2 lg:left-[85%] lg:top-1/2 duration-500 origin-center">
              <div
                ref={containerRef}
                className="circular-wrapper__core-ellipse font-cera font-medium bg-cover text-heading-1 flex-col space-y-6 relative z-10 rounded-full origin-center flex justify-center items-center"
              >
                <span className="text-primary md:mr-4">
                  {initialSlider.sliderTitle}
                </span>
                <span className="md:mr-4">Network</span>
                <span className="text-xs font-light text-slate-600 leading-tight text-center w-48 md:mr-4">
                  {initialSlider.sliderDescription}
                </span>
              </div>
              {initialSlider.sliderItems.map((item, index) => {
                const currentIndex = initialSlider.sliderItems.findIndex(
                  (item) => item.id === initialSlider.activeId
                );

                return (
                  <div
                    ref={(el) => {
                      if (el !== null) itemsRef.current[index] = el;
                    }}
                    className={`circular-wrapper__item absolute transition-all flex items-center justify-center duration-500 origin-center rounded-full left-1/2 top-1/2 ${
                      item.id === initialSlider.activeId
                        ? "circular-wrapper__item--active z-20 scale-150"
                        : "cursor-pointer"
                    }`}
                    style={{
                      opacity: `${
                        item.id === initialSlider.activeId
                          ? 1
                          : (Math.abs(
                              Math.abs(currentIndex - index) -
                                initialSlider.sliderItems.length / 1.75
                            ) *
                              2) /
                            initialSlider.sliderItems.length
                      }`,
                      top: `${
                        item.id === initialSlider.activeId
                          ? initialSlider.radiusLength *
                              Math.sin(
                                radianSectionDeg *
                                  (index - initialSlider.activeId) -
                                  1.5708
                              ) +
                            initialSlider.radiusLength * 0.875 +
                            "px"
                          : initialSlider.radiusLength *
                              Math.sin(
                                radianSectionDeg *
                                  (index - initialSlider.activeId) -
                                  1.5708
                              ) +
                            initialSlider.radiusLength *
                              (screenSize > 1024 ? 0.825 : 0.875) +
                            "px"
                      }`,
                      left: `${
                        initialSlider.radiusLength *
                          Math.cos(
                            radianSectionDeg *
                              (index - initialSlider.activeId) -
                              1.5708
                          ) +
                        initialSlider.radiusLength * 0.825 +
                        "px"
                      }`,
                    }}
                    key={index}
                    onClick={() => changeActiveItem(item.id)}
                  >
                    <img className="p-[25%]" src={item.img} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </Grid>
      )}
    </>
  );
};

export default Home;

export interface sliderInterface {
  sliderTitle?: string;
  sliderDescription?: string;
  soon?: boolean;
  radiusLength: number;
  activeId: number;
  sliderItems: itemInterface[];
}

export interface itemInterface {
  id: number;
  key: string;
  img: string;
  protocol: string;
  chainId: number;
  description?: string;
}

import React, { FC } from "react";

const MeterSpinner: FC<spinnerInterface> = ({ extendedClasses }) => {
  {
  }
  return (
    <div className={`relative h-full aspect-square ${extendedClasses}`}>
      <div className="body__wrapper grid place-items-center h-full p-[10%] rounded-full">
        {[...Array(20).keys()].map((item, index) => {
          return (
            <div
              key={index}
              className={`absolute w-full h-full after:absolute after:top-1/2 after:left-0 after:-translate-y-1/2 after:rotate-90 after:h-[6.5%] after:bg-type-400 after:rounded-full ${
                index >= 8
                  ? index % 5 === 0
                    ? "after:bg-opacity-80 after:w-[3.5%]"
                    : "after:bg-opacity-20 after:w-[2.5%]"
                  : index % 5 === 0
                  ? "after:w-[3.5%] after:bg-[#FFA080]"
                  : "after:w-[2.5%] after:bg-[#FFA080]"
              }`}
              style={{
                transform: `rotateZ(${index * 18}deg)`,
                opacity: `${index >= 0 && index < 8 && 1 - index * 0.1}`,
              }}
            ></div>
          );
        })}
        <div className="body--outer relative h-full w-full shadow-[inset_-1px_-1px_14px_rgba(41,32,32,0.05),inset_-2px_-2px_8px_#EDEDED,inset_2px_2px_2px_rgba(141,150,180,0.1),inset_4px_4px_16px_rgba(141,150,180,0.1)] rounded-full overflow-hidden">
          <div className="body--inner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-[85%] bg-white rounded-full shadow-[4px_4px_7px_rgba(0,0,0,0.07),-4px_-4px_13px_#FFFFFF,6px_6px_36px_rgba(0,0,0,0.06)]">
            <div
              className="inner__hand [--first-angle:25deg] [--last-angle:-335deg] [--position-x:-100%] absolute top-1/2 left-1/2 -translate-x-[var(--position-x)] -translate-y-1/2 origin-right w-1/4 h-[5%] bg-[linear-gradient(to_left,#FFD7CA,#FFB39A)] animate-center-spin rounded-lg 
            "
            ></div>
            <svg
              className="[--first-angle:0deg] [--last-angle:-360deg] [--position-x:-50%] absolute top-1/2 left-1/2 w-full h-full animate-center-spin "
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_15_1349" fill="white">
                <path d="M4.47463 51.5947C2.05701 51.7477 -0.0489783 49.9108 0.0182994 47.4892C0.239965 39.5108 2.46983 31.6879 6.53661 24.7424C11.3461 16.5284 18.5087 9.91028 27.1186 5.72504C35.7285 1.5398 45.3991 -0.0246383 54.9074 1.22957C62.9482 2.2902 70.5676 5.32628 77.0834 10.0306C79.0521 11.452 79.2199 14.2523 77.6066 16.0671V16.0671C76.0166 17.8557 73.295 18.0078 71.33 16.6418C66.1237 13.0224 60.0959 10.6813 53.7474 9.84393C45.9605 8.8168 38.0408 10.098 30.9898 13.5255C23.9387 16.953 18.0729 22.3728 14.1342 29.0997C10.9406 34.554 9.13021 40.6689 8.82675 46.9233C8.70913 49.3474 6.89677 51.4414 4.47463 51.5947V51.5947Z" />
              </mask>
              <path
                d="M4.47463 51.5947C2.05701 51.7477 -0.0489783 49.9108 0.0182994 47.4892C0.239965 39.5108 2.46983 31.6879 6.53661 24.7424C11.3461 16.5284 18.5087 9.91028 27.1186 5.72504C35.7285 1.5398 45.3991 -0.0246383 54.9074 1.22957C62.9482 2.2902 70.5676 5.32628 77.0834 10.0306C79.0521 11.452 79.2199 14.2523 77.6066 16.0671V16.0671C76.0166 17.8557 73.295 18.0078 71.33 16.6418C66.1237 13.0224 60.0959 10.6813 53.7474 9.84393C45.9605 8.8168 38.0408 10.098 30.9898 13.5255C23.9387 16.953 18.0729 22.3728 14.1342 29.0997C10.9406 34.554 9.13021 40.6689 8.82675 46.9233C8.70913 49.3474 6.89677 51.4414 4.47463 51.5947V51.5947Z"
                stroke="url(#paint0_radial_15_1349)"
                strokeWidth="100%"
                strokeLinecap="round"
                mask="url(#path-1-inside-1_15_1349)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_15_1349"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(86.6533 27.3688) rotate(140.013) scale(49.7964 49.7092)"
                >
                  <stop stopColor="rgba(255, 220, 209, 0.1)" />
                  <stop offset="1" stopColor="#FFA080" />
                </radialGradient>
              </defs>
            </svg>
            <svg
              className="[--first-angle:30deg] [--last-angle:-330deg] [--position-x:-50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full h-full rotate-[30deg] z-[-1] animate-center-spin "
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_15_1349" fill="white">
                <path d="M4.47463 51.5947C2.05701 51.7477 -0.0489783 49.9108 0.0182994 47.4892C0.239965 39.5108 2.46983 31.6879 6.53661 24.7424C11.3461 16.5284 18.5087 9.91028 27.1186 5.72504C35.7285 1.5398 45.3991 -0.0246383 54.9074 1.22957C62.9482 2.2902 70.5676 5.32628 77.0834 10.0306C79.0521 11.452 79.2199 14.2523 77.6066 16.0671V16.0671C76.0166 17.8557 73.295 18.0078 71.33 16.6418C66.1237 13.0224 60.0959 10.6813 53.7474 9.84393C45.9605 8.8168 38.0408 10.098 30.9898 13.5255C23.9387 16.953 18.0729 22.3728 14.1342 29.0997C10.9406 34.554 9.13021 40.6689 8.82675 46.9233C8.70913 49.3474 6.89677 51.4414 4.47463 51.5947V51.5947Z" />
              </mask>
              <path
                d="M4.47463 51.5947C2.05701 51.7477 -0.0489783 49.9108 0.0182994 47.4892C0.239965 39.5108 2.46983 31.6879 6.53661 24.7424C11.3461 16.5284 18.5087 9.91028 27.1186 5.72504C35.7285 1.5398 45.3991 -0.0246383 54.9074 1.22957C62.9482 2.2902 70.5676 5.32628 77.0834 10.0306C79.0521 11.452 79.2199 14.2523 77.6066 16.0671V16.0671C76.0166 17.8557 73.295 18.0078 71.33 16.6418C66.1237 13.0224 60.0959 10.6813 53.7474 9.84393C45.9605 8.8168 38.0408 10.098 30.9898 13.5255C23.9387 16.953 18.0729 22.3728 14.1342 29.0997C10.9406 34.554 9.13021 40.6689 8.82675 46.9233C8.70913 49.3474 6.89677 51.4414 4.47463 51.5947V51.5947Z"
                stroke="url(#paint1_radial_15_1349)"
                strokeWidth="100%"
                strokeLinecap="round"
                mask="url(#path-1-inside-1_15_1349)"
              />
              <defs>
                <radialGradient
                  id="paint1_radial_15_1349"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(86.6533 27.3688) rotate(140.013) scale(49.7964 49.7092)"
                >
                  <stop stopColor="rgba(255, 220, 209, 0.01)" />
                  <stop offset="1" stopColor="rgba(255, 220, 209, 0.8)" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterSpinner;

export interface spinnerInterface {
  extendedClasses?: string;
}

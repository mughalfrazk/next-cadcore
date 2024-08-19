import { Box } from "@mantine/core";
import { IconProps } from "./types";

const OrangeDocuemntIcon = ({ h, opacity, ...otherProps }: IconProps) => {
  return (
    <Box h={h || 48} w={h ? h * (48 / 48) : 48} {...otherProps}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0,0,256,256"
        opacity={opacity || 1}
      >
        <defs>
          <linearGradient
            x1="28.529"
            y1="15.471"
            x2="33.6"
            y2="10.4"
            gradientUnits="userSpaceOnUse"
            id="color-1"
          >
            <stop offset="0" stopColor="#b64700"></stop>
            <stop offset="1" stopColor="#983a00"></stop>
          </linearGradient>
        </defs>
        <g
          fill="none"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
          style={{ mixBlendMode: "normal" }}
        >
          <g transform="scale(5.33333,5.33333)">
            <path
              d="M39,16v25c0,1.105 -0.895,2 -2,2h-26c-1.105,0 -2,-0.895 -2,-2v-34c0,-1.105 0.895,-2 2,-2h17l3,8z"
              fill="#ff9100"
            ></path>
            <path
              d="M28,5v9c0,1.105 0.895,2 2,2h9z"
              fill="url(#color-1)"
            ></path>
            <path
              d="M32.5,24h-17c-0.276,0 -0.5,-0.224 -0.5,-0.5v-1c0,-0.276 0.224,-0.5 0.5,-0.5h17c0.276,0 0.5,0.224 0.5,0.5v1c0,0.276 -0.224,0.5 -0.5,0.5z"
              fill="#a13e00"
            ></path>
            <path
              d="M30.5,28h-15c-0.276,0 -0.5,-0.224 -0.5,-0.5v-1c0,-0.276 0.224,-0.5 0.5,-0.5h15c0.276,0 0.5,0.224 0.5,0.5v1c0,0.276 -0.224,0.5 -0.5,0.5z"
              fill="#a13e00"
            ></path>
            <path
              d="M32.5,32h-17c-0.276,0 -0.5,-0.224 -0.5,-0.5v-1c0,-0.276 0.224,-0.5 0.5,-0.5h17c0.276,0 0.5,0.224 0.5,0.5v1c0,0.276 -0.224,0.5 -0.5,0.5z"
              fill="#a13e00"
            ></path>
            <path
              d="M30.5,36h-15c-0.276,0 -0.5,-0.224 -0.5,-0.5v-1c0,-0.276 0.224,-0.5 0.5,-0.5h15c0.276,0 0.5,0.224 0.5,0.5v1c0,0.276 -0.224,0.5 -0.5,0.5z"
              fill="#a13e00"
            ></path>
          </g>
        </g>
      </svg>
    </Box>
  );
};

export default OrangeDocuemntIcon;

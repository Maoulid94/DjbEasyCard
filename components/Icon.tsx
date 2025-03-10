import React from "react";
import Svg, { Path } from "react-native-svg";

const CustomIcon = ({ size = 24, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fill={color}
      d="M12 8V2H6a2 2 0 0 0-2 2v9.5h6.5a2 2 0 1 1 0 4H4V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2Zm-4.5 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Zm0 7.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5ZM2.75 14.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z"
    />
  </Svg>
);

export default CustomIcon;

import { AutocompleteRenderOptionState, useTheme } from "@mui/material";
import React from "react";
import { GeopifyResponse } from "../../../utils/types";
type suggestionPropType = {
  props: React.HTMLAttributes<HTMLLIElement>;
  option: GeopifyResponse;
  state?: AutocompleteRenderOptionState;
};
export default function suggestionRenderItem({ props, option }: any) {
  return (
    <li
      {...props}
      key={option.properties.lat}
      style={{
        flex: "1 1 auto",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: "20px" }}>{option.properties.city}</div>
      <div
        style={{
          fontSize: "13px",
          // color: theme.palette.text.secondary,
          color: "GrayText",
          marginLeft: 5,
        }}
      >
        {option.properties.address_line2}
        {", " + option.properties.address_line1}
      </div>
    </li>
  );
}

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { setParam } from "../../../utils/CustomMethods";

export default function Paging({ setLoading, setPage, page, hasMore }: any) {
  // useEffect(() => {
  // }, [])
  const arr =
    page > 1
      ? hasMore
        ? [page - 1, page, page + 1]
        : [page - 1, page]
      : [1, 2, 3];
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {arr.map((item) => (
        <Button
          variant={item == page ? "contained" : "outlined"}
          key={item}
          sx={{ mx: 1 }}
          onClick={() => {
            if (hasMore || item < page) {
              setPage(item);
              const { search, pathname } = location;
              const url = setParam(search, pathname, "page", item, page);
              navigate(url);
              setLoading(true);
            }
          }}
        >
          <Typography>{item}</Typography>
        </Button>
      ))}
    </Box>
  );
}

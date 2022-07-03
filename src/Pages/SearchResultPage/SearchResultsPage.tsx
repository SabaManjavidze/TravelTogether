import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ResultCard } from "../../Components/ResultCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { setParam } from "../../utils/CustomMethods";
import { SearchApartment } from "../../utils/Services";
import { SearchResult } from "../../utils/types";
import Paging from "./components/Paging";

export default function SearchResultsPage() {
  const navigate = useNavigate();
  // const params = new URLSearchParams(window.location.href);
  const [params, setSearchParams] = useSearchParams(window.location.href);
  const windowLocation = useLocation();
  const location = params.get("location") || "";
  const check_in = params.get("checkIn") || "";
  const check_out = params.get("checkOut") || "";
  const order_by = params.get("orderBy");
  const paging = params.get("page") || "1";
  const theme = useTheme();
  const [currSortingIdx, setCurrSortingIdx] = useState(
    parseInt(order_by || "2")
  );
  const sort_arr = [
    { label: "Num. Of Beds", name: "NumOfBeds" },
    { label: "Num. Of Beds desc", name: "NumOfBedsDesc" },
    { label: "Avaliability", name: "avaliability" },
    { label: "Distance", name: "DistanceFromCenter" },
    { label: "Distance desc", name: "DistanceFromCenterDesc" },
  ];
  const [page, setPage] = useState<number>(parseInt(paging));
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchResults = async () => {
    const results = await SearchApartment(
      location,
      check_in,
      check_out,
      page || 1,
      sort_arr[currSortingIdx].name as any
    );
    // console.log({ results });
    if (results != null) {
      setSearchResults(results);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currSortingIdx >= 0) {
      fetchSearchResults();
    }
  }, [params]);
  // const setParam =
  return (
    <Container>
      <Box mt={10}>
        <SearchBar />
        <Typography
          component={"h1"}
          variant={"h2"}
          mt={10}
          sx={{
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
            },
          }}
        >
          Results for {location?.toUpperCase()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            mt: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              whiteSpace: "nowrap",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                // width: "70%",
              },
            }}
          >
            {sort_arr.map((item, i) => (
              <Button
                key={item.name.replaceAll(" ", "")}
                onClick={() => {
                  setCurrSortingIdx(i);
                  const orderByThis = `orderBy=${i}`;
                  // const url = windowLocation.search.includes("orderBy")
                  //   ? windowLocation.search.replace(
                  //       `orderBy=${currSortingIdx}`,
                  //       orderByThis
                  //     )
                  //   : `${windowLocation.search}&${orderByThis}`;
                  const { search, pathname } = windowLocation;
                  const url = setParam(
                    search,
                    pathname,
                    "orderBy",
                    i,
                    currSortingIdx
                  );
                  setLoading(true);
                  setSearchResults([]);
                  // navigate(`/search-results${url}`);
                  navigate(url);
                }}
                variant={currSortingIdx === i ? "contained" : "outlined"}
                sx={{
                  width: "19vh",
                  [theme.breakpoints.down("md")]: { width: "50vh" },
                }}
              >
                <Typography
                  color={currSortingIdx === i ? "white" : "primary.main"}
                  variant={"h5"}
                  mx={5}
                  fontSize={18}
                  display={"inline-block"}
                  textTransform="none"
                >
                  {item.label}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>
        <Grid
          container
          rowGap={5}
          columnGap={theme.breakpoints.down("md") ? 5 : 5}
          paddingBottom={10}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columnCount: 4,
            ml: 0,
            mr: 0,
            mt: 10,
          }}
        >
          {searchResults == null ? null : loading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            searchResults.map((item) => (
              <Grid item key={item.id} width="450px">
                <ResultCard item={item} />
              </Grid>
            ))
          )}
        </Grid>
        <Box pb={5}>
          <Paging
            page={page}
            setPage={setPage}
            setLoading={setLoading}
            hasMore={searchResults.length > 0}
          />
        </Box>
      </Box>
    </Container>
  );
}

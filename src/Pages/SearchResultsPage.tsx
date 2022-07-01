import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ResultCard } from "../Components/ResultCard";
import SearchBar from "../Components/SearchBar";
import { SearchApartment } from "../utils/Services";
import { SearchResult } from "../utils/types";

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const location = params.get("location") || "";
  const check_in = params.get("check_in") || "";
  const check_out = params.get("check_out") || "";
  const theme = useTheme();
  const [currSortingIdx, setCurrSortingIdx] = useState(0);
  const sort_arr = ["num. of beds", "available", "distance"];
  const [page, setPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchResults = async () => {
    const results = await SearchApartment(location, check_in, check_out, page);
    console.log({ results });
    setSearchResults(results as SearchResult[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [window.location.search]);

  return (
    <Container>
      <Box mt={10}>
        <SearchBar navigate={navigate} />
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
            overflowX: "auto",
            whiteSpace: "nowrap",
            mt: 5,
          }}
        >
          {sort_arr.map((item, i) => (
            <Button
              key={item}
              onClick={() => {
                setCurrSortingIdx(i);
              }}
              variant={currSortingIdx === i ? "contained" : "outlined"}
            >
              <Typography
                key={i}
                // component={"h5"}
                variant={"h5"}
                mx={5}
                fontSize={20}
                display={"inline-block"}
              >
                {item}
              </Typography>
            </Button>
          ))}
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
          {loading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            searchResults.map((item) => (
              <Grid item key={item.id}>
                <ResultCard item={item} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
}

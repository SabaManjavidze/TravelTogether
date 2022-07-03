import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { BookedDate, User } from "../../../utils/types";

interface Column {
  id: "from" | "to" | "guest";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "from", label: "From", minWidth: 100, align: "center" },
  {
    id: "to",
    label: "To",
    minWidth: 100,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "guest",
    label: "Guest",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];
type BookedDatesProps = {
  bookedDates: BookedDate[];
  loading: boolean;
};
export default function BookedDatesView({
  bookedDates,
  loading,
}: BookedDatesProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  // useEffect(() => {
  //   if (!loading) console.log(bookedDates.map((item) => item.firstName));
  // }, [loading]);

  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography
                    color="text.main"
                    variant={"body1"}
                    fontSize={"20px"}
                  >
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && bookedDates.length > 0 ? (
              bookedDates.map((row) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={row.firstName}>
                    {columns.map((column, index) => {
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.label != "Guest" ? (
                            <Typography variant="h5">
                              {new Date(
                                (row as any)[column.label.toLowerCase()]
                              ).toLocaleDateString()}
                            </Typography>
                          ) : (
                            <Box display="inline">
                              <Typography>{row.firstName}</Typography>
                              <img
                                src={row.image}
                                alt=""
                                width="80px"
                                height="80px"
                                style={{ borderRadius: "50%" }}
                              />
                            </Box>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <Typography>There are no booked dates</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={bookedDates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

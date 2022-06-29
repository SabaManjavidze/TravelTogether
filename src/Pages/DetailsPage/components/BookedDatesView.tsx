import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography, useTheme } from "@mui/material";

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
type Guest = {
  firstName: string;
  picture?: string;
};
interface Data {
  from: string;
  to: string;
  guest: Guest;
}

export default function BookedDatesView() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  function createData(from: string, to: string, guest: Guest): Data {
    return {
      from,
      to,
      guest: {
        ...guest,
        picture: `https://avatars.dicebear.com/api/human/${guest.firstName}.svg?background=purple`,
      },
    };
  }

  const rows = [
    createData("06-29-2022", "07-2-2022", {
      firstName: "Fernandez",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Heisenburg",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Walter",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Micheal",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Floyd",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Derrek",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Paul",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Saba",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Luka",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Lebron",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Hubert",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Joey",
    }),
    createData("06-29-2022", "07-2-2022", {
      firstName: "Jim",
    }),
  ];
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={row.from}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value == "string" ? (
                            <Typography variant="h4">{value}</Typography>
                          ) : (
                            <Typography>
                              <Typography>{value.firstName}</Typography>
                              <img
                                src={value.picture}
                                alt=""
                                width="80px"
                                height="80px"
                                style={{ borderRadius: "50%" }}
                              />
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

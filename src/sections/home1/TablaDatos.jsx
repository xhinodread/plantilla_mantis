import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NumberFormatBase, NumericFormat } from 'react-number-format';

export default function TablaDatos({datosRender}) {
    // console.log("datosRender")
    // console.log(datosRender)

  const order = 'asc';
  const orderBy = 'tracking_no';

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

 const format = (numStr) => {
    if (numStr === '') return '';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 4,
    }).format(numStr);
  };

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
            <OrderTableHead order={order} orderBy={orderBy} />
            <TableBody>
                {
                    datosRender != null ? datosRender.map((row, index)=>{
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            tabIndex={-1}
                            key={index}
                        >
                            <TableCell component="th" id={labelId} scope="row">
                                {/* {Number((row.desde).replace(",", ".") )}<br/>
                                <NumericFormat value={Number((row.desde).replace(",", ".") )} thousandSeparator allowedDecimalSeparators={[',']} displayType="text" prefix="$" /><br/> */}
                                <NumberFormatBase value={Number((row.desde).replace(",", ".") )} displayType="text" prefix="$" format={format} />
                            </TableCell>
                            <TableCell>
                                {/* <NumericFormat value={row.hasta} displayType="text" thousandSeparator prefix="$" /> */}
                                <NumberFormatBase value={Number((row.hasta).replace(",", ".") )} displayType="text"  format={format} />
                            </TableCell>
                            <TableCell align="right">{row.factor}</TableCell>
                            <TableCell>
                                {/* {row.rebaja}<br/> */}
                                <NumberFormatBase value={Number((row.rebaja).replace(",", ".") )} displayType="text"  format={format} />
                            </TableCell>
                            <TableCell align="right">
                                {row.fechaVigencia}
                            </TableCell>
                        </TableRow>
                    );
                    })
                    : <TableRow><TableCell align="right">...</TableCell></TableRow>
                }

                {/* {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            tabIndex={-1}
                            key={row.tracking_no}
                        >
                            <TableCell component="th" id={labelId} scope="row">
                                <Link color="secondary">{row.tracking_no}</Link>
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell>
                                <OrderStatus status={row.carbs} />
                            </TableCell>
                            <TableCell align="right">
                                <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                            </TableCell>
                        </TableRow>
                    );
                })} */}

            </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


const headCells = [
  {
    id: 'desde',
    align: 'left',
    disablePadding: false,
    label: 'Desde'
  },
  {
    id: 'hasta',
    align: 'left',
    disablePadding: true,
    label: 'Hasta'
  },
  {
    id: 'porcentaje',
    align: 'right',
    disablePadding: false,
    label: 'Porcentaje'
  },
  {
    id: 'rebaja',
    align: 'left',
    disablePadding: false,
    label: 'Rebaja'
  },
  {
    id: 'periodo',
    align: 'right',
    disablePadding: false,
    label: 'Periodo'
  }
];

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

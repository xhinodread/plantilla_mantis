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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import { NumberFormatBase, NumericFormat } from 'react-number-format';

import MainCard from 'components/MainCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Popup from 'reactjs-popup';
import styles from 'themes/home1/PopUpImpuestoUnico.module.css' // './PopupCarrito.module.css'; 
import { useEffect, useState, useRef } from 'react';


export default function TablaDatos({ datosRender, clickUpdate }) {
    // console.log("datosRender")
    // console.log(datosRender)

    const [datosRow, setDatosRow] = useState({});

    const order = 'asc';
    const orderBy = 'fechaEmision';

    const format = (numStr) => {
        if (numStr === '') return '';
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            maximumFractionDigits: 4,
        }).format(numStr);
    };

    function OrderTableHead({ order, orderBy }) {
        const headCells = [
            {
                id: 'monto_neto',
                align: 'left',
                disablePadding: false,
                label: 'Neto'
            },
            {
                id: 'folio',
                align: 'center',
                disablePadding: true,
                label: 'Folio'
            },
            {
                id: 'fechaEmision',
                align: 'right',
                disablePadding: false,
                label: 'Emision'
            },
            {
                id: 'idEmpresa',
                align: 'center',
                disablePadding: false,
                label: 'idEmpresa'
            }
            
        ];

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

    const handleClick = ()=>{
        alert("Click")
    }

    return (
        <>
            <h3>Dtes TablaDatos</h3>
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
                                datosRender != null ? datosRender.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${row.id}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            tabIndex={-1}
                                            key={index}
                                            onClick={() => handleClick(row)}
                                        >
                                            <TableCell component="th" id={labelId} scope="row">
                                                <NumberFormatBase value={Number((row.montoNeto))} displayType="text" prefix="$" format={format} />
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.folio}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.fechaEmision}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.idEmpresa}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                                    : <TableRow><TableCell align="right">...</TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    Object.keys(datosRow).length > 0 ?
                        // <PopUpImpuestoUnico openStatus={openStatus} datos={datosRow} clickUpdate={clickUpdate} clickCloseModal={closeModal} />
                        <>click tabla</>
                        : <></>
                }
            </Box>
        </>
    )
};


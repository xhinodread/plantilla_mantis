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


export default function TablaDatos({datosRender, clickUpdate}) {
    // console.log("datosRender")
    // console.log(datosRender)

  const [datosRow, setDatosRow] = useState({});
  const [openStatus, setOpenStatus] = useState(false);

  const closeModal = () => {
    setOpenStatus(false);
    setDatosRow({})
  }

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

function handleClick(valor){
  // console.log("handleClick valor");
  // console.log(valor);
  setOpenStatus(true)
  setDatosRow(valor)
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
                        // const labelId = `enhanced-table-checkbox-${index}`;
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
            </TableBody>
        </Table>
      </TableContainer>
      {
        Object.keys(datosRow).length > 0 ?
        <PopUpImpuestoUnico openStatus={openStatus} datos={datosRow} clickUpdate={clickUpdate} clickCloseModal={closeModal} />
        : <></>
      }
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

const PopUpImpuestoUnico = ({openStatus, datos, clickUpdate, clickCloseModal}) =>{
  // const [open, setOpen] = useState(openStatus);
  const [datosLocal, setDatosLocal] = useState(null); //useState({});
  const factorFieldRef = useRef();
  // const closeModal = () => setOpen(false);

  // console.log("openStatus popUp")
  // console.log(openStatus)
  // console.log(open)

  const updateDatosLocal = ()=>{
    //console.log("updateDatosLocal")
    let nuevoDatosLocal = {
      id: datos.id,
      desde: desde.value,
      hasta: hasta.value,
      factor: factor.value,
      rebaja: rebaja.value,
      monto:"", 
      fechaVigencia:"",
      codigoParametro:""
    }
    setDatosLocal(nuevoDatosLocal);
  }

  const postRemoto = async (datosLocalPost)=>{
    const apiUrl = import.meta.env.VITE_REMOTE_API1;
    let rutaApi = `${apiUrl}/ParametrosRemu/updateParametroImpuesto`

    console.log("post datosLocal")
    console.log(JSON.stringify(datosLocalPost))
    //console.log(JSON.stringify(datosString))

    const response = await fetch(rutaApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(datosLocalPost)
    });
    console.log("response")
    console.log(response)

    let jsonData
    if (response.ok == false) {
      jsonData = await response.json();
      console.log("ERROOR ..... json Post Data IU");
      console.log(jsonData);
      console.log(jsonData.title);
      console.log(JSON.stringify(jsonData.errors));
      // console.log(JSON.stringify(jsonData));
      // return false;
    } else {
      jsonData = await response.json();
      console.log("json respons Post Data IU");
      console.log(jsonData);
      clickUpdate()
      // return true;
    }

    return
  }

  const updateDatos = () => {
    console.log("updateDatos")
    //updateDatosLocal();
    //console.log(`dato  ${JSON.stringify(datos)}`)
    //console.log(JSON.stringify(datosLocal))
    // console.log(factor.value)
    // console.log(factorFieldRef.current.value)

    if (datosLocal != null) {
      console.log("********** UPDATE API ***********")
      alert("********** UPDATE API ***********")
      postRemoto(datosLocal);
    }
  }

  // useEffect(() => {
  //   console.log("useEffect")
  //   console.log(datos)
  //   // console.log( Object.keys(datos).length)

  //  // setDatosLocal(datos)
  //     return;
  // }, []);

  return <Popup open={openStatus} onClose={()=>clickCloseModal()}
    position="center top"
    //   {...{  contentStyle, overlayStyle, arrowStyle }}
    modal
  // onOpen={cargarDatosLocales}
  >
    {close => (
      <>
        <div className={styles.popupContent} >
          <div><h3>Impuesto Unico {datos.id}  Periodo {datos.fechaVigencia} </h3></div>
          {/* <div>
            <div>{datos.desde}</div>
            <div>{datos.hasta}</div>
          </div> */}
          {/* <div>
            <div>{datos.factor}</div>
            <div>{datos.rebaja}</div>
          </div> */}
          
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider  >
              {/* <ListItemText primary="Desde" secondary={datos.desde} secondaryTypographyProps={{ fontSize: '1.5rem' }} /> */}
                <div style={{"margin":"20px"}} >
                  <ListItemText primary="Desde" primaryTypographyProps={{ fontSize: '1.5rem' }} />
                    <TextField id="desde" onChange={updateDatosLocal} variant="outlined" size="small" defaultValue={datos.desde} inputProps={{ style: { textAlign: "right", width: "120px" } }} />
                  {/* <Typography variant="h5">
                  </Typography> */}
                </div>
                <div style={{"margin":"20px"}} >
                  {/* <ListItemText primary="Hasta" secondary={datos.hasta} secondaryTypographyProps={{ fontSize: '1.5rem' }} /> */}
                  <ListItemText primary="Hasta" primaryTypographyProps={{ fontSize: '1.5rem' }} />
                    <TextField id="hasta" onChange={updateDatosLocal} variant="outlined" size="small" defaultValue={datos.hasta} inputProps={{ style: { textAlign: "right", width: "120px" } }} />
                  {/* <Typography variant="h5">
                  </Typography> */}
                </div>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Factor" />
              {/* <Typography variant="h5">{datos.factor}%</Typography> */}
              <TextField id="factor" inputRef={factorFieldRef} onChange={updateDatosLocal} variant="outlined" size="small" defaultValue={datos.factor}  inputProps={{ style: { textAlign: "right", width:"50px" } }} />%
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Rebaja" />
              {/* <Typography variant="h5">{datos.rebaja}</Typography> */}
              <TextField id="rebaja" onChange={updateDatosLocal} variant="outlined" size="small" defaultValue={datos.rebaja}  inputProps={{ style: { textAlign: "right", width:"90px" } }} />%
            </ListItemButton>
          </List>
          {/* <ReportAreaChart /> */}
          <div className={styles.containerButton}>
            <Button variant="contained" onClick={()=>updateDatos()} >Actualizar</Button>
          </div>
        </MainCard>
        </div>
      </>
    )}
  </Popup>
}







/******************************************** */

                // {
                //  {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                //       const labelId = `enhanced-table-checkbox-${index}`;

                //       return (
                //           <TableRow
                //               hover
                //               role="checkbox"
                //               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                //               tabIndex={-1}
                //               key={row.tracking_no}
                //           >
                //               <TableCell component="th" id={labelId} scope="row">
                //                   <Link color="secondary">{row.tracking_no}</Link>
                //               </TableCell>
                //               <TableCell>{row.name}</TableCell>
                //               <TableCell align="right">{row.fat}</TableCell>
                //               <TableCell>
                //                   <OrderStatus status={row.carbs} />
                //               </TableCell>
                //               <TableCell align="right">
                //                   <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                //               </TableCell>
                //           </TableRow>
                //       );
                //   })} 
                // }
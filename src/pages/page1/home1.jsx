import { useState, useEffect } from 'react'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';



// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';
import TablaDatos from 'sections/home1/TablaDatos';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Home1() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dataIU, setDataIU] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //console.log("llamada api " + crearDatePeriodo() )
        fetchDataIU(crearDatePeriodo()); // Obtener datos al montar el componente    
        return;
    // }, []);
    }, [selectedDate]);


    const renderMonthContent = (month, shortMonth, longMonth, day) => {
        const fullYear = new Date(day).getFullYear();
        const tooltipText = `Sel ${longMonth} ${fullYear}`;
        // const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;
        //console.log(tooltipText)
        return <span title={tooltipText}>{shortMonth}</span>;
    };

    const crearDatePeriodo = ()=>{
        let mes = (selectedDate.getMonth() <= 8 ? '0'+(selectedDate.getMonth() +1) : selectedDate.getMonth() +1)
        return `${mes}/${selectedDate.getFullYear()}`;
    }

    const fetchDataIU = async (periodo = null) => {
        try {
            setLoading(true);
            setDataIU(null);
            const var_periodo = periodo == null ? '' : '?periodo=' + periodo;
            const apiUrl = import.meta.env.VITE_REMOTE_API1; // || 'https://localhost:7229' o una direccion IP ;

            const token = "....token....."

            let response;
            if (apiUrl) {
              const rutaApi = apiUrl + '/ParametrosRemu/GetByPeriodo' + var_periodo;
              console.log("rutaApi")
              // console.log(rutaApi)
               response = await fetch(rutaApi, 
                 {
                   method: 'GET',
                   headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json' // Example: set content type for JSON data
                   }
                 }
              ); // Reemplazar con tu endpoint
            } else {
              //  response = await fetch('https://localhost:7229/ParametrosRemu/GetByPeriodo' + var_periodo); // Reemplazar con tu endpoint
            }

            const jsonData = await response.json();

             console.log("json Data IU");
             console.log(jsonData);

             if(jsonData.length > 0){

               setDataIU(jsonData);
             }
        } catch (error) {
            // console.error('Error obteniendo data desde el servidor remoto:', error.message);
            mostrarError(error);
            setDataIU([]);
        }

        setTimeout(() => {
          setLoading(false);
        }, 0);

    };

    const updateFetch = ()=>{
      console.log("update fetch")
      alert("********** UPDATE fetch ***********")
      //console.log(crearDatePeriodo())
      fetchDataIU(crearDatePeriodo());
    }

    function mostrarError(error){
      const textoError = "Error obteniendo data desde el servidor remoto: ";
      if (error instanceof TypeError) {
        console.error(textoError, error.message);
        // You can add specific handling for TypeError here
      } else {
        console.error(textoError, error);
      }
    }


    return(
      <>
        <h1>Hola pagina home 1</h1>
        <div>
          <label htmlFor="mes_anio">Choose a Periodo: </label>
          {
            <DatePicker
              id="mes_anio"
              selected={selectedDate}
              // selected={new Date()}
              onChange={(date) => setSelectedDate(date)}
              renderMonthContent={renderMonthContent}
              showMonthYearPicker
              dateFormat="MM/yyyy"
            />
          }
          {/* <p>sele {selectedDate.getMonth() +1}/{selectedDate.getFullYear()}</p> */}
          <p>periodo seleccionado {crearDatePeriodo()}</p>
          <hr></hr>
          {/* <ListaImpuestoUnico dataIU={dataIU} /> */}
        </div>
        <div>
          { loading ? <CircularProgress /> : <></>}
          {
          dataIU != null ?
            <TablaDatos datosRender={dataIU} clickUpdate={updateFetch} />
            :  loading ? <></> : <>...</>
          }
        </div>
      </>
    )
}

const ListaImpuestoUnico =({dataIU})=>{

    console.log("dataIU")

    if(dataIU != null){
    console.log(dataIU.length)
    if(dataIU.length == 0){
      return(
        <>
          Sin datos...
        </>
      )
    }
}

    return (
        <>
            { dataIU == null ? <p>Cargando data del api...</p> :
                <>
                    <ul>
                        {dataIU.map((item, key) => {
                            return <li key={key} >{item.desde} - {item.hasta}, {item.factor} {item.rebaja} :: Periodo {item.fechaVigencia}</li>
                        })}
                    </ul>
                </>
            }
        </>
    )
}


// export default function _Home1() {
//   return (
//     <Grid container rowSpacing={4.5} columnSpacing={2.75}>
//       {/* row 1 */}
//       <Grid sx={{ mb: -2.25 }} size={12}>
//         <Typography variant="h5">Dashboard...</Typography>
//       </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
//       </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
//       </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
//       </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce title="Total Sales" count="35,078" percentage={27.4} isLoss color="warning" extra="20,395" />
//       </Grid>
//       <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
//       {/* row 2 */}
//       <Grid size={{ xs: 12, md: 7, lg: 8 }}>
//         <UniqueVisitorCard />
//       </Grid>
//       <Grid size={{ xs: 12, md: 5, lg: 4 }}>
//         <Grid container alignItems="center" justifyContent="space-between">
//           <Grid>
//             <Typography variant="h5">Income Overview</Typography>
//           </Grid>
//           <Grid />
//         </Grid>
//         <MainCard sx={{ mt: 2 }} content={false}>
//           <Box sx={{ p: 3, pb: 0 }}>
//             <Stack sx={{ gap: 2 }}>
//               <Typography variant="h6" color="text.secondary">
//                 This Week Statistics
//               </Typography>
//               <Typography variant="h3">$7,650</Typography>
//             </Stack>
//           </Box>
//           <MonthlyBarChart />
//         </MainCard>
//       </Grid>
//       {/* row 3 */}
//       <Grid size={{ xs: 12, md: 7, lg: 8 }}>
//         <Grid container alignItems="center" justifyContent="space-between">
//           <Grid>
//             <Typography variant="h5">Recent Orders</Typography>
//           </Grid>
//           <Grid />
//         </Grid>
//         <MainCard sx={{ mt: 2 }} content={false}>
//           <OrdersTable />
//         </MainCard>
//       </Grid>
//       <Grid size={{ xs: 12, md: 5, lg: 4 }}>
//         <Grid container alignItems="center" justifyContent="space-between">
//           <Grid>
//             <Typography variant="h5">Analytics Report</Typography>
//           </Grid>
//           <Grid />
//         </Grid>
//         <MainCard sx={{ mt: 2 }} content={false}>
//           <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
//             <ListItemButton divider>
//               <ListItemText primary="Company Finance Growth" />
//               <Typography variant="h5">+45.14%</Typography>
//             </ListItemButton>
//             <ListItemButton divider>
//               <ListItemText primary="Company Expenses Ratio" />
//               <Typography variant="h5">0.58%</Typography>
//             </ListItemButton>
//             <ListItemButton>
//               <ListItemText primary="Business Risk Cases" />
//               <Typography variant="h5">Low</Typography>
//             </ListItemButton>
//           </List>
//           <ReportAreaChart />
//         </MainCard>
//       </Grid>
//       {/* row 4 */}
//       <Grid size={{ xs: 12, md: 7, lg: 8 }}>
//         <SaleReportCard />
//       </Grid>
//       <Grid size={{ xs: 12, md: 5, lg: 4 }}>
//         <Grid container alignItems="center" justifyContent="space-between">
//           <Grid>
//             <Typography variant="h5">Transaction History</Typography>
//           </Grid>
//           <Grid />
//         </Grid>
//         <MainCard sx={{ mt: 2 }} content={false}>
//           <List
//             component="nav"
//             sx={{
//               px: 0,
//               py: 0,
//               '& .MuiListItemButton-root': {
//                 py: 1.5,
//                 px: 2,
//                 '& .MuiAvatar-root': avatarSX,
//                 '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
//               }
//             }}
//           >
//             <ListItem
//               component={ListItemButton}
//               divider
//               secondaryAction={
//                 <Stack sx={{ alignItems: 'flex-end' }}>
//                   <Typography variant="subtitle1" noWrap>
//                     + $1,430
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     78%
//                   </Typography>
//                 </Stack>
//               }
//             >
//               <ListItemAvatar>
//                 <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
//                   <GiftOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
//             </ListItem>
//             <ListItem
//               component={ListItemButton}
//               divider
//               secondaryAction={
//                 <Stack sx={{ alignItems: 'flex-end' }}>
//                   <Typography variant="subtitle1" noWrap>
//                     + $302
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     8%
//                   </Typography>
//                 </Stack>
//               }
//             >
//               <ListItemAvatar>
//                 <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
//                   <MessageOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
//             </ListItem>
//             <ListItem
//               component={ListItemButton}
//               secondaryAction={
//                 <Stack sx={{ alignItems: 'flex-end' }}>
//                   <Typography variant="subtitle1" noWrap>
//                     + $682
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     16%
//                   </Typography>
//                 </Stack>
//               }
//             >
//               <ListItemAvatar>
//                 <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
//                   <SettingOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
//             </ListItem>
//           </List>
//         </MainCard>
//         <MainCard sx={{ mt: 2 }}>
//           <Stack sx={{ gap: 3 }}>
//             <Grid container justifyContent="space-between" alignItems="center">
//               <Grid>
//                 <Stack>
//                   <Typography variant="h5" noWrap>
//                     Help & Support Chat
//                   </Typography>
//                   <Typography variant="caption" color="secondary" noWrap>
//                     Typical replay within 5 min
//                   </Typography>
//                 </Stack>
//               </Grid>
//               <Grid>
//                 <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
//                   <Avatar alt="Remy Sharp" src={avatar1} />
//                   <Avatar alt="Travis Howard" src={avatar2} />
//                   <Avatar alt="Cindy Baker" src={avatar3} />
//                   <Avatar alt="Agnes Walker" src={avatar4} />
//                 </AvatarGroup>
//               </Grid>
//             </Grid>
//             <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
//               Need Help?
//             </Button>
//           </Stack>
//         </MainCard>
//       </Grid>
//     </Grid>
//   );
// }


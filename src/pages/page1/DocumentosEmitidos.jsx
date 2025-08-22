import { useEffect, useState, useRef } from 'react';
import {hacerApiGet} from 'utils/utils.js'
import TablaDatos from 'components/DocumentosEmitidos/TablaDatos';

import {Box, TextField, Pagination, Button, ButtonGroup} from '@mui/material';



const DocumentosEmitidos = ()=>{

    const _nroPaginas = 10;

    const [listado, setListado]= useState(null);
    const [pagina, setPagina]= useState(1);
    const [nroPaginas, setNroPaginas]= useState(_nroPaginas);
    const [filtro, setFiltro]= useState([]);

    const hacerGet = async (params="")=>{
        
        let _filtro = crearFiltro(); 
        let _params = params+_filtro;
        let ruta = "/documentos/documentos_recibidos";
        let getData = await hacerApiGet(ruta=ruta, _params);
        // console.log("hacerGet........")
        // console.log(filtro)
        
        //console.log(getData.listado)

        setListado(getData.listado)
    }

    const setDireccion = (direccion)=>{

        switch (direccion) {
            case "down":
                 return parseInt("-"+1);
                break;
        
            default:
                 return parseInt("+"+1);
                break;
        }
       // return parseInt("+"+1);
    }

    const crearFiltro = ()=>{

        if(filtro.length <= 0)return ""; 

        let string_filtro = filtro.map((x)=> "&"+x.id+"="+x.valor.trim() );
        // console.log("string_filtro.....")
        // console.log(string_filtro)
        return string_filtro.length > 0 ? string_filtro : "";
    }

    const cambiarPagina = (direccion="up")=>{
        // let _pagina = pagina +1;
        let _pagina = pagina + setDireccion(direccion);
        let _param = "?pageNumber="+_pagina;

        // console.log("filtro....")
        // console.log(filtro)       

        setPagina(_pagina);
        hacerGet(_param);
        cambioNroPagina(_pagina);

    }

    const onChangeInput=(input)=>{
        // console.log("onChangeInput......")
        // console.log(input.target)

        let id_input = input.target.id
        let valor_input = input.target.value

        console.log(valor_input.trim().length);

        if(valor_input.trim().length <= 0) {
            setFiltro([]);
            return
        };

        let objFiltro = {
            id: id_input, valor: valor_input.trim()
        };

        // console.log("filtro.......")
        // console.log(filtro)
        // console.log("*********")

        if (filtro.length > 0) {
            // var lista_filtro = filtro.find( (x) => x.id == objFiltro.id );
            var lista_filtro = filtro.filter( (x) => x.id != objFiltro.id );
            // console.log("..... lista_filtro .....")
            // console.log(lista_filtro)
            // console.log("..................")

           // lista_filtro.push()
           if(lista_filtro.length > 0) setFiltro([objFiltro, lista_filtro]);
           else setFiltro([objFiltro]);
        }else{
            setFiltro([objFiltro]);
        }
                
        // console.log(filtro)
        // console.log(id_input)
        // console.log(valor_input)
    }

    // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    const handleChangePagination = (event, value) => {
        //console.log(value);
        setPagina(value);
        hacerGet("?pageNumber="+value);
        cambioNroPagina(value);
        
    };

    const cambioNroPagina = (value) => {
        setNroPaginas(() => {

            // console.log("setNroPaginas")
            // console.log(value)
            // console.log(nroPaginas)

            if (value >= nroPaginas) {
                return value +1;
            }
            
            if (value < _nroPaginas) {
                return _nroPaginas ;
            }

            return value -0;
        })
    }

    useEffect(()=>{
        console.log("useEffect....")
        hacerGet();
    }, [])

    return(
        <>
            <h2>DocumentosEmitidos</h2>
            <div>
                <div>
                    <h3>Filtro</h3>
                    <TextField
                        id="folio"
                        label="Folio"
                        type="numeric"
                        autoComplete="current-folio"
                        variant="standard"
                        onChange={onChangeInput}
                    />
                </div>
                <hr></hr>
                < TablaDatos datosRender={listado} />
                
                <div>
                    <Box sx={{ '& button': { m: 1 } }}>
                        {nroPaginas}
                        <ButtonGroup variant="contained" size="small" aria-label="Small button group" >
                            {/* {pagina > 1 ?
                            <Button size="small" onClick={() => {
                                hacerGet("?pageNumber=1");
                                setPagina(1);
                            }
                            } >
                                Pagina {"<<<"} 1
                            </Button>
                            : <></>
                        } */}

                            {/* {pagina - 1 > 0 ?
                                <Button variant="contained" size="small" onClick={() => cambiarPagina("down")} >
                                    Pagina {"<< " + (pagina - 1)}
                                </Button>
                                : <></>
                            } */}

                            <Button variant="contained" size="small" disabled={pagina - 1 < 1} onClick={() => cambiarPagina("down")} >
                                Pagina {"<< " + (pagina - 1)}
                            </Button>
                            <h3 onClick={() => hacerGet("?pageNumber=" + pagina)} style={{ cursor: "pointer" }} >Pagina actual {pagina}</h3>

                            <Button variant="contained" size="small" onClick={cambiarPagina} >
                                Pagina {pagina + 1 + " >>"}
                            </Button>
                        </ButtonGroup>
                        <Pagination count={nroPaginas} page={pagina} onChange={handleChangePagination} variant="outlined" shape="rounded" />
                    </Box>

                </div>
                {/* {
                    listado != null ? listado.map((row, index) => {
                        return ( 
                            <>
                            
                            <div key={row.id} >
                                <div>neto: {row.montoNeto}</div>
                                Folio:  {row.folio}
                                fechaEmision: {row.fechaEmision}
                            </div> 
                            </>
                        )
                    })  
                    :  <></>                            
                } */}
            </div>
        </>
    )
}

export default DocumentosEmitidos;
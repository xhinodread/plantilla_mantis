import { useEffect, useState, useRef } from 'react';
import {hacerApiGet} from 'utils/utils.js'
import TablaDatos from 'components/DocumentosEmitidos/TablaDatos';

import {Box, TextField, Pagination, Button, ButtonGroup, IconButton, Tooltip} from '@mui/material';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCartIcon';
import { textAlign } from '@mui/system';

import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

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

        // console.log("crearFiltro")
        // console.log(filtro)
        if(filtro.length <= 0)return ""; 

        let string_filtro = filtro.map((x)=> "&"+x.id+"="+x.valor.trim() );
        // console.log("string_filtro.....")
        // console.log(string_filtro)
        return string_filtro.length > 0 ? string_filtro.join('') : "";
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
        console.log("onChangeInput......")
        // console.log(input)
        // console.log(input.target)
        
        let id_input;
        let valor_input;

        if (input.target) {
            id_input = input.target.id
            valor_input = input.target.value
        } else {
            id_input = input.current.id
            valor_input = input.current.value
        }

        //console.log(id_input);
        //console.log(valor_input.trim().length);

        if(valor_input.trim().length <= 0) {
            // console.log('*** vaciar este filtro ***');
            // console.log(filtro);
            var lista_filtro_limpiar = filtro.filter( (x) => x.id != id_input );
            // console.log("*** lista_filtro_limpiar");
            // console.log(lista_filtro_limpiar);
            // console.log("******************");

            setFiltro(lista_filtro_limpiar);
            // setFiltro([]);
            return
        };

        let objFiltro = {
            id: id_input, valor: valor_input.trim()
        };

        //console.log("filtro.......")
        //console.log(filtro)
        // console.log("*********")

        if (filtro.length > 0) {
            // var lista_filtro = filtro.find( (x) => x.id == objFiltro.id );
            var lista_filtro = filtro.filter( (x) => x.id != objFiltro.id );
            // console.log("lista_filtro")
            // console.log(objFiltro)
            // console.log(lista_filtro)
            // console.log("..................")

           //    if(lista_filtro.length > 0) setFiltro([objFiltro, lista_filtro[0]]);
            if (lista_filtro.length > 0) {
                let array_filtros = [objFiltro]

                lista_filtro.forEach((x, i)=>{
                    // console.log("item...");
                    // console.log(x);
                    array_filtros.push(x);
                })
                // array_filtros = lista_filtro.forEach((x, i)=>x);
                // console.log("array_filtros")
                // console.log(array_filtros)

                setFiltro(array_filtros);
                // setFiltro([objFiltro, lista_filtro]);
            }
            else {
                setFiltro([objFiltro]);
            }
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

            return value +1;
        })
    }

    useEffect(()=>{
        console.log("useEffect....")
        hacerGet();
    }, [])

    console.log("filtro fetch.......")
    console.log(filtro)

    return(
        <>
            <h2>DocumentosEmitidos</h2>
            <div>
                <div>
                    <h3>Filtro</h3>
                    {/* <Tooltip title="Folio">
                        <TextField
                            id="folio"
                            label="Folio"
                            type="numeric"
                            autoComplete="current-folio"
                            variant="standard"
                            onChange={onChangeInput}
                        />
                        <IconButton shape="circle" variant="outlined" color="primary" aria-label="buscar" size="large"
                            onClick={() => { }}
                        >
                            <ClearOutlined />
                        </IconButton>
                    </Tooltip> */}

                    <TextFieldFiltro id="folio" onChange={onChangeInput} />
                    <TextFieldFiltro id="idEmpresa" onChange={onChangeInput} />
                    {/* <TextFieldFiltro id="fechaEmision" onChange={onChangeInput} /> */}
                            
                </div>
                <div style={{textAlign:"end"}} >
                    <Tooltip title="buscar">
                        <IconButton shape="circle" variant="outlined" color="primary" aria-label="buscar" size="large"
                            onClick={() => hacerGet("?pageNumber=" + pagina)}
                        >
                            <SearchOutlined />
                        </IconButton>
                    </Tooltip>
                </div>
                <hr></hr>
                <TablaDatos datosRender={listado} />                
                <div>
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 2, 
                            mb: 2,
                            '& button': {
                                m: 1
                            }
                        }} 
                        // style={{ textAlign: "center" }}
                    >
                        <ButtonGroup variant="contained" size="small" aria-label="Small button group" >
                            {/*** {pagina > 1 ?
                            <Button size="small" onClick={() => {
                                hacerGet("?pageNumber=1");
                                setPagina(1);
                            }
                            } >
                                Pagina {"<<<"} 1
                            </Button>
                            : <></>
                        } */ }
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
                
            </div>
        </>
    )
}

export default DocumentosEmitidos;


const TextFieldFiltro = (props) => {

    const [inputValue, setInputValue] = useState('');
    const filtroFieldRef = useRef();

    const clearTextField = ()=>{
        // console.log("clearTextField")
        // console.log(filtroFieldRef)
        // console.log(filtroFieldRef.current)
        // console.log(filtroFieldRef.current.id)

        //let elemento = filtroFieldRef; // document.getElementById(props.id);
        //console.log(elemento)
        //elemento.value = "";
        setInputValue("");
        //const changeEvent = new Event('change');
        //elemento.dispatchEvent(changeEvent);
        filtroFieldRef.current.value = "";
        props.onChange(filtroFieldRef);
        //elemento.focus();
    }

    const handleInputChange = (event) => {
     //   console.log('Input changed:', event);
    setInputValue(event.target.value); // Update the state
    // console.log('Input changed:', event.target.value);
    props.onChange(event)
  };

    let string_label = props.id.toString().charAt(0).toUpperCase()+ props.id.slice(1);

    return (
        <Tooltip title={string_label}>
            <TextField
                inputRef={filtroFieldRef}
                id={props.id}
                label={string_label}
                type="numeric"
                value={inputValue}
                autoComplete={"current-"+props.id}
                variant="standard"
                onChange={handleInputChange}
            />
            <IconButton shape="circle" variant="outlined" color="primary" aria-label="buscar" size="large"
                onClick={clearTextField}
            >
                <ClearOutlined />
            </IconButton>
        </Tooltip>
    )
} 
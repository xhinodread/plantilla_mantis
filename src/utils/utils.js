

    function mostrarError(error){
      const textoError = "Error obteniendo data desde el servidor remoto: ";
      if (error instanceof TypeError) {
        console.error(textoError, error.message);
        // You can add specific handling for TypeError here
      } else {
        console.error(textoError, error);
      }
    }

    const verificarLogin= async ()=>{
      const rutaApi = "http://localhost:5153/api/acceso/eval_token_usuario"; // "http://localhost:5153/api/acceso/login"
      const token = JSON.parse(window.localStorage.getItem('token'));
      
      try {
        const response = await fetch(rutaApi,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("utils verificarLogin token Data IU");
        console.log(response);

        if (response.ok) {
          const jsonData = await response.json();

          console.log("verificarLogin json Data IU");
          console.log(jsonData);
        } else {
          console.log("error del server...")
          console.log(response.statusText)
          //mostrarError(response);
        }

      } catch (error) {
          console.log("Error en fetch")
          console.log(error)
      }
    }
    

    const verificarTokenUser= async ()=>{
      const apiUrl = import.meta.env.VITE_REMOTE_API_SECURE; // || 'https://localhost:7229' o una direccion IP ;
      const rutaApi = apiUrl+"/api/acceso/eval_token_usuario"; // "http://localhost:5153/api/acceso/login"
      
      try {
        const token = JSON.parse(window.localStorage.getItem('token'));
        const response = await fetch(rutaApi,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("verificarTokenUser....");
        console.log(response);

        if (response.ok) {
          const jsonData = await response.json();

          console.log("token time");
          console.log(jsonData);
          return true;
        } else {
          console.log("error del server...")
          console.log(response.statusText)
          //mostrarError(response);
          return false;
        }

      } catch (error) {
          console.log("Error en fetch")
          console.log(error)
          return false;

      }
    }

const hacerApiGet = async (ruta="", params = "") => {
  const apiUrl = import.meta.env.VITE_REMOTE_API1; // || 'https://localhost:7229' o una direccion IP ;
  const rutaApi = apiUrl + ruta + params; // "http://localhost:5153/api/acceso/login"

  try {
    const token = JSON.parse(window.localStorage.getItem('token'));
    const response = await fetch(rutaApi,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

   console.log("response....");
   console.log(response);

    if (response.ok) {
      const jsonData = await response.json();

      console.log("response json");
      console.log(jsonData);
      return jsonData;
    } else {
      console.log("error del server...")
      console.log(response.statusText)
      //mostrarError(response);
      return [];
    }

  } catch (error) {
    console.log("Error en fetch")
    console.log(error)
    return [];

  }
}

const logoutUser = async () => {
  console.log("logoutUser.....")
  const apiUrl = import.meta.env.VITE_REMOTE_API_SECURE; // || 'http://localhost:5153' o una direccion IP ;
  const rutaApiLogout = apiUrl + "/api/acceso/logout"; // Cambia esta ruta
  //const token = localStorage.getItem('token'); // O 'token' si es lo que usas
  const token = JSON.parse(window.localStorage.getItem('token'));

  console.log("token")
  console.log(token)

  // Si no hay token, simplemente no hacemos nada
  if (!token) {
    localStorage.removeItem('token');
    return;
  }

  try {
    let resp = await fetch(rutaApiLogout, {
      method: 'POST', // Un POST es más seguro para una acción de logout
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(resp)

    const jsonData = await resp.json();
    console.log(jsonData)

  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  } finally {
    // En cualquier caso, eliminamos el token del cliente para redirigirlo
    localStorage.removeItem('token');
  }
};
    
    export { mostrarError, verificarLogin, verificarTokenUser, logoutUser , hacerApiGet};

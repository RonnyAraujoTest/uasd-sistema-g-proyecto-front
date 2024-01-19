window.consulta.addEventListener("click", (e) => {
    e.preventDefault();
    getproyect();
    listanombre();
    buscarProyecto();
    //   console.log(getFormData());
});

async function getproyect() {
    /* const response = await fetch(
    "https://uasd-sistema-g-proyectos-api-production.up.railway.app/api/proyectos",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getFormData()),
    }
    );*/

    const response = await fetch(
        "http://localhost:8080/api/proyectos",
        {
            method: "GET",
            // mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },

        }
    );

    if (response.ok) {

        let data = await response.json();
        console.log('resultados: ');
        console.log(data);
        return data;
    } else {
        console.log('Error' + response.status);
        return {};
    }
}

async function listanombre() {
    // Limpia el cuerpo de la tabla HTML
    const tablaBody = document.querySelector("#tablaproyectos tbody");
    tablaBody.innerHTML = " ";

    // Obtengo el valor de búsqueda del campo de búsqueda
    const inputBusqueda = document.getElementById('inputBusqueda');
    const searchValue = inputBusqueda.value.toLowerCase();

    // Realize una solicitud GET a la API con el valor de búsqueda

    const response = await fetch(
        `http://localhost:8080/api/proyectos?search=${searchValue}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    // Conversion a json
    let data = await response.json();

    // Comprueba si los datos son un arreglo
    if (data && Array.isArray(data)) {
        // Itera sobre cada elemento en el array (cada proyecto)
        data.forEach((item) => {
            // Crea una nueva fila en la tabla
            const fila = tablaBody.insertRow();


            const nombre = fila.insertCell(0);
            nombre.textContent = item.nombre;

            const facultad = fila.insertCell(1);
            facultad.textContent = item.facultad;

            const instituto = fila.insertCell(2);
            instituto.textContent = item.instituto;

            const lineaInvestigativa = fila.insertCell(3);
            lineaInvestigativa.textContent = item.lineaInvestigativa;
        });

        return data;
    } else {

        console.log('Error al recibir datos');
    }
}



function buscarProyecto() {
    const inputValor = inputBusqueda.value.toLowerCase();
    const filas = document.querySelectorAll("#tablaproyectos tbody tr");

    filas.forEach((fila) => {
        const nombre = fila.cells[0].textContent.toLowerCase();
        const facultad = fila.cells[1].textContent.toLowerCase();
        const instituto = fila.cells[2].textContent.toLowerCase();
        const lineaInvestigativa = fila.cells[3].textContent.toLowerCase();

        // Aqui comprueba si alguna celda contiene el valor de búsqueda
        const mostrarFila =
            nombre.includes(inputValor) ||
            facultad.includes(inputValor) ||
            instituto.includes(inputValor) ||
            lineaInvestigativa.includes(inputValor);

        // aqui muestra o se  oculta la fila según la coincidencia que encuentre.
        fila.style.display = mostrarFila ? '' : 'none';
    });
}
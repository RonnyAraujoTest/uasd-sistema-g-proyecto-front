window.consulta.addEventListener("click", (e) => {
    e.preventDefault();
    getproyect();
    listanombre();
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
    // llamando mi tabla creada en html.
    const tablaBody = document.querySelector("#tablaproyectos tbody");
    tablaBody.innerHTML = " ";

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
    let data = await response.json();
    if (data && Array.isArray(data)) {

        data.forEach((item) => {
            const fila = tablaBody.insertRow(); //Creando mis filas

            // agregue las celdas 
            const nombre = fila.insertCell(0);
            nombre.textContent = item.nombre;

            const facultad = fila.insertCell(1);
            facultad.textContent = item.facultad;


            const instituto = fila.insertCell(2);
            instituto.textContent = item.instituto;

            const lineaInvestigativa = fila.insertCell(3);
            lineaInvestigativa.textContent = item.lineaInvestigativa;

            //    console.log(`Nombre: ${item.nombre}, Proyecto: ${item.proyecto}`);
        });
        return data;
    } else {
        console.log('Error al recibir datos');
    }
}
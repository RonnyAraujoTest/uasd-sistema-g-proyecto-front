form.addEventListener("submit", (e) => {
  e.preventDefault();
  postProyecto();
  //   console.log(getFormData());
});

function getFormData() {
  return {
    nombre: document.getElementById("nombre").value,
    codigo: window.codigo.value,
    facultad: window.facultad.value,
    instituto: window.instituto.value,
    linea_investicacion: window.lineaInvestigacion.value,
    horas_semanales_contratadas: parseInt(window.horasSemanales.value),
    fecha_inicio: window.fechaInicioProyecto.value,
    duracion_semestres: parseInt(window.duracionSemestres.value),
    fecha_final: window.fechaTerminoProyecto.value,
    intitutos_participantes: window.institucionesParticipantes.value,
    entidad_financiera_n: window.entidadFinanciadoraNacional.value,
    entidad_financiera_i: window.entidadFinanciadoraInternacional.value,
  };
}

async function postProyecto() {
  const response = await fetch(
    "https://uasd-sistema-g-proyectos-api-production.up.railway.app/api/proyectos",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getFormData()),
    }
  );

  if (!response.ok) {
    alert("fallo en envio!");
    let data = await response.json();
    console.log(data);
    return;
  } else {
    alert("envio exitoso!");
    window.form.reset();
  }
}

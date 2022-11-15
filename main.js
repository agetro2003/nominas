//Elementos HTML
var contenedor = document.getElementById("contenedor");
const insert_empleado = document.querySelector("#insert-empleado");
const insert_concepto = document.querySelector("#insert-concepto");
const modal_insert_empleado = document.querySelector("#modal-insert-empleado");
const modal_insert_concepto = document.querySelector("#modal-insert-concepto");
const close_insert_empleado = document.querySelector("#close-insert-empleado");
const close_insert_concepto = document.querySelector("#close-insert-concepto");

let select_salario = document.getElementById("select-salario");
let radioPorcentaje = document.getElementById("radio-porcentaje");
let radioMonto = document.getElementById("radio-neto");

let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");

let close_asignar_concepto = document.getElementById("close-asignar-concepto");
let modal_asignar_concepto = document.getElementById("modal-asignar-concepto");
let btn_asignar_concepto = document.getElementById("asignar-concepto");

//Eventos
insert_empleado.addEventListener("click", () => {
  modal_insert_empleado.showModal();
});
insert_concepto.addEventListener("click", () => {
  modal_insert_concepto.showModal();
});

close_insert_empleado.addEventListener("click", () => {
  modal_insert_empleado.close();
});

close_insert_concepto.addEventListener("click", () => {
  modal_insert_concepto.close();
});

btn_asignar_concepto.addEventListener("click", () => {
  modal_asignar_concepto.showModal();
});

close_asignar_concepto.addEventListener("click", () => {
  modal_asignar_concepto.close();
});

//JSON

var empleados = [
  {
    nombres: "armando",
    apellidos: "casas",
    urb: "lago country 3",
    cargo: "vendedor",
    cedula: "12568525",
    conceptos: [0, 1, 2],
  },

  {
    nombres: "francisco",
    apellidos: "mendoza",
    urb: "edificios pallium",
    cargo: "bobo",
    cedula: "30167855",
    conceptos: [0, 1, 3],
  },
];

var salarios = {
  vendedor: 100,
  manager: 150,
  propietario: 200,
  obrero: 50,
  pasante: 0,
};

var conceptos = [
  {
    id: 0,
    descripcion: "Salario Semanal Vendedor",
    tipo: "Aporte",
    monto: salarios["vendedor"],
  },
  {
    id: 1,
    descripcion: "Salario Semanal Manager",
    tipo: "Aporte",
    monto: salarios["manager"],
  },
  {
    id: 2,
    descripcion: "Salario Semanal Propietario",
    tipo: "Aporte",
    monto: salarios["propietario"],
  },
  {
    id: 3,
    descripcion: "Inasistencia 1 día Vendedor",
    tipo: "Sanción",
    monto: (salarios["vendedor"] / 7).toFixed(2),
  },
  {
    id: 4,
    descripcion: "Inasistencia 1 día Manager",
    tipo: "Sanción",
    monto: (salarios["manager"] / 7).toFixed(2),
  },
  {
    id: 5,
    descripcion: "Inasistencia 1 día Propietario",
    tipo: "Sanción",
    monto: (salarios["propietario"] / 7).toFixed(2),
  },
  {
    id: 6,
    descripcion: "Inasistencia 1 día Obrero",
    tipo: "Sanción",
    monto: (salarios["obrero"] / 7).toFixed(2),
  },
  {
    id: 7,
    descripcion: "Salario semanal obrero",
    tipo: "Aporte",
    monto: salarios["obrero"],
  },
];

//Funciones Utiles

function verifyCedula(cedula) {
  for (let i = 0; i < empleados.length; i++) {
    if (cedula == empleados[i].cedula) {
      return true;
    }
  }

  return false;
}

function verifyConcepto(id) {
  for (let i = 0; i < conceptos.length; i++) {
    if (id == conceptos[i].id) {
      return true;
    }
  }
  return false;
}

function findEmpleado(cedula) {
  for (let i = 0; i < empleados.length; i++) {
    if (cedula == empleados[i].cedula) {
      return i;
    }
  }

  return false;
}

function asignarConcepto(cedula, concepto) {
  return empleados[findEmpleado(cedula)].conceptos.push(concepto);
}

//Funcion para bloqueo de radio buttons
function radioChecks() {
  if (radioMonto.checked) {
    card2.classList.remove("block");
    card1.classList.remove("background");
    card1.classList.add("block");
    card2.classList.add("background");
  }

  if (radioPorcentaje.checked) {
    card1.classList.remove("block");
    card2.classList.remove("background");
    card2.classList.add("block");
    card1.classList.add("background");
  }
}
radioMonto.addEventListener("change", radioChecks);
radioPorcentaje.addEventListener("change", radioChecks);

function fillSelects() {
  let textCargo = "";
  let textSalario = "";
  let selectCargo = document.getElementById("cargo-empleado");

  for (const salario in salarios) {
    textCargo += `<option value="${salario}"> ${salario} </option>`;
  }

  for (const salario in salarios) {
    textSalario += `<option value="${salarios[salario]}"> ${salario}:${salarios[salario]} </option>`;
  }

  selectCargo.innerHTML = textCargo;
  select_salario.innerHTML = textSalario;
}

fillSelects();

//Formulario de Empleados
let formEmpleado = document.getElementById("formulario");
let fnSendEmpleado = function (event) {
  let empleado = {
    nombres: formEmpleado.Nombres.value,
    apellidos: formEmpleado.Apellidos.value,
    urb: formEmpleado.Urbanizacion.value,
    cargo: formEmpleado.Cargo.value,
    cedula: formEmpleado.Cedula.value,
    conceptos: [],
  };
  empleados.push(empleado);
  filter.push(empleado);
  alert("El empleado ha sido agregado exitosamente");
  console.log(empleados);
  formEmpleado.reset();
  event.preventDefault();
};
formEmpleado.addEventListener("submit", fnSendEmpleado);

let filter = JSON.parse(JSON.stringify(empleados));
let filterConceptos = JSON.parse(JSON.stringify(conceptos));

//Formulario de Conceptos
let formConceptos = document.getElementById("form-conceptos");
let fnSendConceptos = function (event) {
  let concepto = {
    id: conceptos.length,
    descripcion: formConceptos.Descripcion.value,
    tipo: formConceptos.Tipo.value,
  };
  if (radioPorcentaje.checked) {
    concepto.monto =
      (formConceptos.PorcentajeValor.value / 100) * formConceptos.Monto.value;
  } else if (radioMonto.checked) {
    concepto.monto = formConceptos.NetoValor.value;
  }
  conceptos.push(concepto);
  filterConceptos.push(concepto);
  console.log(conceptos);
  alert("El concepto se ha creado correctamente");
  formConceptos.reset();
  event.preventDefault();
};
formConceptos.addEventListener("submit", fnSendConceptos);

function generarTabla() {
  try {
    let total = 0;
    var keys = Object.keys(empleados[0]);
    var filas = empleados.length;
    var columnas = keys.length;
    contenedor.innerHTML = "";
    var tabla = "<table>";

    tabla += "<tr>";
    for (let k = 0; k < keys.length; k++) {
      tabla += "<th>" + keys[k] + "</th>";
    }
    tabla += "<th> Calculo del balance </th>";
    tabla += "<th> Balance </th>";
    tabla += "</tr>";

    for (let i = 0; i < filas; i++) {
      tabla += "<tr>";

      for (let j = 0; j < columnas; j++) {
        tabla += "<td>" + empleados[i][keys[j]] + "</td> ";
      }

      tabla += "<td> ";
      for (let k = 0; k < empleados[i].conceptos.length; k++) {
        for (let w = 0; w < conceptos.length; w++) {
          if (empleados[i].conceptos[k] == conceptos[w].id) {
            if (conceptos[w].tipo == "Aporte") {
              tabla += `  + ${conceptos[w].monto}`;
            } else {
              tabla += `  - ${conceptos[w].monto}`;
            }
          }
        }
      }
      tabla += "</td>";

      let balance = 0;

      for (let k = 0; k < empleados[i].conceptos.length; k++) {
        for (let w = 0; w < conceptos.length; w++) {
          if (empleados[i].conceptos[k] == conceptos[w].id) {
            if (conceptos[w].tipo == "Aporte") {
              balance += conceptos[w].monto;
            } else {
              balance -= conceptos[w].monto;
            }
          }
        }
      }
      total += balance;
      tabla += "<td>" + balance + "</td>";
      tabla += "</tr>";
    }
    tabla += `<tr> <td colspan = "${
      columnas + 2
    }"> Balance Total = ${total} </td></tr>`;
    tabla += "</table>";
    contenedor.innerHTML = tabla;
  } catch (error) {}
}

function generarConceptos() {
  try {
    var keys = Object.keys(conceptos[0]);
    var filas = conceptos.length;
    var columnas = keys.length;
    contenedor.innerHTML = "";
    var tabla = "<table>";

    tabla += "<tr>";
    for (let k = 0; k < keys.length; k++) {
      tabla += "<th>" + keys[k] + "</th>";
    }

    tabla += "</tr>";

    for (let i = 0; i < filas; i++) {
      tabla += "<tr>";

      for (let j = 0; j < columnas; j++) {
        tabla += "<td>" + conceptos[i][keys[j]] + "</td> ";
      }

      tabla += "</tr>";
    }

    tabla += "</table>";
    contenedor.innerHTML = tabla;
  } catch (error) {}
}

const t = document.querySelector(".toggle");
t.addEventListener("click", () => {
  t.classList.toggle("is-active");
});

function calcularBalance() {}

const inputCedula = document.getElementById("asignar_cedula");
let filtCedula = function (event) {
  let result = filter.filter((element) => {
    if (element.cedula.toString() == inputCedula.value.toString()) {
      return element;
    }
  });
  if (result.length == 1) {
    document.getElementById("data-nombre-empleado").value = result[0].nombres;
    document.getElementById("data-cedula-empleado").value = result[0].cedula;
    document.getElementById("data-cargo-empleado").value = result[0].cargo;
    document.getElementById("data-conceptos-empleado").value =
      result[0].conceptos;
  } else if (result.length == 0) {
    document.getElementById("data-nombre-empleado").value =
      "No hay coincidencias";
    document.getElementById("data-cedula-empleado").value =
      "No hay coincidencias";
    document.getElementById("data-cargo-empleado").value =
      "No hay coincidencias";
    document.getElementById("data-conceptos-empleado").value =
      "No hay coincidencias";
  }
  event.preventDefault();
};
inputCedula.addEventListener("keyup", filtCedula);

const inputConcepto = document.getElementById("asignar_concepto");
let fillConcepto = function (event) {
  let result = filterConceptos.filter((element) => {
    if (element.id.toString() == inputConcepto.value.toString()) {
      return element;
    }
  });
  if (result.length == 1) {
    document.getElementById("data-id-concepto").value = result[0].id;
    document.getElementById("data-descripcion-concepto").value =
      result[0].descripcion;
    document.getElementById("data-tipo-concepto").value = result[0].tipo;
    document.getElementById("data-monto-concepto").value = result[0].monto;
  } else if (result.length == 0) {
    document.getElementById("data-id-concepto").value = "No hay coincidencias";
    document.getElementById("data-descripcion-concepto").value =
      "No hay coincidencias";
    document.getElementById("data-tipo-concepto").value =
      "No hay coincidencias";
    document.getElementById("data-monto-concepto").value =
      "No hay coincidencias";
  }

  event.preventDefault();
};
inputConcepto.addEventListener("keyup", fillConcepto);

//Formulario concepto-empleado
let formularioAsignar = document.getElementById("form-asignar-conceptos");

let fnSendAsignar = function (event) {
  alert('si')
  if (verifyCedula(inputCedula.value) && verifyConcepto(inputConcepto.value)) {
    for (let i = 0; i < empleados.length; i++) {
      if (empleados[i].cedula == inputCedula.value) {
        empleados[i].conceptos.push(parseInt(inputConcepto.value));
      }
    }
    alert("El concepto se ha asignado correctamente");
  } else {
    alert("Introduzca datos validos");
  }
  event.preventDefault();
};

formularioAsignar.addEventListener("submit", fnSendAsignar);

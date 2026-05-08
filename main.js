// Controlador Principal
// Limpiar el Api localStorage
window.onload = function () {
    localStorage.clear();
    // Inicia la tabla vacía
    renderizarTabla();
}

var contador = 0;
// Se instancia un objeto vacío para usar su método según la diapositiva
const empleadoObj = new Empleado();

function crearEmpleado() {
    document.getElementById('agregarEmpleadoH').style.display = 'block';
}

function agregarEmpleado() {
    var encontro = false;

    if (contador > 0) {
        for (var i = 1; i <= contador; i++) {
            const empleadoX = "empleado" + i;
            // console.log(empleadoX);
            const empleadoB = JSON.parse(localStorage.getItem(empleadoX));

            // Verificamos que el registro exista antes de validar la CC
            if (empleadoB && empleadoB.cc == document.getElementById('ccH').value) {
                encontro = true;
                alert("Este empleado ya se encuentra registrado, por favor agregar nueva CC");
            }
        }
    }

    if (encontro == false) {
        contador += 1;
        empleadoObj.agregarEmpleadoC(contador);
    }
}

// --- CÓDIGO EXTRA NECESARIO PARA QUE SE VEA EN LA PANTALLA ---
function renderizarTabla() {
    let cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = ""; // Limpia la tabla

    for (let i = 1; i <= contador; i++) {
        let emp = JSON.parse(localStorage.getItem("empleado" + i));
        if (emp) {
            cuerpoTabla.innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${emp.cc}</td>
                    <td>${emp.nombresyApellidos}</td>
                    <td>${emp.direccion}</td>
                    <td>${emp.email}</td>
                    <td>${emp.telefono}</td>
                    <td>${emp.sueldoBase}</td>
                    <td>${emp.tipoEmpleado}</td>
                    <td>${emp.tipoBonificacion}</td>
                    <td><button class="btn btn-warning btn-sm">Actualizar</button></td>
                    <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
                </tr>
            `;
        }
    }
}
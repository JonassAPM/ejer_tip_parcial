window.onload = function () {
    // Buscar el contador máximo existente para no perder datos al recargar
    let maxId = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key && key.startsWith("empleado")) {
            let id = parseInt(key.replace("empleado", ""));
            if (id > maxId) maxId = id;
        }
    }
    contador = maxId;
    renderizarTabla();
}

var contador = 0;
var idEmpleadoActual = null; // Para saber si estamos actualizando o agregando

function crearEmpleado() {
    idEmpleadoActual = null;
    document.getElementById('tituloFormulario').innerText = "Formulario de Registro";
    document.getElementById('btnGuardarEmpleado').innerText = "Guardar Empleado";
    document.getElementById('ccH').value = "";
    document.getElementById('nombresyApellidosH').value = "";
    document.getElementById('direccionH').value = "";
    document.getElementById('emailH').value = "";
    document.getElementById('telefonoH').value = "";
    document.getElementById('sueldoBaseH').value = "";
    document.getElementById('tipoEmpleadoH').value = "";
    document.getElementById('tipoBonificacionH').value = "";
    document.getElementById('agregarEmpleadoH').style.display = 'block';
}

function agregarEmpleado() {
    var encontro = false;

    // Solo validamos CC duplicada si estamos agregando uno nuevo
    if (idEmpleadoActual === null && contador > 0) {
        for (var i = 1; i <= contador; i++) {
            const empleadoX = "empleado" + i;
            const empleadoB = JSON.parse(localStorage.getItem(empleadoX));

            if (empleadoB && empleadoB.cc == document.getElementById('ccH').value) {
                encontro = true;
            }
        }
    }

    if (encontro == false) {
        var idGuardar = idEmpleadoActual !== null ? idEmpleadoActual : (contador + 1);
        
        var ccH = document.getElementById('ccH').value;
        var nombresyApellidosH = document.getElementById('nombresyApellidosH').value;
        var direccionH = document.getElementById('direccionH').value;
        var emailH = document.getElementById('emailH').value;
        var telefonoH = document.getElementById('telefonoH').value;
        var sueldoBaseH = document.getElementById('sueldoBaseH').value;
        var tipoEmpleadoH = document.getElementById('tipoEmpleadoH').value;
        var tipoBonificacionH = document.getElementById('tipoBonificacionH').value;

        const empleado = new Empleado(ccH, nombresyApellidosH, direccionH, emailH, telefonoH, sueldoBaseH, tipoEmpleadoH, tipoBonificacionH);

        const empleadoJSON = JSON.stringify(empleado);
        localStorage.setItem('empleado' + idGuardar, empleadoJSON);

        if (idEmpleadoActual === null) {
            contador += 1;
        } else {
            idEmpleadoActual = null;
        }

        document.getElementById('agregarEmpleadoH').style.display = 'none';
        renderizarTabla();
    }
}

function renderizarTabla() {
    let cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = "";

    for (let i = 1; i <= contador; i++) {
        let empRaw = localStorage.getItem("empleado" + i);
        if (!empRaw) continue;

        try {
            let emp = JSON.parse(empRaw);
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
                        <td><button class="btn btn-warning btn-sm" onclick="prepararActualizar(${i})">Actualizar</button></td>
                        <td><button class="btn btn-danger btn-sm" onclick="eliminarEmpleado(${i})">Eliminar</button></td>
                    </tr>
                `;
            }
        } catch (error) {
            console.error("Error al leer empleado", i, error);
        }
    }
}

function eliminarEmpleado(id) {
    localStorage.removeItem("empleado" + id);
    alert("Empleado eliminado correctamente.");
    renderizarTabla();
}

function prepararActualizar(id) {
    idEmpleadoActual = id;
    let emp = JSON.parse(localStorage.getItem("empleado" + id));
    if(emp) {
        document.getElementById('ccH').value = emp.cc;
        document.getElementById('nombresyApellidosH').value = emp.nombresyApellidos;
        document.getElementById('direccionH').value = emp.direccion;
        document.getElementById('emailH').value = emp.email;
        document.getElementById('telefonoH').value = emp.telefono;
        document.getElementById('sueldoBaseH').value = emp.sueldoBase;
        document.getElementById('tipoEmpleadoH').value = emp.tipoEmpleado;
        document.getElementById('tipoBonificacionH').value = emp.tipoBonificacion;
        
        document.getElementById('tituloFormulario').innerText = "Actualizar Registro";
        document.getElementById('btnGuardarEmpleado').innerText = "Actualizar Empleado";
        document.getElementById('agregarEmpleadoH').style.display = 'block';
    }
}

function buscarEmpleado() {
    let ccBusqueda = document.getElementById('ccBuscar').value;
    let resultadoDiv = document.getElementById('resultadoBusqueda');
    resultadoDiv.innerHTML = "";
    
    if(!ccBusqueda) {
        resultadoDiv.innerHTML = `<div class="alert alert-warning">Ingrese una cédula para buscar.</div>`;
        return;
    }

    let encontrado = null;
    for (let i = 1; i <= contador; i++) {
        let emp = JSON.parse(localStorage.getItem("empleado" + i));
        if (emp && emp.cc === ccBusqueda) {
            encontrado = emp;
            break;
        }
    }

    if (encontrado) {
        resultadoDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p><strong>Nombre:</strong> ${encontrado.nombresyApellidos}</p>
                    <p><strong>CC:</strong> ${encontrado.cc}</p>
                    <p><strong>Email:</strong> ${encontrado.email}</p>
                    <p><strong>Teléfono:</strong> ${encontrado.telefono}</p>
                    <p><strong>Sueldo Base:</strong> $${encontrado.sueldoBase}</p>
                    <p><strong>Tipo:</strong> ${encontrado.tipoEmpleado}</p>
                </div>
            </div>
        `;
    } else {
        resultadoDiv.innerHTML = `<div class="alert alert-danger">No se encontró ningún empleado con la cédula ${ccBusqueda}.</div>`;
    }
}
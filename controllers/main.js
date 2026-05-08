window.onload = function () {
    localStorage.clear();
    renderizarTabla();
}

var contador = 0;

function crearEmpleado() {
    document.getElementById('agregarEmpleadoH').style.display = 'block';
}

function agregarEmpleado() {
    var encontro = false;

    if (contador > 0) {
        for (var i = 1; i <= contador; i++) {
            const empleadoX = "empleado" + i;
            const empleadoB = JSON.parse(localStorage.getItem(empleadoX));

            if (empleadoB && empleadoB.cc == document.getElementById('ccH').value) {
                encontro = true;
                alert("Este empleado ya se encuentra registrado, por favor agregar nueva CC");
            }
        }
    }

    if (encontro == false) {
        contador += 1;
        
        alert("Entró a empleado");
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
        localStorage.setItem('empleado' + contador, empleadoJSON);

        document.getElementById('agregarEmpleadoH').style.display = 'none';
        renderizarTabla();
    }
}

function renderizarTabla() {
    let cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = "";

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
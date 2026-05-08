class Empleado {
    constructor(cc, nombresyApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion) {
        this.cc = cc;
        this.nombresyApellidos = nombresyApellidos;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
        this.sueldoBase = sueldoBase;
        this.tipoEmpleado = tipoEmpleado;
        this.tipoBonificacion = tipoBonificacion;
    }

    agregarEmpleadoC(contador) {
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

        // Convierto objeto a String para la API
        const empleadoJSON = JSON.stringify(empleado);
        // agrego a la API
        localStorage.setItem('empleado' + contador, empleadoJSON);

        // Cierro el formulario y actualizo la tabla visualmente (Agregado para que sea funcional)
        document.getElementById('agregarEmpleadoH').style.display = 'none';
        renderizarTabla();
    }
}

class Contrato extends Empleado {
    constructor(tiempoContrato) {
        super(); // Se añade super() para que no de error de sintaxis en JS
        this.tiempoContrato = tiempoContrato;
    }
}
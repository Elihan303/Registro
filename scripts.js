
let formulario = document.getElementById("formulario");
let inputs = document.querySelectorAll("input");
let btn = document.getElementById("btn_enviar");


const expresiones = {
    
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
	nombre: false,
	apellido: false,
	correo: false,
	cedula: false
}
let campoCedula= false;


const validarFormulario = (e) => {
    switch (e.target.name) {
        case "Nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "Apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case "Correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "Cedula":
            validarCedula(e.target.value);
            break;
    }

}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if( campos.nombre && campos.apellido && campos.correo && campos.cedula ){
		document.getElementById("input_nombre").value="";
    document.getElementById("input_apellido").value="";
    document.getElementById("input_email").value="";
    document.getElementById("input_cedula").value="";

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
   
})









// validar cedula

const validarCedula=(q)=>{
    let cedula = q;
    let c = cedula.split('');
    let v = [1,2,1,2,1,2,1,2,1,2]
  let result = 0 ; 
  let ar ;
  let up;
  let  oc ;
  for ( let i=0;i <10;i++){  
  up =c[i] * v[i];
  let ab = up;
  if ( ab >= 10 ) {
    oc = ab.toString()
            .split('')
            .map(x => parseInt(x) )
            .reduce( (x, y) => x + y);
  }else {
    oc = ab;
  }
  result = parseFloat(result) + parseFloat(oc);   
  }
    let dp = result;
    let ac = dp.toString().split('')[0] + '0';
    ac = parseInt(ac);
    let uj = (ac / 10) * 10;
      if (uj < dp ) {
      dp = (uj + 10) - dp; 
      } else { 
        dp = uj - dp
      }

  if (c[10] == dp) {             
 
    document.getElementById("grupo_cedula").classList.remove('formulario__grupo-incorrecto');
    document.getElementById("grupo_cedula").classList.add('formulario__grupo-correcto');
    document.querySelector("#grupo_cedula i").classList.add('fa-check-circle');
    document.querySelector("#grupo_cedula i").classList.remove('fa-times-circle');
    //document.querySelector('#grupo_cedula .formulario__input-error').classList.remove('formulario__input-error-activo');
    campos.cedula= true;
  } else {
 
    document.getElementById("grupo_cedula").classList.add('formulario__grupo-incorrecto');
    document.getElementById("grupo_cedula").classList.remove('formulario__grupo-correcto');
    document.querySelector("#grupo_cedula i").classList.add('fa-times-circle');
    document.querySelector("#grupo_cedula i").classList.remove('fa-check-circle');
    //document.querySelector('#grupo_cedula .formulario__input-error').classList.remove('formulario__input-error-activo');
    campos.cedula= false;
  }
}


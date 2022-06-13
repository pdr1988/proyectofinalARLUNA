/*  TRABAJO PRACTICO 
    ARLUNA PEDRO ARIEL
Descripcion del TP: se realizo una pagina del tipo "FITNESS" en JS en el que se puede calcular 
el Indice de Masa Corporal del usuario o establecer una rutina de ejercicios fisicos dependiendo
del dia de la semana y del nivel de aptitud del usuario, cargados con anterioridad. A su vez, al definirse los ejercicios de toda la semana al ejecutarse el codigo inicialmente
se puede elegir cualquier dia de la semana y visualizar la rutina correspondiente a ese dia.
Por otra parte, ingresando como administrador (id = '0'), se pueden visualizar la totalidad de usuarios cargados, eliminar usuarios y agregar un nuevo usuario
El sistema identifica a su vez, si un id cargado esta repetido.
Se comienza el codigo, cargandose un objeto con usuarios modelo en el session storage, utilizandose a este ultimo como servidor.
El array de ejercicios, es el mismo para todos los niveles, cambiando la cantidad de repeticiones segun si es avanzado, intermedio o principiante.

*/
//Se agrega al Session Storage Varios usuarios por default

const usuario = [{id: 0, nick: "admin", level: "a" },
{id: 1, nick: "Pedro", level: "p" },
{id: 2, nick: "Andres", level: "a" },
{id: 3, nick: "Santiago", level: "i" },
{id: 4, nick: "Juan", level: "i" },
{id: 5, nick: "Felipe", level: "a" },
{id: 6, nick: "Bartolome", level: "p" },
{id: 7, nick: "Tomas", level: "a" },
{id: 8, nick: "Mateo", level: "a" },
{id: 9, nick: "Simon", level: "p" },
{id: 10, nick: "Judas", level: "a" },
{id: 11, nick: "Jesus", level: "a" }];

let enJson = JSON.stringify(usuario);
sessionStorage.setItem("usuarios",enJson);

//creo clase para recuperar datos del sessionStorage
class objusuario {
    constructor(obj){
        this.id = obj.id;
        this.nick = obj.nick;
        this.level = obj.level;
    }

}
//se establecen arrays base modelos con ejercicios fisicos, para luego tomar de cada tipo de rutina, un solo ejercicio al azar por dia
const abdom = ['ABS Normal', 'ABS Mariposa', 'Hollow Rocks', 'Plank to touch'];
const piernas = ['Estocada', 'Estocada Lat', 'Squat', 'Squat Jump'];
const brazos = ['Flexiones', 'Curl Biceps', 'Pullups Barra', 'Push Press'];
const cardio = ['Saltos Soga', 'Burpees', 'Sprawls', 'Saltos Box'];
//se inicializa array conteniendo numero de repeticiones de cada ejercicio. Tambien se seleccionara de manera random
const repeticiones = [10,15,20,25];

// se toma por cada dia, un ejercicio de cada array base de ejercicios de forma random
const monday = [repeticiones[Math.floor(Math.random() * repeticiones.length)],abdom[Math.floor(Math.random() * abdom.length)], piernas[Math.floor(Math.random() * piernas.length)], brazos[Math.floor(Math.random() * brazos.length)], cardio[Math.floor(Math.random() * cardio.length)]] 
const tuesday = [repeticiones[Math.floor(Math.random() * repeticiones.length)],abdom[Math.floor(Math.random() * abdom.length)], piernas[Math.floor(Math.random() * piernas.length)], brazos[Math.floor(Math.random() * brazos.length)], cardio[Math.floor(Math.random() * cardio.length)]] 
const wednesday = [repeticiones[Math.floor(Math.random() * repeticiones.length)],abdom[Math.floor(Math.random() * abdom.length)], piernas[Math.floor(Math.random() * piernas.length)], brazos[Math.floor(Math.random() * brazos.length)], cardio[Math.floor(Math.random() * cardio.length)]] 
const thursday = [repeticiones[Math.floor(Math.random() * repeticiones.length)],abdom[Math.floor(Math.random() * abdom.length)], piernas[Math.floor(Math.random() * piernas.length)], brazos[Math.floor(Math.random() * brazos.length)], cardio[Math.floor(Math.random() * cardio.length)]] 
const friday = [repeticiones[Math.floor(Math.random() * repeticiones.length)],abdom[Math.floor(Math.random() * abdom.length)], piernas[Math.floor(Math.random() * piernas.length)], brazos[Math.floor(Math.random() * brazos.length)], cardio[Math.floor(Math.random() * cardio.length)]] 
const saturday = [repeticiones[Math.floor(Math.random() * repeticiones.length)],abdom[Math.floor(Math.random() * abdom.length)], piernas[Math.floor(Math.random() * piernas.length)], brazos[Math.floor(Math.random() * brazos.length)], cardio[Math.floor(Math.random() * cardio.length)]] 
//Se inicializa variable aux que sera utilizada para multiplicar las repeticiones, por un numero del 1 al 3, dependiendo del nivel del usuario
let aux=0;
//Se asigna variable boton para iniciar rutina una vez colodado id de usuario
let boton = document.getElementById("botonGralP");
boton.addEventListener("click", rutina_ejercicio);
//input1 para leer numero de id de usuario
let input1 = document.getElementById("valor");
//boton1 asignado a calcular indice de masa corporal
boton1 = document.getElementById("botonIMC");
boton1.addEventListener("click", indice_masa);
//input2 se usa para leer peso corporal en kilogramos, ingresado por el usuario
let input2 = document.getElementById("peso");
//input3 se utiliza para leer la altura en metros, ingresado por el usuario
let input3 = document.getElementById("altura");
//Se asigna una variable saludo al id del html "good morning" para imprimir saludo al usuario
let saludo = document.getElementById("goodMorning");
//Se asigna una variable suRutina al id del html "suRutina" para imprimir el listado de ejercicios del dia de la fecha
let suRutina = document.getElementById("suRutina");


//se crea funcion indice_masa() para calcular IMC
function indice_masa(){
    let indice = input2.value/(input3.value*input3.value); //calculo de IMC
    let imc= document.getElementById("imc");

    /*
    IMC < 18.5  ---------> peso bajo
    18.5 < IMC < 25 ----------> peso normal
    25 < IMC < 30 ----------> sobrepeso moderado
    IMC > 30 ----------> sobrepeso*/

    //SE AGREGA OPERADOR AND EN REEMPLAZO DE LOS if
    indice <18.5 && (imc.innerText=("Su IMC es: " + indice.toFixed(1) + "\nPESO INSUFICIENTE"));
    (indice >=18.5 && indice<25) && (imc.innerText=("Su IMC es: " + indice.toFixed(1) + "\nPESO SATISFACTORIO"));
    (indice >=25 && indice<30) && (imc.innerText=("Su IMC es: " + indice.toFixed(1) + "\nPESO MODERADO"));
    indice >=30 && (imc.innerText=("Su IMC es: " + indice.toFixed(1) + "\nSOBREPESO"));
    //Se implemento un Toastify a modo decorativo y para generar un link a una pagina de salud de la fundacion FAVALORO
    Toastify({
        text: "ENLACE FUNDACION FAVALORO",
        duration: 10000,
        destination: "https://www.fundacionfavaloro.org/salud-cardiovascular-antes-y-despues-del-infarto-bajar-de-peso-un-objetivo-clave-que-muy-pocos-cumplen/",
        newWindow: true,
        gravity: "top", 
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #cb3234, #FFFAFA)",
        },
        onClick: function(){}
      }).showToast();
    
}

//funcion que imprime ejercicios de los usuarios
function rutina_ejercicio(){
    
    //Se utilizo libreria LUXON para obtener el dia de la fecha actual
    const now = luxon.DateTime.now();
    const hoy = new Date(now.ts);
    var weekday = hoy.toDateString();
    const dias = [
        'domingo',
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
      ];
    const numeroDia = new Date(weekday).getDay();
    // constante que contiene el dia actual
    const dia = dias[numeroDia];
    console.log("Nombre de día de la semana: ", dia);
    
    //Se asigna una variable user al id "usuario" del html, para imprimir en pantalla el nombre del usuario que inicio sesion
    let user= document.getElementById("usuario");
    //Se inicializa una variable idUser para obtener el id ingresado por el usuario
    let idUser = input1.value.toLowerCase();
    //Se consulta si el id ingresado es '0' (id del administrador) para desplegar un sweet alert con las opciones del ADMIN
    if(idUser == 0){
        let listClientes = document.getElementById("listUsers");
        swal("BIENVENIDO ADMINISTRADOR", {
            buttons: {
              list: "LISTAR/ELIMINAR", // se puede ver la lista de usuarios guardados en el session storage y eliminar usuarios
              add: "AGREGAR", // se puede agregar usuarios nuevos
            },
          })
          .then((value) => {
            switch (value) {
           
              case "list":
                printUsers();
                function printUsers(){  
                    clearList (listClientes); //funcion para borrar la  pantalla de usuarios mostrados con anterioridad 
                    let userAux = recuperarUsuarios(); //se llama a funcion que recupera usuarios del session storage
                    console.log(userAux) //se almacenan los usuarios recuperados del session storage en userAux 
                    for(let constante of userAux){
                        let li = document.createElement("li");
                        li.innerHTML = JSON.stringify(constante); //se imprimen los usuarios en la pagina
                        const buttonDel = document.createElement('button'); // a cada usuario se le crea un boton para eliminar usuario
                        buttonDel.innerText = 'DEL';
                        let {id, nick, level} = constante;
                        console.log(constante)
                        buttonDel.id = id; // se asigna un id a cada boton que coincide con el id del usuario
                        buttonDel.addEventListener('click', () => { //si se activa el boton de eliminar, se desplega un sweet alert pidiendo confirmacion
                            swal("CONFIRME ELMINAR USUARIO " + nick.toUpperCase(), {
                                buttons: {
                                  confirmacion: "CONFIRMAR",
                                  cancel: "CANCEL",
                                },
                              }).then((value) => {
                                console.log(value);

                                switch (value) {    
                                    case "confirmacion":
                                        let userAux1 = recuperarUsuarios() //se llama a funcion que recupera usuarios del session storage
                                        let userfind = userAux1[userAux1.findIndex(constante => constante.id == buttonDel.id)];
                                        console.log(userfind);
                                        
                                        let index = userAux1.indexOf(userfind);
                                        userAux1.splice(index,1);
                                        let enJson = JSON.stringify(userAux1);
                                        sessionStorage.clear();
                                        sessionStorage.setItem("usuarios",enJson);
                                        console.log(usuario)
                                        printUsers();
                                        break;
                                    case "cancel":
                                        break;
                                    }

                                    
                                })
                          })
                        
                        li.appendChild(buttonDel);
                        listClientes.appendChild(li);
                    }
                    }
            
       
                
                break;
           
              case "add":
                swal({
                    text: 'INGRESE NUEVO ID".',
                    content: "input",
                    button: {
                      text: "CONFIRMAR",
                      closeModal: false,
                    }
                    }).then((value) => {
                        console.log(value);
                        const idNew = value
                        swal({
                            text: 'INGRESE NOMBRE.',
                            content: "input",
                            button: {
                                text: "CONFIRMAR",
                                closeModal: false,
                            }
                        }).then((value) => {
                            const nicknameNew = value;
                            swal({
                                text: "INGRESE NIVEL ('a','i','p')",
                                content: "input",
                                button: {
                                    text: "CONFIRMAR",
                                    closeModal: false,
                                  
                                }
                                }).then((value) => {
                                    const levelNew = value.toLowerCase();
                                    // si se ingreso una letra diferente a A, I o P. dara error
                                    if(levelNew !='a' && levelNew !='i' && levelNew !='p')
                                    {
                                        swal({
                                            title: "ERROR",
                                            text: "ERROR EN LEVEL. INGRESE 'A', 'I', 'P'",
                                            icon: "warning",
                                            button: "ACCEPT",
                                          });
                                          return
                                    }
                                    console.log(idNew, nicknameNew, levelNew);
                                    const arrayAux = {id: parseInt(idNew), nick: nicknameNew, level: levelNew }
                                    
                                    let userAux2 = recuperarUsuarios()
                                    console.log(typeof(idNew));
                                    let userexist = 0;
                                    userAux2.forEach(object =>{
                                        if(object.id === parseInt(idNew)){   //se compara con la base de datos del session Storage para ver si existe el id ingresado 
                                            console.log("usuario existe")
                                            userexist = -1;
                                        }
                                                                             
                                    });
                                        if (userexist === -1)
                                        {

                                            swal({
                                                title: "ERROR",
                                                text: "ID EXISTENTE. ELIJA OTRO",
                                                icon: "warning",
                                                button: "ACCEPT",
                                              });
                                            return
                                        }
                                        else {
                                            userAux2.push(arrayAux);
                                            console.log(userAux2);
                                            enJson = JSON.stringify(userAux2);
                                            sessionStorage.setItem("usuarios",enJson);
                                            printUsers();
                                        }
                                        swal.close();
                                })    
                            })
                        })
                  
                break;
                           
            }
          });

    }

    //si el id ingresado no es el del admin, se ejecuta directamente el siguiente codigo que imprime la rutina del dia en pantalla
    
    let userAux = recuperarUsuarios ();
    //SE UTILIZO DESESTRUCTURAR CODIGO PARA OBTENER LOS DATOS DE USERUAX[]

    let userfind1 = userAux[userAux.findIndex(constante => constante.id == idUser)];
    console.log(userfind1);
    let index1 = userAux.indexOf(userfind1);
    console.log(index1);
    if (index1 == -1){                    // si se ingreso un id incorrecto
        swal({
            title: "ERROR 404",
            text: "NO EXISTE USUARIO",
            icon: "warning",
            button: "ACEPTAR",
          });
        return;

    }
    console.log(idUser);
    
    const {id, nick, level} = userAux[index1];

    saludo.innerText="BUENOS DIAS";
    user.innerText=userAux[index1].nick.toUpperCase();
    
    //SE USA OPERADOR TERNARIO PARA REEMPLAZAR EL IF DE CONSULTA DE  LEVEL
    level.toLowerCase()== 'p' ? aux = 1: level.toLowerCase()== 'i' ? aux = 2: level.toLowerCase()== 'a' ? aux=3: alert("ERROR");
    
    switch(dia){
        
        case "lunes":
            //establezco cantidad de repeticiones segun nivel del cliente
            print_list(monday,aux);
            break;
        case "martes":
            print_list(tuesday,aux);
            break;
        case "miercoles":
            print_list(wednesday,aux);
            break;
        case "jueves":
            print_list(thursday,aux);
            break;
        case "viernes":
            print_list(friday,aux);
            break;
        case "sabado":
            console.log('hola');
            print_list(saturday,aux);
            
            break;
        case "domingo":
            swal({
                title: "FIN DE SEMANA",
                text: "DIA DE DESCANSO!",
                button: "ATRAS",
              });
        break;

    }  
    //funcion que imprime en pantalla la rutina del dia
    function print_list(day, aux){
        suRutina.innerText="Su rutina del dia " + dia + " es: ";
        let listaEjercicios = document.getElementById("lista");
        console.log(aux);
        console.log(day);
        if ( listaEjercicios.hasChildNodes() )
        {
            while ( listaEjercicios.childNodes.length >= 1 )
            {
                listaEjercicios.removeChild( listaEjercicios.firstChild );
            }
        }
        for(let constante1 of day){
            let li = document.createElement("li");
            day[0]===constante1 && (constante1 = day[0]*aux);
            li.innerHTML = constante1;
            listaEjercicios.appendChild(li);
           
        }
    
    }
    //funcion que borra de pantalla el listado de clientes
    function clearList (listClientes){
        if ( listClientes.hasChildNodes() )
            {
                while ( listClientes.childNodes.length >= 1 )
                    {
                        listClientes.removeChild( listClientes.firstChild );
                    }
            }
    }
    //funcion que recupera los usuarios del session storage
    function recuperarUsuarios (){
        const almacenados = JSON.parse(sessionStorage.getItem("usuarios"));// se recuperan los usuarios almacenados en el sessionstorage
        const userAux = [];
        for(const objetos of almacenados){
            userAux.push(new objusuario(objetos));
        }
        console.log(userAux); //se almacenan los usuarios recuperados del session storage en userAux 
        return userAux;
    }

}
//el codigo restante es para ver la rutina de cualquier dia de la semana, segun se seleccione en el campo correspondiente
boton2 = document.getElementById("botonprox");
boton2.addEventListener("click", mostrar);
let inputDay = document.getElementById("proxima");

function mostrar(){
    const mondayaux = acomodar(monday);
    const tuesdayaux = acomodar(tuesday);
    const wednesdayaux = acomodar(wednesday);
    const thursdayaux = acomodar(thursday);
    const fridayaux = acomodar(friday);
    const saturdayaux = acomodar(saturday);
    let rut_fut = document.getElementById("rutinaFutura");
    rut_fut.innerText = "La rutina establecida para el dia " + inputDay.value + " es:";
    let ejercicioFuturo = document.getElementById("listaFutura");

    //se utiliza el metodo slice para realizar una copia de la rutina del dia, y se la ordena alfabeticamente segun metodo sort

    function acomodar(valor){
        valoraux = valor.slice(); //duplico array para no pisar el original
        valoraux.shift(); //borro cantidad de repeticiones ubicadas en la posicion [0]
        valoraux.sort(); // uso metodo de ordenamiento 
        return(valoraux) //retorno array modificado, listo para imprimir en pantalla
        
    }
    switch(inputDay.value.toLowerCase()){

        case "lunes":
                        
            for(let constante of mondayaux){
                let li = document.createElement("li");
                li.innerHTML = constante;
                ejercicioFuturo.appendChild(li);
            }
            
        break;
        case "martes":
                       
            for(let constante of tuesdayaux){
                let li = document.createElement("li");
                li.innerHTML = constante;
                ejercicioFuturo.appendChild(li);
            }
        break;
        case "miercoles":
                            
            for(let constante of wednesdayaux){
                let li = document.createElement("li");
                li.innerHTML = constante;
                ejercicioFuturo.appendChild(li);
            }
        break;
        case "jueves":
              
            for(let constante of thursdayaux){
                let li = document.createElement("li");
                li.innerHTML = constante;
                ejercicioFuturo.appendChild(li);
            }
            
        break;
        case "viernes":
                            
            for(let constante of fridayaux){
                let li = document.createElement("li");
                li.innerHTML = constante;
                ejercicioFuturo.appendChild(li);
            }
            
        break;
        case "sabado":
      
            for(let constante of saturdayaux){
                let li = document.createElement("li");
                li.innerHTML = constante;
                ejercicioFuturo.appendChild(li);
            }
        break;
        case "domingo":
      
            swal({
                title: "FIN DE SEMANA",
                text: "DIA DE DESCANSO!",
                button: "ATRAS",
              });
            
        break;
        
    }

    return
}


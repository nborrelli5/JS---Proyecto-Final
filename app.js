//OBJECT estado del personaje. Carga el objeto los valores almacenados en local storage.
const estado = {"hambre":(localStorage.getItem('hambre')),
                "sed":(localStorage.getItem('sed')),
                "frio":(localStorage.getItem('frio')),
                "energia":(localStorage.getItem('energia'))
};
//Actualiza la barra de estado en el DOM
document.getElementById('hambre').innerHTML = estado.hambre;
document.getElementById('sed').innerHTML = estado.sed;
document.getElementById('frio').innerHTML = estado.frio;
document.getElementById('energia').innerHTML = estado.energia;

let comida;
let agua;
let madera;
//ARRAY items recolectados.
const recolectados=[{"item":"comida","cantidad":(localStorage.getItem('comida')),"posibilidad de encontrar":350}, 
                    {"item":"agua","cantidad":(localStorage.getItem('agua')),"posibilidad de encontrar":40},
                    {"item":"madera","cantidad":(localStorage.getItem('madera')),"posibilidad de encontrar":50}
]
//Actualiza cantidades de la 'Mochila' en el DOM
document.getElementById('comida').innerHTML = recolectados[0].cantidad; 
document.getElementById('agua').innerHTML = recolectados[1].cantidad;          
document.getElementById('madera').innerHTML = recolectados[2].cantidad;           
//FUNCION cálculo posibilidad de encontrar objetos.
const aleatorio = numOrden =>  (Math.floor(Math.random()*100)<(recolectados[numOrden]["posibilidad de encontrar"]));
//FUNCION derrota si un estado llega a cero.
function derrota(estadoEnCero) {
    if (estadoEnCero<= 0) {
        Swal.fire({
            html:"¡¡PERDISTE!!"+ "\n"+ "\n" +"Alguno de tus estados llegó a cero.",
            color:"#daa520",
            confirmButtonText: "Cerrar",
            buttonsStyling: false,
            backdrop:"#680f0f9d",
            customClass:{
                popup:"swal-container",
                confirmButton:"swal-confirm"
            }
        })
    }
};
let btnReiniciar=document.getElementById("reiniciar");
let btnIncursion=document.getElementById("incursion");
let btnComer=document.getElementById("comer");
let btnBeber=document.getElementById("beber");
let btnFuego=document.getElementById("fuego");
let btnDormir=document.getElementById("dormir");

// INCURSION
btnIncursion.onclick = () => {
    let incursion = []; //Array para agrupar items conseguidos durante la incursión, luego se vacía.
    let comidaP; //Variables para los cálculos de Porcentaje.
    let aguaP;
    let maderaP;
    if (comidaP = (aleatorio(0))) { //Si el valor de 'aleatorio' supera el valor de 'posibilidad de encontrar' lo suma a 'Incursión' y suma en 1 el item en la 'mochila'.            
        incursion.push("Comida")
        recolectados[0].cantidad ++
        localStorage.setItem('comida',recolectados[0].cantidad);
        document.getElementById('comida').innerHTML = recolectados[0].cantidad
    }if (aguaP = (aleatorio(1))) {                
        incursion.push("Agua")
        recolectados[1].cantidad ++
        localStorage.setItem('agua',recolectados[1].cantidad);
        document.getElementById('agua').innerHTML = recolectados[1].cantidad
    }if (maderaP = (aleatorio(2))) {      
        incursion.push("Madera")
        recolectados[2].cantidad ++
        localStorage.setItem('madera',recolectados[2].cantidad);
        document.getElementById('madera').innerHTML = recolectados[2].cantidad
    }
    Swal.fire({
        html:"Tras varias horas de búsqueda vuelves al refugio con el siguiente botín: <br>" + incursion, 
        color:"#daa520",
        confirmButtonText: "Cerrar",
        buttonsStyling: false,
        customClass:{
            popup:"swal-container",
            confirmButton:"swal-confirm"
        }
    })
    incursion.pop();
    estado.energia -= 20;
    estado.hambre -= 15;
    estado.sed -= 10;
    estado.frio -= 20;
    localStorage.setItem('hambre',estado.hambre);
    localStorage.setItem('frio',estado.frio);
    localStorage.setItem('energia',estado.energia);
    localStorage.setItem('sed',estado.sed);
    document.getElementById('hambre').innerHTML = estado.hambre; //Actualiza valores de estados en html.
    document.getElementById('sed').innerHTML = estado.sed;
    document.getElementById('frio').innerHTML = estado.frio;
    document.getElementById('energia').innerHTML = estado.energia;
    derrota(estado.hambre);
    derrota(estado.sed);
    derrota(estado.frio);
};

//ACCIONES 
//COMER
btnComer.onclick = () => {
    Swal.fire({  // SWAL Pregunta si se quiere consumir o no.
        title:"Comer Algo",
        html: "Consume el alimento disponible en la mochila <br><strong>Recupera: +50 Hambre</strong> <br><strong class='texto-rojo my-3'>Costo: 1 Comida</strong>",
        color:"#daa520",
        confirmButtonText: "Confirmar",
        showDenyButton: true,
        denyButtonText: "Cancelar",
        buttonsStyling: false,
        customClass:{popup:"swal-container",
                    title:"swal-titulo",
                    confirmButton:"swal-confirm",
                    denyButton:"swal-deny"}
    }).then((result)=>{
        if (result.isConfirmed){
            if  ((recolectados[0].cantidad)>=1){ //valida que tenga alimento para consumir.
                if (estado.hambre>50) {  //condicional para que el valor no supere '100'.
                    estado.hambre=100
                }
                else {estado.hambre = estado.hambre + 50}
                recolectados[0].cantidad --;
                document.getElementById('comida').innerHTML = recolectados[0].cantidad;
                Swal.fire({
                    html:"Calientas lo poco que tienes de comida en el fuego y lo consumes de un bocado <br><strong class='texto-verde my-3'> Hambre + 50</strong>Ahora tienes:"+estado.hambre, 
                    color:"#daa520",
                    confirmButtonText: "Cerrar",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-container",
                        confirmButton:"swal-confirm"
                    }
                })
                document.getElementById('hambre').innerHTML = estado.hambre
                localStorage.setItem('hambre',estado.hambre);            
            }else Swal.fire({ //SWAL si confirma pero no tiene comida en la mochila.
                html:"No tienes nada para comer.",
                color:"#daa520",
                confirmButtonText: "Cerrar",
                buttonsStyling: false,
                customClass:{
                    popup:"swal-container",
                    confirmButton:"swal-confirm"
                }
            });
        }
    })
};
// BEBER
btnBeber.onclick = () => {
    Swal.fire({
        title:"Beber Agua",
        html: "Consume el agua recolectada. <br><strong>Recupera: +20 Sed</strong> <br><strong class='texto-rojo my-3' >Costo: 1 Agua</strong>",
        color:"#daa520",
        confirmButtonText: "Confirmar",
        showDenyButton: true,
        denyButtonText: "Cancelar",
        buttonsStyling: false,
        customClass:{popup:"swal-container",
                    title:"swal-titulo",
                    confirmButton:'swal-confirm',
                    denyButton:'swal-deny'}
    }).then((result)=>{
        if (result.isConfirmed){
            if  ((recolectados[1].cantidad)>=1){
                if (estado.sed>80) {
                    estado.sed=100
                }
                else {estado.sed = estado.sed + 20}
                recolectados[1].cantidad --;
                document.getElementById('agua').innerHTML = recolectados[1].cantidad;
                Swal.fire({
                    html:"Bebes un poco de agua<br><strong class='texto-verde my-3'> Sed + 20</strong>Ahora tienes:"+estado.sed, 
                    color:"#daa520",
                    confirmButtonText: "Cerrar",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-container",
                        confirmButton:"swal-confirm"
                    }
                })               
                document.getElementById('sed').innerHTML = estado.sed
                localStorage.setItem('sed',estado.sed);                            
            }else Swal.fire({
                html:"No tienes nada para beber.",
                color:"#daa520",
                confirmButtonText: "Cerrar",
                buttonsStyling: false,
                customClass:{
                    popup:"swal-container",
                    confirmButton:"swal-confirm"
                }
            });
        }
    })
};
// FUEGO
btnFuego.onclick = () => {
    Swal.fire({
        title:"Alimentar la fogata",
        html: "Puedes usar madera para reanimar la fogata. <br><strong>Recupera: +25 Frío</strong> <br><strong class='texto-rojo my-3' >Costo: 1 Madera</strong>",
        color:"#daa520",
        confirmButtonText: "Confirmar",
        showDenyButton: true,
        denyButtonText: "Cancelar",
        buttonsStyling: false,
        customClass:{popup:"swal-container",
                    title:"swal-titulo",
                    confirmButton:'swal-confirm',
                    denyButton:'swal-deny'}
    }).then((result)=>{
        if (result.isConfirmed){
            if  ((recolectados[2].cantidad)>=1){
                if (estado.frio>75) {
                    estado.frio=100
                }
                else {estado.frio = estado.frio + 25}
                recolectados[2].cantidad --;
                document.getElementById('madera').innerHTML = recolectados[2].cantidad;
                Swal.fire({
                    html:"Arrojas unos troncos al fuego<br><strong class='texto-verde my-3'> Resistencia al frío + 25</strong>Ya no sientes tanto frío:"+estado.frio, 
                    color:"#daa520",
                    confirmButtonText: "Cerrar",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-container",
                        confirmButton:"swal-confirm"
                    }
                })               
                document.getElementById('frio').innerHTML = estado.frio
                localStorage.setItem('frio',estado.frio);            
            }else Swal.fire({
                html:"No tienes madera para alimentar el fuego.",
                color:"#daa520",
                confirmButtonText: "Cerrar",
                buttonsStyling: false,
                customClass:{
                    popup:"swal-container",
                    confirmButton:"swal-confirm"
                }
            });
        }
    })
};
//Dormir
btnDormir.onclick = () => {
    Swal.fire({
        title:"Echarse a dormir",
        html: "Recuperas toda la energía pero afectas tus otros estados. <br><strong>Recupera: +100 energía</strong> <br><strong class='texto-rojo my-3' >Costo: -20 Hambre <br> -15 Sed<br> -25 Frío </strong>",
        color:"#daa520",
        confirmButtonText: "Confirmar",
        showDenyButton: true,
        denyButtonText: "Cancelar",
        buttonsStyling: false,
        customClass:{popup:"swal-container",
                    title:"swal-titulo",
                    confirmButton:'swal-confirm',
                    denyButton:'swal-deny'}
    }).then((result)=>{
        if (result.isConfirmed){
            estado.energia = 100;
            estado.hambre -= 20;
            estado.sed -= 15;
            estado.frio-= 25;
            localStorage.setItem('hambre',estado.hambre);
            localStorage.setItem('sed',estado.sed);
            localStorage.setItem('frio',estado.frio);
            localStorage.setItem('energia',estado.energia);        
            document.getElementById('hambre').innerHTML = estado.hambre;
            document.getElementById('sed').innerHTML = estado.sed;
            document.getElementById('frio').innerHTML = estado.frio;
            document.getElementById('energia').innerHTML = estado.energia;
            derrota(estado.hambre);
            derrota(estado.sed);    
            derrota(estado.frio);
            Swal.fire({
                html:"Encuentras un espacio cómodo dentro de la cueva y te recuestas.<br>Recuperaste energía pero tus otras estadísticas se vieron afectadas.", 
                color:"#daa520",
                confirmButtonText: "Cerrar",
                buttonsStyling: false,
                customClass:{
                    popup:"swal-container",
                    confirmButton:"swal-confirm"
                }
            })               
        }
    })
};
btnReiniciar.onclick = () => {
    estado.hambre=100;
    estado.sed=100;
    estado.frio=100;
    estado.energia=100;
    localStorage.setItem('hambre',estado.hambre);
    localStorage.setItem('sed',estado.sed);
    localStorage.setItem('frio',estado.frio);
    localStorage.setItem('energia',estado.energia);
    document.getElementById('hambre').innerHTML = 100;
    document.getElementById('sed').innerHTML = 100;
    document.getElementById('frio').innerHTML = 100;
    document.getElementById('energia').innerHTML = 100;
    recolectados[0].cantidad=2;
    recolectados[1].cantidad=1;
    recolectados[2].cantidad=1;
    localStorage.setItem('comida',recolectados[0].cantidad);
    localStorage.setItem('agua',recolectados[1].cantidad);
    localStorage.setItem('madera',innerHTML = recolectados[2].cantidad);
    document.getElementById('comida').innerHTML = recolectados[0].cantidad
    document.getElementById('agua').innerHTML = recolectados[1].cantidad
    document.getElementById('madera').innerHTML = recolectados[2].cantidad
};

async function traducir () {
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '16591e9cecmsh9d0a2638bd27c26p10452fjsn48daf2cf0b43',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'es',
            target_language: 'en',
            text: 'simulador'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result)
        // const p=document.createElement('p')
        // p.innerHTML=`123asd`
    } catch (error) {
        console.error(error);
    }
    }
console.log(traducir())
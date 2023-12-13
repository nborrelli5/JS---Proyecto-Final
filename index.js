//OBJECT estado del personaje
const estado = {"hambre":100,"sed":100,"frio":100,"energia":100};
//FUNCION para mostrar estado del personaje
function estadoAlert() {return (alert("Estado del personaje:" + "\n" + "\n" + "Hambre: " + estado.hambre + "\n" +
"Sed: " + estado.sed + "\n" + "Resistencia al frío: " + estado.frio + "\n" +
"energia: " + estado.energia))}
//ARRAY items
const items =  [{"item":"animal pequeño","saciedad":50,"hidratacion":0 ,"posibilidad de encontrar":0.35},
                {"item":"agua"          ,"saciedad":0 ,"hidratacion":20,"posibilidad de encontrar":0.4},
                {"item":"madera"        ,"saciedad":0 ,"hidratacion":0 ,"posibilidad de encontrar":0.5} 
]
let animal;
let agua;
let madera;
//ARRAY items recolectados
const recolectados = [];
//FUNCION contador items recolectados
function contadorRepetidos(contadorArray) {
    let contadorItems = {};    
    contadorArray.forEach((cantidad) => {
    contadorItems[cantidad] = (contadorItems[cantidad] || 0) + 1;
    });
    if (recolectados<1){ alert("La mochila está vacía")
    }else for (let itemRecolectado in contadorItems) {
        alert(itemRecolectado + ": " + contadorItems[itemRecolectado] + " unidad/es");
}}  
//FUNCION restar items al usarlos
const restar=(item)=>{
    let indice=recolectados.indexOf(item)
    if (indice>=0){
        recolectados.splice(indice,1)
    }
}

//FUNCION cálculo posibilidad de encontrar objetos
const aleatorio = porcentaje =>  (Math.floor(Math.random()*100)<porcentaje);
//FUNCION derrota si un estado llega a cero
function derrota(estadoEnCero) {
    if (estadoEnCero<= 0) {
    alert("¡¡PERDISTE!!"+ "\n"+ "\n" +"Alguno de tus estados llegó a cero.");
    salir=true;
    }
}

localStorage.setItem('hambre',estado.hambre);
localStorage.setItem('sed',estado.sed);
localStorage.setItem('frio',estado.frio);
localStorage.setItem('energia',estado.energia);



let botonEstado=document.getElementById("estado");
let botonMochila=document.getElementById("mochila");
let botonIncursion=document.getElementById("incursion");
let botonComer=document.getElementById("comer");
let botonBeber=document.getElementById("beber");
let botonFuego=document.getElementById("fuego");
let botonDormir=document.getElementById("dormir");

if( botonEstado!== null){
    botonEstado.onclick = () => {estadoAlert()}; 
    let storageHambre = sessionStorage.getItem('hambre');
    botonMochila.onclick = () => {contadorRepetidos(recolectados)};

    botonIncursion.onclick = () => {
        let incursion = [];
        let animalP
        let aguaP
        let maderaP
        if (animalP = (aleatorio(35))) {                
    recolectados.push("animal")
    incursion.push("Animal");

        }if (aguaP = (aleatorio(40))) {                
    recolectados.push("agua")
    incursion.push("Agua");

        }if (maderaP = (aleatorio(50))) {                
    recolectados.push("madera")
    incursion.push("Madera");
        }
        alert("Tras varias horas de búsqueda vuelves al refugio con el siguiente botín: " + incursion);
        incursion.pop()
        estado.energia = estado.energia-20
        estado.hambre = estado.hambre-15
        estado.sed = estado.sed-10
        estado.frio=estado.frio-20

        localStorage.setItem('hambre',estado.hambre);
        localStorage.setItem('sed',estado.sed);
        localStorage.setItem('frio',estado.frio);
        localStorage.setItem('energia',estado.energia);

        derrota(estado.hambre);
        derrota(estado.sed);
        derrota(estado.frio)};

} else {
	
    botonComer.onclick = () => {
        if  (recolectados.includes("animal")){
            if ((estado.hambre = estado.hambre + 50)>100) {
                estado.hambre=100
            }
            else {estado.hambre = estado.hambre + 50};
            alert("Calientas lo poco que tienes de comida en el fuego y lo consumes de un bocado" + "\n" + "Hambre + 15" + "\n" + "Ahora tienes: " + estado.hambre );
            restar("animal");
        }else alert("No tienes nada para comer.");
    };

    botonBeber.onclick = () => {
        if  (recolectados.includes("agua")){
            if ((estado.sed = estado.sed + 20)>100) {
                estado.sed=100
            }
            else {estado.sed = estado.sed + 20};
            alert("Bebes un poco de agua" + "\n" + "Sed + 20" + "\n" + "Ahora tienes: " + estado.sed );
            restar("agua");
        }else alert("No tienes agua para beber.");
    };
    botonFuego.onclick = () => {
        if  (recolectados.includes("madera")){
            if ((estado.frio = estado.frio + 25)>100) {
                estado.frio=100
            }
            else {estado.frio = estado.frio + 25};
            alert("Arrojas unos troncos al fuego" + "\n" + "Resistencia al frío + 25" + "\n" + "Ya no sientes tanto frío: " + estado.frio );
            restar("madera");
        }else alert("No tienes madera para tirar al fuego.");
    };
    botonDormir.onclick = () => {
        if ((estado.energia = estado.energia + 90)>100) {
            estado.energia=100;
        }else estado.energia= estado.energia+90;
        estado.hambre = estado.hambre-20;
        estado.sed = estado.sed-15;
        estado.frio=estado.frio-25;
        alert("Encuentras un espacio cómodo dentro de la cueva y te recuestas." + "\n" 
        + "Recuperaste energía pero tus otras estadísticas se vieron afectadas.");
        estadoAlert();
        derrota(estado.hambre);
        derrota(estado.sed);    
        derrota(estado.frio);
        }
    }


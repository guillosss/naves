document.addEventListener("DOMContentLoaded",function(){
    const cuadrosTablero = document.querySelectorAll(".tablero div")
    const resultadoAliens = document.querySelector(".conteo")
    let cuadros = 15;
    let posicionNave = 202;
    let posicionAliens = 0;
    let aliensMuertos = [];
    let resultado = 0;
    let direccion = 1;
    let iraDerecha=true;
    let alienID = 0;
    let aliens = [  ]
    for (i=0;i<30;i++){
        
            aliens.push(i)
    }
    console.log(aliens)

   

    // aliens.forEach(alien => cuadrosTablero[posicionAliens+alien].classList.add("aliens"))

    function ubicarAliens(){
        for(let index = 0; index < aliens.length; index++){
            if(!aliensMuertos.includes(index)){
            cuadrosTablero[aliens[index]].classList.add("aliens")
        }
        }

    }

    ubicarAliens();

    function quitarAliens(){
        for(let index = 0; index < aliens.length; index++){
            cuadrosTablero[aliens[index]].classList.remove("aliens")
        }

    }
    

    cuadrosTablero[posicionNave].classList.add('nave')
  
    // para mover la nave a los lados

    function moverNave(evento){

        cuadrosTablero[posicionNave].classList.remove('nave')
        switch(evento.key){
            case "ArrowLeft":
                if(posicionNave % cuadros !== 0){
                    posicionNave -= 1;
                }
            break
            case "ArrowRight":
                if((posicionNave % cuadros) < cuadros -1){
                    posicionNave += 1;
                }
            break;
            
            
        }
        cuadrosTablero[posicionNave].classList.add("nave")
    }
    document.addEventListener('keydown',moverNave)

    //mover aliens

    function moverAliens(){
        //limite tablero izquierda 
        const limiteIzquierda = (aliens[0] % cuadros) ===0;
        const limiteDerecha = (aliens[aliens.length -1]% cuadros)=== cuadros -1;
        quitarAliens()

        //mover cuadros a la derecha 

        if(limiteDerecha && iraDerecha){
            for (let i =0; i < aliens.length; i++){
                aliens[i] += cuadros +1;
                direccion = -1;
                iraDerecha=false;
            }
    }

    // mover a la derecha 
    if(limiteIzquierda && !iraDerecha){
        for(let i =0; i < aliens.length; i++){
            aliens[i] += cuadros -1;
            direccion = 1;
            iraDerecha=true;
        }
    }

    for (let i =0; i < aliens.length; i++){
        aliens[i]+= direccion;
    }
    ubicarAliens();
    if(cuadrosTablero[posicionNave].classList.contains("aliens")){
        alert("perdiste");
        location.reload();
    }
}
moverAliens();
alienID=setInterval(moverAliens,500)
// funcion para disparar las balas 
function disparar(evento){
let balaId;
let posicionBala=posicionNave;
// mover la bala 
function moverBala(){
    cuadrosTablero[posicionBala].classList.remove("balas");
    posicionBala -= cuadros;
    cuadrosTablero[posicionBala].classList.add("balas");
//matar aliens
if(cuadrosTablero[posicionBala].classList.contains("aliens")){
    cuadrosTablero[posicionBala].classList.remove("aliens");
    cuadrosTablero[posicionBala].classList.remove("balas");
    cuadrosTablero[posicionBala].classList.remove("explocion");
    //tiempo explocion
    setTimeout(()=>cuadrosTablero[posicionBala].classList.remove("explosiom"),300)
    clearInterval(balaId);

    //buscar la posicion del alieen eliminado
    //guardarlo en el array aliens eliminados

    const alienEliminado=aliens.indexOf(posicionBala);
    aliensMuertos.push(alienEliminado);
    resultado++;
    resultadoAliens.textContent=resultado;
    if (resultado===30){
        alert("ganaste")
    }
}
}
switch(evento.key){
    case "ArrowUp" :balaId=setInterval(moverBala,100);
    break;
}

}
document.addEventListener("keydown", disparar);

});
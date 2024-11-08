window.onload = function() {

    const topeDerecha = 1850;
    const topeIzquierda = 0;

    let fondo, ctxFondo, frente, ctxFrente;
    let xDerecha, xIzquierda, correr, saltar;
    let yAntesDelSalto = false;
    let haSaltado = false;
    let haLLegadoArriba = false;

    let idPersonaje

    function Personaje() {
        this.x = 120;
        this.y = 830;
        this.velocidad = 1.5; 
        this.velocidadSalto = 5; 
        this.tamañoX = 70;
        this.tamañoY = 70;
    }

    Personaje.prototype.generaPosicionDerecha = function() {

        this.x += this.velocidad;
        if (this.x > topeDerecha) {
            this.x = topeDerecha;
        }

    }

    Personaje.prototype.generaPosicionIzquierda = function() {

        this.x -= this.velocidad;
        if (this.x < topeIzquierda) {
            this.x = topeIzquierda;
        }

    }

    Personaje.prototype.personajeCorriendo = function() {
        this.velocidad = 3; 
    }

    Personaje.prototype.personajeAndando = function() {
        this.velocidad = 1.5; 
    }

    Personaje.prototype.personajeSaltando = function() {

        if (haSaltado === false) {
            yAntesDelSalto = this.y;
            haSaltado = true;
        }

        if (haLLegadoArriba === false) {

            this.y -= this.velocidadSalto;
            if (this.y <= yAntesDelSalto - 250) {
                haLLegadoArriba = true;
            }

        }

        if (haLLegadoArriba === true) {

            this.y += this.velocidadSalto;
            if (this.y >= yAntesDelSalto) {

                this.y = yAntesDelSalto;
                saltar = false;
                haSaltado = false;
                haLLegadoArriba = false;

            }
        }
    }

    function moverPersonaje(timestamp) {

        if (xDerecha) {
            protagonista.generaPosicionDerecha();
        }

        if (xIzquierda) {
            protagonista.generaPosicionIzquierda();
        }

        if (correr) {
            protagonista.personajeCorriendo();
        }

        if (correr == false) {
            protagonista.personajeAndando();
        }

        if (saltar) {
            protagonista.personajeSaltando();
        }

        ctxFrente.clearRect(0, 0, 1920, 1080);
        ctxFrente.fillStyle = "#da3737";
        ctxFrente.fillRect(protagonista.x, protagonista.y, protagonista.tamañoX, protagonista.tamañoY);

    }

    function fondoNivel1() {
        ctxFondo.fillStyle = "#bef3ff";
        ctxFondo.fillRect(0, 0, 1920, 900);
        ctxFondo.fillStyle = "#683415";
        ctxFondo.fillRect(0, 900, 1920, 180);
    }

    function activaMovimiento(evt) {
        
        switch (evt.keyCode) {
            case 65:
                xIzquierda = true;
                break;
            case 68:
                xDerecha = true;
                break;
            case 83:
                correr = true;
                break;
            case 32:
                saltar = true;
                break;
        }
    }

    function desactivaMovimiento(evt) {

        switch (evt.keyCode) {
            case 65:
                xIzquierda = false;
                break;
            case 68:
                xDerecha = false;
                break;
            case 83:
                correr = false;
                break;
        }
    }

    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false);

    fondo = document.getElementById("fondo");
    frente = document.getElementById("frente");

    ctxFondo = fondo.getContext("2d");
    ctxFrente = frente.getContext("2d");

    let protagonista = new Personaje();

    fondoNivel1();

    idPersonaje = setInterval(moverPersonaje,24/1000);
}

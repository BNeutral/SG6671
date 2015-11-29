var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var pitch = 0;
var pitchRate = 0;
var yaw = 0;
var yawRate = 0;
var joggingAngle = 0;
var speed = 0;    

var yPosInicial= 1;
var xPos = 0;
var yPos = yPosInicial;
var zPos = 0;
var deltaX=0;
var deltaY=0.1;

var ultimoTiempo = 0;

var currentlyPressedKeys = {};
var cDelay = 0;

function handleMouseDown(event) 
{
  mouseDown = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
}

function handleMouseUp(event) 
{
  mouseDown = false;
}
function handleMouseMove(event) 
{
  if (!mouseDown) 
    return;
  var newX = event.clientX;
  var newY = event.clientY;
  deltaX = newX - lastMouseX;
  deltaY = newY - lastMouseY;
}

function handleKeyDown(event)
{
    currentlyPressedKeys[event.keyCode] = true;
}
function handleKeyUp(event) 
{
    currentlyPressedKeys[event.keyCode] = false;
}

function animate(deltaT) 
{
    if (speed != 0) 
    {
        xPos -= Math.sin(yaw) * speed * deltaT;
        zPos -= Math.cos(yaw) * speed * deltaT;
        joggingAngle += deltaT * 16;
        yPos = Math.sin(joggingAngle) / 16 + yPosInicial;
    }
    
    yaw += yawRate * deltaT * 16;
    pitch += pitchRate * deltaT * 16;
    pitch -= deltaY/3000;
    yaw -= deltaX/3000;
    
    if (!mouseDown) 
    {
      deltaX=0;
      deltaY=0;
    }
    
    if (cDelay > 0) cDelay -= deltaT;
}

//Cuando se cambia de camara, debo volver al angulo inicial
function reiniciarAngulo() 
{
    pitch = 0;
    yaw = 0;
}

function handleKeys() {
    if (currentlyPressedKeys[33]) {
        // Page Up
        pitchRate = 0.1;
    } else if (currentlyPressedKeys[34]) {
        // Page Down
        pitchRate = -0.1;
    } else {
        pitchRate = 0;
    }

    if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
      // Izquierda o A
      yawRate = 0.1;
    } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
      // Derecha o D
      yawRate = -0.1;
    } else {
      yawRate = 0;
    }

    //Las siguientes solamente deberian funcionar si estoy en modo primera persona
    if(escena.numeroCamara()==0) {
        if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) // Arriba o W
        {
            speed = 3;
        } 
        else if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) // Abajo
        {
            speed = -3;
        } 
        else 
        {
          speed = 0;
        }
    }

    if (currentlyPressedKeys[67] && cDelay <= 0) 
    {
        // Letra c, cambiar camara
        escena.cambiarCamara();
        reiniciarAngulo();
        // Como vas a poner un sleep?
        cDelay = 0.2;
    } 
    // Aprete ESC para renderear como lineas
    if (currentlyPressedKeys[27]) renderizarLineas = 1;
    else renderizarLineas = 0;
}
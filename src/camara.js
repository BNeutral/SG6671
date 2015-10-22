/**
 * Representa una camara
 * @param {type} ancho      Ancho del display
 * @param {type} alto       Alto del display
 * @returns {Camara}
 * pos[x,y,z] : Position de la camara
 * look[x,y,z] : Hacia donde mira la camara
 * up[x,y,z] : Para el tilt de la camara
 * modo : Alguno de los siguientes : ortog / persp
 * Llamar a recalc para recalcular.
 */
function Camara(ancho, alto)
{
    this.viewM = mat4.create();
    this.projM = mat4.create();
    this._ancho = ancho;
    this._alto = alto;
    
    this.pos = new vec3.fromValues(0,1,3);
    this.look = new vec3.fromValues(0,0,-1);
    this.up = new vec3.fromValues(0,1,0);
    this.modo = "persp";
    
    this.activa = false;
    
    this.pitch = 0;
    this.yaw = 0;
    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;
    this.deltaX = 0;
    this.deltaY = 0;

}

Camara.prototype.setVariables = function(p,y,x,y,z,dX,dY) 
{
    this.pitch = p;
    this.yaw = y;
    this.xPos = x;
    this.yPos = y;
    this.zPos = z;
    this.deltaX = dX;
    this.deltaY = dY;
};

/**
 * Prepara cosas de webgl con las matrices
 * @returns {undefined}
 */
Camara.prototype.setUp = function()
{
    this.recalcView();
    this.recalcProj();  
};

/**
 * Recacula la projection matrix
 * @returns {undefined}
 */
Camara.prototype.recalcProj = function()
{
    mat4.identity(this.projM);
    if (this.modo === "persp")
    {
       mat4.perspective(this.projM, Math.PI/2, this._ancho/this._alto, 0.1, 10000.0);
    }
    if (this.modo === "ortog")
    {
        mat4.ortho(this.projM, 0,10,0,10, 0.1, 10000.0);
    }
};

/**
 * Setea la camara
 * @returns {undefined}
 */
Camara.prototype.dibujar = function() 
{
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.projM);
    gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, this.viewM); 
};

/**
 * Metodo para heredar y agregarle comportamiento a distintos tipos de camara
 * @returns {undefined}
 */
Camara.prototype.update = function(deltaT) 
{
	this.setUp();
};
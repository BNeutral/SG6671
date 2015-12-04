var zero = vec3.fromValues(0,0,0);
var yUp = vec3.fromValues(0,1,0);
var zAdelante = vec3.fromValues(0,0,-1);
var mIdentidad = mat4.create();

/**
 * Representa una camara
 * @param {type} ancho      Ancho del display
 * @param {type} alto       Alto del display
 * @returns {Camara}
 * modo : Alguno de los siguientes : ortog / persp
 * Llamar a recalc para recalcular.
 */
function Camara(ancho, alto)
{
    this.viewM = mat4.create();
    this.projM = mat4.create();
    this._ancho = ancho;
    this._alto = alto;
    
    this.activa = false;
    
    this.pitch = 0;
    this.yaw = 0;    
    this.pos = vec3.fromValues(0,0,0);
    this.menosPos = vec3.create();
    //this.viewDir = vec3.fromValues(0,0,-1);
    
    this.modo = "persp";

    this.setUp();
}

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
       mat4.perspective(this.projM, Math.PI/4, this._ancho/this._alto, 0.1, 10000.0);
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
    gl.uniform3fv(shaderProgram.posCamara, this.pos); 
};

/**
 * Actualiza la matriz de vista y la posicion inversa
 * @returns {undefined}
 */
Camara.prototype.update = function(deltaT) 
{
    vec3.negate(this.menosPos, this.pos);
    this.recalcView();
};
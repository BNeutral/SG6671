/**
 * Representa una escena con camaras y objetos
 * @param {type} camara     Una camara
 * @returns {Escena}
 */
function Escena(camara)
{
    this.hijos = [];
    this.camaras = [];
    this.camaraActual = 0;
    this.agregarCamara(camara);
    this.luz = vec3.fromValues(1, -1, -1);
    vec3.normalize(this.luz,this.luz);
    this.colorLuz = vec3.fromValues(1,1,1);
    this.colorAmbiente = vec3.fromValues(1,1,1);

}

/**
 * Agrega un objeto a la lista para dibujar/actualizar
 * @param {type} objeto
 * @returns {undefined}
 */
Escena.prototype.agregarObjeto = function(objeto)
{
    this.hijos.push(objeto);
};

/**
 * Agrega una camara a la lista de camaras
 * @param {type} camara
 * @returns {undefined}
 */
Escena.prototype.agregarCamara = function(camara)
{
    this.camaras.push(camara);
    camara.setUp();
    if (this.camaras.length === 1) 
    {
        camara.activa = true;
    }
};

/**
 * Cambia la camara actual a la proxima en la lista.
 */
Escena.prototype.cambiarCamara = function()
{
  
  if (this.camaraActual >= (this.camaras.length-1)) {
    this.camaraActual = 0;
  }
  else {
    this.camaraActual = this.camaraActual + 1;
  }
  camara = this.camaras[this.camaraActual];
  camara.setUp();
};



/**
 * Devuelve numero de camara
 */
Escena.prototype.numeroCamara = function()
{
  return this.camaraActual;
}

/**
 * Actualizar
 * @returns {undefined}
 */
Escena.prototype.update = function(deltaT) 
{
    for (var i = 0, count = this.hijos.length; i < count; ++i)
    {
        this.hijos[i].update(deltaT);
    }
    for (var i = 0, count = this.camaras.length; i < count; ++i)
    {
        this.camaras[i].update(deltaT);
    }
};


Escena.prototype.setVariables = function(p,y,x,y,z) 
{
    for (var i = 0, count = this.camaras.length; i < count; ++i)
    {
        this.camaras[i].setVariables(p,y,x,y,z);
    }
};


/**
 * Devuelve la matriz de proyección de la camara actual
 * @returns {Escena.prototype@arr;camaras@pro;projM}
 */
Escena.prototype.pMatrix = function() 
{
    return this.camaras[this.camaraActual].projM;
};

/**
 * Devuelve la matriz de vista de la camara actual
 * @returns {Escena.prototype@arr;camaras@pro;viewM}
 */
Escena.prototype.vMatrix = function() 
{
    return this.camaras[this.camaraActual].viewM;
};

/**
 * Dibujar
 * @returns {undefined}
 */
Escena.prototype.dibujar = function() 
{
    // Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda el área disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Luz
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, this.luz);     
    gl.uniform3f(shaderProgram.directionalColorUniform, this.colorLuz[0], this.colorLuz[1], this.colorLuz[2]);  
    gl.uniform3f(shaderProgram.ambientColorUniform, this.colorAmbiente[0], this.colorAmbiente[1], this.colorAmbiente[2] );        

    this.camaras[this.camaraActual].dibujar();

    for (var i = 0, count = this.hijos.length; i < count; ++i)
    {
        this.hijos[i].dibujar(null);
    }
};
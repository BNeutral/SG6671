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
    this.luz = vec3.fromValues(5.0, 5.0, 10.0);

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
 * Actualizar
 * @returns {undefined}
 */
Escena.prototype.update = function() 
{
    for (var i = 0, count = this.hijos.length; i < count; ++i)
    {
        this.hijos[i].update();
    }
    for (var i = 0, count = this.camaras.length; i < count; ++i)
    {
        this.camaras[i].update();
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

    // Configuración de la luz
    // Se inicializan las variables asociadas con la Iluminación
    var lighting;
    lighting = true;
    gl.uniform1i(shaderProgram.useLightingUniform, lighting);       
    var lightPosition = vec3.clone(this.luz);
    vec3.transformMat4(lightPosition, lightPosition, this.vMatrix());
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition);       	

    this.camaras[this.camaraActual].dibujar();

    for (var i = 0, count = this.hijos.length; i < count; ++i)
    {
        this.hijos[i].dibujar(null);
    }
};
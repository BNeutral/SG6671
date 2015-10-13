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
    for (i = 0; i < this.hijos.legth; ++i)
    {
        this.hijos[i].update();
    }
    for (i = 0; i < this.camaras.legth; ++i)
    {
        this.camaras[i].update();
    }
};

/**
 * Devuelve la matriz de proyecci�n de la camara actual
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
    // Se configura el vierport dentro de �rea �canvas�. en este caso se utiliza toda el �rea disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Configuraci�n de la luz
    // Se inicializan las variables asociadas con la Iluminaci�n
    var lighting;
    lighting = true;
    gl.uniform1i(shaderProgram.useLightingUniform, lighting);       
    var lightPosition = [1.0, 1.0, 12.0];
    vec3.transformMat4(lightPosition, lightPosition, this.vMatrix());
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition);       	

    // Dibujar
    // Configuramos la iluminaci�n
    gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2 );
    gl.uniform3f(shaderProgram.directionalColorUniform, 0.8, 0.8, 0.8);
    
    var matrizMV = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(matrizMV, false, this.vMatrix());

    this.camaras[this.camaraActual].dibujar();

    for (i = 0; i < this.hijos.legth; ++i)
    {
        this.hijos[i].dibujar();
    }
};
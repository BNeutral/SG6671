/**
 * Construye un "objeto 3D" que consta de una malla, transformaciones, hijo, texturas, etc
 * @param {type} gl     Contexto gl
 * @returns {Objeto}
 * @constructor
 * @abstract
 */
function Objeto(malla, textura, normalData)
{
    this.malla = malla;
    this.textura = textura;
    this.normalData = normalData;

    this.hijos = [];
    
    this.matrices = mat4.create();
    mat4.identity(this.matrices);    
    
    this.webgl_normal_buffer;
    this.webgl_texture_coord_buffer;
    this.webgl_position_buffer;
    this.webgl_index_buffer;
    
    if (this.malla != null) this.setUpGL();
    
    this.modoRenderizado = gl.TRIANGLE_STRIP;
}

/**
 * Setup de buffers de webgl
 * @returns {undefined}
 */
Objeto.prototype.setUpGL = function()
{
    this.webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalData.vNormals), gl.STATIC_DRAW);
    this.webgl_normal_buffer.itemSize = 3;
    this.webgl_normal_buffer.numItems = this.normalData.vNormals.length / 3;

    this.webgl_texture_coord_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textura.uvCoord), gl.STATIC_DRAW);
    this.webgl_texture_coord_buffer.itemSize = 2;
    this.webgl_texture_coord_buffer.numItems = this.textura.uvCoord.length / 2;

    this.webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.malla.vertices), gl.STATIC_DRAW);
    this.webgl_position_buffer.itemSize = 3;
    this.webgl_position_buffer.numItems = this.malla.vertices / 3;

    this.webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.malla.indices), gl.STATIC_DRAW);
    this.webgl_index_buffer.itemSize = 1;
    this.webgl_index_buffer.numItems = this.malla.indices.length;
}

/**
 * Actualiza
 * @param {type} deltaT     Tiempo en milisegundos desde el ultimo update
 * @returns {undefined}
 */
Objeto.prototype.update = function(deltaT) 
{
    for (var i = 0, count = this.hijos.length; i < count; ++i)
    {
        this.hijos[i].update(deltaT);
    }    
};

/**
 * Dibujar
 * @param {type} matrizPadre        Matriz para multiplicar y tener cosas relativas
 * @returns {undefined}
 */
Objeto.prototype.dibujar = function(matrizPadre) 
{    
    var matrizModelado = mat4.create();
    if (matrizPadre === null) matrizModelado = this.matrices;
    else mat4.multiply(matrizModelado, matrizPadre, this.matrices); 
        
    if (this.malla != null)
    {
        
        // Valores especulares difusos etc
        gl.uniform3f(shaderProgram.shadelessColorUniform, this.textura.colorShadeless[0],this.textura.colorShadeless[1],this.textura.colorShadeless[2] );
        gl.uniform1f(shaderProgram.ambientKUniform, this.textura.kAmbiente );
        gl.uniform3f(shaderProgram.diffuseColorUniform, this.textura.colorDifuso[0], this.textura.colorDifuso[1], this.textura.colorDifuso[2] );
        gl.uniform1f(shaderProgram.diffuseKUniform, this.textura.kDifuso);
        gl.uniform3f(shaderProgram.specularColorUniform, this.textura.colorEspecular[0], this.textura.colorEspecular[1], this.textura.colorEspecular[2] );
        gl.uniform1f(shaderProgram.specularKUniform, this.textura.kEspecular);
        gl.uniform1f(shaderProgram.specularGlossinessUniform, this.textura.glossiness);        
        gl.uniform1f(shaderProgram.alphaUniform, this.textura.alpha);        
        gl.uniform1f(shaderProgram.mirrorPercentUniform, this.textura.porcentajeEspejo);        
        gl.uniform3f(shaderProgram.mirrorColorUniform, this.textura.colorEspejo[0], this.textura.colorEspejo[1], this.textura.colorEspejo[2]);       
       

        // Arrays
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.textura.texturaDifusa);
        gl.uniform1i(shaderProgram.samplerUniform, 1);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.textura.normalMap);
        gl.uniform1i(shaderProgram.normalMapSamplerUniform, 2);
        gl.uniform2f(shaderProgram.uvOffsetUniform, this.textura.offsetUV[0], this.textura.offsetUV[1]);

        gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, matrizModelado);
        var normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, matrizModelado);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
        
        if (renderizarLineas === 0) gl.drawElements(this.modoRenderizado, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        else gl.drawElements(gl.LINE_STRIP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    
    for (var i = 0, count = this.hijos.length; i < count; ++i)
    {
        this.hijos[i].dibujar(matrizModelado);
    }
};
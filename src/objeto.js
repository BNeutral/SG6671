/**
 * Construye un "objeto 3D" que consta de una malla, transformaciones, hijo, texturas, etc
 * @param {type} gl     Contexto gl
 * @returns {Objeto}
 */
function Objeto(malla, textura)
{
    this.malla;
    this.textura;
    
    if (malla === null) this.malla = new Malla(null, null, null);
    else this.malla = malla;
    
    if (textura === null) this.textura = new Textura(null, null, "../texturas/debug.jpg");
    else this.textura = textura;
    
    this.matrices = mat4.create();
    mat4.identity(this.matrices);
    this.hijos = [];
    
    this.setUpGL();
}

/**
 * Setup de buffers de webgl
 * @returns {undefined}
 */
Objeto.prototype.setUpGL = function()
{
    this.webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textura.vNormals), gl.STATIC_DRAW);
    this.webgl_normal_buffer.itemSize = 3;
    this.webgl_normal_buffer.numItems = this.textura.vNormals.length / 3;

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
 * Para actualizar
 * @returns {undefined}
 */
Objeto.prototype.update = function() 
{
    for (i = 0; i < this.hijos.legth; ++i)
    {
        this.hijos[i].update();
    }
};

/**
 * Dibujar
 * @returns {undefined}
 */
Objeto.prototype.dibujar = function() 
{
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, this.matrices);
    var normalMatrix = mat3.create();
    mat4.toInverseMat3(modelMatrix, normalMatrix);
    mat3.transpose(normalMatrix);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    //gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.TRIANGLES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    
    for (i = 0; i < this.hijos.legth; ++i)
    {
        this.hijos[i].dibujar();
    }
};
/**
 * Objeto que representa un skybox para reflexiones
 * @returns {EnvBox}
 */
function EnvBox(luz, colorLuz, colorAmbiente)
{
    this.origW = gl.viewportWidth;
    this.origH = gl.viewportHeight;
    
    this.luz = luz;
    this.colorLuz = colorLuz;
    this.colorAmbiente = colorAmbiente;
    
    this.caras = [  gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];
            
    // Camaras
    var camVects = [   vec3.fromValues(1,0,0),      vec3.fromValues(-1,0,0),     vec3.fromValues(0,1,0),
                        vec3.fromValues(0,-1,0),      vec3.fromValues(0,0,1),      vec3.fromValues(0,0,-1)]       
    var camUp = [   vec3.fromValues(0,-1,0),      vec3.fromValues(0,-1,0),     vec3.fromValues(0,0,1),
                        vec3.fromValues(0,0,-1),      vec3.fromValues(0,-1,0),      vec3.fromValues(0,-1,0)]               
    this.camPos = vec3.fromValues(0,1,0);
    this.viewMatrices = [mat4.create(),mat4.create(),mat4.create(),mat4.create(),mat4.create(),mat4.create()]
    for (var i = 0; i < this.viewMatrices.length; ++i)
    {
        vec3.add(camVects[i],camVects[i],this.camPos);
        mat4.lookAt(this.viewMatrices[i], this.camPos, camVects[i], camUp[i]);   
    }
            
    this.frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    this.frameBuffer.width = 512;
    this.frameBuffer.height = 512;

    this.fBTexture = gl.createTexture();    
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.fBTexture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    for (var i = 0; i < this.caras.length; ++i)
        gl.texImage2D(this.caras[i], 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    for (var i = 0; i < this.caras.length; ++i)
    {
        var renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameBuffer.width, this.frameBuffer.height);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, this.caras[i], this.fBTexture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
    }
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
    this.objetos = [];
    //this.textura = loadCubeMap();    
}

EnvBox.prototype.agregarObjeto = function(objeto) 
{
    this.objetos.push(objeto);
}

EnvBox.prototype.actualizarBuffers = function() 
{
    gl.viewport(0, 0, this.frameBuffer.width, this.frameBuffer.width);
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);  
    
    // Luz
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, this.luz);     
    gl.uniform3fv(shaderProgram.directionalColorUniform, this.colorLuz);  
    gl.uniform3fv(shaderProgram.ambientColorUniform, this.colorAmbiente);        
    
    var projM = mat4.create();
    var viewM = mat4.create();
    
    mat4.perspective(projM, Math.PI/2, 1, 0.1, 10000.0);
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, projM);
    gl.uniform3fv(shaderProgram.posCamara, this.camPos); 

    for (var j = 0; j < this.caras.length; ++j)
    {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, this.caras[j], this.fBTexture, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, this.viewMatrices[j]); 
        for (var i = 0, count = this.objetos.length; i < count; ++i)
        {
            this.objetos[i].dibujar(null);
        }
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
    gl.viewport(0, 0, this.origW, this.origH);
}

EnvBox.prototype.dibujar = function() 
{
    gl.activeTexture(gl.TEXTURE0);
    //gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textura); // Skybox estatico
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.fBTexture); // Skybox dinamico
    gl.uniform1i(shaderProgram.cubeMap, 0);
}

function loadCubeMap()
{
    var texture = gl.createTexture();
    var faces = [["texturas/cubo/+x.png", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
                 ["texturas/cubo/-x.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
                 ["texturas/cubo/+y.png", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
                 ["texturas/cubo/-y.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
                 ["texturas/cubo/+z.png", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
                 ["texturas/cubo/-z.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]];
    for (var i = 0; i < faces.length; ++i)
    {
        var face = faces[i][1];
        var image = new Image();
        image.onload = function(texture, face, image)
        {
            return function() 
            {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
        } (texture, face, image);
        image.src = faces[i][0];
    }
    return texture;
}
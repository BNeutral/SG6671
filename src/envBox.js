/**
 * Objeto que representa un skybox para reflexiones
 * @returns {EnvBox}
 */
function EnvBox(luz, colorLuz, colorAmbiente)
{
    /*this.caras = [  gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];
    this.frameBuffer = gl.createFramebuffer();
    this.fBTexture = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    this.frameBuffer.width = 1024;
    this.frameBuffer.height = 1024;
    
    this.fBTexture = gl.createTexture();    
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.fBTexture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(this.caras[i], 0, gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer );
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameBuffer.width, this.frameBuffer.height);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, this.caras[i], this.fBTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
    
    gl.bindTexture(this.caras[i], null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
    this.objetos = [new Cubo("texturas/debug.jpg")];*/
    this.textura = loadCubeMap();    

}

EnvBox.prototype.agregarObjeto = function(objeto) 
{
    this.objetos.push(objeto);
}

EnvBox.prototype.actualizarBuffers = function() 
{
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);  
    /*gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Luz
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, this.luz);     
    gl.uniform3f(shaderProgram.directionalColorUniform, this.colorLuz[0], this.colorLuz[1], this.colorLuz[2]);  
    gl.uniform3f(shaderProgram.ambientColorUniform, this.colorAmbiente[0], this.colorAmbiente[1], this.colorAmbiente[2] );        


    this.camaras[this.camaraActual].dibujar();

    for (var i = 0, count = this.hijos.length; i < count; ++i)
    {
        this.hijos[i].dibujar(null);
    }
    
    for (var i = 0; i < this.caras.length; ++i)
    {
        
    }*/
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

EnvBox.prototype.dibujar = function() 
{
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textura);
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

/*function SkyBox()
{
    this.t1;
    this.t2;
    this.t3;
    this.t4;
    this.t5;
    this.t6;
    this.targets = [this.t1, this.t2, this.t3, this.t4, this.t5, this.t6];
    this.setupSkyboxGL();
}

function SkyBox()
{
    this.t1;
    this.t2;
    this.t3;
    this.t4;
    this.t5;
    this.t6;
    this.targets = [this.t1, this.t2, this.t3, this.t4, this.t5, this.t6];
    this.setupSkyboxGL();
}

SkyBox.prototype.setupSkyboxGL = function() 
{
    
    var archivos = [    "texturas/cubo/+x.png","texturas/cubo/-x.png",
                        "texturas/cubo/+y.png","texturas/cubo/-y.png",
                         "texturas/cubo/+z.png","texturas/cubo/-z.png"];
    var modos = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];
            
    for (var i = 0; i < 6; ++i)
    {
        var target = this.targets[i];
        var modo = modos[i];
        target = gl.createTexture();
        target.image = new Image();
        target.image.onload = new TexOnLoad(this.target, modo).onLoadCube;
        target.image.src = archivos[i];
    }
}

SkyBox.prototype.dibujar = function() 
{
    gl.activeTexture(gl.TEXTURE4);
    for (var i = 0; i < 6; ++i)
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.targets[i]);
    gl.uniform1i(shaderProgram.cubeMap, 4);
}

function TexOnLoad(target, modo)
{
    this.target = target;
    this.modo = modo;
}

TexOnLoad.prototype.onLoadCube = function()
{
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.target);
    gl.texImage2D(this.modo, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.target.image);
    gl.texParameterf(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameterf(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameterf(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
}*/
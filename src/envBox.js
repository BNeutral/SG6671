/**
 * Objeto que representa un skybox para reflexiones
 * @returns {EnvBox}
 */
function EnvBox()
{
    this.textura = loadCubeMap();
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
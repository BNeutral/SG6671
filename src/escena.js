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
    if (camara) this.agregarCamara(camara);
    var num = 1/Math.sqrt(3);
    this.luz = vec3.fromValues(-num, num, num); // Direccion opuesta
    this.colorLuz = vec3.fromValues(1,1,1);
    this.colorAmbiente = vec3.fromValues(1,1,1);
    
    this.skyBox = new SkyBox();

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
  this.camaras[this.camaraActual].activa = false;
  this.camaraActual = (this.camaraActual + 1) % this.camaras.length;
  this.camaras[this.camaraActual].activa = true;
  this.camaras[this.camaraActual].setUp();
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
        this.camaras[i].setVariables(p, y, x, y, z);
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
    //Env map
    //gl.activeTexture(gl.TEXTURE0);
    //gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textura.txImage);
    //gl.uniform1i(shaderProgram.cubeMap, 0);
    
    // Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda el área disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Luz
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, this.luz);     
    gl.uniform3f(shaderProgram.directionalColorUniform, this.colorLuz[0], this.colorLuz[1], this.colorLuz[2]);  
    gl.uniform3f(shaderProgram.ambientColorUniform, this.colorAmbiente[0], this.colorAmbiente[1], this.colorAmbiente[2] );        

    this.skyBox.dibujar();

    this.camaras[this.camaraActual].dibujar();

    for (var i = 0, count = this.hijos.length; i < count; ++i)
    {
        this.hijos[i].dibujar(null);
    }
};

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

function SkyBox()
{
    this.textura = loadCubeMap();
}

SkyBox.prototype.dibujar = function() 
{
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textura);
    gl.uniform1i(shaderProgram.cubeMap, 4);
}

function loadCubeMap()
{
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

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
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
        } (texture, face, image);
        image.src = faces[i][0];
    }
    return texture;
}

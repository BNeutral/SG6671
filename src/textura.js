/**
 * Crea un objeto con toda la informacion requerida para texturar.
 * @param {type} vNormals       Normales correspondientes a cada vertice de la malla
 * @param {type} uvCoord        Coordenadas uv correspondientes a cada vertice de la malla
 * @param {type} path           String con el camino hacia la imagen
 * @returns {Textura}
 */
function Textura(vNormals, uvCoord, path)
{
    this.vNormals;
    this.uvCoord;
    this.txImage;
    this.colorAmbiente = vec3.fromValues(0.2,0.2,0.2);
    this.colorIluminado = vec3.fromValues(0.8,0.8,0.8);
        
    if (vNormals === null) 
    {
        this.vNormals = [0.0,0.0,1.0, 0.0,0.0,1.0, 0.0,0.0,1.0, 0.0,0.0,1.0];
    }
    else
    {
        this.vNormals = vNormals;
    }
    
    if (uvCoord === null) 
    {
        this.uvCoord = [0,0, 0,1, 1,1, 1,0];
    }
    else 
    {
        this.uvCoord = uvCoord;
    }

    if (path != null) this.initTexture(path);
}

Textura.prototype.initTexture = function(path)
{
    this.txImage = gl.createTexture();
    this.txImage.image = new Image();
    this.txImage.image.onload = (function(esto) { return function () { esto.handleLoadedTexture() }})(this);
    this.txImage.image.src = path;
};

Textura.prototype.handleLoadedTexture = function()
{
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, this.txImage);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.txImage.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
};

Textura.prototype.flipNormales = function()
{
    for (var i = 0; i < this.vNormals.length; ++i)
    {
        this.vNormals[i] = -this.vNormals[i];
    }
};

/**
 * Setea un tono rgb a los colores de ambiente y de iluminación en base a un parametro
 * @param {type} param          Numero entre 0 y 1, recorre tonos
 * @param {type} pAmbiente      Para multiplicar por luz ambiente, entre 0 y 1
 * @param {type} pIluminado     Para multiplicar por luz directa, entre 0 y 1
 * @returns {undefined}
 */
Textura.prototype.hueRamp = function(param, pAmbiente, pIluminado)
{ 
    var color = [0,0,0];
    var x = (1 - Math.abs((param*6)%2 - 1));
    var sixth = 1/6;
    
    if (param < sixth)
    {
        color = [1,x,0];
    }
    else if (param < sixth*2)
    {
        color = [x,1,0];
    }
    else if (param < sixth*3)
    {
        color = [0,1,x];
    }
    else if (param < sixth*4)
    {
        color = [0,x,1];
    }
    else if (param < sixth*5)
    {
        color = [x,0,1];
    }
    else
    {
        color = [1,0,x];
    }
    
    for (var i = 0; i < 3; ++i)
    {
        this.colorAmbiente[i] = color[i]*pAmbiente;
        this.colorIluminado[i] = color[i]*pIluminado;
    }
};
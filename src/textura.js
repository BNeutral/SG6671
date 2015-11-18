/**
 * Crea un objeto con toda la informacion requerida para texturar.
 * @param {type} vNormals       Normales correspondientes a cada vertice de la malla
 * @param {type} uvCoord        Coordenadas uv correspondientes a cada vertice de la malla
 * @param {type} path           String con el camino hacia la imagen
 * @returns {Textura}
 */
function Textura(uvCoord, path)
{
    this.uvCoord = uvCoord;
    this.txImage;
    
    this.colorAmbiente = vec3.fromValues(1,1,1);
    this.kAmbiente = 0.2;    
    this.colorDifuso = vec3.fromValues(1,1,1);
    this.kDifuso = 1;
    this.colorEspecular = vec3.fromValues(1,1,1);
    this.kEspecular = 1;
    this.glossiness = 20;
    
    this.offsetUV = vec2.create();

    if (path == null) this.initTexture("texturas/debug");
    else this.initTexture(path);
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
    
    this.kAmbiente = pAmbiente;
    for (var i = 0; i < 3; ++i)
    {
        this.colorDifuso[i] = color[i]*pIluminado;
    }
};
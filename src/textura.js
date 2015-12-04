var dictTexturas = {}; // Cargar cada textura una sola vez

/**
 * Crea un objeto con toda la informacion requerida para el shading.
 * @param {type} uvCoord        Coordenadas uv correspondientes a cada vertice de la malla
 * @param {type} txPath         Path a la textura difusa
 * @param {type} normalTxPath   Path a la textura normal
 * @returns {Textura}
 */
function Textura(uvCoord, txDifusePath, txNormalPath)
{
    this.uvCoord = uvCoord;
    
    this.texturaDifusa;                             // Textura difusa
    this.normalMap;                                 // Textura para normal map
    
    this.colorShadeless = vec3.fromValues(0,0,0);   // Para objetos auto iluminados
    this.kAmbiente = 0.2;                           // Influencia de luz global
    this.colorDifuso = vec3.fromValues(1,1,1);      // Color base
    this.kDifuso = 1;                               // Influencia del color base
    this.colorEspecular = vec3.fromValues(1,1,1);   // Color especular
    this.kEspecular = 1;                            // Influencia del color especular
    this.glossiness = 20;                            // Glossiness especular
    this.alpha = 1;                                 // Transparencia
    this.porcentajeEspejo = 0;                      // Reflexion
    this.colorEspejo = vec3.fromValues(1,1,1);      // Tinte de reflexion
    
    this.kNormalMap = 0;                          // Influencia del normal map
    if (txNormalPath) this.kNormalMap = 1; 
    this.offsetUV = vec2.create();                  // Para texturas que scrollean

    this.chequearYCargar("texturaDifusa", txDifusePath, "texturas/debug.jpg");
    this.chequearYCargar("normalMap", txNormalPath, "texturas/pixel_azul.png");
}

/**
 * Dado un
 * @param {type} atrib          Nombre del atributo donde se cargara la textura
 * @param {type} path           Path a la textura
 * @param {type} defaultPath    Path por defecto si no se provee un path
 * @returns {undefined}
 */
Textura.prototype.chequearYCargar = function(atrib, path, defaultPath)
{
    if (!path) path = defaultPath;
    if (dictTexturas[path]) this[atrib] = dictTexturas[path];
    else this[atrib] = cargarTextura(path);
}

/**
 * Carga una textura y la devuelve
 * @param {type} path       Path relativo desde el index.html hacia la textura
 * @returns {textura de webgl}
 */
function cargarTextura (path)
{
    var textura = gl.createTexture();
    dictTexturas[path] = textura;
    var imagen = new Image();
    imagen.onload = function(textura, imagen) 
    { 
        return function() 
        { 
            gl.bindTexture(gl.TEXTURE_2D, textura);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);          
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imagen);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }(textura, imagen);
    imagen.src = path;
    return textura;
};

/**
 * Setea un tono rgb al color difuso
 * @param {type} param          Numero entre 0 y 1, recorre tonos
 * @param {type} multip         Para oscurecer el tono obtenido, un numero entre 0 y 1
 * @returns {undefined}
 */
Textura.prototype.hueRamp = function(param, multip)
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
        this.colorDifuso[i] = color[i]*multip;
    }
};
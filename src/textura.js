function Textura(vNormals, uvCoord, path)
{
    this.vNormals;
    this.uvCoord;
    this.txImage;
        
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
    
    this.initTexture(path);
}

Textura.prototype.initTexture = function(path)
{
    var aux_texture = gl.createTexture();
    this.txImage = aux_texture;
    this.txImage.image = new Image();
    this.txImage.image.src = path;
    this.txImage.image.onload = this.handleLoadedTexture;
};

Textura.prototype.handleLoadedTexture = function() 
{
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, this.txImage.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.txImage.texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);
};
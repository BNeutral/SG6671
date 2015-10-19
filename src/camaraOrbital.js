var CamaraOrbital = function(ancho, alto) 
{
    this.viewM = mat4.create();
    this.projM = mat4.create();
    this._ancho = ancho;
    this._alto = alto;
    
    this.pos = new vec3.fromValues(0,1,3);
    this.look = new vec3.fromValues(0,0,-1);
    this.up = new vec3.fromValues(0,1,0);
    this.modo = "persp";
    
    this.activa = false;
    
    this.pitch = 0;
    this.yaw = 0;
    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

};

/**
 * Recalcula la view matrix
 * @returns {undefined}
 */
Camara.prototype.recalcView = function()
{
    mat4.identity(this.viewM);
    mat4.lookAt(this.viewM, this.pos, this.look, this.up);
};

heredarPrototype(CamaraOrbital, Camara); 
 

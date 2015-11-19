var CamaraOrbital = function(ancho, alto) 
{
    this.viewM = mat4.create();
    this.projM = mat4.create();
    this._ancho = ancho;
    this._alto = alto;
    
    this.pos = new vec3.fromValues(0,30,30);
    this.look = new vec3.fromValues(0,0,-1);
    this.up = new vec3.fromValues(0,1,0);
    this.modo = "persp";
    
    this.activa = false;
    
    this.pitch = 0;
    this.yaw = 0;

};


heredarPrototype(CamaraOrbital, Camara); 

/**
 * Recalcula la view matrix
 * @returns {undefined}
 */
CamaraOrbital.prototype.recalcView = function()
{
    mat4.identity(this.viewM);
    
    mat4.lookAt(this.viewM, this.pos, this.look, this.up);
    
    mat4.rotate(this.viewM,this.viewM, degToRad(-pitch), [1, 0, 0]);

    mat4.rotate(this.viewM,this.viewM, degToRad(-yaw), [0, 1, 0]);
};

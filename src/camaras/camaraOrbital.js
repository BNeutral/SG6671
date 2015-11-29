var CamaraOrbital = function(ancho, alto) 
{
    Camara.call(this, ancho, alto);
    this.radio = 30;
    this.initPos = new vec3.fromValues(0,0,30);
    this.rotMat = mat4.create();
    
    this.limiteInfPitch = 0.01;
    this.limiteSupPitch = Math.PI/2 - 0.01;
};

heredarPrototype(CamaraOrbital, Camara); 

/**
 * Rotacion de la rueda
 */
CamaraOrbital.prototype.update = function(deltaT) 
{
    if (!this.activa) return;
    
    if (pitch < this.limiteInfPitch) pitch = this.limiteInfPitch;
    if (pitch > this.limiteSupPitch) pitch = this.limiteSupPitch;
    
    this.pitch = -pitch;
    this.yaw = yaw;    
    
    this.pos[0] = this.radio * Math.cos(this.yaw) * Math.sin(-this.pitch);
    this.pos[1] = this.radio * Math.cos(this.pitch);
    this.pos[2] = this.radio * Math.sin(this.yaw) * Math.sin(-this.pitch);
    
    Camara.prototype.update.call(this,deltaT);
};

CamaraOrbital.prototype.recalcView = function()
{
    mat4.identity(this.viewM);
    mat4.lookAt(this.viewM, this.pos, zero, yUp);
};

var CamaraPrimeraPersona = function(ancho, alto) 
{ 
    Camara.call(this, ancho, alto);    
};

heredarPrototype(CamaraPrimeraPersona, Camara); 

/**
 * Rotacion de la rueda
 */
CamaraPrimeraPersona.prototype.update = function(deltaT) 
{
    this.pitch = pitch;
    this.yaw = yaw;
    this.pos[0] = xPos;
    this.pos[1] = yPos;
    this.pos[2] = zPos;
    Camara.prototype.update.call(this,deltaT);
};

CamaraPrimeraPersona.prototype.recalcView = function()
{
    mat4.rotate(this.viewM, mIdentidad, -this.pitch, [1, 0, 0]);
    mat4.rotate(this.viewM, this.viewM, -this.yaw, [0, 1, 0]);
    mat4.translate(this.viewM, this.viewM, this.menosPos);
};
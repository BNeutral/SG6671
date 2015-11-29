/**
 * 
 * @param {type} ancho
 * @param {type} alto
 * @param {type} objetoASeguir
 * @param {type} matrizOffset
 * @returns {CamaraCarrito}
 */
var CamaraCarrito = function(ancho, alto, objetoASeguir, matrizOffset) 
{
    this.objetoASeguir = objetoASeguir;
    this.matrizOffset = matrizOffset;
    this.vectorDir = vec3.create();
    Camara.call(this, ancho, alto);    
    
    this.mRot = mat4.create();
    this.mAux = mat4.create();
    this.offset = vec3.fromValues(0,1.5,0);
    this.viewDir = vec3.fromValues(1,1.5,0);
};

heredarPrototype(CamaraCarrito, Camara); 

CamaraCarrito.prototype.update = function(deltaT) 
{
    if (!this.activa) return;
    
    this.pitch = pitch;
    this.yaw = -yaw;
    
    this.mAux = mat4.create();
    mat4.mul(this.mAux, this.matrizOffset, this.objetoASeguir.matrices);

    vec3.transformMat4(this.pos, this.offset, this.mAux);
    
    mat4.rotate(this.mRot, mIdentidad, this.pitch, [0, 0, 1]);
    mat4.rotate(this.mRot, this.mRot, this.yaw, [0, 1, 0]);
    
    vec3.transformMat4(this.vectorDir, this.viewDir, this.mRot);
    vec3.transformMat4(this.vectorDir, this.vectorDir, this.mAux); 
    
    Camara.prototype.update.call(this,deltaT);
};

CamaraCarrito.prototype.recalcView = function()
{
    mat4.lookAt(this.viewM, this.pos, this.vectorDir, yUp);
};

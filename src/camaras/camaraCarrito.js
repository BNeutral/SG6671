/**
 * Camara que se posiciona en el mismo lugar que un objeto mas un offset
 * @param {type} ancho
 * @param {type} alto
 * @param {type} objetoASeguir
 * @param {type} offset
 * @returns {CamaraCarrito}
 */
var CamaraCarrito = function(ancho, alto, objetoASeguir, offset) 
{
    Camara.call(this, ancho, alto);
    this.objetoASeguir = objetoASeguir;
    this.offset = offset;
};

heredarPrototype(CamaraCarrito, Camara); 

CamaraCarrito.prototype.multMatriz = function(matr)
{
  this.matrizFuente = matr;
  this.recalcView();
}

CamaraCarrito.prototype.recalcView = function()
{
    vec3.transformMat4(this.objetoASeguir.matrices);
  /*var inversa = mat4.clone(this.matrizFuente);
  //Lo subo un poco para que no este en el piso del carrito
  mat4.translate(inversa,inversa,[0,1.5,0]);
  mat4.rotate(inversa,inversa,degToRad(pitch),[1,0,0]);
  mat4.rotate(inversa,inversa,-degToRad(yaw),[0,1,0]);
  mat4.scale(inversa,inversa,[-1,-1,-1]);
  mat4.rotate(inversa,inversa, Math.PI,[1,0,0]);
  
  mat4.invert(inversa,inversa);
  mat4.identity(this.viewM);
  mat4.mul(this.viewM,inversa,this.viewM);  */
};

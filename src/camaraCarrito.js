var CamaraCarrito = function(ancho, alto) 
{
    this.viewM = mat4.create();
    this.projM = mat4.create();
    
    this.matrizFuente = mat4.create();
    this.matrizPropia = mat4.create();
    
    this._ancho = ancho;
    this._alto = alto;

    this.modo = "persp";
    
    this.activa = false;
    
    this.pitch = 0;
    this.yaw = 0;

};

heredarPrototype(CamaraCarrito, Camara); 

CamaraCarrito.prototype.multMatriz = function(matr)
{
  this.matrizFuente = matr;
  this.recalcView();
}

CamaraCarrito.prototype.recalcView = function()
{
  var inversa = mat4.clone(this.matrizFuente);
  //Lo subo un poco para que no este en el piso del carrito
  mat4.translate(inversa,inversa,[0,1.5,0]);
  mat4.rotate(inversa,inversa,degToRad(pitch),[1,0,0]);
  mat4.rotate(inversa,inversa,degToRad(yaw),[0,1,0]);
  
  mat4.invert(inversa,inversa);
  mat4.identity(this.viewM);
  mat4.mul(this.viewM,inversa,this.viewM);  
};

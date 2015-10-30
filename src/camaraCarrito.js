var CamaraCarrito = function(ancho, alto) 
{
    this.viewM = mat4.create();
    this.projM = mat4.create();
    
    this.matriz = mat4.create();
    
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
  this.matriz=matr;
  this.recalcView();
}

CamaraCarrito.prototype.recalcView = function()
{
  var inversa= mat4.create();
  mat4.identity(this.viewM);
  mat4.invert(inversa,this.matriz);
  mat4.mul(this.viewM,inversa,this.viewM);
  //Lo subo un poco para que no este en el piso del carrito
  mat4.translate(this.viewM,this.viewM,[0,-1.5,0]);

};

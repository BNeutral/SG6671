var CamaraCarrito = function(ancho, alto) 
{
    this.viewM = mat4.create();
    this.projM = mat4.create();
    
    this.matriz = mat4.create();
    
    this._ancho = ancho;
    this._alto = alto;
    
    
    this.pos = new vec3.fromValues(0,0.2,0);
    this.look = new vec3.fromValues(0,0,-1);
    this.up = new vec3.fromValues(0,1,0);
    this.modo = "persp";
    
    this.activa = false;
    
    this.pitch = 0;
    this.yaw = 0;

};

heredarPrototype(CamaraCarrito, Camara); 

CamaraCarrito.prototype.multMatriz = function(matr)
{
  this.matriz=matr;
}

CamaraCarrito.prototype.recalcView = function()
{
  var inversa= mat4.create();
  mat4.identity(this.viewM);
  mat4.lookAt(this.viewM, this.pos, this.look,this.up);
  mat4.invert(inversa,this.matriz);
  mat4.mul(this.viewM,inversa,this.viewM);
  //mat4.mul(this.viewM,this.matriz,this.viewM);
  //mat4.translate(this.viewM,this.viewM,[0,-10,0]);

};

var Piso = function() 
{
    Grilla.call(this, 0, 0, "texturas/pasto.jpg", 8300.0, 8300.0);
    mat4.rotate(this.matrices,this.matrices, -Math.PI/2, [1, 0, 0]);
    mat4.scale(this.matrices, this.matrices, [5000,5000,0]);
};

heredarPrototype(Piso, Grilla);
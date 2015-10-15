var Piso = function() 
{
    Grilla.call(this, 0, 0, [1.0,1.0,1.0,1.0], "texturas/pasto.jpg", 10.0, 10.0);
    mat4.rotate(this.matrices,this.matrices, Math.PI/2, [1, 0, 0]);
    mat4.scale(this.matrices, this.matrices, [30,30,0]);
};

heredarPrototype(Piso, Grilla);
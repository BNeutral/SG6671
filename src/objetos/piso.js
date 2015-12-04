var Piso = function() 
{
    Grilla.call(this, 10, 10, "texturas/grass.jpg", "texturas/grass_normal.jpg", 10000.0, 10000.0);
    this.textura.kEspecular = 0.5;
    this.textura.glossiness = 1;
    this.textura.kNormalMap = 1.5;
    mat4.rotate(this.matrices,this.matrices, -Math.PI/2, [1, 0, 0]);
    mat4.scale(this.matrices, this.matrices, [5000,5000,0]);
};

heredarPrototype(Piso, Grilla);
function Ejes()
{
    Objeto.call(this, null, null);
    this.hijos.push(new CuboMalTexturado("texturas/pixel.png")); // X
    this.hijos.push(new CuboMalTexturado("texturas/pixel.png")); // Y
    this.hijos.push(new CuboMalTexturado("texturas/pixel.png")); // Z
    
    mat4.scale(this.hijos[0].matrices, this.hijos[0].matrices, [0.5, 0.01, 0.01]);
    mat4.translate(this.hijos[0].matrices, this.hijos[0].matrices, [1.0, 0.0, 0.0]);
    this.hijos[0].textura.colorShadeless = vec3.fromValues(1,0,0);
    this.hijos[0].textura.kAmbiente = 0;
    this.hijos[0].textura.kDifuso = 0;
    this.hijos[0].textura.kEspecular = 0;
    mat4.scale(this.hijos[1].matrices, this.hijos[1].matrices, [0.01, 0.5, 0.01]);
    mat4.translate(this.hijos[1].matrices, this.hijos[1].matrices, [0.0, 1.0, 0.0]);
    this.hijos[1].textura.colorShadeless = vec3.fromValues(0,1,0);
    this.hijos[1].textura.kAmbiente = 0;
    this.hijos[1].textura.kDifuso = 0;
    this.hijos[1].textura.kEspecular = 0;
    mat4.scale(this.hijos[2].matrices, this.hijos[2].matrices, [0.01, 0.01, 0.5]);
    mat4.translate(this.hijos[2].matrices, this.hijos[2].matrices, [0.0, 0.0, 1.0]);
    this.hijos[2].textura.colorShadeless = vec3.fromValues(0,0,1);
    this.hijos[2].textura.kAmbiente = 0;
    this.hijos[2].textura.kDifuso = 0;
    this.hijos[2].textura.kEspecular = 0;
}

heredarPrototype(Ejes, Objeto);
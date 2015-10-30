/**
 * Genera una vuelta al mundo con una cantidad de divisiones
 * La rueda tendra el radio dado y estara 2.2 unitades sobre el suelo
 * @param {type} divisiones         Numero de cabinas
 * @param {type} circumRadio        Radio hasta un vertice
 * @returns {undefined}
 */
function Vuelta(divisiones, circumRadio)
{
    Objeto.call(this, null, null);
    
    if (circumRadio == null) circumRadio = 3;
    
    divisiones *= 2;
    
    this.hijos.push(new VuRueda(divisiones, circumRadio));
    this.hijos.push(new VuParante(circumRadio, 0));
    this.hijos.push(new VuParante(circumRadio, Math.PI));
    
    mat4.translate(this.matrices, this.matrices, [0,circumRadio+2.2,0]);
}

heredarPrototype(Vuelta, Objeto);

/**
 * Posiciona un parante que es un cubo deformado a 1.1 del centro y tocando el suelo
 * @param {type} circumRadio        Radio de la rueda hasta un vertice
 * @param {type} rotacion           Rotacion post traslacion para posicionar
 * @returns {undefined}
 */
function VuParante(circumRadio, rotacion)
{
    Cubo.call(this, "texturas/pixel.png");
    var distSuelo = circumRadio+2.2;
    var escala = distSuelo/2 + 0.5;
    var diferencia = escala - distSuelo;
    mat4.rotate(this.matrices,this.matrices, rotacion,[0,1,0]);
    mat4.translate(this.matrices,this.matrices, [-1.2,diferencia,0]);
    mat4.scale(this.matrices, this.matrices, [0.1,escala,1]); 
    
    // Achicamos los cosos de arriba del cubo
    for (var i = 0; i < this.malla.vertices.length; i+= 3)
    {
        if (this.malla.vertices[i+1] < 0 && this.malla.vertices[i] < 0) this.malla.vertices[i] *= 5;
        if (this.malla.vertices[i+1] > 0) this.malla.vertices[i+2] *= 0.33;
    }
    
    this.setUpGL();
}
heredarPrototype(VuParante, Cubo);

var velocidadAngular = 10 * 0.005 * Math.PI*2;
        
/**
 * El acoplado de ambas caras más el eje central y las cabinas
 * @param {type} divisiones         Numero de divisiones
 * @param {type} circumRadio        Radio hasta un vertice
 * @returns {undefined}
 */
function VuRueda(divisiones, circumRadio)
{
    Objeto.call(this, null, null);
    
    this.hijos.push(new VuCara(divisiones, circumRadio));
    mat4.translate(this.hijos[0].matrices,this.hijos[0].matrices, [1.1,0,0]);
    this.hijos.push(new VuCara(divisiones, circumRadio));
    mat4.translate(this.hijos[1].matrices,this.hijos[1].matrices, [-1.1,0,0]);  
    this.hijos.push(new VuUniones(divisiones, circumRadio));
    
    this.cabinas = new VuCabinas(divisiones, circumRadio);
    this.hijos.push(this.cabinas);
}

heredarPrototype(VuRueda, Objeto);

/**
 * Rotacion de la rueda
 */
VuRueda.prototype.update = function(deltaT) 
{
    mat4.rotate(this.matrices, this.matrices, velocidadAngular*deltaT, [1.0,0.0,0.0]);
    Objeto.prototype.update.call(this,deltaT);
};

/**
 * Una cara de al rueda conformado por 2 circulos y las uniones
 * @param {type} divisiones         Numero de divisiones
 * @param {type} circumRadio        Radio hasta un vertice
 * @returns {undefined}
 */
function VuCara(divisiones, circumRadio)
{
    var apotema = circumRadio*(Math.cos(Math.PI/divisiones));
    Objeto.call(this, null, null);
    this.hijos.push(new VuCirculo(divisiones, apotema));
    this.hijos.push(new VuCirculo(divisiones, apotema/2));
    this.hijos.push(new VuEstrella(divisiones, circumRadio));
}
heredarPrototype(VuCara, Objeto);

/**
 * Las uniones entre las dos caras y el eje
 * @param {type} divisiones         Numero de divisiones
 * @param {type} circumRadio        Radio hasta un vertice
 * @returns {undefined}
 */
function VuUniones(divisiones, circumRadio)
{
    Objeto.call(this, null, null);
    
    var largo = 2.2*0.5;
    var angulo = Math.PI/divisiones;
    for (var i = 0; i < divisiones/2; ++i)
    {
        this.hijos.push(new CilindroSinTapa(6, 0, "texturas/pixel.png"));
        mat4.rotate(this.hijos[i].matrices, this.hijos[i].matrices, angulo*i*4, [1.0,0.0,0.0]);
        mat4.translate(this.hijos[i].matrices,this.hijos[i].matrices, [0,0,circumRadio]);
        mat4.rotate(this.hijos[i].matrices, this.hijos[i].matrices, Math.PI/2, [0.0,1.0,0.0]);
        mat4.scale(this.hijos[i].matrices, this.hijos[i].matrices, [0.05,0.05,largo]); 
    }
    
    var eje = new Cilindro(12, 0, "texturas/pixel.png" );
    mat4.rotate(eje.matrices, eje.matrices, Math.PI/2, [0.0,1.0,0.0]);
    mat4.scale(eje.matrices, eje.matrices, [0.25,0.25,largo*1.4]); 
    this.hijos.push(eje);
}
heredarPrototype(VuUniones, Objeto);

/**
 * Las uniones internas del tramado para una cara
 * @param {type} divisiones         Numero de divisiones
 * @param {type} circumRadio        Radio hasta un vertice
 * @returns {undefined}
 */
function VuEstrella(divisiones, circumRadio)
{
    Objeto.call(this, null, null);
    
    divisiones /= 2;
        
    var largo = circumRadio;
    var angulo = Math.PI/divisiones;
    for (var i = 0; i < divisiones; ++i)
    {
        this.hijos.push(new CilindroSinTapa(6, 0, "texturas/pixel.png"));
        mat4.rotate(this.hijos[i].matrices, this.hijos[i].matrices, angulo*i, [1.0,0.0,0.0]);
        mat4.scale(this.hijos[i].matrices, this.hijos[i].matrices, [0.05,0.05,largo]); 
    }
}
heredarPrototype(VuEstrella, Objeto);

/**
 * Los circulos hechos de tubos
 * @param {type} divisiones         Numero de divisiones
 * @param {type} apotema            Radio hasta la mitad de una cara
 * @returns {undefined}
 */
function VuCirculo(divisiones, apotema)
{
    Objeto.call(this, null, null);
    
    var esPar = (divisiones/2 + 1) % 2;
    var largo = apotema*Math.tan(Math.PI/divisiones);
    var angulo = Math.PI*2/divisiones;
    for (var i = 0; i < divisiones; ++i)
    {
        this.hijos.push(new CilindroSinTapa(8, 0, "texturas/pixel.png"));
        mat4.rotate(this.hijos[i].matrices, this.hijos[i].matrices, angulo*i+angulo/2*esPar, [1.0,0.0,0.0])
        mat4.translate(this.hijos[i].matrices,this.hijos[i].matrices, [0,apotema,0]);
        mat4.scale(this.hijos[i].matrices, this.hijos[i].matrices, [0.05,0.05,largo]); 
    }
}
heredarPrototype(VuCirculo, Objeto);

/**
 * Las cabinas
 * @param {type} Numero         Cantidad de cabinas
 * @param {type} circumRadio    Radio de la rueda hasta un vertice
 * @returns {undefined}
 */
function VuCabinas(numero, circumRadio)
{
    Objeto.call(this, null, null);
    
    var angulo = Math.PI/numero;
    for (var i = 0; i < numero/2; ++i)
    {
	var cabina= new VuCabinaM(angulo*i*4, circumRadio);

        this.hijos.push(cabina);
    }
}

heredarPrototype(VuCabinas, Objeto);

/**
 * Una cabina. TODO: Un mejor modelo
 * @param {type} angulo         Angulo respecto al centro del circulo
 * @param {type} circumRadio    Radio de la rueda hasta el punto superior de esta cabina
 * @returns {VuCabina}
 */
function VuCabina(angulo, circumRadio)
{
    Cubo.call(this, "texturas/pixel.png");
    
    //Descentramos el cubo
    for (var i = 0; i < this.malla.vertices.length; i+= 3)
    {
        this.malla.vertices[i+1] -= 1;
    }
    this.setUpGL();

    mat4.rotate(this.matrices ,this.matrices, angulo, [1.0,0.0,0.0]);
    mat4.translate(this.matrices ,this.matrices , [0,0,circumRadio]);
    mat4.rotate(this.matrices ,this.matrices , -angulo, [1.0,0.0,0.0]);

    this.textura.hueRamp(angulo/(Math.PI*2), 0.2, 0.8);
}
heredarPrototype(VuCabina, Cubo);

/**
 * Antirotacion de las cabinas
 * @param {type} deltaT
 * @returns {undefined}
 */
VuCabina.prototype.update = function(deltaT) 
{
    this.contador += deltaT;
    mat4.rotate(this.matrices, this.matrices, -velocidadAngular*deltaT, [1.0,0.0,0.0]);
    Objeto.prototype.update.call(this,deltaT);
};


/**
 * Una cabina. Segunda version
 * @param {type} angulo         Angulo respecto al centro del circulo
 * @param {type} circumRadio    Radio de la rueda hasta el punto superior de esta cabina
 */
function VuCabinaM(angulo, circumRadio)
{
    Objeto.call(this, null, null);
    var par=new VuCabinaPartes(angulo/(Math.PI*2));
    
    this.hijos.push(par);
    
    mat4.rotate(this.matrices ,this.matrices, angulo, [1.0,0.0,0.0]);
    mat4.translate(this.matrices ,this.matrices , [0,0,circumRadio]);	
    mat4.rotate(this.matrices ,this.matrices , -angulo, [1.0,0.0,0.0]);


}
heredarPrototype(VuCabinaM, Objeto);

function VuCabinaPartes(color)
{
    Objeto.call(this, null, null);
    var adelante=new LadoCabina(color);
    var atras=new LadoCabina(color);
    var izq=new LadoCabina(color);
    var der=new LadoCabina(color);
    
    mat4.rotate(izq.matrices, izq.matrices, Math.PI/2, [0,1,0.0]);
    mat4.translate(izq.matrices,izq.matrices, [-0.95,0,-0.95]); 
    
    mat4.rotate(der.matrices, der.matrices, Math.PI/2, [0,1,0.0]);
    mat4.translate(der.matrices,der.matrices, [-0.95,0,0.95]); 
    
    mat4.translate(atras.matrices,atras.matrices, [0,0,1.9]); 
    
    var arriba= new Cubo("texturas/pixel.png");
    mat4.translate(arriba.matrices,arriba.matrices, [0,2.2,0.95]); 
    mat4.scale(arriba.matrices, arriba.matrices, [1,0.05,1]); 
    arriba.textura.hueRamp(color, 0.2, 0.8);
    
    var abajo= new Cubo("texturas/pixel.png");
    mat4.translate(abajo.matrices,abajo.matrices, [0,0,0.95]); 
    mat4.scale(abajo.matrices, abajo.matrices, [1,0.05,1]); 
    abajo.textura.hueRamp(color, 0.2, 0.8);

    this.hijos.push(arriba);
    this.hijos.push(abajo);
    this.hijos.push(adelante);
    this.hijos.push(izq);
    this.hijos.push(der);
    this.hijos.push(atras);
    
    mat4.translate(this.matrices,this.matrices, [0,-2,-0.95]); 
    
}
heredarPrototype(VuCabinaPartes, Objeto);

/**
 * Antirotacion de las cabinas
 * @param {type} deltaT
 * @returns {undefined}
 */
VuCabinaM.prototype.update = function(deltaT) 
{
    this.contador += deltaT;
    mat4.rotate(this.matrices, this.matrices, -velocidadAngular*deltaT, [1.0,0.0,0.0]);
    Objeto.prototype.update.call(this,deltaT);
};

function LadoCabina(color)
{
    Objeto.call(this, null, null);
    
    var abajo= new Cubo("texturas/pixel.png");
    mat4.translate(abajo.matrices,abajo.matrices, [0,0.5,0]); 
    mat4.scale(abajo.matrices, abajo.matrices, [1,0.5,0.05]); 
    abajo.textura.hueRamp(color, 0.2, 0.8);

    var izq= new Cubo("texturas/pixel.png");
    mat4.translate(izq.matrices,izq.matrices, [-0.9,1.1,0]); 
    mat4.scale(izq.matrices, izq.matrices, [0.1,1,0.05]); 
    izq.textura.hueRamp(color, 0.2, 0.8);
    
    var der= new Cubo("texturas/pixel.png");
    mat4.translate(der.matrices,der.matrices, [0.9,1.1,0]); 
    mat4.scale(der.matrices, der.matrices, [0.1,1,0.05]); 
    der.textura.hueRamp(color, 0.2, 0.8);
    
    var arriba= new Cubo("texturas/pixel.png");
    mat4.translate(arriba.matrices,arriba.matrices, [0,2,0]); 
    mat4.scale(arriba.matrices, arriba.matrices, [1,0.25,0.05]); 
    arriba.textura.hueRamp(color, 0.2, 0.8);

    
    this.hijos.push(abajo);
    this.hijos.push(izq);
    this.hijos.push(der);
    this.hijos.push(arriba);

}
heredarPrototype(LadoCabina, Objeto);

/**
 * Genera una vuelta al mundo con una cantidad de divisiones
 * La rueda tendra el radio dado y estara 2.2 unitades sobre el suelo
 * @param {type} divisiones         Numero de cabinas
 * @param {type} radio              Radio
 * @returns {undefined}
 */
function Vuelta(divisiones, radio)
{
    Objeto.call(this, null, null);
    
    if (radio == null) radio = 3;
    
    divisiones *= 2;
    
    this.hijos.push(new VuRueda(divisiones, radio));
    this.hijos.push(new VuParante(radio, 0));
    this.hijos.push(new VuParante(radio, Math.PI));
    
    mat4.translate(this.matrices, this.matrices, [0,radio+2.2,0]);
    mat4.rotate(this.matrices, this.matrices, Math.PI/2, [0,1,0]);
}

heredarPrototype(Vuelta, Objeto);

/**
 * Posiciona un parante que es un cubo deformado a 1.1 del centro y tocando el suelo
 * @param {type} radio              Radio de la rueda
 * @param {type} rotacion           Rotacion post traslacion para posicionar
 * @returns {undefined}
 */
function VuParante(radio, rotacion)
{
    Cubo.call(this, "texturas/pixel.png");
    var distSuelo = radio+2.2;
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
 * @param {type} divisiones
 * @param {type} radio
 * @returns {undefined}
 */
function VuRueda(divisiones, radio)
{
    Objeto.call(this, null, null);
    this.hijos.push(new VuCara(divisiones, radio));
    mat4.translate(this.hijos[0].matrices,this.hijos[0].matrices, [1.1,0,0]);
    this.hijos.push(new VuCara(divisiones, radio));
    mat4.translate(this.hijos[1].matrices,this.hijos[1].matrices, [-1.1,0,0]);  
    this.hijos.push(new VuUniones(divisiones, radio));
    
    this.cabinas = new VuCabinas(divisiones, radio);
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
 * @param {type} radio              Radio
 * @returns {undefined}
 */
function VuCara(divisiones, radio)
{
    Objeto.call(this, null, null);
    this.hijos.push(new VuCirculo(divisiones, radio));
    this.hijos.push(new VuCirculo(divisiones, radio/2));
    this.hijos.push(new VuEstrella(divisiones, radio));
}
heredarPrototype(VuCara, Objeto);

/**
 * Las uniones entre las dos caras y el eje
 * @param {type} divisiones         Numero de divisiones
 * @param {type} radio              Radio
 * @returns {undefined}
 */
function VuUniones(divisiones, radio)
{
    Objeto.call(this, null, null);
    
    var largo = 2.2*0.5;
    var angulo = Math.PI/divisiones;
    for (var i = 0; i < divisiones/2; ++i)
    {
        this.hijos.push(new CilindroSinTapa(6, 0, "texturas/pixel.png"));
        mat4.rotate(this.hijos[i].matrices, this.hijos[i].matrices, angulo*i*4, [1.0,0.0,0.0]);
        mat4.translate(this.hijos[i].matrices,this.hijos[i].matrices, [0,0,radio]);
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
 * @param {type} radio              Radio
 * @returns {undefined}
 */
function VuEstrella(divisiones, radio)
{
    Objeto.call(this, null, null);
    
    divisiones /= 2;
        
    var largo = radio;
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
 * @param {type} radio              Radio
 * @returns {undefined}
 */
function VuCirculo(divisiones, radio)
{
    Objeto.call(this, null, null);
    
    var esPar = (divisiones/2 + 1) % 2;
    var largo = radio*Math.tan(Math.PI/divisiones);
    var angulo = Math.PI*2/divisiones;
    for (var i = 0; i < divisiones; ++i)
    {
        this.hijos.push(new CilindroSinTapa(8, 0, "texturas/pixel.png"));
        mat4.rotate(this.hijos[i].matrices, this.hijos[i].matrices, angulo*i+angulo/2*esPar, [1.0,0.0,0.0])
        mat4.translate(this.hijos[i].matrices,this.hijos[i].matrices, [0,radio,0]);
        mat4.scale(this.hijos[i].matrices, this.hijos[i].matrices, [0.05,0.05,largo]); 
    }
}
heredarPrototype(VuCirculo, Objeto);

/**
 * Las cabinas
 * @param {type} Numero         Cantidad de cabinas
 * @param {type} radio          Radio de la rueda
 * @returns {undefined}
 */
function VuCabinas(numero, radio)
{
    Objeto.call(this, null, null);
    
    this.numer = numero;
    this.radio = radio;
    
    var angulo = Math.PI/numero;
    for (var i = 0; i < numero/2; ++i)
    {
        this.hijos.push(new VuCabina(angulo*i*4, radio));
    }
}

heredarPrototype(VuCabinas, Objeto);

/**
 * Una cabina. TODO: Un mejor modelo
 * @param {type} angulo     Angulo respecto al centro del circulo
 * @param {type} radio      Radio del circulo
 * @returns {VuCabina}
 */
function VuCabina(angulo, radio)
{
    Cubo.call(this, "texturas/pixel.png");
        
    this.aTransformar = mat4.create();
    this.contador = 0;
    this.angulo = angulo;
    this.radio = radio;
    //mat4.translate(this.aTransformar ,this.aTransformar , [0,-1,0]);
    mat4.rotate(this.aTransformar ,this.aTransformar, angulo, [1.0,0.0,0.0]);
    mat4.translate(this.aTransformar ,this.aTransformar , [0,0,radio]);
    mat4.rotate(this.aTransformar ,this.aTransformar , -angulo, [1.0,0.0,0.0]);
    this.textura.hueRamp(angulo/(Math.PI*2), 0.2, 0.8);
}
heredarPrototype(VuCabina, Cubo);

/**
 * Rotacion de la rueda
 */
VuCabina.prototype.update = function(deltaT) 
{
    this.contador += deltaT;
    mat4.identity(this.matrices);
    mat4.mul(this.matrices, this.matrices, this.aTransformar);
    mat4.rotate(this.matrices, this.matrices, -velocidadAngular*this.contador, [1.0,0.0,0.0]);
    Objeto.prototype.update.call(this,deltaT);
};

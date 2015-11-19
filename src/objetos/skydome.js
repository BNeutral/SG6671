/**
 * Crea una media esfera gigante
 * @param {type} txPath
 * @returns {undefined}
 */
function SkyDome(txPath)
{
    Esfera.call(this, 64, 64, "texturas/sky_sunbeams1.jpg", Math.PI/2);
    
    this.textura.colorShadeless = vec3.fromValues(1,1,1);
    this.textura.kAmbiente = 0;
    this.textura.kDifuso = 0;
    this.textura.kEspecular = 0;

    mat4.scale(this.matrices, this.matrices, [5000,5000,5000]);
}

heredarPrototype(SkyDome, Esfera);
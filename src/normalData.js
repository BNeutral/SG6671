/**
 * Objeto con la data de normales, tangentes, etc
 * @param {type} vNormals       Normales. Array que definen una cada 3
 * @param {type} vTg            Tangentes. Array que definen una cada 3
 * @param {type} vBinormals     Si es null se calculan automaticamente
 * @returns {NormalData}
 */
function NormalData(vNormals, vTg, vBinormals)
{
    this.vNormals = vNormals;
    this.vTg = vTg;
    this.vBinormals = vBinormals;
        
    if (!vBinormals) 
    {
        this.autoBinormales();
    }
}

/**
 * Calcula las binormales como producto vectorial de normales y tangentes
 * @returns {undefined}
 */
NormalData.prototype.autoBinormales = function()
{
    this.vBinormals = [];
    for (var i = 0; i < this.vNormals.length; i+=3)
    {
        var v1 = vec3.fromValues(this.vNormals[i],this.vNormals[i+1],this.vNormals[i+2]);
        var v2 = vec3.fromValues(this.vTg[i],this.vTg[i+1],this.vTg[i+2]);
        vec3.cross(v1,v1,v2);
        this.vBinormals.push(v1[0]);
        this.vBinormals.push(v1[1]);
        this.vBinormals.push(v1[2]);
    }
}

NormalData.prototype.flipNormales = function()
{
    for (var i = 0; i < this.vNormals.length; ++i)
    {
        this.vNormals[i] = -this.vNormals[i];
    }
};
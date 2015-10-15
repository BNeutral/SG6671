/**
 * Herencia segun lo dado en clase como ejemplo
 * @param {type} hijo       "clase" que hereda
 * @param {type} padre      "clase" padre
 * @returns {undefined}
 */
function heredarPrototype(hijo, padre) 
{
    var copia = Object.create(padre.prototype);
    copia.constructor = hijo;
    hijo.prototype = copia;
}
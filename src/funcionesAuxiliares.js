function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
    
    
/**
 * Devuelve el numero combinatorio (n k)
 * @param {type} n
 * @param {type} k
 * @returns {undefined}
 */
function nComb(n,k)
{
    return (factorial(n)/(factorial(k)*factorial(n-k)));
}

/**
 * Devuelve n! (n factorial)
 * @param {type} n
 * @returns {Number}
 */
function factorial(n)
{
    return(n<2)?1:factorial(n-1)*n;
}
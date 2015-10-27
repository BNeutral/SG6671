    
function sleep(millis)
{
      var date = new Date();
      var curDate = null;
      do { curDate = new Date(); }
      while(curDate-date < millis);
}


function degToRad(degrees) {
        return degrees * Math.PI / 180;
}


  
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
    
    
    

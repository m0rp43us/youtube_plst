module.exports.secondsToString = (seconds) => 
{
var numyears = Math.floor(seconds / 31536000);
var numdays = Math.floor((seconds % 31536000) / 86400); 
var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
var numseconds = Math.floor(((seconds % 31536000) % 86400) % 3600) % 60;
if(!numyears){
    if(!numdays){
        if(!numhours){
            if(!numminutes){
                numseconds + " seconds";
            }
            return numminutes + " minutes " + numseconds + " seconds";
        }
        return numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
    }
    numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
}
return numyears + " years " +  numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
}

var UIDG = (function(){

    var ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    var create = function(size, startWith, amount){
        if(!amount){
            amount = 1;
        }
        var arrayOfIDs = [];
        for(var i=0; i<amount; i++){
            var newID = "";
            if(startWith){
                newID = newID + startWith;
            }
            for(var j=0; j<size; j++){
                newID = newID + ALPHABET[Math.floor(Math.random()*ALPHABET.length)];
            }
            if(!arrayOfIDs.includes(newID)){
                arrayOfIDs.push(newID);
            }
        }
        if(amount == 1){
            return arrayOfIDs[0];
        }
        else{
            return arrayOfIDs;
        }
    };

    return {
        create: create
    };

})();
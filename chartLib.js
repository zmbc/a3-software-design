/*
    function newObj(){
        var name = "test";
        var age = 22;

        var obj = function(){
            return {
                name: name,
                age: age
            }
        }

        Example attr
        obj.attr = function(attr, val){
            if(!arguments.length) {
                console.warning("No arguments provided to attr method");
                return this; 
                }
            if(arguments.length < 2) { return this[attr]; }
            this[attr] = val;
            return this;
        }

        return obj;
    }

*/
var _ = require('underscore')._
  , jwt = require('jwt-simple')
  ;
    
_.mixin({
    decodeToken: function(token, secret){
        return jwt.decode(token, secret);
    },
    encodeToken: function(obj, secret){
        return jwt.encode(obj, secret);
    }
})

module.exports = {
    _: _
} 
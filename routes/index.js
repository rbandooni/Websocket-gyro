
/*
 * GET home page.
 */

exports.index = function(req, res){
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
     //console.log(ip);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.render('index', { title: 'Websocket app' });
};

exports.control=function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.render('control',{title: 'Websocket controller'});
    
}
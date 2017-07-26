var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var fs             =		 require("fs");
var readline       =         require("readline");
var stream         =         require("stream");
list=[];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/static'));


var instream = fs.createReadStream('read.txt');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

rl.on('line', function(line) {
    //console.log(line);
    id=line.slice(0,20);
    line=line.slice(20);
    line=line.slice(0,141);
    line=line.trim();
    list.push({'id':"nytimes "+ id,'tweet':line});
    console.log(list);
    });



app.get('/',function(req,res){
  res.sendfile("views/index.html");
});

app.post('/login',function(req,res){
  var term_name=req.body.term;
  result=[];
  for (var i in list){
  	var x=list[i]['tweet'].toLowerCase();
  	var y=req.body.term.toLowerCase();
    if (x.indexOf(y) > -1) {
    	result.push(list[i]);}}
   
    
  console.log("term name = "+result);
  

res.contentType('application/json');
res.send(JSON.stringify(result));
  //res.end("done");
  //ab=JSON.stringify(result);
  //res.end(ab);
});
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
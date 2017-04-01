/**
 * Created by Wubin on 2016/12/12.
 */
/*服务器处理url请求并返回json数据*/
const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    var otherArray = ["item1", "item2"];
    var otherObject = { item1: "item1val", item2: "item2val" };
    var json = JSON.stringify({
        anObject: otherObject,
        anArray: otherArray,
    });
    res.end("success_jsonpCallback(" + json + ")");
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
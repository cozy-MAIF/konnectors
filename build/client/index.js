var jade = require('jade/runtime');module.exports=
function template(locals) {
var jade_debug = [ new jade.DebugItem( 1, "./client/index.jade" ) ];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (imports) {
jade_debug.unshift(new jade.DebugItem( 0, "./client/index.jade" ));
jade_debug.unshift(new jade.DebugItem( 1, "./client/index.jade" ));
buf.push("<!DOCTYPE html>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 2, "./client/index.jade" ));
buf.push("<html>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 3, "./client/index.jade" ));
buf.push("<head>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 4, "./client/index.jade" ));
buf.push("<title>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 4, jade_debug[0].filename ));
buf.push("Konnectors");
jade_debug.shift();
jade_debug.shift();
buf.push("</title>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 5, "./client/index.jade" ));
buf.push("<meta charset=\"utf-8\">");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 6, "./client/index.jade" ));
buf.push("<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 7, "./client/index.jade" ));
buf.push("<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 8, "./client/index.jade" ));
buf.push("<link rel=\"stylesheet\" href=\"stylesheets/app.css\">");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 9, "./client/index.jade" ));
buf.push("<script src=\"socket.io/socket.io.js\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</script>");
jade_debug.shift();
jade_debug.shift();
buf.push("</head>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 11, "./client/index.jade" ));
buf.push("<body>");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 12, "./client/index.jade" ));
buf.push("<div class=\"main-container\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 13, "./client/index.jade" ));
buf.push("<script>" + (null == (jade_interp = imports) ? "" : jade_interp));
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</script>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 14, "./client/index.jade" ));
buf.push("<script src=\"javascripts/vendor.js\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</script>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 15, "./client/index.jade" ));
buf.push("<script src=\"javascripts/app.js\" onload=\"require('initialize');\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</script>");
jade_debug.shift();
jade_debug.shift();
buf.push("</body>");
jade_debug.shift();
jade_debug.shift();
buf.push("</html>");
jade_debug.shift();
jade_debug.shift();}.call(this,"imports" in locals_for_with?locals_for_with.imports:typeof imports!=="undefined"?imports:undefined));;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype\nhtml\n  head\n    title Konnectors\n    meta(charset=\"utf-8\")\n    meta(http-equiv=\"X-UA-Compatible\", content=\"IE=edge,chrome=1\")\n    meta(name=\"viewport\", content=\"width=device-width,initial-scale=1.0\")\n    link(rel=\"stylesheet\", href=\"stylesheets/app.css\")\n    script(src=\"socket.io/socket.io.js\")\n\n  body\n    .main-container\n    script!= imports\n    script(src=\"javascripts/vendor.js\")\n    script(src=\"javascripts/app.js\", onload=\"require('initialize');\")\n");
}
}
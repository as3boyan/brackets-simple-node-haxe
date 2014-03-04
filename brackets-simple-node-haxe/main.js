(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var brackets_externs = {}
brackets_externs.extensions = {}
brackets_externs.extensions.IExtension = function() { }
brackets_externs.extensions.IExtension.__name__ = true;
brackets_externs.extensions.Extension = function() {
	var _g = this;
	brackets_externs.Brackets.define(function(require,exports,p_module) {
		_g._require = require;
		_g.module = p_module;
		_g.initialize();
	});
};
brackets_externs.extensions.Extension.__name__ = true;
brackets_externs.extensions.Extension.__interfaces__ = [brackets_externs.extensions.IExtension];
brackets_externs.extensions.Extension.prototype = {
	require: function(moduleName) {
		return this._require(moduleName);
	}
	,initialize: function() {
	}
}
var BracketsSimpleNodeHaxeExtension = function() {
	brackets_externs.extensions.Extension.call(this);
};
BracketsSimpleNodeHaxeExtension.__name__ = true;
BracketsSimpleNodeHaxeExtension.__super__ = brackets_externs.extensions.Extension;
BracketsSimpleNodeHaxeExtension.prototype = $extend(brackets_externs.extensions.Extension.prototype,{
	chain: function(p_functions) {
		var _g = this;
		var functions = p_functions.slice();
		if(functions.length > 0) {
			var firstFunction = functions.shift();
			var firstPromise = firstFunction();
			firstPromise.done(function() {
				_g.chain(functions);
			});
		}
	}
	,logMemory: function() {
		var memoryPromise = this.nodeConnection.domains.simple.getMemory();
		memoryPromise.fail(function(err) {
			haxe.Log.trace("[brackets-simple-node] failed to run simple.getMemory",{ fileName : "BracketsSimpleNodeHaxeExtension.hx", lineNumber : 64, className : "BracketsSimpleNodeHaxeExtension", methodName : "logMemory", customParams : [err]});
		});
		memoryPromise.done(function(memory) {
			haxe.Log.trace("[brackets-simple-node] Memory: %d of %d bytes free (%d%)",{ fileName : "BracketsSimpleNodeHaxeExtension.hx", lineNumber : 67, className : "BracketsSimpleNodeHaxeExtension", methodName : "logMemory", customParams : [memory.free,memory.total,Math.floor(memory.free * 100 / memory.total)]});
		});
		return memoryPromise;
	}
	,loadSimpleDomain: function() {
		var path = this.ExtensionUtils.getModulePath(this.module,"node/SimpleDomain");
		var loadPromise = this.nodeConnection.loadDomains([path],true);
		loadPromise.fail(function() {
			haxe.Log.trace("[brackets-simple-node] failed to load domain",{ fileName : "BracketsSimpleNodeHaxeExtension.hx", lineNumber : 55, className : "BracketsSimpleNodeHaxeExtension", methodName : "loadSimpleDomain"});
		});
		return loadPromise;
	}
	,connect: function() {
		var connectionPromise = this.nodeConnection.connect(true);
		connectionPromise.fail(function() {
			haxe.Log.trace("[brackets-simple-node] failed to connect to node",{ fileName : "BracketsSimpleNodeHaxeExtension.hx", lineNumber : 44, className : "BracketsSimpleNodeHaxeExtension", methodName : "connect"});
		});
		return connectionPromise;
	}
	,initialize: function() {
		var _g = this;
		brackets_externs.extensions.Extension.prototype.initialize.call(this);
		var AppInit = brackets_externs.Brackets.getModule("utils/AppInit");
		this.ExtensionUtils = brackets_externs.Brackets.getModule("utils/ExtensionUtils");
		var NodeConnection = brackets_externs.Brackets.getModule("utils/NodeConnection");
		AppInit.appReady(function() {
			_g.nodeConnection = Type.createInstance(NodeConnection,[]);
			_g.chain([$bind(_g,_g.connect),$bind(_g,_g.loadSimpleDomain),$bind(_g,_g.logMemory)]);
		});
	}
});
var Main = function() { }
Main.__name__ = true;
Main.main = function() {
	var extension = new BracketsSimpleNodeHaxeExtension();
}
var Type = function() { }
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
brackets_externs.Brackets = function() {
};
brackets_externs.Brackets.__name__ = true;
brackets_externs.Brackets.define = function(constructor) {
	define(constructor);
}
brackets_externs.Brackets.getModule = function(module) {
	return brackets.getModule(module);
}
brackets_externs.utils = {}
brackets_externs.utils.CursorPos = function(line,ch) {
	this.line = line;
	this.ch = ch;
};
brackets_externs.utils.CursorPos.__name__ = true;
brackets_externs.utils.Range = function(startLine,endLine) {
	this.startLine = startLine;
	this.endLine = endLine;
};
brackets_externs.utils.Range.__name__ = true;
brackets_externs.utils.ScrollPos = function(x,y) {
	this.x = x;
	this.y = y;
};
brackets_externs.utils.ScrollPos.__name__ = true;
brackets_externs.utils.Selection = function(start,end) {
	this.start = start;
	this.end = end;
};
brackets_externs.utils.Selection.__name__ = true;
var haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0, _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.__name__ = true;
Array.__name__ = true;
var q = window.jQuery;
js.JQuery = q;
Main.main();
})();

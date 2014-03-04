package ;

/**
 * ...
 * @author 
 */

import brackets.extensions.Extension;
import brackets.Brackets;
import js.Browser;
import js.Lib;
 
class BracketsSimpleNodeHaxeExtension extends Extension
{
	var nodeConnection:Dynamic;
	var ExtensionUtils:brackets.utils.ExtensionUtils;

	public function new() 
	{
		super();
	}
	
	override function initialize():Void
	{
		super.initialize();
		
		var AppInit:brackets.utils.AppInit = Brackets.getModule("utils/AppInit");
		ExtensionUtils = Brackets.getModule("utils/ExtensionUtils");
        var NodeConnection = Brackets.getModule("utils/NodeConnection");
		
		AppInit.appReady(function ()
		{
			nodeConnection = Type.createInstance(NodeConnection, []);			
			chain([connect, loadSimpleDomain, logMemory]);
		}
		);
	}
	
	private function connect()
	{
		var connectionPromise = nodeConnection.connect(true);
		connectionPromise.fail(function ()
		{
			trace("[brackets-simple-node] failed to connect to node");
		}
		);
		return connectionPromise;
	}
	
	private function loadSimpleDomain()
	{
		var path = ExtensionUtils.getModulePath(module, "node/SimpleDomain");
		var loadPromise = nodeConnection.loadDomains([path], true);
		loadPromise.fail(function () {
			trace("[brackets-simple-node] failed to load domain");
		});
		return loadPromise;
	}
	
	private function logMemory() 
	{
		var memoryPromise = nodeConnection.domains.simple.getMemory();
		memoryPromise.fail(function (err) {
			trace("[brackets-simple-node] failed to run simple.getMemory", err);
		});
		memoryPromise.done(function (memory) {
			trace(
				"[brackets-simple-node] Memory: %d of %d bytes free (%d%)",
				memory.free,
				memory.total,
				Math.floor(memory.free * 100 / memory.total)
			);
		});
		return memoryPromise;
	}
	
	private function chain(p_functions:Array<Dynamic>)
	{
		var functions:Array<Dynamic> = p_functions.copy();
		
		if (functions.length > 0)
		{
			var firstFunction = functions.shift();
			var firstPromise = firstFunction();
			firstPromise.done(function ()
			{
				chain(functions);
			}
			);
		}
	}
	
}
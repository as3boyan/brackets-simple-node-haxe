package ;

/**
 * ...
 * @author AS3Boyan
 */
class Node
{

	public static var os:js.Node.NodeOs;
	
	public static function main() 
	{
		os = js.Node.os;
		untyped __js__("exports.init = this.init");
	}
	
	private static function cmdGetMemory()
	{
		return {total: os.totalmem(), free: os.freemem()}; 
	}
	
	private static function init(domainManager:brackets.DomainManager)
	{
		if (!domainManager.hasDomain("simple")) {
            domainManager.registerDomain("simple", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "simple",       // domain name
            "getMemory",    // command name
            cmdGetMemory,   // command handler function
            false,          // this command is synchronous
            "Returns the total and free memory on the user's system in bytes",
            [],             // no parameters
            [{name: "memory",
                type: "{total: number, free: number}",
                description: "amount of total and free memory in bytes"}]
        );
	}
	
}
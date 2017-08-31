"use strict";

{
	const PLUGIN_CLASS = SDK.Plugins.SocketIoC3;
	
	PLUGIN_CLASS.Type = class SocketIoC3Type extends SDK.ITypeBase
	{
		constructor(sdkPlugin, iObjectType)
		{
			super(sdkPlugin, iObjectType);
		}
	};
}
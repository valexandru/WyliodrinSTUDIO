async function loadPlugins (progress = () => {}) {
	var plugins = [];
	var plugin;

	progress ('console', 1, 45);
	plugin = await import ('../plugins/console/index.js');
	plugins.push ({name:'console', consumes:["workspace","xterm"], provides:["console"], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard', 2, 45);
	plugin = await import ('../plugins/dashboard/index.js');
	plugins.push ({name:'dashboard', consumes:["workspace","projects"], provides:["dashboard"], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard.graph.extra', 3, 45);
	plugin = await import ('../plugins/dashboard.graph.extra/index.js');
	plugins.push ({name:'dashboard.graph.extra', consumes:["workspace","dashboard"], provides:["dashboard_graph_extra"], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard.graph.gauge', 4, 45);
	plugin = await import ('../plugins/dashboard.graph.gauge/index.js');
	plugins.push ({name:'dashboard.graph.gauge', consumes:["workspace","dashboard"], provides:["dashboard_graph_gauge"], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard.graph.line', 5, 45);
	plugin = await import ('../plugins/dashboard.graph.line/index.js');
	plugins.push ({name:'dashboard.graph.line', consumes:["workspace","dashboard"], provides:["dashboard_graph_line"], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard.graph.slider', 6, 45);
	plugin = await import ('../plugins/dashboard.graph.slider/index.js');
	plugins.push ({name:'dashboard.graph.slider', consumes:["workspace","dashboard"], provides:["dashboard_graph_slider"], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard.graph.speedometer', 7, 45);
	plugin = await import ('../plugins/dashboard.graph.speedometer/index.js');
	plugins.push ({name:'dashboard.graph.speedometer', consumes:["workspace","dashboard"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard.graph.switch', 8, 45);
	plugin = await import ('../plugins/dashboard.graph.switch/index.js');
	plugins.push ({name:'dashboard.graph.switch', consumes:["workspace","dashboard"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard.graph.thermometer', 9, 45);
	plugin = await import ('../plugins/dashboard.graph.thermometer/index.js');
	plugins.push ({name:'dashboard.graph.thermometer', consumes:["workspace","dashboard"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('dashboard.graph.vumeter', 10, 45);
	plugin = await import ('../plugins/dashboard.graph.vumeter/index.js');
	plugins.push ({name:'dashboard.graph.vumeter', consumes:["workspace","dashboard"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('device.rpk', 11, 45);
	plugin = await import ('../plugins/device.rpk/index.js');
	plugins.push ({name:'device.rpk', consumes:["workspace","projects","events","device_wyapp","console","filesystem","system"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('device.simulator.rpk', 12, 45);
	plugin = await import ('../plugins/device.simulator.rpk/index.js');
	plugins.push ({name:'device.simulator.rpk', consumes:["workspace","console","projects"], provides:["device_simulator_rpk"], setup: plugin.setup || plugin.default || plugin});
	progress ('device.wyapp', 13, 45);
	plugin = await import ('../plugins/device.wyapp/index.js');
	plugins.push ({name:'device.wyapp', consumes:["workspace","events","console","projects","shell","notebook","dashboard","filesystem"], provides:["device_wyapp"], setup: plugin.setup || plugin.default || plugin});
	progress ('device.wyapp.beagleboneblack', 14, 45);
	plugin = await import ('../plugins/device.wyapp.beagleboneblack/index.js');
	plugins.push ({name:'device.wyapp.beagleboneblack', consumes:["device_wyapp","workspace","events","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('device.wyapp.picopi', 15, 45);
	plugin = await import ('../plugins/device.wyapp.picopi/index.js');
	plugins.push ({name:'device.wyapp.picopi', consumes:["device_wyapp","workspace","events","editor_visual","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('device.wyapp.raspberrypi', 16, 45);
	plugin = await import ('../plugins/device.wyapp.raspberrypi/index.js');
	plugins.push ({name:'device.wyapp.raspberrypi', consumes:["device_wyapp","workspace","events","editor_visual","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('device.wyapp.udooneo', 17, 45);
	plugin = await import ('../plugins/device.wyapp.udooneo/index.js');
	plugins.push ({name:'device.wyapp.udooneo', consumes:["device_wyapp","workspace","events"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('device.wyapp.websocket', 18, 45);
	plugin = await import ('../plugins/device.wyapp.websocket/index.js');
	plugins.push ({name:'device.wyapp.websocket', consumes:["workspace","settings","device_wyapp"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('documentation', 19, 45);
	plugin = await import ('../plugins/documentation/index.js');
	plugins.push ({name:'documentation', consumes:["workspace","system"], provides:["documentation"], setup: plugin.setup || plugin.default || plugin});
	progress ('documentation.resistorcolorcodes', 20, 45);
	plugin = await import ('../plugins/documentation.resistorcolorcodes/index.js');
	plugins.push ({name:'documentation.resistorcolorcodes', consumes:["workspace"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('events', 21, 45);
	plugin = await import ('../plugins/events/index.js');
	plugins.push ({name:'events', consumes:[], provides:["events"], setup: plugin.setup || plugin.default || plugin});
	progress ('filesystem', 22, 45);
	plugin = await import ('../plugins/filesystem/index.js');
	plugins.push ({name:'filesystem', consumes:[], provides:["filesystem"], setup: plugin.setup || plugin.default || plugin});
	progress ('filesystem.web', 23, 45);
	plugin = await import ('../plugins/filesystem.web/index.js');
	plugins.push ({name:'filesystem.web', consumes:["filesystem"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('first.run', 24, 45);
	plugin = await import ('../plugins/first.run/index.js');
	plugins.push ({name:'first.run', consumes:["events","settings","projects","system","workspace"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.nodejs', 25, 45);
	plugin = await import ('../plugins/language.nodejs/index.js');
	plugins.push ({name:'language.nodejs', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.python', 26, 45);
	plugin = await import ('../plugins/language.python/index.js');
	plugins.push ({name:'language.python', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.shell', 27, 45);
	plugin = await import ('../plugins/language.shell/index.js');
	plugins.push ({name:'language.shell', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.visual', 28, 45);
	plugin = await import ('../plugins/language.visual/index.js');
	plugins.push ({name:'language.visual', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.visual.gpiozero', 29, 45);
	plugin = await import ('../plugins/language.visual.gpiozero/index.js');
	plugins.push ({name:'language.visual.gpiozero', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.visual.libwyliodrin', 30, 45);
	plugin = await import ('../plugins/language.visual.libwyliodrin/index.js');
	plugins.push ({name:'language.visual.libwyliodrin', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.visual.rpk', 31, 45);
	plugin = await import ('../plugins/language.visual.rpk/index.js');
	plugins.push ({name:'language.visual.rpk', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.visual.wyapp', 32, 45);
	plugin = await import ('../plugins/language.visual.wyapp/index.js');
	plugins.push ({name:'language.visual.wyapp', consumes:["editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('language.visual.wyliozero', 33, 45);
	plugin = await import ('../plugins/language.visual.wyliozero/index.js');
	plugins.push ({name:'language.visual.wyliozero', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('notebook', 34, 45);
	plugin = await import ('../plugins/notebook/index.js');
	plugins.push ({name:'notebook', consumes:["workspace","projects","filesystem"], provides:["notebook"], setup: plugin.setup || plugin.default || plugin});
	progress ('pinlayout', 35, 45);
	plugin = await import ('../plugins/pinlayout/index.js');
	plugins.push ({name:'pinlayout', consumes:["workspace"], provides:["pin_layout"], setup: plugin.setup || plugin.default || plugin});
	progress ('projects', 36, 45);
	plugin = await import ('../plugins/projects/index.js');
	plugins.push ({name:'projects', consumes:["workspace","xterm","filesystem","settings"], provides:["projects"], setup: plugin.setup || plugin.default || plugin});
	progress ('projects.editor.ace', 37, 45);
	plugin = await import ('../plugins/projects.editor.ace/index.js');
	plugins.push ({name:'projects.editor.ace', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('projects.editor.images', 38, 45);
	plugin = await import ('../plugins/projects.editor.images/index.js');
	plugins.push ({name:'projects.editor.images', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin});
	progress ('projects.editor.opcuamodel', 39, 45);
	plugin = await import ('../plugins/projects.editor.opcuamodel/index.js');
	plugins.push ({name:'projects.editor.opcuamodel', consumes:["workspace","projects","editor_visual"], provides:["editor_opcuamodel"], setup: plugin.setup || plugin.default || plugin});
	progress ('projects.editor.visual', 40, 45);
	plugin = await import ('../plugins/projects.editor.visual/index.js');
	plugins.push ({name:'projects.editor.visual', consumes:["workspace","projects"], provides:["editor_visual"], setup: plugin.setup || plugin.default || plugin});
	progress ('settings', 41, 45);
	plugin = await import ('../plugins/settings/index.js');
	plugins.push ({name:'settings', consumes:["filesystem"], provides:["settings"], setup: plugin.setup || plugin.default || plugin});
	progress ('shell', 42, 45);
	plugin = await import ('../plugins/shell/index.js');
	plugins.push ({name:'shell', consumes:["workspace","xterm"], provides:["shell"], setup: plugin.setup || plugin.default || plugin});
	progress ('system.browser', 43, 45);
	plugin = await import ('../plugins/system.browser/index.js');
	plugins.push ({name:'system.browser', consumes:[], provides:["system"], setup: plugin.setup || plugin.default || plugin});
	progress ('workspace', 44, 45);
	plugin = await import ('../plugins/workspace/index.js');
	plugins.push ({name:'workspace', consumes:["system","settings","hooks"], provides:["workspace"], setup: plugin.setup || plugin.default || plugin});
	progress ('xterm', 45, 45);
	plugin = await import ('../plugins/xterm/index.js');
	plugins.push ({name:'xterm', consumes:["workspace"], provides:["xterm"], setup: plugin.setup || plugin.default || plugin});
	return plugins;
}
module.exports.loadPlugins = loadPlugins;

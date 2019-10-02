// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;
	// Screen and Keyboard

	Blockly.Blocks['opcuamodel_variable'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('OPC/UA Variable');
			this.appendDummyInput()
				.appendField('Name')
				.appendField(new Blockly.FieldTextInput('variable_name'), 'variable_name');
			this.appendDummyInput()
				.appendField('Data Type')
				.appendField(new Blockly.FieldDropdown([['Int', 'Integer'], ['option', 'OPTIONNAME'], ['option', 'OPTIONNAME']]), 'variable_type');
			this.appendDummyInput()
				.appendField('History')
				.appendField(new Blockly.FieldCheckbox('FALSE'), 'variable_history');
			this.setInputsInline(false);
			this.setPreviousStatement(true, ['opcuamodel_property', 'opcuamodel_object', 'opcuamodel_folder']);
			this.setNextStatement(true, ['opcuamodel_property', 'opcuamodel_object', 'opcuamodel_folder']);
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.Blocks['opcuamodel_folder'] = {
		init: function () {
			this.appendDummyInput()
				.appendField('OPC/UA Folder')
				.appendField(new Blockly.FieldTextInput('folder_name'), 'folder_name');
			this.appendStatementInput('folder_objects_properties')
				.setCheck(['opcuamodel_property', 'opcuamodel_object', 'opcuamodel_folder']);
			this.setPreviousStatement(true, ['opcuamodel_object', 'opcuamodel_folder']);
			this.setNextStatement(true, ['opcuamodel_object', 'opcuamodel_folder']);
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

};

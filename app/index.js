'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var generators = require('yeoman-generator');

var BonesGenerator = module.exports = function BonesGenerator(args, options, config) {
	generators.Base.apply(this, arguments);

	// setup the test-framework property, Gruntfile template will need this
	//this.testFramework = 'mocha';
	// resolved to mocha by default
	//this.hookFor('mocha', { as: 'app' });

	// this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

	this.on('end', function() {
		this.installDependencies({
			skipInstall: options['skip-install']
		});
	});

	// this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
	this.pkg = JSON.parse(require('html-wiring').readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BonesGenerator, generators.Base);

BonesGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.generators);
	console.log('This generator scaffolds out a basic web project. \n\nIt\'s based on generator-webapp, but simplified and with some other useful stuff added in, such as Assemble for building static HTML files from modular templates and data.');

	var prompts = [{
		name: 'projectName',
		message: 'Give your project a name:'
	}];

	this.prompt(prompts, function(props) {
		this.projectName = props.projectName;

		cb();
	}.bind(this));
};

BonesGenerator.prototype.gruntfile = function gruntfile() {
	this.template('Gruntfile.js');
};

BonesGenerator.prototype.packageJSON = function packageJSON() {
	this.template('_package.json', 'package.json');
};

BonesGenerator.prototype.git = function git() {
	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
};

BonesGenerator.prototype.bower = function bower() {
	this.copy('bowerrc', '.bowerrc');
	this.copy('_bower.json', 'bower.json');
};

/*BonesGenerator.prototype.jshint = function jshint() {
	this.copy('jshintrc', '.jshintrc');
};*/

BonesGenerator.prototype.editorConfig = function editorConfig() {
	this.copy('editorconfig', '.editorconfig');
};

// BonesGenerator.prototype.writeIndex = function writeIndex() {};

BonesGenerator.prototype.scaffolding = function scaffolding() {
	this.mkdir('src');
	this.mkdir('src/images');
	this.mkdir('src/js');
	this.mkdir('src/css');
	this.mkdir('src/css/ui');
	this.mkdir('src/css/utils');
	this.mkdir('src/css/ui/partials');
	this.mkdir('src/templates');
	this.mkdir('src/templates/layouts');
	this.mkdir('src/templates/pages');
	this.mkdir('src/templates/partials');

	this.copy('_!-edit-template-files-not-html', 'src/_!-edit-template-files-not-html');

	this.copy('default.hbs', 'src/templates/layouts/default.hbs');
	this.copy('header.hbs', 'src/templates/partials/header.hbs');
	this.copy('index.hbs', 'src/templates/pages/index.hbs');

	this.copy('styles.scss', 'src/css/styles.scss');
	this.copy('_settings.global_vars.scss', 'src/css/_settings.global_vars.scss');
	this.copy('_settings.inuit_setup.scss', 'src/css/_settings.inuit_setup.scss');
	this.copy('_tools.mixins.scss', 'src/css/utils/_tools.mixins.scss');
	this.copy('_base.images.scss', 'src/css/ui/_base.images.scss');
	this.copy('_base.shared.scss', 'src/css/ui/_base.shared.scss');
	this.copy('_settings.grid_setup.scss', 'src/css/ui/_settings.grid_setup.scss');
	this.copy('_settings.mediaqueries.scss', 'src/css/ui/_settings.mediaqueries.scss');
	this.copy('_settings.no_touch.scss', 'src/css/ui/_settings.no_touch.scss');
	this.copy('_settings.page_body.scss', 'src/css/ui/_settings.page_body.scss');
	this.copy('_settings.touch.scss', 'src/css/ui/_settings.touch.scss');
	this.copy('_settings.typography.scss', 'src/css/ui/_settings.typography.scss');
	this.copy('_component.box.scss', 'src/css/ui/partials/_component.box.scss');
	this.copy('_component.buttons.scss', 'src/css/ui/partials/_component.buttons.scss');
	this.copy('_component.form.scss', 'src/css/ui/partials/_component.form.scss');
	this.copy('_component.layer.scss', 'src/css/ui/partials/_component.layer.scss');
	this.copy('_component.loading.scss', 'src/css/ui/partials/_component.loading.scss');
	this.copy('_component.social_sharing.scss', 'src/css/ui/partials/_component.social_sharing.scss');
	this.copy('_component.tabs.scss', 'src/css/ui/partials/_component.tabs.scss');
	this.copy('_trumps.brand.scss', 'src/css/ui/partials/_trumps.brand.scss');
	this.copy('_trumps.headings.scss', 'src/css/ui/partials/_trumps.headings.scss');
	this.copy('_trumps.icons.scss', 'src/css/ui/partials/_trumps.icons.scss');
	this.copy('_trumps.list.scss', 'src/css/ui/partials/_trumps.list.scss');
	this.copy('_trumps.tables.scss', 'src/css/ui/partials/_trumps.tables.scss');

	this.copy('main.js', 'src/js/main.js');
	this.copy('utils.js', 'src/js/utils.js');
	this.copy('plugins.js', 'src/js/libs/plugins.js');
	this.copy('modernizr.js', 'src/js/libs/modernizr.js');

	// this.write('src/index.html', this.indexFile);
};

'use strict';
var path = require('path'),
	yeoman = require('yeoman-generator'),
	generators = require('yeoman-generator'),
	templateEscape = {
		evaluate: /\{\{([\s\S]+?)\}\}/g,
		interpolate: /\{\{=([\s\S]+?)\}\}/g,
		escape: /\{\{-([\s\S]+?)\}\}/g
	};

module.exports = generators.Base.extend({

	initializing: function initializing() {

		this.pkg = require('../package.json');

	},

	prompting: function askFor() {

		var cb = this.async(), prompts;

		prompts = [{
			name: 'projectName',
			message: 'Give your project a name:',
			default: this.appname // Default to current folder name
		}];

		this.prompt(prompts, function(props) {

			this.projectName = props.projectName;

			cb();

		}.bind(this));

	},

	writing: {

		gruntFile: function gruntFile(){

			this.template('Gruntfile.js', 'Gruntfile.js', this, templateEscape);

		},

		packageJSON: function packageJSON() {

			this.template('_package.json', 'package.json', this.projectName);

		},

		git: function git() {

			this.copy('gitignore', '.gitignore');
			this.copy('gitattributes', '.gitattributes');

		},

		bower: function bower() {

			this.copy('bowerrc', '.bowerrc');
			this.copy('_bower.json', 'bower.json');

		},

		editorConfig: function editorConfig() {

			this.copy('editorconfig', '.editorconfig');

		},

		scaffolding: function scaffolding() {

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
			this.copy('inner.hbs', 'src/templates/pages/inner.hbs');

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
			this.copy('_trumps.tables.scss', 'src/css/ui/partials/_trumps.easing.scss');

			this.copy('main.js', 'src/js/main.js');
			this.copy('utils.js', 'src/js/utils.js');
			this.copy('plugins.js', 'src/js/libs/plugins.js');
			this.copy('modernizr.js', 'src/js/libs/modernizr.js');

		}

	},

	install: function install(){

		this.installDependencies();

	}

});

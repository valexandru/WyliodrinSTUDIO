<template>
	<div v-if="currentProject">
		<multipane @paneResize="panelresize" @paneResizeStop="storeresize" layout="vertical" class="vertical-panes">
			<div class="pane tree-show" :class="treeShow"  :style="{ minWidth: '195px', width: filetree_size, maxWidth: ' ' }" style="left:0;" v-if="advanced">
				<div layout="row">
					<div :class="treeShow" class="tree-show" v-if="advanced">
						<v-btn text @click="changeClassHide">
							<img src="plugins/projects/data/img/filem-hide.png" >
						</v-btn>
					</div>
					
					<div :class="projectTree" class="project-tree-on" v-if="advanced">
						<v-treeview
						v-model="tree"
						:open="open"
						:items="items"
						item-key="key"
						:active.sync="itemsActive"
						activatable
						@update:active="setActive"
						color="rgba(0,0,0,0.87)"
						return-object
						:open-on-click="true"
						dense
						>
						
						<template v-slot:prepend="{item, open}">
							<p v-if="item.path === '/'" @click="menuItem = item"  @contextmenu="fileItem = item,showProject($event)">
								<v-img v-if="languageImage().type" contain :src="languageImage().img" avatar ></v-img>
								<v-icon v-else>{{languageImage().img}}</v-icon>
							</p>
							<p v-else-if="item.file !== undefined" @contextmenu="fileItem = item,showFile($event)">
								<v-img v-if="getPictogram(item.path).type" contain :src="getPictogram(item.path).img" avatar ></v-img>
								<v-icon v-else>{{getPictogram(item.path).img}}</v-icon>

							</p>
							<p v-else-if="open && item.path !== '/'" text @click="menuItem = item"  @contextmenu="fileItem = item,showFolder($event)">
								<v-icon>mdi-folder-open</v-icon>
							</p>
							<p v-else-if="item.path !== '/'" text @click="menuItem = item" @contextmenu="fileItem = item,showFolder($event)">
								<v-icon>mdi-folder</v-icon>
							</p>
						</template>
						<template v-slot:label="{item, open}">
							<p style="width:100%;" v-if="item.file  === undefined && item.path === '/'" text @click="menuItem = item"  @contextmenu="fileItem = item,showProject($event)"> 
								{{item.name}}                  
							</p>
							<p style="width:100%;" v-else-if="item.file  === undefined && item.path !== '/'" text @click="menuItem = item"  @contextmenu="fileItem = item,showFolder($event)"> 
								{{item.name}}                  
							</p>
							<p v-else style="width:100%;" text @contextmenu="fileItem = item,showFile($event)">
								{{item.name}}
							</p>
							<!-- <v-menu
								v-model="projectMenu"
								:position-x="x"
								:position-y="y"
								absolute
								offset-y
								>
									<v-list>
										<v-list-item @click="newFolder(fileItem)">
											<v-list-item-title>{{$t('PROJECT_NEW_FOLDER')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="newFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_NEW_FILE')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="importFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_IMPORT_FILE')}}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>

							<v-menu
								v-model="folderMenu"
								:position-x="x"
								:position-y="y"
								absolute
								offset-y
								>
									<v-list>
										<v-list-item @click="deleteFolder(fileItem)">
											<v-list-item-title>{{$t('PROJECT_DELETE_FOLDER')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="renameObject(fileItem)">
											<v-list-item-title>{{$t('PROJECT_RENAME_FOLDER')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="newFolder(fileItem)">
											<v-list-item-title>{{$t('PROJECT_NEW_FOLDER')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="newFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_NEW_FILE')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="importFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_IMPORT_FILE')}}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>

								<v-menu
								v-model="fileMenu"
								:position-x="x"
								:position-y="y"
								absolute
								offset-y
								>
									<v-list>
										<v-list-item @click="deleteFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_DELETE_FILE')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="renameObject(fileItem)">
											<v-list-item-title>{{$t('PROJECT_RENAME_FILE')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="exportFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_EXPORT_FILE')}}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu> -->
						</template>
						
						</v-treeview>
						<v-menu
								v-model="projectMenu"
								:position-x="x"
								:position-y="y"
								absolute
								offset-y
								>
									<v-list>
										<v-list-item @click="newFolder(fileItem)">
											<v-list-item-title>{{$t('PROJECT_NEW_FOLDER')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="newFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_NEW_FILE')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="importFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_IMPORT_FILE')}}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>

							<v-menu
								v-model="folderMenu"
								:position-x="x"
								:position-y="y"
								absolute
								offset-y
								>
									<v-list>
										<v-list-item @click="deleteFolder(fileItem)">
											<v-list-item-title>{{$t('PROJECT_DELETE_FOLDER')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="renameObject(fileItem)">
											<v-list-item-title>{{$t('PROJECT_RENAME_FOLDER')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="newFolder(fileItem)">
											<v-list-item-title>{{$t('PROJECT_NEW_FOLDER')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="newFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_NEW_FILE')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="importFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_IMPORT_FILE')}}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>

								<v-menu
								v-model="fileMenu"
								:position-x="x"
								:position-y="y"
								absolute
								offset-y
								>
									<v-list>
										<v-list-item @click="deleteFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_DELETE_FILE')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="renameObject(fileItem)">
											<v-list-item-title>{{$t('PROJECT_RENAME_FILE')}}</v-list-item-title>
										</v-list-item>
										<v-list-item @click="exportFile(fileItem)">
											<v-list-item-title>{{$t('PROJECT_EXPORT_FILE')}}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
						<v-card-actions class="fm-actions">
							<v-btn @click="newFile(menuItem)" text icon>
								<v-icon>mdi-file-plus</v-icon>
							</v-btn>
							<v-btn @click="newFolder(menuItem)" text icon>
								<v-icon>mdi-folder-plus</v-icon>
							</v-btn>
							<v-btn @click="dirTree(menuItem)" text icon>
								<v-icon>mdi-refresh</v-icon>
							</v-btn>						
						</v-card-actions>		
					</div> 
				</div>
				<!--  -->
			</div>
			<multipane-resizer class="hs-100" style="z-index:2;">
				<div :class="treeHide" class="tree-hide" v-if="advanced">
					<v-btn text @click="changeClassShow">
						<img src="plugins/projects/data/img/filem-show.png" >
					</v-btn>
				</div>
			</multipane-resizer>
			<div :class="editorBox" class="hs-100 pane" :style="{ flexGrow: 1, width: '100px' }">
				<component ref="editor" v-if="currentEditor && currentFile && verifyLanguage(currentProject)" :is="currentEditor" :project="currentProject" :filename="currentFile" :active="active"></component>
				<div v-else-if="!verifyLanguage(currentProject)" class="projects-msg">
					{{$t('PROJECTS_INVALID_PROJECT')}}
				</div>
				<div v-else-if="currentFile === null" class="projects-msg">
					{{$t('PROJECTS_NO_FILE')}}
				</div>
				<div v-else-if="currentEditor === null" class="projects-msg">
					{{$t('PROJECTS_EXTENSION_URECOGNIZED')}}
				</div>
				
			</div>
		</multipane>
	</div>
	<div v-else-if="currentProject === null">
		<div class="projects-msg">
			<v-btn @click="projectLibrary()">{{$t('PROJECT_LOAD_PROJECT')}}</v-btn>
		</div>
	</div>
</template>

<style lang="less">
	@import "../style/blockly-style.less";
	@import "../style/projectlibrary.less";
</style>

<script>
//is file function in care sa fie logica
// de trimis ace even
import { mapGetters } from 'vuex';
import path from 'path';
import ProjectsLibrary from './ProjectsLibrary.vue';

import { Multipane, MultipaneResizer } from 'vue-multipane';

export default {
	name: 'Application',
	props: ['active'],
	data () {
		return {
			extension: '',
			source: '',
			folder:'',

			fileItem:'',
			menuItem:null,
			tabs:[],
			tabItem:null,

			previous:[],

			filetree_size: this.studio.settings.loadValue ('projects', 'filetree_size', '195px'),

			showTree: this.advanced,
			previousProject: null,
			previousRoot: null,
			open: [],
			tree: [],
			items:[],
			item:null,
			type:null,
			itemsActive: [],
			fileMenu: false,
			folderMenu:false,
			projectMenu:false,
			x: 0,
			y: 0,
			showConsole: false,
			baseFileIcon:'mdi-file',
			baseFolderIcon:'mdi-folder-account',
		};
	},
	components: {
		Multipane,
		MultipaneResizer
	},
	computed: {

		treeShow ()
		{	
			return this.showTree?'d-block':'d-none';
		},
		treeHide ()
		{
			return this.showTree?'d-none':'d-block';
		},
		projectTree ()
		{
			return this.showTree?'project-tree-on hs-100':'project-tree-off hs-100';
		},
		editorBox ()
		{
			return this.showTree?'project-box-1':'project-box-2';
		},
		advanced ()
		{
			return this.mode !== 'simple';
		},
		
		...mapGetters ({
			currentProject: 'projects/currentProject',
			currentFile: 'projects/currentFile',
			editors: 'projects/editors',
			mode: 'workspace/mode'
		}),
		currentEditor ()
		{
			let baseEditor = null;
			if (this.currentFile)
			{
				// let extension = path.extname (this.currentFile).substring (1).toLowerCase();
				for (let editor of this.editors) {
					for (let lang of editor.languages) {
						console.log (lang);
						console.log (lang.test (this.currentFile));
						if (lang.test (this.currentFile)) {
							return editor.component;
						}
					}
				}
			}
			return baseEditor;
		}
	},
	watch: {
		async currentProject ()
		{
			this.updateTitle ();
			await this.dirTree();
			// while(this.items.name === this.previousRoot.name) {
			// 	await this.dirTree();	
			// }
			
		},
		currentFile ()
		{
			this.updateTitle ();
			//await this.dirTree();
			// while(this.items.name === this.previousRoot.name) {
			// 	await this.dirTree();	
			// }
			
		},
		async source ()
		{
			await this.studio.projects.saveFile(this.currentProject,this.currentFile,this.source);
		},
		mode:
		{
			immediate: true,
			handler ()
			{
				// if(this.mode===true){
				// 	await this.changeSource({
				// 		name:('main'+this.extension),
				// 		file:this.extension,
				// 		path:('main'+this.extension)
				// 	})
				// }
				this.updateTitle ();
				this.showTree = this.advanced;
			}
		},
		showTree ()
		{
			process.nextTick (() => {
				window.dispatchEvent(new Event('resize'));
			});
		},
		type()
		{
			// let that = this;
			return this.editors.find((element)=> { 
				if(element == this.type){
					this.studio.workspace.dispatchToStore('projects','currentEditor',element.component);
				}
			}); 
		}
	},
	methods: {
		setActive(items){
			// TODO why is this function here?
			if (items.length > 0)
			{
				this.fileItem = items[0];
				if (this.fileItem.file !== undefined)
				{
					this.changeSource (this.fileItem);	
				}
			}
			else if (this.fileItem)
			{
				items.push (this.fileItem);
			}
		},

		panelresize ()
		{
			if (this.$refs.editor.resize)
			{
				this.$refs.editor.resize ();
			}
		},
		storeresize (pane, container, size)
		{
			this.studio.settings.storeValue ('projects', 'filetree_size', size);
		},
		verifyLanguage() {
			let language = this.studio.projects.getLanguage(this.currentProject.language);
			if(language){
				return true;
			} else return false;
		},
		languageImage ()
		{
			// TODO check if language is known, not only that it exists
			let language = this.studio.projects.getLanguage(this.currentProject.language);
			let addons = null;
			if(language){
				addons = language.addons;
			}	
			let device = this.studio.workspace.getDevice ();
			let type = device.type;
			let board = device.board;
			let icon = null;
			if(addons) {
				if(type !== 'none' && board !== 'none' && addons[type + ':' + board]) {
					icon = addons[type + ':' + board].icon;
				}
				if (!icon && addons && board !== 'none' && addons['*:' + board]) {
					icon = addons['*:' + board].icon;
				}
				if (!icon && addons && type !== 'none' && addons[type + ':*']) {
					icon = addons[type + ':*'].icon;
				}
				if(!icon && type !== 'none' && board !== 'none' && addons[type + ':' + board]) {
					icon = language.icon;
				}
				if(!icon && addons && board !== 'none' && addons['*:' + board]) {
					icon = language.icon;
				}
				if(!icon && addons && type !== 'none' && addons[type + ':*']) {
					icon = language.icon;
				}
			}	
			if (!icon && language){
				icon = language.icon;
			}
			if(!icon) {
				icon = this.baseFolderIcon;
			}
			let imgType = false;
			if(icon){
				let array = icon.split('-');
				if(array[0] === 'mdi') {
					imgType = false;
				} else {
					imgType = true;
				}
			}
			return {
				img:icon,
				type:imgType
			};
		},
		getPictogram(filename)
		{
			let language = this.studio.projects.getLanguage(this.currentProject.language);
			let addons = null;
			let pictograms = [];
			if(language){
				addons = language.addons;
			} 
			
			let ext = path.extname(filename).toLowerCase();
			let device = this.studio.workspace.getDevice ();
			let type = device.type;
			let board = device.board;
			let pictogram = null;
			if(language) {
				pictograms = language.pictograms;
				if(type !== 'none' && board !== 'none' && addons[type + ':' + board] !== undefined) {
					let addonPictograms = addons[type + ':' + board].pictograms;
					if(!pictogram && addonPictograms && addonPictograms.length > 0) {
						for(let pict of addonPictograms) {
							if(pict.extension && ext === pict.extension) {
								pictogram = pict.icon;
							} else if(pict.filename && filename.match(pict.filename)) {
								pictogram = pict.icon;
							}
						}
					}
					
				}
				
				if (!pictogram && board !== 'none' && addons['*:' + board] !== undefined) {
					let addonPictograms = addons['*:' + board].pictograms;
					if(addonPictograms && addonPictograms.length > 0) {
						for( let pict of addonPictograms) {
							if(pict.extension && ext === pict.extension) {
								pictogram = pict.icon;
							} else if(pict.filename && filename.match(pict.filename)) {
								pictogram = pict.icon;
							}
						}
					}
				}
				
				if (!pictogram && type !== 'none' && addons[type + ':*'] !== undefined) {
					let addonPictograms = addons[type + ':*'].pictograms;
					if(addonPictograms && addonPictograms.length > 0) {
						for( let pict of addonPictograms) {
							if(pict.extension && ext === pict.extension) {
								pictogram = pict.icon;
							} else if(pict.filename && filename.match(pict.filename)) {
						
								pictogram = pict.icon;
							}
						}
					}
				}
				
				if(!pictogram || (type === 'none' && board === 'none' && !pictogram)) {
					if(pictograms && pictograms.length > 0) {
						for( let pict of pictograms) {
							if(pict.extension && ext === pict.extension) {
								pictogram = pict.icon;
							} else if(pict.filename && filename.match(pict.filename)) {
								pictogram = pict.icon;
							}
						}
					}
				}
				
				if(!pictogram) {
					
					if(ext === '.c') {
						pictogram = 'mdi-language-c';
					} else if (ext === '.cpp') {
						pictogram = 'mdi-language-cpp';
					} else if (ext === '.css') {
						pictogram = 'mdi-language-css3';
					} else if (ext === '.html') {
						pictogram = 'mdi-language-html5';
					} else if (ext === '.js') {
						pictogram = 'mdi-language-javascript';
					} else if (ext === '.ts') {
						pictogram = 'mdi-language-typescript';
					} else if (ext === '.php') {
						pictogram = 'mdi-language-php';
					} else if (ext === '.py') {
						pictogram = 'mdi-language-python';
					} else if (ext === '.json') {
						pictogram = 'mdi-json';
					} else if (ext === '.vue') {
						pictogram = 'mdi-vuejs';
					} else if (ext === '.md') {
						pictogram = 'mdi-markdown';
					} else if (ext === '.sh') {
						pictogram = 'mdi-bash';
					} else if (ext === '.visual') {
						pictogram = 'mdi-puzzle';
					} else if (ext === '.d') {
						pictogram = 'mdi-file';
					} else if (ext === '.png') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.svg') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.jpg') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.jpeg') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.gif') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.tiff') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.bmp') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.ppm') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.pgm') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.pbm') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.pnm') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.bat') {
						pictogram = 'mdi-file-image';
					} else if (ext === '.bpg') {
						pictogram = 'mdi-file-image';
					}
				} 
				
				if(pictogram) {
					let array = pictogram.split('-');
					let imgType = true;
					if(array[0] === 'mdi') {
						imgType = false;
					} else {
						imgType = true;
					}
					return {
						img:pictogram,
						type:imgType
					};
				}
			}
			
			return {
				img:this.baseFileIcon,
				type:false
			};
			
		},
		showFile(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			this.projectMenu = false;
			e.preventDefault();
			this.fileMenu = false;
			this.x = e.clientX;
			this.y = e.clientY+40;
			this.$nextTick(() => {
				this.fileMenu = true;
			});
		},
		showFolder(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			this.projectMenu = false;
			e.preventDefault();
			this.folderMenu = false;
			this.x = e.clientX;
			this.y = e.clientY+40;
			this.$nextTick(() => {
				this.folderMenu = true;
			});
		},
		showProject(e) {
			this.fileMenu = false;
			this.folderMenu = false;
			this.projectMenu = false;
			e.preventDefault();
			this.projectMenu = false;
			this.x = e.clientX;
			this.y = e.clientY+40;
			this.$nextTick(() => {
				this.projectMenu = true;
			});
		},
		changeClassHide(){
			this.showTree = false;
		},
		changeClassShow(){
			this.showTree = true;
		},
		async changeSource(item)
		{
			this.itemsActive = [];
			this.itemsActive.push (item);
			await this.studio.projects.changeFile(this.currentProject,item.path);
		},
		
		async dirTree() 
		{
			
			if (this.currentProject)
			{
				let filename = this.currentProject.folder;
				if(this.items !== this.previous){
					this.items = [];
				}
				let components = await this.studio.filesystem.readdir(filename);
				let files = [];
				for(let item of components){
					let file = await this.studio.projects.recursiveGeneration(this.currentProject,
						{
							file: item,
							dir:filename
						});
					if(file.name !== 'project.json' && file.name !== '.project')
					{
						files.push(file);
					}
					
				}
				this.studio.projects.sort(files);
				let root = [{
					name:path.basename(filename),
					children:files,
					path:'/',
					key:'/'
				}];
				this.items = root;
				
				this.previous = this.items;
				

			}
		},
		async newFolder (item)
		{
			if(item === undefined || item === null) {
				item = this.items[0];
			}
			let folderName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FOLDER', 'PROJECT_NEW_FOLDER_NAME', '', 'PROJECT_NEW_NAME');
			if (folderName)
			{
				await this.studio.projects.newFolder(this.currentProject,path.join(item.path,folderName));
				await this.refresh();
			}
		},
		async newFile (item)
		{
			if(item === undefined || item === null) {
				item = this.items[0];
			}
			let fileName = await this.studio.workspace.showPrompt ('PROJECT_NEW_FILE', 'PROJECT_NEW_FILE_NAME', '', 'PROJECT_NEW_NAME');
			if (fileName)
			{
				await this.studio.projects.newFile(this.currentProject,path.join(item.path,fileName));
				await this.refresh();
			}
		},
		async exportFile (item)
		{
			if (await this.studio.projects.exportFile(this.currentProject,item.path))
			{
				await this.refresh();
			}
		},
		async importFile (item)
		{
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import',
				filetypes:['*']
			});
			if (files.length > 0)
			{
				// use first file
				let fileData = await this.studio.filesystem.readImportFile (files[0]);
				if(files) {
					let filePath = path.join(item.path,path.basename(files[0].name));
					if(await this.studio.projects.newFile(this.currentProject,filePath,fileData))
					{
						await this.refresh();
					}
				}
				
			}
			return false;
		},
		async renameObject (item)
		{
			if (item.children)
			{
				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FOLDER', 'PROJECT_NEW_FOLDER_NAME', item.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					if(await this.studio.projects.renameObject(this.currentProject,newName,item.path))
						await this.refresh();
				}
			}
			else
			{

				let newName = await this.studio.workspace.showPrompt ('PROJECT_RENAME_FILE', 'PROJECT_NEW_FILE_NAME', item.name, 'PROJECT_NEW_NAME');
				if (newName)
				{
					if(await this.studio.projects.renameObject(this.currentProject,newName,item.path))
						await this.refresh();
				}
			}
		},
		async deleteFile (item)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FILE', 'PROJECT_FILE_SURE');
			if (allow)
			{
				if(await this.studio.projects.deleteFile(this.currentProject,item.path)) {
					await this.refresh();
				}
					
			}
		},
		async deleteFolder (item)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('PROJECT_DELETE_FOLDER', 'PROJECT_FOLDER_SURE');
			if (allow)
			{
				if(await this.studio.projects.deleteFolder(this.currentProject,item.path))
					await this.refresh();
			}
		},
		/////
		async refresh(){
			await this.dirTree();
		},
		projectLibrary(){
			this.studio.workspace.showDialog(ProjectsLibrary, {
				width: 1000
			});
		},
		updateTitle ()
		{
			if (this.currentProject)
			{
				if (this.advanced && this.currentFile) this.studio.workspace.setWorkspaceTitle (this.currentFile);
				else this.studio.workspace.setWorkspaceTitle (this.currentProject.name);
			}
			else this.studio.workspace.setWorkspaceTitle ('');
		}
		
		// async newFirmware(){

		// }
	},
	async created ()
	{
		await this.studio.projects.loadPreviousSelectedCurrentProject();
		await this.dirTree();
		this.previousProject = this.currentProject;
		this.previousRoot = this.items;
	}
};
	
</script>

<style lang="less" scoped>
.folder-open {
background: url('plugins/projects/data/img/icons/32px.png') no-repeat 0px -32px !important;
	width: 32px;
	height: 32px;
}

.folder-closed {
background: url('plugins/projects/data/img/icons/32px.png') no-repeat -64px 0px !important;
	width: 32px;
	height: 32px;
}
.file {
background: url('plugins/projects/data/img/icons/32px.png') no-repeat -32px 0px !important;
	width: 32px;
	height: 32px;
}
.project {
	background: url('imgs/32px.png') no-repeat -32px -64px !important;
	width: 32px;
	height: 32x;
}
.v-treeview-node__content {
	width:100% !important;
	min-height:40px !important;
	padding-left: 0px !important;
	padding-right:0px !important;
}
.v-treeview-node__root {
	width:100% !important;
	min-height:40px !important;
	padding-left: 0px !important;
	padding-right:0px !important;
}
.v-treeview--dense .v-treeview-node__root {
	width:100% !important;
}
.v-treeview-node--leaf>.v-treeview-node__root {
	padding-left: 0px !important;
	padding-right:0px !important;
}
.v-treeview-node__root .v-treeview-node--active .primary--text {
	width:100% !important;
	min-height:40px !important;
	padding-left: 0px !important;
	padding-right:0px !important;
}
.multipane.foo.layout-v .multipane-resizer {
  margin: 0; left: 0; /* reset default styling */
  width: 15px;
  background: blue;
}
</style>

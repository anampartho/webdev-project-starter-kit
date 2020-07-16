# Web Development Project Starter Kit v1.0

## Overview
This is a simple web development project starter kit. This kit uses Gulp, Sass, Jade and Bable.

## Install
1. Clone this repository:
```sh
git clone https://github.com/anampartho/webdev-project-starter-kit.git
```
2. Install `npm` packages
```sh
$ npm install
```

If you don't have gulp installed, please run:
```sh
$ npm install -g gulp && npm install
```

## Folder Structure
This kit follows the following structure
```
├── dist              # Folder with files after compiling
    ├── css           # Folder with compiled css
    ├── js            # Folder with compiled javascript
├── src               # Folder with source files
    ├── css           # Folder with SCSS files
    ├── js            # Folder with modular JS
├── .gitignore        # Git ignore list
├── gulpfile.js       # Gulp Tasks
├── package.json      # Dependencies
├── README.md
```
> The `dist` folder and it's sub-folders will be created after running `build` or the `default` gulp task.

## Tasks
| Task | Description |
| --- | --- |
| `jade` | This task will look into `src/template` folder and compile all `*.jade` and output the compiled file in `dist` folder. |
| `style` | This task will look into `src/scss` and compile the `style.scss` file and output the compiled file in `dist/css` folder. |
| `js` | This task will look into `src/js` and compile the `script.js` file and output the compiled file in `dist/js` folder. |
| `browser-sync` | This task will serve the 'dist` to a local server and will give us the functionality to live reload. |
| `build` | This task will remove the 'dist` folder and use the `default` task to recompile all source files. |
| `default` | This is the default gulp task. This runs all `jade`, `style`, `js` task. |
| `watch` | This task will watch for changes inside the `src` folder and based on the change will run other tasks and reload the page. |
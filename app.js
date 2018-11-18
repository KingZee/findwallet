#!/usr/bin/env node
'use strict';

var argv = require('yargs').argv;
const glob = require('fast-glob');
const fs = require('fs');

//findwallet -i C:/mypath/ -o output.txt 
console.log("Zee's Wallet Finder.\r\n");
//Argument to pass path, or file to paths 
//Argument to store output somewhere

if(argv.h || argv.help){
	console.log("findwallet -i [inputPath/inputFile] -o [outputFile] \r\n\n -i	: Required. Specify which path(s) to scan directly or through a newline separated file. \r\n -o	: Specify optional output file to store results if any exist. \r\n -h	: Displays this message.");
	process.exit();
}

var input = [];
if(argv.i){
if(fs.existsSync(argv.i)){
		if(fs.lstatSync(argv.i).isDirectory()){
			console.log("Specified path is : "+argv.i);
			argv.i.endsWith(':') ? argv.i += '//**' : argv.i += '/**'	//glob sucks with windows drive paths
			input.push(argv.i);
		} else {
			var inputFile = fs.readFileSync(argv.i);
			input = inputFile.toString().split("\r\n");
			var check = input.every(e => fs.existsSync(e));
			if(check){
				input.forEach((e, i, a) => a[i].endsWith(':') ? a[i] += "//**" : a[i] += "/**");
				console.log("Found "+input.length+" paths in pathfile.");
			} else {
				console.log("Text file has invalid paths! Please write one path per line in your paths file.")
			}
		}
	} else {
		console.log("That path or file doesn't exist!");
	}
} else {
	console.log("You need to tell me where to scan! Use findwallet -i [scanPath]. It can be a path, or a file.txt with multiple paths.")
}

if(input.length != 0){
	console.log("Indexing files..");
	glob(input).then((entries) => checkWallet(entries)).catch(e => console.log("Error indexing a path : "+e));
} 

var found = 0;
function checkWallet(files){
	if(argv.o)
		var out_file = fs.createWriteStream(argv.o, {flags:'a'});
	
	console.log("Indexed "+files.length+" files. Scanning...");
	for(let path of files){
		try{
			var buffer = fs.readFileSync(path);
		} catch (error){
			console.log("File too big or unreadable : "+error);
		}
		
		if(buffer.byteLength<268435456){
			var buffer_hex = buffer.toString('hex');
			if(buffer_hex.includes("6231050009000000") && buffer_hex.includes("62657374626c6f636b")){
				if(buffer_hex.includes("0001046d6b6579")) {
					if(argv.o)
						out_file.write("Encrypted wallet : "+path+"\r\n");
					found++;
					console.log("Found encrypted wallet at : "+path);
				} else {
					if(argv.o)
						out_file.write("Un-encrypted wallet : "+path+"\r\n");
					found++;
					console.log("Found unencrypted wallet at : "+path);
				}
			}
		}
	}
	
	if(argv.o)
		out_file.end();
	console.log("Done! Found "+found+"wallets!");
	
	if(found){
		console.log("Kindly donate to 1KingZeeW97uLvngcUA3R6QJx18Fn78ddb if I helped you!");
		console.log("https://github.com/KingZee/findwallet");
	}
}

# Wallet Finder (findwallet)
> Crawl through your files and find any bitcoin core wallet files.

Wallet Finder scrapes through your specified paths to find hex data corresponding to a bitcoin core wallet.
Unless the file is compressed, or chunked, it will always find it regardless of bitcoin core version, file extension, or any non-destructive data modification.

## Installation

```sh
npm install findwallet -g
```

## Usage example

```sh
Zee's Wallet Finder.

findwallet -i [inputPath/inputFile] -o [outputFile]

 -i     : Required. Specify which path(s) to scan directly or through a newline separated file.
 -o     : Specify optional output file to store results if any exist.
 -h     : Displays this message.
```
Tip : paths.txt is an example of an inputFile.

## Dependencies

This project uses [fast-glob](https://github.com/mrmlnc/fast-glob), and [yargs](https://github.com/yargs/yargs/) for cli functionality.

## Release History

* 1.0.0
    * Initial commit
    
## Donate

If my project helped you recover something, I'd appreciate a tip!

KingZee : 1KingZeeW97uLvngcUA3R6QJx18Fn78ddb

Distributed under the GPLv3 license. See ``LICENSE`` for more information.

## Contributing

1. Fork it (<https://github.com/kingzee/findwallet/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

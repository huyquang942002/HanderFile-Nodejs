const fs = require('fs')
const path = require('path');
const { Command } = require("commander");
const util = require("util");
const program = new Command();
let myArgs = process.argv.slice(2);

const CheckValidInput = require('./checkInput');
const sortByType = require("./sortByType");
const sortBySize = require("./sortBySize")
const sortByName = require("./sortByName")
const sortByModify = require("./sortByModify");


let options = []
program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("--type, --type <value>", "handle file type")
    .option("--size, --size", "handle file size")
    .option("--modify, --modify", "handle file modification time")
    .option("--name, --name", "handle file name")
    .on("option:type", async () => {
        options.push("--type");
    })
    .on("option:size", async () => {
        options.push("--size");
    })
    .on("option:modify", async () => {
        options.push("--modify");
    })
    .on("option:name", async () => {
        options.push("--name");
    })
    .action(async () => {
        await CheckValidInput.handleInputCommand(myArgs);
        await CheckValidInput.checkOptionType(program);
    })
    .parse(process.argv)


const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
async function getDirectories(directoryPath) {
    try {
        const files = await readdir(directoryPath);
        const promises = files.map(async (file) => {
            const newDirPath = path.join(directoryPath, file)
            const fileStat = await stat(newDirPath);
            return fileStat.isDirectory() ? newDirPath : null;
        });

        const directories = (await Promise.all(promises)).filter((d) => d);

        return directories;
    } catch (err) {
        console.error("Error: ", err);
    }
}


let status = 0;

const runModify = async (checkIndex, context) => {
    switch (checkIndex) {
        case 0:
            await sortByModify.handleFileRoot(context)
            break;
        case 1:
            const listDir1 = await getDirectories(context)
            for (const ii of listDir1) {
                await sortByModify.handleFile(ii);
            }
            break;
        case 2:
            const listDir2 = await getDirectories(context)
            for (const ii of listDir2) {
                const listChildDir = await getDirectories(ii);
                for (const jj of listChildDir) {
                    await sortByModify.handleFile(jj);
                }
            }
            break;
        default:
            break;
    }
}
const runSize = async (checkIndex, context) => {
    switch (checkIndex) {
        case 0:
            await sortBySize.handleFileRoot(context)
            break;
        case 1:
            const listDir1 = await getDirectories(context)
            for (const ii of listDir1) {
                await sortBySize.handleFile(ii);
            }
            break;
        case 2:
            const listDir2 = await getDirectories(context)
            for (const ii of listDir2) {
                const listChildDir = await getDirectories(ii);
                for (const jj of listChildDir) {
                    await sortBySize.handleFile(jj);
                }
            }
            break;
        default:
            break;
    }
}
const runName = async (checkIndex, context) => {
    switch (checkIndex) {
        case 0:
            await sortByName.handleFileRoot(context)
            break;
        case 1:
            const listDir1 = await getDirectories(context)
            for (const ii of listDir1) {
                // console.log(ii);
                await sortByName.handleFile(ii);
            }
            break;
        case 2:
            const listDir2 = await getDirectories(context)
            for (const ii of listDir2) {
                const listChildDir = await getDirectories(ii);
                for (const jj of listChildDir) {
                    await sortByName.handleFile(jj);
                }
            }
            break;
        default:
            break;
    }
}
const runType = async (checkIndex, context, fileType) => {
    switch (checkIndex) {
        case 0:
            for (const item of fileType) {
                await sortByType.handleFileRoot(context, item)
            }
            break;
        case 1:
            const listDir1 = await getDirectories(context)
            for (const ii of listDir1) {
                for (const item of fileType) {
                    await sortByType.handleFile(ii, ii, item)
                }
            }
            break;
        case 2:
            const listDir2 = await getDirectories(context)
            for (const ii of listDir2) {
                const listChildDir = await getDirectories(ii);
                for (const jj of listChildDir) {
                    for (const item of fileType) {
                        await sortByType.handleFile(jj, jj, item)
                    }
                }
            }
            break;
        default:
            break;
    }
}

const start = async () => {
    const context = myArgs[0]
    for (const item of options) {
        switch (item) {
            case "--type":
                const fileType = program.opts().type.split(",").map(e => e.trim())
                await runType(status, context, fileType)
                break;
            case "--modify":
                console.log(status);
                await runModify(status, context)
                break;
            case "--name":
                console.log(status);
                await runName(status, context)
                break;
            case "--size":
                console.log(status);
                await runSize(status, context)
                break;
            default:
                console.log(status);
                break;
        }
        status++
    }
}
start()
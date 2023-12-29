let Client = require('ssh2-sftp-client');
let sftp = new Client();
const fs = require('fs');
const fsPromise = fs.promises;
const config = require('../config/config');
const path = require('path')
class NFSService {
    conf = config.NFS.CONF;
    directory = config.NFS.DIR;
    destDir = `${__dirname}\\nfs`;

    subRead = async (sub, parentDirectory) => {
        if (sub['type'] === 'd') {
            await this.read(parentDirectory + '/' + sub['name']);
        } else {
            sftp.downloadDir(parentDirectory, this.destDir);
        }
    }
    read = async (directory) => {
        console.log('Read(' + directory + ')');
        if (sftp.exists(directory)) {
            if (!fs.existsSync(this.destDir)) {
                fs.mkdirSync(this.destDir);
            }

            const result = await sftp.list(directory);
            if (result.length) {
                for (let x of result) {
                    this.subRead(x, directory);
                }
            }
        }
        // result.forEach( x => SubRead(x, directory) );
    }
    main = async () => {
        console.log(`nfsService:: main :: triggerred ::`);
        await sftp.connect(this.conf).then(async () => {
            console.log('Connected');
            await this.read(this.directory);
        });
    }
    readAfileAsync = async (abFile) => {
        const data = await fsPromise.readFile(abFile)
            .catch((err) => console.error('Failed to read file', err));

        return JSON.parse(data.toString());
    }

    getTenantData = async () => {
        try {
            let contents = "",
                files = [],
                ff = this.destDir,
                ext = "",
                tenant_files = {};
            const mime_types = [".jpg", ".png", ".jpeg", ".gif", ".ico"]; //available extensions in the APP
            if (fs.existsSync(this.destDir)) {
                files = await fsPromise.readdir(this.destDir);
                for (let file of files) {
                    console.log(file);
                    ff = `${this.destDir}\\${file}`
                    ext = path.extname(`${ff}`);
                    if (!tenant_files[`${file}`]) {
                        tenant_files[`${file}`] = {}
                    }
                    if (!mime_types.includes(ext.toLocaleLowerCase().toString()) && file !== "db.json") {
                        tenant_files[`${file}`] = await this.readAfileAsync(ff);
                    }
                };
                // console.log(`files :: `, Object.keys(tenant_files));                
            }
            return tenant_files;
        } catch (err) {
            console.error(err);
        }
    }
    base64_encode = async (file) => {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer.from(bitmap).toString('base64');
    }

}

module.exports = NFSService;
const { spawn } = require('child_process')
// const chalk = require('chalk')
const path = require('path')
const glob = require('glob-fs')({ gitignore: true })

class ArtilleryTest {
  constructor () {
    this.isWin = process.platform === 'win32'
    this.path = __dirname
  }

  run () {
    // const files = glob.readdirSync(`testservice.yaml`)
    let testDir = path.join(this.path, 'testservice.yaml')
      this.startLoadTest(testDir)
  }

  // async runDir (dirPath) {
  //   const files = glob.readdirSync(`**/*.test.yml`)
  //   files.forEach(file => {
  //     let testDir = path.join(dirPath, file)
  //     this.startLoadTest(testDir)
  //   })
  // }

  startLoadTest (file) {
    // if (this.isWin) {
    //   this.startWindowTest(file)
    // } else {
    //   this.startOtherTest(file)
    // }
    this.startWindowTest('./testservice.yaml')
  }

  getArtillery () {
    return './node_modules/.bin/artillery'
  }

  startWindowTest (file) {
    let cp = spawn(process.env.comspec, ['/c', 'artillery run -e production ' + file])
    this.assingArtillaryOptions(cp)
  }

  startOtherTest (file) {
    let cp = spawn(this.getArtillery(), ['run', '-e', 'production', '-o', './tests/artillery/report.json', file])
    this.assingArtillaryOptions(cp)
  }

  assingArtillaryOptions (cp) {
    cp.stdout.on('data', function (data) {
      console.log(data.toString()) // logging on test process
    })

    cp.stderr.on('data', function (data) {
      console.log((data.toString())) // logging on test fails process
    })

    cp.on('exit', function (code) {
      console.log(('child process exited with code ' + code.toString()))
    })
  }
}

const test = new ArtilleryTest()
test.run()

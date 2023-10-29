const fs = require('fs')
const path = require('path')

const filePath = path.resolve('./dist/app.js')

const content = fs.readFileSync(filePath)

fs.writeFileSync(filePath, `require('./vendors.js');\nrequire('./runtime.js');\n\n` + content)


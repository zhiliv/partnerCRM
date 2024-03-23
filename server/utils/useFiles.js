import Busboy from 'busboy'

const useFiles = async event => {
  return new Promise(resolve => {
    const { req } = event
    const files = []
    const fields = {}
    const busboy = Busboy({ headers: req.headers, defCharset:'utf8' })

    busboy.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info

      var chunks = []
      file.on('data', chunk => {
        chunks.push(chunk)
      })
      file.on('end', () => {
        files.push({
          fieldname: name,
          filename,
          encoding,
          mimetype: mimeType,
          buffer: Buffer.concat(chunks),
        })
      })
    })

    busboy.on('field', (name, value, info) => {
      fields[name] = value
    })
    busboy.on('finish', () => {
      resolve({ files, fields })
    })
    req.pipe(busboy)
  })
}

export default useFiles

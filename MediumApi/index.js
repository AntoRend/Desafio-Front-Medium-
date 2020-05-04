const server = require('./src/server')
const db = require('./src/lib/db')

async function main () {
  await db.connect()
  console.log('Data Base Connected')
  server.listen(8082, () => {
    console.log('Server is running')
  })
}

main()
  .then(() => {
    console.log('Server Ready')
  })
  .catch(error => console.error('error:', error))
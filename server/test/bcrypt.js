const bcrypt = require('bcrypt')

const saltRounds = 10
const textPassword = 'password'

const test = async () => {
  const hash = await bcrypt.hash(textPassword, saltRounds)
  console.log('hash = ', hash)

  const hashCompareCorrect = await bcrypt.compare(textPassword, hash)
  console.log('hashCompareCorrect = ', hashCompareCorrect)
}

test()

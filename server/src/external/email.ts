/**
 * Send Email via SendGrip API
 */

export async function sendEmail(to, title, body) {
  // For debugging purpose, just log the email
  if (process.env.NODE_ENV !== 'test') {
    console.log('=============> NEW EMAIL <=============')
    console.log('title:', title)
    console.log('to:', to)
    console.log('')
    console.log(body)
    console.log('=======================================')
  }
  // TODO: Send real email
}

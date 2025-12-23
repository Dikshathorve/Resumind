// Test script to send OTP
import http from 'http'

const testSendOTP = async () => {
  const postData = JSON.stringify({
    email: 'your-email@gmail.com',  // Change this to your actual email!
    fullName: 'Test User'
  })

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/send-otp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        console.log('\n✅ OTP Send Request Completed!')
        console.log('Status Code:', res.statusCode)
        console.log('Response Body:')
        try {
          const parsed = JSON.parse(data)
          console.log(JSON.stringify(parsed, null, 2))
        } catch {
          console.log(data)
        }
        resolve()
      })
    })

    req.on('error', (error) => {
      console.error('❌ Request Error:', error.message)
      reject(error)
    })

    console.log('📧 Sending OTP request to:', 'http://localhost:5000/api/auth/send-otp')
    console.log('Email:', JSON.parse(postData).email)
    console.log('Full Name:', JSON.parse(postData).fullName)
    console.log('---')

    req.write(postData)
    req.end()
  })
}

// Run test
setTimeout(() => {
  testSendOTP().catch(err => {
    console.error('Test failed:', err)
    process.exit(1)
  })
}, 1000)

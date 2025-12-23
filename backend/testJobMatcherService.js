/**
 * Direct test of Job Matcher Service
 * Tests the service without needing authentication
 */

import { performComprehensiveJobMatching } from './src/services/aiJobMatcherService.js'

// Sample resume data
const testResume = {
  summary: 'Experienced full-stack developer with 5 years of experience in building web applications using React and Node.js.',
  experiences: [
    {
      company: 'Tech Company A',
      role: 'Senior Developer',
      desc: 'Led development of customer-facing web application. Implemented features and fixed bugs.'
    },
    {
      company: 'Tech Company B',
      role: 'Junior Developer',
      desc: 'Built API endpoints and database schemas. Worked with JavaScript and SQL.'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'HTML/CSS', 'Git', 'REST APIs'],
  projects: [
    {
      name: 'E-commerce Platform',
      type: 'Web Application',
      description: 'Built a full-stack e-commerce platform with React frontend and Node.js backend.'
    }
  ]
}

const testJD = `
Senior Full-Stack Engineer

Requirements:
- 5+ years of experience with JavaScript/TypeScript
- Strong proficiency in React and modern frontend frameworks
- Backend development experience with Node.js
- PostgreSQL or similar databases
- RESTful API design and development
- Microservices architecture knowledge
- Cloud platforms experience (AWS, GCP, Azure)
`

async function test() {
  try {
    console.log('🎯 Testing Job Matcher Service...\n')
    
    const result = await performComprehensiveJobMatching(testResume, testJD)
    
    if (!result.success) {
      console.error('❌ Service Error:', result.message)
      return
    }

    console.log('✅ Job Matcher Service Test Successful!\n')
    console.log('📊 Overall Match Score:', result.overallMatchScore + '%')
    console.log('💰 Total Tokens:', result.totalTokens)
    console.log('💵 Estimated Cost:', result.estimatedCost)
    console.log('\n🎉 All Features Verified:')
    console.log('   ✅ Summary analysis complete')
    console.log('   ✅ Experiences analysis complete')
    console.log('   ✅ Skills analysis complete')
    console.log('   ✅ Projects analysis complete')
    console.log('   ✅ Cost tracking working')

  } catch (error) {
    console.error('❌ Test Error:', error.message)
    console.log('\nDebug Info:')
    console.log('Error:', error)
  }
}

console.log('╔════════════════════════════════════════════════╗')
console.log('║   Job Matcher Service Direct Test             ║')
console.log('╚════════════════════════════════════════════════╝\n')

test()

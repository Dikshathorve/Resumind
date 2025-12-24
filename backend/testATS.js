import { analyzeResumeForATS, analyzeBuiltResumeForATS } from './src/services/atsAnalyzerService.js';
import dotenv from 'dotenv';

dotenv.config();

const testResumeText = `
JOHN DOE
Email: john@example.com
Phone: (555) 123-4567

PROFESSIONAL SUMMARY
Experienced project manager with 5+ years in software development and team leadership. 
Skilled in Agile methodologies and cross-functional collaboration.

SKILLS
• Project Management
• Agile/Scrum
• Leadership
• Communication
• Strategic Planning
• Team Coordination
• Risk Management

PROFESSIONAL EXPERIENCE
Senior Project Manager at Tech Corp
2020 - Present
• Led team of 8 developers in delivering 3 major projects
• Improved delivery timeline by 20% through process optimization
• Managed budget of $500K+ annually
• Coordinated with stakeholders and clients for requirements gathering

Project Manager at Software Solutions Inc
2018 - 2020
• Managed 5-7 team members across multiple projects
• Implemented Scrum framework reducing sprint delays by 15%
• Tracked project metrics and KPIs for stakeholder reporting

EDUCATION
Bachelor of Science in Computer Science
State University, 2018

CERTIFICATIONS
• Certified Scrum Master (CSM)
• PMP Certification
`;

const testJobDescription = `
We are looking for an experienced Project Manager to join our growing team.

Key Responsibilities:
- Lead cross-functional engineering teams
- Drive project delivery using Agile and Scrum methodologies
- Manage project budgets and resources efficiently
- Communicate with stakeholders and maintain project documentation
- Implement process improvements and best practices
- Track and report on project metrics and KPIs

Required Skills:
- 5+ years of project management experience
- Proficiency in Agile/Scrum frameworks
- Strong leadership and communication abilities
- Experience with software development projects
- PMP or CSM certification preferred
- Budget management experience

Nice to Have:
- Machine Learning background
- Cloud architecture knowledge (AWS, GCP, Azure)
- DevOps experience
- Six Sigma certification
`;

const testResumeData = {
  personal: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567'
  },
  summary: 'Experienced project manager with 5+ years in software development and team leadership. Skilled in Agile methodologies and cross-functional collaboration.',
  skills: [
    { name: 'Project Management' },
    { name: 'Agile/Scrum' },
    { name: 'Leadership' },
    { name: 'Communication' },
    { name: 'Strategic Planning' }
  ],
  experiences: [
    {
      company: 'Tech Corp',
      jobTitle: 'Senior Project Manager',
      startDate: '2020',
      endDate: 'Present',
      description: 'Led team of 8 developers in delivering 3 major projects. Improved delivery timeline by 20% through process optimization. Managed budget of $500K+ annually.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      institution: 'State University',
      graduationYear: '2018'
    }
  ],
  certifications: [
    { name: 'Certified Scrum Master (CSM)' },
    { name: 'PMP Certification' }
  ]
};

async function runTests() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║   ATS Analyzer Service Test Suite            ║');
  console.log('╚════════════════════════════════════════════╝\n');

  try {
    // Test 1: Analyze Resume Text
    console.log('📄 Test 1: Analyzing Resume Text Against Job Description...\n');
    const result1 = await analyzeResumeForATS(testResumeText, testJobDescription);
    
    if (result1.success) {
      console.log('✅ Analysis Successful!\n');
      console.log('Results:');
      console.log(JSON.stringify(result1.analysis, null, 2));
    } else {
      console.log('❌ Analysis Failed:');
      console.log(result1.message);
    }

    // Test 2: Analyze Built Resume Data
    console.log('\n\n📊 Test 2: Analyzing Built Resume Data Against Job Description...\n');
    const result2 = await analyzeBuiltResumeForATS(testResumeData, testJobDescription);
    
    if (result2.success) {
      console.log('✅ Analysis Successful!\n');
      console.log('Results:');
      console.log(JSON.stringify(result2.analysis, null, 2));
    } else {
      console.log('❌ Analysis Failed:');
      console.log(result2.message);
    }

    // Summary
    console.log('\n\n╔════════════════════════════════════════════╗');
    console.log('║   Test Summary                               ║');
    console.log('╚════════════════════════════════════════════╝\n');
    console.log(`Test 1 (Resume Text): ${result1.success ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Test 2 (Built Resume): ${result2.success ? '✅ PASSED' : '❌ FAILED'}`);

  } catch (error) {
    console.error('❌ Test Suite Error:', error);
    process.exit(1);
  }
}

// Run tests
runTests();

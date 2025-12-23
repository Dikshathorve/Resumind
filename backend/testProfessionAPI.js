// Simple Node.js test for the API
async function testProfessionAPI() {
  try {
    console.log('🧪 Testing profession AI recommendations API...\n');
    
    const response = await fetch('http://localhost:5000/api/ai/suggest/profession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ profession: 'Software Engineer' })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('✅ API Response Received:\n');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✨ Profession recommendations:');
      data.data.recommendations.forEach((rec, i) => {
        console.log(`  ${i + 1}. ${rec}`);
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testProfessionAPI();

#!/usr/bin/env node

/**
 * Test Railway Configuration
 * Validates that all Railway deployment files are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🚂 Testing Railway Configuration...\n');

// Check required files
const requiredFiles = [
  'railway.json',
  'nixpacks.toml',
  'Procfile',
  'start-railway.js',
  'railway.env.example',
  'RAILWAY_DEPLOYMENT_GUIDE.md'
];

console.log('📁 Checking required files:');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('');

// Check package.json scripts
console.log('📦 Checking package.json scripts:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['start:railway', 'build:railway'];
  
  requiredScripts.forEach(script => {
    const exists = packageJson.scripts && packageJson.scripts[script];
    console.log(`   ${exists ? '✅' : '❌'} ${script}`);
    if (!exists) allFilesExist = false;
  });
} catch (error) {
  console.log('   ❌ Error reading package.json');
  allFilesExist = false;
}

console.log('');

// Check frontend health endpoint
console.log('🏥 Checking health endpoint:');
const healthEndpoint = path.join('frontend', 'app', 'api', 'health', 'route.ts');
const healthExists = fs.existsSync(healthEndpoint);
console.log(`   ${healthExists ? '✅' : '❌'} ${healthEndpoint}`);

console.log('');

// Check environment variables template
console.log('🔧 Checking environment variables template:');
try {
  const envTemplate = fs.readFileSync('railway.env.example', 'utf8');
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'OPENAI_API_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];
  
  requiredVars.forEach(variable => {
    const exists = envTemplate.includes(variable);
    console.log(`   ${exists ? '✅' : '❌'} ${variable}`);
  });
} catch (error) {
  console.log('   ❌ Error reading railway.env.example');
}

console.log('');

// Summary
if (allFilesExist && healthExists) {
  console.log('🎉 Railway configuration is ready!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Connect your repository to Railway');
  console.log('3. Set up environment variables in Railway dashboard');
  console.log('4. Deploy!');
  console.log('');
  console.log('📖 See RAILWAY_DEPLOYMENT_GUIDE.md for detailed instructions');
} else {
  console.log('❌ Railway configuration is incomplete');
  console.log('Please fix the missing files and try again');
}

console.log('');

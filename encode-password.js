// Helper script to URL-encode your MongoDB password
// Usage: node encode-password.js "YourPasswordHere"

const password = process.argv[2];

if (!password) {
  console.log('Usage: node encode-password.js "YourPasswordHere"');
  console.log('\nExample:');
  console.log('node encode-password.js "MyP@ss#123"');
  process.exit(1);
}

// URL encode the password
const encodedPassword = encodeURIComponent(password);

console.log('\n========================================');
console.log('Password Encoding Helper');
console.log('========================================\n');
console.log('Original Password:', password);
console.log('Encoded Password: ', encodedPassword);
console.log('\n========================================');
console.log('Your Connection String:');
console.log('========================================\n');
console.log(`mongodb+srv://PR-Test:${encodedPassword}@cluster0.wlnk8po.mongodb.net/student_management_db?retryWrites=true&w=majority`);
console.log('\n========================================');
console.log('Copy the connection string above to your .env file');
console.log('========================================\n');

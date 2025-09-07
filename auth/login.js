// login.js
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // adjust if your server runs on a different port

async function main() {
  try {
    // try with username first
    let authData = await pb.collection('users').authWithPassword(
      'user',          // username
      '123123123'      // password
    );

    console.log("✅ Login with username successful!");
    console.log("Token:", pb.authStore.token);
    console.log("User ID:", pb.authStore.record.id);
    return;
  } catch (err) {
    console.log("❌ Login with username failed, trying email...");
  }

  try {
    // fallback to email login
    let authData = await pb.collection('users').authWithPassword(
      'user@fake.com', // email
      '123123123'      // password
    );

    console.log("✅ Login with email successful!");
    console.log("Token:", pb.authStore.token);
    console.log("User ID:", pb.authStore.record.id);
  } catch (err) {
    console.error("❌ Both username and email login failed.");
    console.error(err);
  }
}

main();

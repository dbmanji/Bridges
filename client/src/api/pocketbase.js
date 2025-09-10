import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// Register user
export async function registerUser(email, password) {
  return await pb.collection('users').create({
    email,
    password,
    passwordConfirm: password,
  });
}

// Upload file
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  return await pb.collection('files').create(formData);
}

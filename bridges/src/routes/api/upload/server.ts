async function uploadFile() {
	if (!file) {
		alert('Please select a file first!');
		return;
	}

	const formData = new FormData();
	formData.append('file', file);

	try {
		const res = await fetch('http://127.0.0.1:8090/api/collections/files/records', {
			method: 'POST',
			body: formData
		});

		if (!res.ok) throw new Error(await res.text());
		alert('File uploaded successfully ✅');
	} catch (err) {
		alert('Upload failed ❌ ' + err);
	}
}

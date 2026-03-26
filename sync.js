async function sync() {
  for (let i = 0; i < 15; i++) {
    try {
      const res = await fetch('http://localhost:3001/api/github/sync', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        console.log('Success:', data);
        return;
      } else {
        console.log('Server responded with', res.status);
      }
    } catch (e) {
      console.log('Waiting for server...');
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('Timed out waiting for server');
}
sync();

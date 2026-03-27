module.exports = {
  onSuccess: async ({ utils }) => {
    try {
      const siteUrl = process.env.URL; // Netlify injects this automatically
      if (!siteUrl) {
        console.warn('⚠️  URL env var not set — skipping GitHub sync');
        return;
      }

      console.log(`🔄 Triggering GitHub sync at ${siteUrl}/api/github/sync ...`);

      const res = await fetch(`${siteUrl}/api/github/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        console.log('✅ GitHub sync result:', data);
      } else {
        console.error('❌ GitHub sync returned error:', data);
      }
    } catch (err) {
      // Don't fail the build if sync fails — just log it
      console.error('❌ GitHub sync failed (non-fatal):', err);
    }
  },
};

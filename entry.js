if (process.env.NODE_ENV === 'production') {
	// Offline plugin
	require('offline-plugin/runtime').install();
}

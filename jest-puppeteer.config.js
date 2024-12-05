module.exports = {
  launch: {
    // headless: false,
  },
  server: {
    command: 'npm run build && npm run preview',
    port: 8080,
    launchTimeout: 10_000,
  },
};

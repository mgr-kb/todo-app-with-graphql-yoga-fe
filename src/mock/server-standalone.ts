import { startMockServer } from './server';

startMockServer(4001).then(() => {
  console.log('Mock server is running');
}).catch((error) => {
  console.error('Failed to start mock server:', error);
  process.exit(1);
});
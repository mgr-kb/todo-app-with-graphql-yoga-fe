export function getGraphQLEndpoint(): string {
  const stage = process.env.STAGE || 'development';
  
  if (stage === 'local') {
    return 'http://localhost:4001/graphql';
  }
  
  return 'http://localhost:4000/graphql';
}
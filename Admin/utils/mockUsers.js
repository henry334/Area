// DEVELOPEMENT (DELETE FILE)
const mockUsers = Array.from({ length: 50 }, (_, index) => ({
  id: String(index + 1),
  email: `user${index + 1}@example.com`,
  username: `User${index + 1}`,
  authority: index % 2 === 0 ? 'admin' : 'user',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

export default mockUsers;


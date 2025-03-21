export default function generateUniqId(): string {
  return `${Date.now() + Math.random().toString(36)}`;
}

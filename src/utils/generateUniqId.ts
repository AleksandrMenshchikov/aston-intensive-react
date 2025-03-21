export default function generateUniqId(): string {
  return `${Date.now() - Number(Math.random().toString(36))}`;
}

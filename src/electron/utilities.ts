export function isServe(): boolean {
  const args = process.argv.slice(1);
  return args.some(val => val === '--serve');
}

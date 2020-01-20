export function filterProperties(obj: object, remove: string[]): object {
  const raw = JSON.parse(JSON.stringify(obj));

  return Object.keys(raw)
    .filter(key => !remove.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
}

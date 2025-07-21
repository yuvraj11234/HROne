export default function generateJSON(fields) {
  const result = {};
  fields.forEach((f) => {
    if (f.type === "nested") {
      result[f.name || ""] = generateJSON(f.children || []);
    } else {
      result[f.name || ""] = f.type === "string" ? "sample" : 0;
    }
  });
  return result;
}
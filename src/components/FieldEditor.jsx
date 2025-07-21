import React from "react";

export default function FieldEditor({
  field,
  level,
  updateField,
  deleteField,
  addField,
  renderFields,
}) {
  return (
    <div className="flex flex-col gap-2 border p-4 rounded bg-white shadow">
      <div className="flex flex-wrap gap-2">
        <input
          className="border px-2 py-1 rounded flex-1 min-w-[120px]"
          placeholder="Field name"
          value={field.name}
          onChange={(e) => updateField(field.id, "name", e.target.value)}
        />
        <select
          className="border px-2 py-1 rounded"
          value={field.type}
          onChange={(e) => updateField(field.id, "type", e.target.value)}
        >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="nested">Nested</option>
        </select>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          onClick={() => deleteField(field.id)}
        >
          Delete
        </button>
        {field.type === "nested" && (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={() => addField(field.id)}
          >
            Add Nested Field
          </button>
        )}
      </div>
      {field.type === "nested" && field.children && (
        <div className="ml-4">{renderFields(field.children, level + 1)}</div>
      )}
    </div>
  );
}
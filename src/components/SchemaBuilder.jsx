import React from "react";
import FieldEditor from "./FieldEditor";

export default function SchemaBuilder({ fields, setFields }) {
  const updateField = (id, key, value) => {
    const recursiveUpdate = (items) =>

      items.map((field) =>
        field.id === id
          ? { ...field, [key]: value }
          : {
              ...field,
              children: field.children
                ? recursiveUpdate(field.children)
                : field.children,
            }
      );
    setFields(recursiveUpdate(fields));
  };

  const addField = (parentId) => {
    const newField = {
      id: crypto.randomUUID(),
      name: "",
      type: "string",
    };

    const recursiveAdd = (items) =>
      items.map((field) =>
        field.id === parentId
          ? {
              ...field,
              children: [...(field.children || []), newField],
            }
          : {
              ...field,
              children: field.children
                ? recursiveAdd(field.children)
                : field.children,
            }
      );

    parentId ? setFields(recursiveAdd(fields)) : setFields([...fields, newField]);
  };

  const deleteField = (id) => {
    const recursiveDelete = (items) =>
      items
        .filter((f) => f.id !== id)
        .map((f) => ({
          ...f,
          children: f.children ? recursiveDelete(f.children) : f.children,
        }));
    setFields(recursiveDelete(fields));
  };

  const renderFields = (fields, level = 0) => (
    <div className={`ml-${level * 4} mt-2 space-y-4`}>
      {fields.map((field) => (
        <FieldEditor
          key={field.id}
          field={field}
          level={level}
          updateField={updateField}
          deleteField={deleteField}
          addField={addField}
          renderFields={renderFields}
        />
      ))}
    </div>
  );
  gi

  return (
    <div className="space-y-4">
      {renderFields(fields)}
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => addField()}
      >
        Add Field
      </button>
    </div>
  );
}
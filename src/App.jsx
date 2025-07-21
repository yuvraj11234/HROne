import React, { useState } from "react";
import SchemaBuilder from "./components/SchemaBuilder";
import generateJSON from "./utils/generateJSON";

export default function App() {
  const [fields, setFields] = useState([]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Schema Builder</h2>
          <SchemaBuilder fields={fields} setFields={setFields} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Generated JSON</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(generateJSON(fields), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
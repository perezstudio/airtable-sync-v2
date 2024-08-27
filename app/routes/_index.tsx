// app/routes/index.jsx

import { useState, useEffect } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';
import Airtable from 'airtable';

async function fetchBases(apiKey) {
  const response = await fetch('https://api.airtable.com/v0/meta/bases', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bases');
  }

  const data = await response.json();
  return data.bases;
}

export const loader = async () => {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    throw new Error('AIRTABLE_API_KEY is not set');
  }

  try {
    const bases = await fetchBases(apiKey);
    return json({ bases });
  } catch (error) {
    console.error('Error fetching bases:', error);
    return json({ bases: [], error: 'Failed to fetch bases' });
  }
};

export default function Index() {
  const { bases, error } = useLoaderData();
  const [selectedBase1, setSelectedBase1] = useState('');
  const [selectedBase2, setSelectedBase2] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);

  const compareSchemas = async () => {
    const response = await fetch('/api/compare-schemas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base1: selectedBase1, base2: selectedBase2 }),
    });
    const result = await response.json();
    setComparisonResult(result);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Airtable Schema Comparison</h1>
      <Form onSubmit={(e) => { e.preventDefault(); compareSchemas(); }}>
        <div className="mb-4">
          <label htmlFor="base1" className="block mb-2">Select Base 1:</label>
          <select
            id="base1"
            value={selectedBase1}
            onChange={(e) => setSelectedBase1(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a base</option>
            {bases.map((base) => (
              <option key={base.id} value={base.id}>{base.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="base2" className="block mb-2">Select Base 2:</label>
          <select
            id="base2"
            value={selectedBase2}
            onChange={(e) => setSelectedBase2(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a base</option>
            {bases.map((base) => (
              <option key={base.id} value={base.id}>{base.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Compare Schemas
        </button>
      </Form>
      {comparisonResult && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comparison Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(comparisonResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
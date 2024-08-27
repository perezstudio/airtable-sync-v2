// app/routes/api.compare-schemas.js

import { json } from '@remix-run/node';

export const action = async ({ request }) => {
  try {
    const { base1, base2 } = await request.json();
    console.log('Received base IDs:', base1, base2);

    const apiKey = process.env.AIRTABLE_API_KEY;
    if (!apiKey) {
      throw new Error('AIRTABLE_API_KEY is not set');
    }

    const getBaseSchema = async (baseId) => {
      try {
        console.log(`Fetching schema for base: ${baseId}`);
        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.tables.map((table) => ({
          id: table.id,
          name: table.name,
          fields: table.fields.map((field) => ({
            id: field.id,
            name: field.name,
            type: field.type,
          })),
        }));
      } catch (error) {
        console.error(`Error fetching schema for base ${baseId}:`, error);
        throw new Error(`Failed to fetch schema for base ${baseId}: ${error.message}`);
      }
    };

    const compareFields = (fields1, fields2) => {
      const changes = [];
      const fields1Map = new Map(fields1.map((field) => [field.name, field]));
      const fields2Map = new Map(fields2.map((field) => [field.name, field]));

      for (const [fieldName, field] of fields1Map) {
        if (!fields2Map.has(fieldName)) {
          changes.push({ action: 'delete', field: fieldName });
        } else if (fields2Map.get(fieldName).type !== field.type) {
          changes.push({ action: 'update', field: fieldName, newType: fields2Map.get(fieldName).type });
        }
      }

      for (const fieldName of fields2Map.keys()) {
        if (!fields1Map.has(fieldName)) {
          changes.push({ action: 'create', field: fieldName, type: fields2Map.get(fieldName).type });
        }
      }

      return changes;
    };

    const compareSchemas = (schema1, schema2) => {
      const result = {
        tablesToCreate: [],
        tablesToDelete: [],
        tablesToUpdate: [],
      };

      const schema1Tables = new Map(schema1.map((table) => [table.name, table]));
      const schema2Tables = new Map(schema2.map((table) => [table.name, table]));

      for (const [tableName, table] of schema1Tables) {
        if (!schema2Tables.has(tableName)) {
          result.tablesToDelete.push(tableName);
        } else {
          const table2 = schema2Tables.get(tableName);
          const fieldChanges = compareFields(table.fields, table2.fields);
          if (fieldChanges.length > 0) {
            result.tablesToUpdate.push({ name: tableName, changes: fieldChanges });
          }
        }
      }

      for (const [tableName, table] of schema2Tables) {
        if (!schema1Tables.has(tableName)) {
          result.tablesToCreate.push({
            name: tableName,
            fields: table.fields.map(field => ({
              name: field.name,
              type: field.type
            }))
          });
        }
      }

      return result;
    };

    console.log('Fetching schemas...');
    const schema1 = await getBaseSchema(base1);
    const schema2 = await getBaseSchema(base2);

    console.log('Comparing schemas...');
    const comparisonResult = compareSchemas(schema1, schema2);

    console.log('Comparison result:', comparisonResult);
    return json(comparisonResult);
  } catch (error) {
    console.error('Error comparing schemas:', error);
    return json({ error: `Failed to compare schemas: ${error.message}` }, { status: 500 });
  }
};
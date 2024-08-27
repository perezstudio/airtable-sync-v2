import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('your_base_id');

export async function fetchBases() {
  const bases = await base('Bases').select().all();
  return bases.map(record => record.fields);
}

export async function fetchSchema(baseId: string) {
  const schema = await base(baseId).table('Schema').select().all();
  return schema.map(record => record.fields);
}

export async function createRecord(baseId: string, table: string, fields: Airtable.FieldSet) {
  const createdRecord = await base(baseId).table(table).create(fields);
  return createdRecord.fields;
}

export async function updateRecord(baseId: string, table: string, recordId: string, fields: Airtable.FieldSet) {
  const updatedRecord = await base(baseId).table(table).update(recordId, fields);
  return updatedRecord.fields;
}
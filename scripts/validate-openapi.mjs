import SwaggerParser from '@apidevtools/swagger-parser';
import { fileURLToPath } from 'node:url';

const contractPath = fileURLToPath(
  new URL('../docs/api/openapi.yaml', import.meta.url),
);
const api = await SwaggerParser.validate(contractPath);
const pathCount = Object.keys(api.paths ?? {}).length;

if (pathCount < 10) {
  throw new Error(`Expected at least 10 API paths, found ${pathCount}`);
}

console.log(
  `OpenAPI ${api.openapi} contract is valid with ${pathCount} paths.`,
);

import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
const files = execFileSync('git', ['ls-files', '-z']).toString().split('\0').filter(Boolean);
const patterns = [
  new RegExp(['sk', '[A-Za-z0-9_-]{20,}'].join('-')),
  new RegExp(['AIza', '[A-Za-z0-9_-]{30,}'].join('')),
  new RegExp(['BEGIN ', 'PRIVATE KEY'].join('')),
];
const findings = [];
for (const file of files) {
  if (file === 'pnpm-lock.yaml' || statSync(file).size > 1_000_000) continue;
  const content = readFileSync(file, 'utf8');
  if (patterns.some((pattern) => pattern.test(content))) findings.push(file);
}
if (findings.length) { console.error(`Potential secret found in: ${findings.join(', ')}`); process.exit(1); }
console.log(`Secret scan passed for ${files.length} tracked files.`);

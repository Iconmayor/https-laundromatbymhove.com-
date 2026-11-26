import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const compat = new FlatCompat({ baseDirectory: path.dirname(fileURLToPath(import.meta.url)) });
const configuration = [{ignores:['.next/**','.next-dev/**','public/**','node_modules/**','next-env.d.ts']}, ...compat.extends('next/core-web-vitals','next/typescript'), {rules:{'@next/next/no-img-element':'off'}}];

export default configuration;

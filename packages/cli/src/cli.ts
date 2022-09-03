#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'fs';
import { encFiles, decFiles } from '@hider/core';

yargs.scriptName('hider');
yargs.command(
  'enc',
  'Encrypt files',
  (yargs) =>
    yargs.options({
      o: { alias: 'output', type: 'string' },
      f: { alias: 'files', type: 'array', demandOption: true },
      p: { alias: 'password', type: 'string', demandOption: true },
    }),
  (argv) => {
    const filenames: string[] = [];
    for (let i = 0; i < argv.f.length; i++) {
      if (fs.existsSync(argv.f[i].toString()))
        filenames.push(argv.f[i].toString());
      else console.log('ERROR: ' + argv.f[i] + " doesn't exists");
    }
    encFiles(filenames, argv.p, argv.o);
    console.log('Encryption succeed.');
  }
);
yargs.command(
  'dec',
  'Decrypt file',
  (yargs) =>
    yargs.options({
      f: { alias: 'files', type: 'string', demandOption: true },
      p: { alias: 'password', type: 'string', demandOption: true },
    }),
  (argv) => {
    if (fs.existsSync(argv.f)) {
      if (!decFiles(argv.f, argv.p)) {
        console.log('ERROR: Wrong password');
      } else console.log('Decryption succeed.');
    } else console.log('ERROR: ' + argv.f + " doesn't exists");
  }
);

yargs.parseSync();

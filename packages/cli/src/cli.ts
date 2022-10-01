#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { encFiles, decFiles } from '@cjeonguk/hider';

yargs.scriptName('hider');
yargs.command(
  'enc',
  'Encrypt files',
  (yargs) =>
    yargs.options({
      f: {
        alias: 'files',
        type: 'array',
        demandOption: true,
        description: 'Paths of files to encrypt',
      },
      p: {
        alias: 'password',
        type: 'string',
        demandOption: true,
        description: 'Password of the file',
      },
      o: {
        alias: 'output',
        type: 'string',
        default: '',
        description: 'Path of the output file',
      },
    }),
  (argv) => {
    const filenames: string[] = [];
    for (let i = 0; i < argv.f.length; i++) {
      if (fs.existsSync(argv.f[i].toString()))
        filenames.push(argv.f[i].toString());
      else console.log('ERROR: ' + argv.f[i] + " doesn't exists");
    }
    if (argv.o === '') {
      encFiles(filenames, argv.p, 'encrypted.enc');
    } else {
      encFiles(filenames, argv.p, argv.o);
    }
    console.log('Encryption succeed.');
  }
);
yargs.command(
  'dec',
  'Decrypt file',
  (yargs) =>
    yargs.options({
      f: {
        alias: 'file',
        type: 'string',
        demandOption: true,
        description: 'Path of the file to decrypt',
      },
      p: {
        alias: 'password',
        type: 'string',
        demandOption: true,
        description: 'Password of the file',
      },
      o: {
        alias: 'outdir',
        type: 'string',
        default: '',
        description: 'Directory to save output files',
      },
    }),
  (argv) => {
    function check(result: number) {
      if (result === 1) {
        console.log('ERROR: Wrong password');
      } else if (result === 2) {
        console.log('ERROR: ' + argv.f + "wasn't encrypted yet");
      } else console.log('Decryption succeed.');
    }
    if (fs.existsSync(argv.f)) {
      let result: number;
      if (argv.o === '') {
        result = decFiles(argv.f, argv.p);
        check(result);
      } else {
        if (fs.existsSync(argv.o)) {
          result = decFiles(argv.f, argv.p, argv.o);
          check(result);
        } else {
          console.log('ERROR: ' + argv.o + " doesn't exists");
        }
      }
    } else console.log('ERROR: ' + argv.f + " doesn't exists");
  }
);

yargs.command('log', 'Show encryption log', {}, () => {
  if (fs.existsSync(path.join(os.homedir(), '.hider.log')))
    console.log(fs.readFileSync(path.join(os.homedir(), '.hider.log'), 'utf8'));
  else console.log('No log exists.');
});

yargs.parseSync();

import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as crypto from 'crypto';

interface IsoData {
  errMsg?: string;
  gameCode?: string;
  revision?: number;
  md5Hash?: string;
}

export function initialize() {
  ipcMain.on('parseIso', (event, isoPath: string) => {
    fs.readFile(isoPath, (err, data) => {
      if (err) {
        event.sender.send('parseIsoError', err.code);
      } else {
        event.sender.send('parseIsoResponse', getIsoData(data));
      }
    });
  });

  ipcMain.on('saveIsoData', (event, isoData: IsoData, filePath: string) => {
    fs.writeFile(filePath, JSON.stringify(isoData, null, '\t'), 'utf8', (err) => {
      event.sender.send('saveIsoDataResponse', err ? err.code : null);
    });
  });
}

function getIsoData(data: Buffer): IsoData {
  let isoData: IsoData;

  try {
    isoData = {
      gameCode: data.toString('utf8', 0, 6),
      revision: data[7],
      md5Hash: crypto.createHash('md5').update(data).digest('hex')
    };
  } catch (Error) {
    isoData = { errMsg: Error.message };
  }

  return isoData;
}

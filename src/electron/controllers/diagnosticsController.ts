import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as crypto from 'crypto';

interface IsoData {
  gameCode?: string;
  revision?: number;
  md5Hash?: string;
}

export function initialize() {
  ipcMain.on('parseIso', (event, isoPath: string) => {
    let isoData: IsoData;
    const hash = crypto.createHash('md5');
    let stream = fs.createReadStream(isoPath);

    stream.on('data', (chunk: Buffer) => {
      // get isoData values if this is the first chunk
      if (!isoData) {
        isoData = {
          gameCode: chunk.toString('utf8', 0, 6),
          revision: chunk[7]
        };
      }

      // Update hash with chunk data
      hash.update(chunk);
    });

    // Stream is finished, get hash digest and return
    stream.on('end', () => {
      isoData.md5Hash = hash.digest('hex');
      event.sender.send('parseIsoResponse', isoData);
    });

    // Error handling
    stream.on('error', (err: Error) => {
      event.sender.send('parseIsoError', err.message);
    });
  });

ipcMain.on('saveIsoData', (event, isoData: IsoData, filePath: string) => {
  fs.writeFile(filePath, JSON.stringify(isoData, null, '\t'), 'utf8', (err) => {
    event.sender.send('saveIsoDataResponse', err ? err.code : null);
  });
});
}

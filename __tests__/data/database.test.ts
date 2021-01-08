import * as databaseJson from '../../src/common/data/database.json';

describe('Database', () => {
  it('Should have prime1 game', () => {
    expect(databaseJson.game).toEqual('prime1');
  })
});
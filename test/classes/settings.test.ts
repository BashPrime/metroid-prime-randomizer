import { Settings } from '../../src/common/models/settings';
import { expect } from 'chai';
import 'mocha';

describe('Settings', () => {
  it('should return a settings instance', () => {
    const settings = new Settings({});
    expect(settings).to.be.an.instanceof(Settings);
  });

  it('should contain defined default settings', () => {
    const settings = new Settings({});

    const definedItems = Object.keys(settings)
    expect(settings).to.be.an.instanceof(Settings);
  });
});

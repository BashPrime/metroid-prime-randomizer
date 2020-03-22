// import { primeRegions, tallonOverworld, chozoRuins, magmoorCaverns, phendranaDrifts, phazonMines } from '../../../src/electron/models/prime/regions';
// import { expect } from 'chai';
// import 'mocha';

// describe('Prime Regions', () => {
//   it('should contain 5 total regions', () => {
//     const regions = Object.keys(primeRegions());
//     const expectedRegions = 5;
//     expect(regions.length).to.equal(expectedRegions);
//   });

//   it('should contain 100 total locations', () => {
//     const regions = primeRegions();
//     let locations = [];

//     // Iterate through each region key
//     for(let key of Object.keys(regions)) {
//       locations = locations.concat(Object.keys(regions[key].getLocations()));
//     }

//     const expectedLocations = 100;
//     expect(locations.length).to.equal(expectedLocations);
//   });

//   it('Tallon Overworld should contain 15 locations', () => {
//     const tallonLocations = Object.keys(tallonOverworld().getLocations());
//     const expectedLocations = 15;
//     expect(tallonLocations.length).to.equal(expectedLocations);
//   });

//   it('Chozo Ruins should contain 35 locations', () => {
//     const chozoLocations = Object.keys(chozoRuins().getLocations());
//     const expectedLocations = 35;
//     expect(chozoLocations.length).to.equal(expectedLocations);
//   });

//   it('Magmoor Caverns should contain 10 locations', () => {
//     const magmoorLocations = Object.keys(magmoorCaverns().getLocations());
//     const expectedLocations = 10;
//     expect(magmoorLocations.length).to.equal(expectedLocations);
//   });

//   it('Phendrana Drifts should contain 23 locations', () => {
//     const phendranaLocations = Object.keys(phendranaDrifts().getLocations());
//     const expectedLocations = 23;
//     expect(phendranaLocations.length).to.equal(expectedLocations);
//   });

//   it('Phazon Mines should contain 17 locations', () => {
//     const minesLocations = Object.keys(phazonMines().getLocations());
//     const expectedLocations = 17;
//     expect(minesLocations.length).to.equal(expectedLocations);
//   });
// });

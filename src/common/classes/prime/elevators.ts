import { Elevator } from '../elevator';
import { primeItems } from './items';
import { PrimeItem } from '../../enums/primeItem';
import { PrimeItemCollection } from './itemCollection';

export function tallonTransportChozoEast() {
  const elevator = new Elevator({
    name: 'Transport to Chozo Ruins East'
  })

  elevator.canAccess = function(items: PrimeItemCollection) {
    return true;
  };

  return elevator;
};

export function tallonTransportMagmoorNorth() {
  const elevator = new Elevator({
    name: 'Transport to Chozo Ruins East'
  })

  elevator.canAccess = function(items: PrimeItemCollection) {
    return items.hasMissiles();
  };

  return elevator;
};

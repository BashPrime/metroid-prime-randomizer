import BaseConfiguration from './baseConfiguration';
import { Elevators } from '../enums/elevators';

export default class PrimeConfiguration extends BaseConfiguration {
  elevators: Elevators;
}
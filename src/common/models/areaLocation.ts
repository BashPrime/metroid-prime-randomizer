/**
 * Constructor params for AreaLocation class.
 */
export interface AreaLocationParams {
  worldAssetId: number;
  areaAssetId: number;
}

/**
 * Class for containing data for AreaLocation object.
 */
export default class AreaLocation {
  readonly worldAssetId: number;
  readonly areaAssetId: number;

  constructor(params: AreaLocationParams) {
    Object.assign(this, params);
  }
}

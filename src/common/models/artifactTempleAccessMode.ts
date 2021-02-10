import { ArtifactTempleAccessMode as ArtifactTempleAccessModeEnum } from '../enums/artifactTempleAccessMode';

export default class ArtifactTempleAccessMode {
  static numKeys(value: ArtifactTempleAccessModeEnum): number {
    switch (value) {
      case ArtifactTempleAccessModeEnum.ALL_BOSSES: return 9;
      case ArtifactTempleAccessModeEnum.ALL_MAJOR_BOSSES: return 3;
      default: return value;
    }
  }
}

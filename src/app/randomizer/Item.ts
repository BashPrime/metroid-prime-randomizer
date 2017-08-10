import { PrimeItemName, PrimeItemId } from './ItemType';
import { Upgrade } from './item/Upgrade';
import { Artifact } from './item/Artifact';
import { Expansion } from './item/Expansion';

export class Item {
    protected name: PrimeItemName;
    protected id: number;
	protected model: number;
	protected animSet: number;
	protected animCharacter: number;
	protected rotation: object;
	protected xrayModel: number;
	protected xraySkin: number;
    public static items: Map<string, Item>;

    constructor(name: PrimeItemName, id: PrimeItemId) {
        this.name = name;
        this.id = id;
    }

    public static get(key: string): Item {
        let items: Map<string, Item> = this.all();
        return items.get(key);
    }

    public static all(): Map<string, Item> {
        if (this.items !== undefined)
            return this.items;
        this.items = new Map<string, Item>();
        this.items.set(PrimeItemName.MISSILE_EXPANSION, new Expansion(PrimeItemName.MISSILE_EXPANSION, PrimeItemId.MISSILE_EXPANSION));
        this.items.set(PrimeItemName.ENERGY_TANK, new Expansion(PrimeItemName.ENERGY_TANK, PrimeItemId.ENERGY_TANK));
        this.items.set(PrimeItemName.POWER_BOMB_EXPANSION, new Upgrade(PrimeItemName.POWER_BOMB_EXPANSION, PrimeItemId.POWER_BOMB_EXPANSION));
        this.items.set(PrimeItemName.SPACE_JUMP_BOOTS, new Upgrade(PrimeItemName.SPACE_JUMP_BOOTS, PrimeItemId.SPACE_JUMP_BOOTS));
        this.items.set(PrimeItemName.MISSILE_LAUNCHER, new Upgrade(PrimeItemName.MISSILE_LAUNCHER, PrimeItemId.MISSILE_LAUNCHER));
        this.items.set(PrimeItemName.WAVE_BEAM, new Upgrade(PrimeItemName.WAVE_BEAM, PrimeItemId.WAVE_BEAM));
        this.items.set(PrimeItemName.ICE_BEAM, new Upgrade(PrimeItemName.ICE_BEAM, PrimeItemId.ICE_BEAM));
        this.items.set(PrimeItemName.PLASMA_BEAM, new Upgrade(PrimeItemName.PLASMA_BEAM, PrimeItemId.PLASMA_BEAM));
        this.items.set(PrimeItemName.CHARGE_BEAM, new Upgrade(PrimeItemName.CHARGE_BEAM, PrimeItemId.CHARGE_BEAM));
        this.items.set(PrimeItemName.SUPER_MISSILE, new Upgrade(PrimeItemName.SUPER_MISSILE, PrimeItemId.SUPER_MISSILE));
        this.items.set(PrimeItemName.WAVEBUSTER, new Upgrade(PrimeItemName.WAVEBUSTER, PrimeItemId.WAVEBUSTER));
        this.items.set(PrimeItemName.ICE_SPREADER, new Upgrade(PrimeItemName.ICE_SPREADER, PrimeItemId.ICE_SPREADER));
        this.items.set(PrimeItemName.FLAMETHROWER, new Upgrade(PrimeItemName.FLAMETHROWER, PrimeItemId.FLAMETHROWER));
        this.items.set(PrimeItemName.GRAPPLE_BEAM, new Upgrade(PrimeItemName.GRAPPLE_BEAM, PrimeItemId.GRAPPLE_BEAM));
        this.items.set(PrimeItemName.MORPH_BALL, new Upgrade(PrimeItemName.MORPH_BALL, PrimeItemId.MORPH_BALL));
        this.items.set(PrimeItemName.BOOST_BALL, new Upgrade(PrimeItemName.BOOST_BALL, PrimeItemId.BOOST_BALL));
        this.items.set(PrimeItemName.SPIDER_BALL, new Upgrade(PrimeItemName.SPIDER_BALL, PrimeItemId.SPIDER_BALL));
        this.items.set(PrimeItemName.MORPH_BALL_BOMB, new Upgrade(PrimeItemName.MORPH_BALL_BOMB, PrimeItemId.MORPH_BALL_BOMB));
        this.items.set(PrimeItemName.POWER_BOMB, new Upgrade(PrimeItemName.POWER_BOMB, PrimeItemId.POWER_BOMB));
        this.items.set(PrimeItemName.VARIA_SUIT, new Upgrade(PrimeItemName.VARIA_SUIT, PrimeItemId.VARIA_SUIT));
        this.items.set(PrimeItemName.GRAVITY_SUIT, new Upgrade(PrimeItemName.GRAVITY_SUIT, PrimeItemId.GRAVITY_SUIT));
        this.items.set(PrimeItemName.PHAZON_SUIT, new Upgrade(PrimeItemName.PHAZON_SUIT, PrimeItemId.PHAZON_SUIT));
        this.items.set(PrimeItemName.THERMAL_VISOR, new Upgrade(PrimeItemName.THERMAL_VISOR, PrimeItemId.THERMAL_VISOR));
        this.items.set(PrimeItemName.XRAY_VISOR, new Upgrade(PrimeItemName.XRAY_VISOR, PrimeItemId.XRAY_VISOR));
        this.items.set(PrimeItemName.ARTIFACT_OF_TRUTH, new Artifact(PrimeItemName.ARTIFACT_OF_TRUTH, PrimeItemId.ARTIFACT_OF_TRUTH));
        this.items.set(PrimeItemName.ARTIFACT_OF_STRENGTH, new Artifact(PrimeItemName.ARTIFACT_OF_STRENGTH, PrimeItemId.ARTIFACT_OF_STRENGTH));
        this.items.set(PrimeItemName.ARTIFACT_OF_ELDER, new Artifact(PrimeItemName.ARTIFACT_OF_ELDER, PrimeItemId.ARTIFACT_OF_ELDER));
        this.items.set(PrimeItemName.ARTIFACT_OF_WILD, new Artifact(PrimeItemName.ARTIFACT_OF_WILD, PrimeItemId.ARTIFACT_OF_WILD));
        this.items.set(PrimeItemName.ARTIFACT_OF_LIFEGIVER, new Artifact(PrimeItemName.ARTIFACT_OF_LIFEGIVER, PrimeItemId.ARTIFACT_OF_LIFEGIVER));
        this.items.set(PrimeItemName.ARTIFACT_OF_WARRIOR, new Artifact(PrimeItemName.ARTIFACT_OF_WARRIOR, PrimeItemId.ARTIFACT_OF_WARRIOR));
        this.items.set(PrimeItemName.ARTIFACT_OF_CHOZO, new Artifact(PrimeItemName.ARTIFACT_OF_CHOZO, PrimeItemId.ARTIFACT_OF_CHOZO));
        this.items.set(PrimeItemName.ARTIFACT_OF_NATURE, new Artifact(PrimeItemName.ARTIFACT_OF_NATURE, PrimeItemId.ARTIFACT_OF_NATURE));
        this.items.set(PrimeItemName.ARTIFACT_OF_SUN, new Artifact(PrimeItemName.ARTIFACT_OF_SUN, PrimeItemId.ARTIFACT_OF_SUN));
        this.items.set(PrimeItemName.ARTIFACT_OF_WORLD, new Artifact(PrimeItemName.ARTIFACT_OF_WORLD, PrimeItemId.ARTIFACT_OF_WORLD));
        this.items.set(PrimeItemName.ARTIFACT_OF_SPIRIT, new Artifact(PrimeItemName.ARTIFACT_OF_SPIRIT, PrimeItemId.ARTIFACT_OF_SPIRIT));
        this.items.set(PrimeItemName.ARTIFACT_OF_NEWBORN, new Artifact(PrimeItemName.ARTIFACT_OF_NEWBORN, PrimeItemId.ARTIFACT_OF_NEWBORN));
        return this.items;
    }
}
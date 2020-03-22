interface SettingsDetails {
  [key: string]: DetailObject
}

interface DetailObject {
  name: string;
  description: string;
  items?: SettingsDetails,
  difficulty?: string
}

export enum Difficulty {
  TRIVIAL = 'Trivial',
  EASY = 'Easy',
  NORMAL = 'Normal',
  HARD = 'Hard',
  INSANE = 'Insane'
}

export const details: SettingsDetails = {
  skipFrigate: {
    name: 'Skip the Space Pirate Frigate',
    description: `You will start the game at the chosen starting area instead of the frigate.`
  },
  skipHudPopups: {
    name: 'Skip Item Acquisition Popups',
    description: `The game won't pause and display a popup when you obtain an item.`
  },
  hideItemModels: {
    name: 'Hide Item Models',
    description: `All items will use the Metroid logo with a glitched texture. Their scan entries will also be removed.`
  },
  goal: {
    name: 'Goal',
    description: `This sets the requirements to access the Meta Ridley fight, and by extension the Impact Crater.

    'Artifact Collection': Collect 1-12 Chozo Artifacts placed in the game world.
    'Always Open': Collecting the Artifact Temple item immediately begins the Meta Ridley fight.
    'All Bosses': Defeat Flaahgra, Thardus, and Omega Pirate, and collect their Chozo Artifacts they leave behind.`
  },
  goalArtifacts: {
    name: 'Number of Chozo Artifacts',
    description: `Sets the number of required Chozo Artifacts for Artifact Collection seeds.`
  },
  artifactLocationHints: {
    name: 'Show Chozo Artifact location hints in Artifact Temple',
    description: `Controls whether the totems in the Artifact Temple can be scanned for their hints.

    If enabled, all hint scans are available from the start.
    If disabled, the hint scans will be removed from the game.`
  },
  elevatorShuffle: {
    name: 'Elevator Shuffle',
    description: `Shuffles all of the elevators bidirectionally.`
  },
  heatProtection: {
    name: 'Heat Protection',
    description: `'Any Suit': Collecting any of the three suits will prevent heat damage.
    'Varia Only': Only the Varia Suit will prevent heat damage.

    The item logic does take this setting into account. Keep in mind that while all of early Magmoor is superheated,
    only Twin Fires Tunnel is superheated when going to far Magmoor. This means that you MAY be required to reach far
    Magmoor or Phendrana Drifts through Phazon Mines to obtain Varia or your first suit upgrade.`
  },
  suitDamageReduction: {
    name: 'Suit Damage Reduction',
    description: `'Default': Damage reduction is based on the most powerful suit you have obtained.
    Varia = 10%, Gravity = 20%, Phazon = 50%.

    'Progressive': Damage reduction is based on the number of suits you have obtained.
    '1 Suit = 10%, 2 Suits = 20%, 3 Suits = 50%.`
  },
  pointOfNoReturnItems: {
    name: 'Point of No Return Items',
    description: `'Allow All': An item can be placed in any location that also requires that item to escape.

    'Allow Visible': Same as Allow All, but only if you can see the item before crossing the point of no return (ex: vanilla beam rooms).

    'Do Not Allow': Items cannot be placed in any location that also requires that item to escape.`
  },
  startingArea: {
    name: 'Starting Area',
    description: `Choose which area to start the game in.

    You can choose an area from the list, or have it chosen randomly from the same list.`
  },
  randomStartingItems: {
    name: 'Random Starting Items',
    description: `Controls how many additional items you will start the game with, between a minimum and maximum amount.

    This setting stacks with item overrides.`,
    items: {
      minimum: {
        name: 'Minimum',
        description: 'This controls how many additional items you will always start with.'
      },
      maximum: {
        name: 'Maximum',
        description: 'This controls how many additional items you can have at maximum.'
      }
    }
  },
  // Game Details
  baseIso: {
    name: 'Base ISO',
    description: `NTSC-U 1.00, 1.01, or 1.02 Metroid Prime ISO file. The PAL, NTSC-J, and Wii versions are not currently supported.

    While all three versions are compatible with the default item logic settings, 1.00 is strongly recommended if you plan `
      + `on removing any restrictions or adding any expected tricks.`,
  },
  outputFolder: {
    name: 'Output Folder',
    description: `The folder your randomized seeds and spoiler logs will be saved to. (defaults to your Documents/Metroid Prime Randomizer folder)`
  },
  trilogyIso: {
    name: `Trilogy ISO (for Flaahgra music fix)`,
    description: `NTSC-U Metroid Prime Trilogy ISO or WBFS file.

    This is used to fix the Flaahgra music, which is bugged on the NTSC GameCube versions of Prime.`
  },
  outputType: {
    name: 'Output Type',
    description: `'Plain ISO': Your plain, regular, uncompressed .iso file type. Works with virtually every loader and emulator.
    'Compressed ISO': Compresses the ISO, saves on file size. Should work with most loaders and emulators (Nintendont, Dolphin, etc).
    'GameCube Zip': Another compressed format. Currently, it only works with Dolphin.`
  },
  // Tricks
  alcoveNoItems: {
    name: 'Alcove with No Items',
    description: `It's possible to reach the Alcove room without any items by performing a dash from Samus's ship to the upper ledge, near the Gully door.

    This can be done with a scan dash off the Red Starburst above the Temple Hall door, or by locking onto a Seedling in Temple Hall and then dashing.`,
    difficulty: Difficulty.EASY
  },
  arborChamberWithoutPlasma: {
    name: 'Arbor Chamber without Plasma Beam',
    description: `Arbor Chamber can be entered through the ceiling by going out of bounds.`,
    difficulty: Difficulty.NORMAL
  },
  boostThroughBombTunnels: {
    name: 'Traverse Morph Ball Bomb tunnels with Boost Ball',
    description: `In morph tunnels that normally require single bomb jumps to traverse or access them, a properly-timed boost can be used instead.

    This trick is very difficult and not recommended for beginners.`,
    difficulty: Difficulty.INSANE
  },
  chozoIceTempleItemWithIS: {
    name: 'Chozo Ice Temple Item with Infinite Speed',
    description: `Also called Early Sun IS, you can get this item by performing the infinite speed glitch in Chapel of the Elders inbounds.`,
    difficulty: Difficulty.NORMAL
  },
  climbFrigateCrashSite: {
    name: 'Climb Frigate Crash Site',
    description: `You can Space Jump on standable collision and climb your way to the Overgrown Cavern door.`,
    difficulty: Difficulty.EASY
  },
  climbObservatoryWithoutBoost: {
    name: 'Climb Observatory without Boost Ball',
    description: `You can dash off the orange panels (scan point) or the space pirates to reach the upper platform, and either R Jump or dash to reach the Control Tower.`,
    difficulty: Difficulty.EASY
  },
  climbOreProcessingWithoutGrappleSpider: {
    name: 'Climb Ore Processing without Grapple Beam, Spider Ball',
    description: `You can stand on various collision in the room, such as on the rotating column, to climb to the top of Ore Processing.`,
    difficulty: Difficulty.EASY
  },
  climbPhazonProcessingCenterWithoutSpider: {
    name: 'Climb Phazon Processing Center without Spider Ball',
    description: `You can abuse standable collision such as the morph track and the scaffolding to access the top of the room without needing Spider Ball.`,
    difficulty: Difficulty.EASY
  },
  climbRuinedCourtyardWithoutBoostSpider: {
    name: 'Climb Ruined Courtyard without Boost Ball, Spider Ball',
    description: `There is standable collision near the lower door that can be used to climb to the top of the room.`,
    difficulty: Difficulty.EASY
  },
  climbTowerOfLightWithoutMissiles: {
    name: 'Climb Tower of Light without Missiles',
    description: `Tower of Light can be climbed by dashing to the outside edges, skipping the 40 missile requirement.

    You still need missiles to reach this room inbounds.`,
    difficulty: Difficulty.EASY
  },
  crossMagmaPoolSuitless: {
    name: 'Cross Magma Pool Suitless',
    description: `Removes the suit requirement to traverse this room and obtain the item in Magma Pool. The item logic will assume you have 2 Energy Tanks.

    This setting automatically assumes you do the scan dash, as you cannot grapple without heat protection.`,
    difficulty: Difficulty.NORMAL
  },
  crossMagmaPoolWithoutGrapple: {
    name: 'Cross Magma Pool without Grapple Beam',
    description: `You can scan dash off the crate items to cross Magma Pool with only Space Jump.

    This logic does not expect you to slope jump out of the lava with Gravity Suit.`,
    difficulty: Difficulty.NORMAL
  },
  crossTwinFiresTunnelWithoutSpider: {
    name: 'Cross Twin Fires Tunnel without Spider Ball',
    description: `Twin Fires Tunnel can be crossed with an R jump, a scan dash off the spider track from the wall, or by double bomb jumping out of the lava.

    You can also Space Jump out of the lava to the Twin Fires side if you have Gravity Suit.`,
    difficulty: Difficulty.EASY
  },
  crosswayItemFewerReqs: {
    name: 'Crossway Item - Fewer Requirements',
    description: `When this is enabled, you are only expected to have Space Jump Boots and Morph Ball to obtain the item.`,
    difficulty: Difficulty.EASY
  },
  destroyBombCoversWithPowerBombs: {
    name: 'Destroy Bomb Covers with Power Bombs',
    description: `Bomb covers can be destroyed with Power Bombs as well as bombs.

    The bombable cover at the top of Arboretum cannot be destroyed with Power Bombs and as such is not factored with this setting.`,
    difficulty: Difficulty.TRIVIAL
  },
  eliteResearchInfiniteBoostClip: {
    name: 'Infinite Boost clip into Elite Research',
    description: `Elite Research can be entered from the Research Access door with an Infinite Boost clip.`,
    difficulty: Difficulty.NORMAL
  },
  enableMainPlazaLedgeDoor: {
    name: 'Enable Main Plaza Ledge Door',
    description: `This door is normally disabled from the Main Plaza side. This option enables it in the patcher, allowing for additional routing options.`,
    difficulty: Difficulty.TRIVIAL
  },
  exitQuarantineCaveRuinedCourtyardSlopeJump: {
    name: 'Exit Quarantine Cave to Ruined Courtyard without Spider Ball',
    description: `You can exit Quarantine Cave to Ruined Courtyard by slope jumping next to the Spider Ball track.`,
    difficulty: Difficulty.NORMAL
  },
  fieryShoresAccessWithoutMorphGrapple: {
    name: 'Fiery Shores Access Without Morph Ball and Grapple Beam',
    description: `From the Magmoor East elevator, you can intentionally walk/jump through the lava in Transport Tunnel B to access Magmoor Caverns through Fiery Shores.`,
    difficulty: Difficulty.TRIVIAL
  },
  furnaceAccessWithoutSpider: {
    name: 'Furnace (Upper Tunnel) without Spider Ball',
    description: `You can enter the upper tunnel to reach the rest of Furnace by climbing the side of the Spider Ball track (via jumping), and then morphing at the top.`,
    difficulty: Difficulty.TRIVIAL
  },
  furnaceSpiderTrackItemHBJ: {
    name: 'Furnace Spider Track Item with Hyper Bomb Jump',
    description: `You can hyper bomb jump (HBJ) to the first spider track in the room, skipping the need for Boost Ball and Power Bombs.`,
    difficulty: Difficulty.NORMAL
  },
  furnaceSpiderTrackItemSpaceJumpBombs: {
    name: 'Furnace Spider Track Item with Space Jump Boots, Bombs',
    description: `You can climb the Furnace and its spider tracks using Space Jump, reach the top of the room, then bomb jump across to the item.`,
    difficulty: Difficulty.NORMAL
  },
  gravityChamberLedgeItemWithoutGrapplePlasma: {
    name: 'Gravity Chamber Ledge Item without Grapple, Plasma Beam',
    description: `You can R jump to reach the ledge without Grapple and Plasma Beam.`,
    difficulty: Difficulty.NORMAL
  },
  hallOfTheEldersBombSlotsWithoutSpider: {
    name: 'Hall of the Elders Bomb Slots without Spider Ball',
    description: `You can activate the bomb slots by space jumping onto a peg sticking out of the wall, and then to the upper bomb slot, without needing Spider Ball.`,
    difficulty: Difficulty.TRIVIAL
  },
  hallOfTheEldersItemsWithIS: {
    name: 'Hall of the Elders Items with Infinite Speed',
    description: `You can use the infinite speed glitch in this room by transitioning to East Furnace Access, then going back into Hall of the Elders and jumping on top of the door while still transitioned in East Furnace Access.

    This will "secretize" Hall of the Elders, (makes the room disappear) while keeping the collision loaded.`,
    difficulty: Difficulty.NORMAL
  },
  iceBeamBeforeFlaahgraOobWallcrawl: {
    name: 'Ice Beam Before Flaahgra Wallcrawl (Out of Bounds)',
    description: `You can go out of bounds in Gathering Hall and wallcrawl all the way to Reflecting Pool, skipping some items.`,
    difficulty: Difficulty.HARD
  },
  magmaPoolItemWithIS: {
    name: 'Magma Pool Item with Infinite Speed',
    description: `You can use the infinite speed glitch by wedging yourself between the crates and the wall on the Ruined Fountain side of this room.`,
    difficulty: Difficulty.NORMAL
  },
  mainPlazaItemsOnlySpaceJump: {
    name: 'Main Plaza Items with only Space Jump',
    description: `The Grapple Ledge, Locked Door, and Half Pipe items can be reached with only Space Jump equipped.`,
    difficulty: Difficulty.TRIVIAL
  },
  mainQuarryItemWithoutSpider: {
    name: 'Main Quarry Item without Spider Ball',
    description: `You can slope jump onto the top of the crane and R jump over to the item.`,
    difficulty: Difficulty.NORMAL
  },
  outOfBoundsWithoutMorphBall: {
    name: 'Out of Bounds without Morph Ball',
    description: `Morph Ball and bombs won't be factored in for most out of bounds checks.`,
    difficulty: Difficulty.INSANE
  },
  phazonMiningTunnelItemWithoutPhazonSuit: {
    name: 'Phazon Mining Tunnel Item without Phazon Suit',
    description: `You can damage boost to the item and escape with a minimum of 11 Energy Tanks, or by going out of bounds in Fungal Hall A and infinite boosting through the collision.

    This setting will check if you have 12 Energy Tanks and Boost Ball.`,
    difficulty: Difficulty.HARD
  },
  phendranaTransportSouthToTransportAccessWithoutSpider: {
    name: 'Phendrana Transport South to Transport Access without Spider Ball',
    description: `You can Space Jump onto one of the poles and jump onto the top of the spider track to reach the door.`,
    difficulty: Difficulty.TRIVIAL
  },
  plasmaProcessingItemWithoutGrappleSpider: {
    name: 'Plasma Processing Item without Grapple Beam, Spider Ball',
    description: `You can R jump or dash to reach the boost spinners, and either slope R jump or abuse standable collision to skip the spider track.`,
    difficulty: Difficulty.EASY
  },
  reflectingPoolAccessWithoutWaveBeam: {
    name: 'Reflecting Pool Access Without Wave Beam',
    description: `In Hall of the Elders, you can Hyper Bomb Jump (HBJ) to the morph ball track and reach the door to Reflecting Pool Access.`,
    difficulty: Difficulty.NORMAL
  },
  removePhendranaDepthsGrappleReqs: {
    name: 'Remove Phendrana Depths Grapple Requirements',
    description: `Removes Grapple Beam checks for items and access in Frost Cave, Phendrana's Edge, and Hunter Cave.

    Gravity Chamber Ledge has its own option and is not included here.`,
    difficulty: Difficulty.EASY
  },
  removeThermalReqs: {
    name: 'Remove Thermal Visor Requirements',
    description: `You will not be required to have Thermal Visor for power conduits and accessing Thardus.`,
    difficulty: Difficulty.EASY
  },
  removeXrayReqs: {
    name: 'Remove X-Ray Visor Requirements',
    description: `You will not be required to have X-Ray Visor when traversing invisible platforms.

    THIS DOES NOT REMOVE the X-Ray Visor requirement for Omega Pirate.`,
    difficulty: Difficulty.EASY
  },
  rootCaveArborChamberWithoutGrapple: {
    name: 'Root Cave and Arbor Chamber without Grapple Beam',
    description: `You can dash off the zoomers to reach the opposite platform without Grapple Beam.`,
    difficulty: Difficulty.EASY
  },
  ruinedFountainItemFlaahgraSkip: {
    name: 'Ruined Fountain Flaahgra Skip',
    description: `You can reach the Spider Ball track before defeating Flaahgra by abusing standable terrain, jumping to the track, and morphing.`,
    difficulty: Difficulty.NORMAL
  },
  shoreTunnelEscapeWithoutSpaceJump: {
    name: 'Shore Tunnel Escape without Space Jump Boots',
    description: `You can double bomb jump or slope jump out of the lava pit without the Space Jump Boots.`,
    difficulty: Difficulty.NORMAL
  },
  spiderlessShafts: {
    name: 'Spiderless Shafts (Phazon Mines)',
    description: `Elevator Access A and Research Access can be climbed without Spider Ball.`,
    difficulty: Difficulty.HARD
  },
  suitlessMagmoorRun: {
    name: 'Suitless Magmoor Run',
    description: `With Space Jump Boots and dashing, you can travel from the Magmoor East to the Magmoor West elevator, suitless, with 5 Energy Tanks and Space Jump.`,
    difficulty: Difficulty.HARD
  },
  suitlessMagmoorRunMinimal: {
    name: 'Suitless Magmoor Run - Minimum Requirements',
    description: `Same as Suitless Magmoor Run, but expects you to have 3 Energy Tanks.

    This trick is extremely difficult and is not recommended for beginners.`,
    difficulty: Difficulty.INSANE
  },
  quarantineMonitorDash: {
    name: 'Quarantine Monitor Dash',
    description: `You can skip the Grapple Beam by scan dashing to the Quarantine Monitor platform from the elevator platform.`,
    difficulty: Difficulty.NORMAL
  },
  towerChamberNoGravity: {
    name: 'Tower Chamber without Gravity Suit',
    description: `The ledge can be reached by underwater slope jumping to the door without the Gravity Suit equipped.`,
    difficulty: Difficulty.TRIVIAL
  },
  trainingChamberAndAccessOobWallcrawl: {
    name: 'Reach Training Chamber (and Access) from Out of Bounds',
    description: `You can wallcrawl out of bounds and ceiling warp into Training Chamber and Training Chamber Access.

    This trick will always expect you to have Morph Ball and bombs.`,
    difficulty: Difficulty.HARD
  },
  upperRuinedShrineTowerOfLightFewerAccessReqs: {
    name: 'Upper Ruined Shrine and Tower of Light - Fewer Access Requirements',
    description: `Upper Ruined Shrine and the door to Tower of Light can be reached with just Space Jump Boots (and Wave Beam for the latter).`,
    difficulty: Difficulty.EASY,
  },
  warriorShrineWithoutBoost: {
    name: 'Warrior Shrine without Boost Ball',
    description: `You can space jump to the upper ledge in Monitor Station via R jump or dash.`,
    difficulty: Difficulty.EASY
  },
  wateryHallUnderwaterFlaahgraSkip: {
    name: 'Watery Hall (Underwater) Flaahgra Skip',
    description: `You can obtain the underwater Watery Hall item before fighting Flaaghra, making it possible for the Morph Ball Bomb to be placed here.`,
    difficulty: Difficulty.EASY
  },
  wateryHallUnderwaterSlopeJump: {
    name: 'Watery Hall (Underwater) Slope Jump',
    description: `You can obtain the underwater Watery Hall item without Gravity Suit by slope jumping underwater.`,
    difficulty: Difficulty.EASY
  },
  waveSunOobWallcrawlWithIS: {
    name: 'Wave/Sun Infinite Speed (Out of Bounds)',
    description: `It's possible to obtain the Chozo Ice Temple and Chapel of the Elders items simultaneously by performing this wallcrawl, then using the infinite speed glitch in Chozo Ice Temple.`,
    difficulty: Difficulty.HARD
  }
};



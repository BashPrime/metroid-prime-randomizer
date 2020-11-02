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
  INSANE = 'Insane',
  OOB = 'Out of Bounds'
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
  enableMainPlazaLedgeDoor: {
    name: 'Enable Main Plaza Ledge Door',
    description: `This door is normally disabled from the Main Plaza side. This option enables it in the patcher, allowing for additional routing options.`,
  },
  skipImpactCrater: {
    name: 'Skip Impact Crater',
    description: `Changes the Artifact Temple portal to go directly to the credits, skipping the Impact Crater and Metroid Prime boss fights.`,
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

    The item logic does take this setting into account. Keep in mind that while all of early Magmoor is superheated, `
    + `only Twin Fires Tunnel is superheated when going to far Magmoor. This means that you MAY be required to reach far `
    + `Magmoor or Phendrana Drifts through Phazon Mines to obtain Varia or your first suit upgrade.`
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
  junkItems: {
    name: 'Filler Items',
    description: `Any unfilled spots in the item pool will be filled with the chosen item.

    The "Nothing" item is a suit model that intentionally uses a "glitched" texture.`
  },
  shuffleMode: {
    name: 'Shuffle Mode',
    description: `Determines how the item and location pools will be handled during randomization.

    'Full': All items can be placed in any location.

    'Major/Minor Split': Items are split into two pools: Major and Minor. Major items are upgrades, `
      + `Energy Tanks, and Chozo Artifacts. Minor items are missile and power bomb expansions.

      Locations are also split into two pools, so major items can only be shuffled into locations where major `
      + `items can be found. The same applies to minor items and minor item locations, unless there are less major items `
      + `than available locations.`
  },
  // Game Details
  baseIso: {
    name: 'Base ISO',
    description: `NTSC-U 1.00 or 1.02 Metroid Prime ISO file. The PAL, NTSC-J, and Wii versions are not currently supported.

    While both versions are compatible with the default item logic settings, 1.00 is strongly recommended if you plan `
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
  antechamberWithPowerBombs: {
    name: 'Antechamber with Power Bombs',
    description: `You can retrieve the item and leave Antechamber without Ice Beam by using a power bomb to open the door, moving to the very back of the room, and then back to the door.

    WARNING: If you fail the trick, you will softlock. It is strongly recommended to save at the nearby save station before attempting.`,
    difficulty: Difficulty.NORMAL
  },
  arborChamberWithoutPlasma: {
    name: 'Arbor Chamber without Plasma Beam',
    description: `Arbor Chamber can be entered through the ceiling from out of bounds.

    You can go out of bounds in Root Cave near the Arbor Chamber door, or in Gully.`,
    difficulty: Difficulty.OOB
  },
  arboretumPuzzleSkip: {
    name: 'Arboretum Puzzle Skip',
    description: 'You can double bomb jump over the gate at the top of Arboretum to access Sunchamber without completing the scan puzzle.',
    difficulty: Difficulty.EASY
  },
  boostThroughBombTunnels: {
    name: 'Traverse Morph Ball Bomb tunnels with Boost Ball',
    description: `In morph tunnels that normally require single bomb jumps to traverse or access them, a properly-timed boost can be used instead.

    This trick is very difficult and not recommended for beginners.`,
    difficulty: Difficulty.INSANE
  },
  chapelOfTheEldersWithPowerBombs: {
    name: 'Chapel of the Elders with Power Bombs',
    description: `Similar to Antechamber without Power Bombs, but you open the door, lay a power bomb in the middle of the door frame, and `
      + `then immediately roll into Chapel of the Elders.

      WARNING: You will softlock if you fail this trick. You are recommended to save first before attempting.`,
    difficulty: Difficulty.NORMAL
  },
  chozoIceTempleWithoutSpaceJump: {
    name: 'Chozo Ice Temple without Space Jump',
    description: `Removes Space Jump from being considered for Chozo Ice Temple, Chapel of the Elders, and Phendrana Shorelines (Spider Track).

    You can reach these locations by doing a hyper bomb jump in Phendrana Shorelines to reach the temple, and double bomb jumping to climb the temple itself.`,
    difficulty: Difficulty.NORMAL
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
  climbFrozenPikeWithoutBombs: {
    name: 'Climb Frozen Pike without Bombs',
    description: `To skip the morph ball bomb tunnel, you can R jump or dash to the upper platform on the opposite end of the tunnel.`,
    difficulty: Difficulty.EASY
  },
  climbObservatoryWithoutBoost: {
    name: 'Climb Observatory without Boost Ball',
    description: `You can dash off the orange panels (scan point) or the space pirates to reach the upper platform, and either R Jump or dash to reach the Control Tower.`,
    difficulty: Difficulty.NORMAL
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
  climbReflectingPoolWithoutBoostBall: {
    name: 'Climb Reflecting Pool without Boost Ball',
    description: `You can slope jump off the Stone Toads to reach the top of the room.`,
    difficulty: Difficulty.TRIVIAL
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
  crashedFrigateGammaElevatorWithoutGravity: {
    name: 'Crashed Frigate - Gamma Elevator Item without Gravity Suit',
    description: `In-game, there's nothing stopping you from entering (and leaving) the front side of the crashed frigate without Gravity Suit.`,
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
  crossTwinFiresTunnelSuitless: {
    name: 'Cross Twin Fires Tunnel Suitless',
    description: `Removes the suit requirement when crossing this room. Twin Fires Tunnel is the only room in late Magmoor that is superheated.

    This trick automatically assumes you have 2 Energy Tanks and can cross without Spider Ball, since it cannot be used while you are taking heat damage.`,
    difficulty: Difficulty.NORMAL
  },
  crossTwinFiresTunnelWithoutSpider: {
    name: 'Cross Twin Fires Tunnel without Spider Ball',
    description: `Twin Fires Tunnel can be crossed with an R jump, a scan dash off the spider track from the wall, or by double bomb jumping out of the lava.

    You can also Space Jump out of the lava to the Twin Fires side if you have Gravity Suit.`,
    difficulty: Difficulty.EASY
  },
  crosswayHpbj: {
    name: 'Crossway - Half Pipe Bomb Jump',
    description: `You can reach Hall of the Elders by performing a half pipe bomb jump to reach the other side of the room.`,
    difficulty: Difficulty.HARD
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
  earlyPhendranaBehindIceItemsWithIS: {
    name: 'Early Phendrana Behind Ice items with Infinite Speed',
    description: `The Phendrana Shorelines and Ice Ruins East items behind ice walls can be obtained by getting infinite speed in `
      + `Chapel of the Elders first, then boosting to acquire them.`,
    difficulty: Difficulty.NORMAL
  },
  eliteResearchInfiniteBoostClip: {
    name: 'Infinite Boost clip into Elite Research',
    description: `Elite Research can be entered from the Research Access door with an Infinite Boost clip.`,
    difficulty: Difficulty.NORMAL
  },
  eliteResearchLaserWithoutBoost: {
    name: 'Elite Research Laser without Boost Ball',
    description: `You can get the laser turret to spin by wedging the morph ball in the spinner, bombing out, and then spinning the morph ball while in the spinner before it locks you in.`,
    difficulty: Difficulty.EASY
  },
  exitPhendranaCanyonNoItems: {
    name: 'Exit Phendrana Canyon with No Items',
    description: `Normally, the logic expects you to be able to boost or Space Jump to exit Phendrana Canyon as a means of softlock protection. This trick removes those checks.

    You can leave Phendrana Canyon without any items by jumping on the crates. However, if you destroy the crates and don't have Boost Ball or Space Jump, you will softlock.`,
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
  fieryShoresItemSj: {
    name: 'Fiery Shores Item with Space Jump',
    description: `The morph ball path can be climbed with Space Jump instead to reach the item.`,
    difficulty: Difficulty.TRIVIAL
  },
  frigateCrashSiteItemOnlyScanVisor: {
    name: 'Frigate Crash Site Item with only Scan Visor',
    description: `You can scan dash from either side of the lake to reach the item ledge without any additional items.`,
    difficulty: Difficulty.EASY
  },
  frigateCrashSiteItemWithoutGravitySuit: {
    name: 'Frigate Crash Site Item without Gravity Suit',
    description: `You can scan dash, slope jump, or grapple to the underwater ledge where the item is. You are expected to have either Space Jump or Grapple Beam.`,
    difficulty: Difficulty.EASY
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
  gatheringHallWithoutSpaceJump: {
    name: 'Gathering Hall Item without Space Jump',
    description: `You can double bomb jump from the side platform to the grate where the item is.`,
    difficulty: Difficulty.TRIVIAL
  },
  gravityChamberLedgeItemWithoutGrapplePlasma: {
    name: 'Gravity Chamber Ledge Item without Grapple, Plasma Beam',
    description: `You can R jump to reach the ledge without Grapple and Plasma Beam.`,
    difficulty: Difficulty.NORMAL
  },
  greatTreeHallBarsSkip: {
    name: 'Great Tree Hall - Bars Skip',
    description: 'You can double bomb jump over the bars from either side (the logic also expects this) in Great Tree Hall.',
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

    This will "secretize" Hall of the Elders (makes the room disappear) while keeping the collision loaded.`,
    difficulty: Difficulty.NORMAL
  },
  hydroAccessTunnelWithoutGravity: {
    name: 'Hydro Access Tunnel without Gravity Suit',
    description: `You can use precise boosting to explore Hydro Access Tunnel without Gravity Suit, including obtaining the item.`,
    difficulty: Difficulty.INSANE
  },
  iceBeamBeforeFlaahgraOobWallcrawl: {
    name: 'Ice Beam Before Flaahgra Wallcrawl (Out of Bounds)',
    description: `You can go out of bounds in Gathering Hall and wallcrawl all the way to Reflecting Pool, skipping some items.`,
    difficulty: Difficulty.OOB
  },
  iceRuinsEastSpiderItemWithoutSpider: {
    name: 'Ice Ruins East - Spider Track Item without Spider Ball',
    description: `You can hyper bomb jump to reach the tunnel where the item is without Spider Ball.`,
    difficulty: Difficulty.HARD
  },
  lateMagmoorNoHeatProtection: {
    name: 'Enter Late Magmoor without Heat Protection',
    description: `By default, any access to Magmoor Caverns will check for heat protection in the logic. However, the second half of Magmoor past Twin Fires Tunnel `
      + `isn't superheated, allowing for safe traversal without any suits.

      This trick will remove the heat protection requirement when entering Magmoor from either of the two south elevators.`,
    difficulty: Difficulty.TRIVIAL
  },
  lavaLakeItemOnlyMissiles: {
    name: 'Lava Lake Item with only Missiles',
    description: `There is some collision on the bottom part of the central pillar you can jump on to reach the item.`,
    difficulty: Difficulty.EASY
  },
  lavaLakeItemSuitless: {
    name: 'Lava Lake Item Suitless',
    description: `Removes the suit requirement when considering the Lava Lake item for logic. Enabling this trick overrides "Lava Lake Item with only Missiles".

    This trick expects you to have at least 4 Energy Tanks and Space Jump.`,
    difficulty: Difficulty.NORMAL
  },
  lifeGroveSpinnerWithoutBoostBall: {
    name: 'Life Grove Spinner without Boost Ball',
    description: `With a specific camera angle and control stick angle setup, you can open up the spinner item without Boost Ball.

    Requires 'Life Grove Tunnel - Half Pipe Bomb Jump' to also be activated for this trick to be considered in logic.`,
    difficulty: Difficulty.NORMAL
  },
  lifeGroveTunnelHpbj: {
    name: 'Life Grove Tunnel - Half Pipe Bomb Jump',
    description: `You can half pipe bomb jump to reach either side of Life Grove Tunnel without Boost Ball.`,
    difficulty: Difficulty.HARD
  },
  lowerPhazonMineWithoutSpiderGrapple: {
    name: 'Lower Phazon Mines without Spider Ball, Grapple Beam',
    description: `Using R jumps, slope jumps, and dashes, you can traverse the entirety of lower Phazon Mines without Spider Ball and Grapple Beam.`,
    difficulty: Difficulty.NORMAL
  },
  magmaPoolItemWithIS: {
    name: 'Magma Pool Item with Infinite Speed',
    description: `You can use the infinite speed glitch by wedging yourself between the crates and the wall on the Ruined Fountain side of this room.`,
    difficulty: Difficulty.NORMAL
  },
  mainPlazaGrappleLedgeOnlyGrapple: {
    name: 'Main Plaza Grapple Ledge Item with only Grapple Beam',
    description: `To reach this grapple point with minimal items, fall down onto the tree knot from the Ruined Fountain door ledge. Next, aim up at the `
      + `grapple point, jump towards it, then lock on to grapple while in mid-air.`,
    difficulty: Difficulty.TRIVIAL
  },
  mainPlazaHpbj: {
    name: 'Main Plaza - Half Pipe Bomb Jump',
    description: `You can reach the half pipe item by performing a half pipe bomb jump.`,
    difficulty: Difficulty.HARD
  },
  mainPlazaItemsOnlySpaceJump: {
    name: 'Main Plaza Items with only Space Jump',
    description: `The Grapple Ledge, Locked Door, and Half Pipe items can be reached with only Space Jump equipped.`,
    difficulty: Difficulty.TRIVIAL
  },
  mainPlazaTreeNoSpaceJump: {
    name: 'Main Plaza Tree Item without Space Jump',
    description: `You can jump or fall down from the Ruined Fountain door ledge to reach the tree item.`,
    difficulty: Difficulty.TRIVIAL
  },
  mainQuarryItemWithoutSpider: {
    name: 'Main Quarry Item without Spider Ball',
    description: `You can slope jump onto the top of the crane and R jump over to the item.`,
    difficulty: Difficulty.NORMAL
  },
  mainQuarryToOreProcessingWithoutGrapple: {
    name: 'Main Quarry to Ore Processing without Grapple Beam',
    description: `You can scan dash from the top of the structure (using the crane spider track scan point) to reach the door to Waste Disposal.`,
    difficulty: Difficulty.EASY
  },
  observatoryPuzzleSkip: {
    name: 'Observatory Item Puzzle Skip',
    description: `This trick expects you to dash to climb Observatory without Boost Ball and Bombs, and then slope jump to the pipes to reach the item.`,
    difficulty: Difficulty.NORMAL
  },
  outOfBoundsWithoutMorphBall: {
    name: 'Out of Bounds without Morph Ball',
    description: `Morph Ball and bombs won't be factored in for most out of bounds checks.`,
    difficulty: Difficulty.OOB
  },
  phazonMiningTunnelItemWithoutPhazonSuit: {
    name: 'Phazon Mining Tunnel Item without Phazon Suit',
    description: `You can damage boost to the item and escape with a minimum of 11 Energy Tanks, or by going out of bounds in Fungal Hall A and infinite boosting through the collision.

    This setting will check if you have 12 Energy Tanks and Boost Ball.`,
    difficulty: Difficulty.INSANE
  },
  phendranaTransportSouthToTransportAccessWithoutSpider: {
    name: 'Phendrana Transport South to Transport Access without Spider Ball',
    description: `You can Space Jump onto one of the poles and jump onto the top of the spider track to reach the door.`,
    difficulty: Difficulty.TRIVIAL
  },
  plasmaProcessingFromMagmoorWorkstationOob: {
    name: 'Plasma Processing from Magmoor Workstation (Out of Bounds)',
    description: `Using the Flying Pirate secret world in Magmoor Workstation, you can wallcrawl to Geothermal Core and go back inbounds in front of the door to Plasma Processing.`,
    difficulty: Difficulty.OOB
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
  ruinedNurseryWithoutBombs: {
    name: 'Ruined Nursery without Bombs',
    description: `You can space jump and morph near the item, and enter the tunnel to obtain it without bombs.

    Boost Ball can also be used, but is part of the Boost through Bomb Tunnels trick option instead of this option.`,
    difficulty: Difficulty.HARD
  },
  ruinedShrineScanDashEscape: {
    name: 'Ruined Shrine Scan Dash Escape',
    description: `To leave Ruined Shrine with just Scan Visor, there is some narrow collision on the branches opposite the sandstone tunnel that you can jump on.

    Once on the branches, face the opposing wall and scan dash using the sandstone tunnel or the wall decoration.`,
    difficulty: Difficulty.EASY
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
    description: `With fast movement, you can travel from the Magmoor East to the Magmoor West elevator (and vice versa) without a suit. This does not open up suitless item checks in Magmoor.

    This trick expects you to have 5 Energy Tanks if you have Space Jump, or 6 tanks without it.`,
    difficulty: Difficulty.HARD
  },
  suitlessMagmoorRunMinimal: {
    name: 'Suitless Magmoor Run - Minimum Requirements',
    description: `Same as Suitless Magmoor Run, but expects you to have 3 Energy Tanks with Space Jump, or 4 tanks without it.

    This trick is extremely difficult and is not recommended for beginners.`,
    difficulty: Difficulty.INSANE
  },
  sunTowerIbj: {
    name: 'Sun Tower - Infinite Bomb Jump',
    description: `After defeating Flaahgra, you can jump into the left groove, have the Oculus carry you, and then infinite bomb jump `
    + `back to the top door to trigger the Sunchamber Chozo Ghost room layer without needing Spider Ball and Super Missles.

    WARNING: If progession is on Sunchamber (Ghosts), you will softlock if you fail this trick. You are advised to save before attempting.`,
    difficulty: Difficulty.NORMAL
  },
  quarantineMonitorDash: {
    name: 'Quarantine Monitor Dash',
    description: `You can skip the Grapple Beam by scan dashing to the Quarantine Monitor platform from the elevator platform.`,
    difficulty: Difficulty.NORMAL
  },
  tallonTransportTunnelCMinimumReqs: {
    name: 'Tallon Transport Tunnel C - Minimum Requirements',
    description: `The roots near Overgrown Cavern can be rolled under with Morph Ball. The remaining roots can be climbed over without Space Jump.`,
    difficulty: Difficulty.TRIVIAL
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
    difficulty: Difficulty.OOB
  },
  triclopsPitItemWithoutSpaceJump: {
    name: 'Triclops Pit Item without Space Jump',
    description: `There is a sloped section of the wall near the last invisible platform that can be reached without Space Jump.

    From there, you can jump to the platform and then the item.`,
    difficulty: Difficulty.NORMAL
  },
  triclopsPitItemWithCharge: {
    name: 'Triclops Pit Item with Charge Beam',
    description: `The pillar containing the item can be destroyed with Charge Beam instead of missiles.`,
    difficulty: Difficulty.TRIVIAL
  },
  upperRuinedShrineTowerOfLightFewerAccessReqs: {
    name: 'Upper Ruined Shrine and Tower of Light - Fewer Access Requirements',
    description: `Upper Ruined Shrine and the door to Tower of Light can be reached with just Space Jump Boots (and Wave Beam for the latter).`,
    difficulty: Difficulty.EASY
  },
  vaultAccessFromMainPlaza: {
    name: 'Vault Access from Main Plaza',
    description: `Vault will be considered reachable in logic from Main Plaza if this trick and if "Enable Main Plaza Ledge Door" are both enabled.`,
    difficulty: Difficulty.TRIVIAL
  },
  ventShaftHpbj: {
    name: 'Ventilation Shaft - Half Pipe Bomb Jump',
    description: `It's possible to return to Elite Control by performing a half pipe bomb jump to reach the Elite Control door.`,
    difficulty: Difficulty.HARD
  },
  warriorShrineMinimumReqs: {
    name: 'Warrior Shrine - Minimum Requirements',
    description: `You can climb the central structure in Monitor Station without Space Jump or Morph Ball Bombs, then dash across to the Warrior Shrine door.`,
    difficulty: Difficulty.NORMAL
  },
  warriorShrineWithoutBoost: {
    name: 'Warrior Shrine without Boost Ball',
    description: `You can space jump to the upper ledge in Monitor Station via R jump or dash.`,
    difficulty: Difficulty.EASY
  },
  wateryHallUnderwaterFlaahgraSkip: {
    name: 'Watery Hall (Underwater) Flaahgra Skip',
    description: `You can obtain the underwater Watery Hall item before fighting Flaaghra, making it possible for the Morph Ball Bomb to be placed here.`,
    difficulty: Difficulty.TRIVIAL
  },
  wateryHallScanPuzzleWithIS: {
    name: 'Watery Hall Scan Puzzle Item with Infinite Speed',
    description: 'You can obtain the scan puzzle item without Scan Visor by getting infinite speed in Magma Pool, then boosting in Watery Hall Access while Watery Hall is loaded.',
    difficulty: Difficulty.NORMAL
  },
  wateryHallUnderwaterSlopeJump: {
    name: 'Watery Hall (Underwater) Slope Jump',
    description: `You can obtain the underwater Watery Hall item without Gravity Suit by slope jumping underwater.`,
    difficulty: Difficulty.EASY
  },
  waveSunOobWallcrawlWithIS: {
    name: 'Wave/Sun Infinite Speed (Out of Bounds)',
    description: `It's possible to obtain the Chozo Ice Temple and Chapel of the Elders items simultaneously by performing this wallcrawl, then using the infinite speed glitch in Chozo Ice Temple.`,
    difficulty: Difficulty.OOB
  }
};



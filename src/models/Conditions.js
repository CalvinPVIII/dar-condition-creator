export default class Conditions {
  constructor(
    includedRaces = null,
    excludedRaces = null,
    includedGenders = null,
    excludedGenders = null,
    includedWeaponTypes = null,
    excludedWeaponTypes = null,
    includedWeaponIds = null,
    excludedWeaponIds = null,
    includedPerks = null,
    excludedPerks = null,
    includedSpells = null,
    excludedSpells = null,
    includedMagicEffects = null,
    excludedMagicEffects = null,
    maxLevel = null
  ) {
    this.includedRaces = includedRaces;
    this.excludedRaces = excludedRaces;
    this.includedGenders = includedGenders;
    this.excludedGenders = excludedGenders;
    this.includedWeaponTypes = includedWeaponTypes;
    this.excludedWeaponTypes = excludedWeaponTypes;
    this.includedWeaponIds = includedWeaponIds;
    this.excludedWeaponIds = excludedWeaponIds;
    this.includedPerks = includedPerks;
    this.excludedPerks = excludedPerks;
    this.includedSpells = includedSpells;
    this.excludedSpells = excludedSpells;
    this.includedMagicEffects = includedMagicEffects;
    this.excludedMagicEffects = excludedMagicEffects;
    this.maxLevel = maxLevel;
  }
}

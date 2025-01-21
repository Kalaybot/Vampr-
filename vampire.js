class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampires = this;

    while (currentVampires.creator) {
      currentVampires = currentVampires.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let ancestor = new Set();
    let vampire1 = this;
    let vampire2 = vampire;

    while (vampire1) {
      ancestor.add(vampire1);
      vampire1 = vampire1.creator;
    }
    while (vampire2) {
      if (ancestor.has(vampire2)) {
        return vampire2;
      }
      vampire2 = vampire2.creator;
    }
    return null;
  }

  // Vampire Depth First Traversal
  
  // Returns the vampire object with that name, or null if no vampire exists with that name
    vampireWithName(name) {
      if (this.name === name) return this;
  
      for (let child of this.offspring) {
        let found = child.vampireWithName(name);
        if (found) return found;
      }
  
      return null;
    }
  
    // Returns the total number of vampires that exist
    get totalDescendents() {
      let count = 0;
  
      for (let child of this.offspring) {
        count += 1 + child.totalDescendents;
      }
  
      return count;
    }
  
    // Returns an array of all the vampires that were converted after 1980
    get allMillennialVampires() {
      let millennials = [];
  
      if (this.yearConverted > 1980) {
        millennials.push(this);
      }
  
      for (let child of this.offspring) {
        millennials.push(...child.allMillennialVampires);
      }
  
      return millennials;
    }
}

module.exports = Vampire;


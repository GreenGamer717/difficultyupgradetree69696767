addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }}, // Sets prestige points at the start
    color: "#33944d",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "The Beginning",
            description: "Start generating points",
            cost: new Decimal(1)
        },
        12: {
            title: "Prestige Upgrade 1",
            description: "Doubles points gain",
            cost: new Decimal(1),
            unlocked() {
                return hasUpgrade('p', 11)
            }
        },
        13: {
            title: "Prestige Upgrade 2",
            description: "Triples points gain",
            cost: new Decimal(3),
            unlocked() {
                return hasUpgrade('p', 12)
            }
        },
        14: {
            title: "Prestige Upgrade 3",
            description: "Prestige Points boost Points gain",
            cost: new Decimal(10),
            unlocked() {
                return hasUpgrade('p', 13)
            },
            effect() {
                let boost = 0
                if (hasUpgrade('p', 23)) boost = boost + 0.25
        return player[this.layer].points.add(1).pow(0.5 + boost)
             },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        21: {
            title: "Prestige Upgrade 4",
            description: "2.5x points gain",
            cost: new Decimal(30),
            unlocked() {
                return hasUpgrade('p', 14)
            }
        },
        22: {
            title: "Prestige Upgrade 5",
            description: "Points boost Prestige Points gain",
            cost: new Decimal(65),
            unlocked() {
                return hasUpgrade('p', 21)
            },
             effect() {
        return player.points.add(1).pow(0.15)
    },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            
            
        },
        23: {
            title: "Prestige Upgrade 6",
            description: "Increases the effect of PU3",
            cost: new Decimal(250),
            unlocked() {
                return hasUpgrade('p', 22)
            }
        },
        24: {
            title: "Prestige Upgrade 7",
            description: "5x Prestige Points gain",
            cost: new Decimal(1000),
            unlocked() {
                return hasUpgrade('p', 23)
            }
        },
        31: {
            title: "Prestige Upgrade 8",
            description: "Unlocks the first prestige challenge",
            cost: new Decimal(12500),
            unlocked() {
                return hasUpgrade('p', 24)
            }
        },
        32: {
            title: "Prestige Upgrade 9",
            description: "Points boost itself",
            cost: new Decimal("1e6"),
            unlocked() {
                return hasUpgrade('p', 31)
            },
             effect() {
        return player.points.add(1).pow(0.1)
    },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            
            
        },
        33: {
            title: "Prestige Upgrade 10",
            description: "Prestige points boost itself",
            cost: new Decimal("1.5e7"),
            unlocked() {
                return hasUpgrade('p', 32)
            },
             effect() {
        return player.points.add(1).pow(0.1)
    },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            
            
        },
    },

    challenges: {
        11: {
            name: "Prestige Challenge 1",
            challengeDescription: "Points are square-rooted",
             canComplete: function() {return player.points.gte(3000)},
             goalDescription: "3,000 Points",
             rewardDescription: "10x prestige points gain",
            unlocked() {
                return hasUpgrade('p', 31)
            }
        }
    },

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 22)) mult = mult.times(upgradeEffect('p', 22))
         if (hasUpgrade('p', 24)) mult = mult.times(5)
        if (hasChallenge('p', 11)) mult = mult.times(10)
         if (hasUpgrade('p', 33)) mult =mult.times(upgradeEffect('p', 33))
        return mult
    },
})
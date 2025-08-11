import {
  world,
  system,
  ItemStack,
  Dimension,
  Block,
  PlayerBreakBlockBeforeEvent,
  Player,
  Enchantment,
  ItemEnchantableComponent,
  EnchantmentType,
  EnchantmentTypes,
} from "@minecraft/server";

interface DropItem {
  item?: ItemStack;
  entity?: string;
  chance?: number;
}

enum GroupDropItemType {
  Random = "Random",
  All = "All",
}

interface TagDropItem {
  tag: string;
  tool?: string | string[];
  have?: GroupDropItem;
  dont?: GroupDropItem;
}

interface GroupDropItem {
  type: GroupDropItemType;
  items: DropItem[];
}

class DroppingItem {
  public static log(planksId: string): TagDropItem {
    const data: TagDropItem = {
      tag: "Woodcutter",
      dont: {
        type: GroupDropItemType.Random,
        items: [
          { chance: 40 },
          {
            entity: "minecraft:vex",
            chance: 5,
          },
          {
            item: new ItemStack(`minecraft:${planksId}`),
            chance: 40,
          },
          {
            item: new ItemStack("minecraft:stick"),
            chance: 15,
          },
        ],
      },
    };

    return data;
  }

  public static coalOre(cobbleStone: string): TagDropItem {
    const chance: number = Math.round(Math.random() * 5) + 10;
    const item: ItemStack = new ItemStack("minecraft:charcoal");
    item.nameTag = "Pure Coal";
    const data: TagDropItem = {
      tag: "Miner",
      tool: [
        "is_pickaxe",
        "wooden_tier|stone_tier|iron_tier|golden_tier|diamond_tier|netherite_tier",
      ],
      have: {
        type: GroupDropItemType.Random,
        items: [
          {
            item,
            chance,
          },
          {
            chance: 100 - chance,
          },
        ],
      },
      dont: {
        type: GroupDropItemType.Random,
        items: [
          {
            chance: 50,
          },
          {
            item: new ItemStack(`minecraft:${cobbleStone}`),
            chance: 25,
          },
          {
            entity: "minecraft:silverfish",
            chance: 25,
          },
        ],
      },
    };

    return data;
  }

  public static ironOre(cobbleStone: string): TagDropItem {
    const chance: number = Math.round(Math.random() * 5) + 10;

    const data: TagDropItem = {
      tag: "Miner",
      tool: ["is_pickaxe", "stone_tier|iron_tier|diamond_tier|netherite_tier"],
      have: {
        type: GroupDropItemType.Random,
        items: [
          {
            item: new ItemStack("minecraft:iron_ingot"),
            chance,
          },
          {
            get item() {
              const rawiron: ItemStack = new ItemStack("minecraft:raw_iron");
              system.run(() => {
                rawiron.nameTag = "Pure Iron";
                rawiron.amount = Math.round(Math.random() * 2) + 1;
              });
              return rawiron;
            },
            chance: 100 - chance,
          },
        ],
      },
      dont: {
        type: GroupDropItemType.Random,
        items: [
          {
            get item() {
              const nuggets = new ItemStack("minecraft:iron_nugget");
              system.run(() => nuggets.amount = Math.round(Math.random() * 4) + 3);
              return nuggets;
            },
            chance: 50,
          },
          {
            chance: 30,
          },
          {
            item: new ItemStack(`minecraft:${cobbleStone}`),
            chance: 10,
          },
          {
            entity: "minecraft:silverfish",
            chance: 10,
          },
        ],
      },
    };

    return data;
  }

  public static goldOre(cobbleStone: string): TagDropItem {
    const chance: number = Math.round(Math.random() * 5) + 10;

    const data: TagDropItem = {
      tag: "Miner",
      tool: ["is_pickaxe", "iron_tier|diamond_tier|netherite_tier"],
      have: {
        type: GroupDropItemType.Random,
        items: [
          {
            item: new ItemStack("minecraft:gold_ingot"),
            chance,
          },
          {
            get item() {
              const rawGold: ItemStack = new ItemStack("minecraft:raw_gold");
              system.run(() => {
                rawGold.nameTag = "Pure Gold";
              rawGold.amount = Math.round(Math.random() * 2) + 1;
              })
              return rawGold;
            },
            chance: 100 - chance,
          },
        ],
      },
      dont: {
        type: GroupDropItemType.Random,
        items: [
          {
            get item() {
              const nuggets = new ItemStack("minecraft:gold_nugget");
              system.run(() => nuggets.amount = Math.round(Math.random() * 4) + 2);
              return nuggets;
            },
            chance: 60,
          },
          {
            chance: 20,
          },
          {
            item: new ItemStack(`minecraft:${cobbleStone}`),
            chance: 10,
          },
          {
            entity: "minecraft:silverfish",
            chance: 10,
          },
        ],
      },
    };

    return data;
  }

  public static diamondOre(cobbleStone: string): TagDropItem {
    const rawIron = new ItemStack("minecraft:raw_iron");
    rawIron.nameTag = "Pure Iron";

    const rawGold = new ItemStack("minecraft:raw_gold");
    rawGold.nameTag = "Pure Gold";

    const data: TagDropItem = {
      tag: "Miner",
      tool: ["is_pickaxe", "iron_tier|diamond_tier|netherite_tier"],
      have: {
        type: GroupDropItemType.Random,
        items: [
          {
            get item() {
              const diamond = new ItemStack("minecraft:diamond");
              system.run(() => {
                diamond.nameTag = "§kDiamond";
              diamond.amount = Math.round(Math.random() * 4) + 1;
              })
              return diamond;
            },
            chance: 50,
          },
          {
            chance: 50,
          },
        ],
      },
      dont: {
        type: GroupDropItemType.Random,
        items: [
          {
            get item() {
              const diamond = new ItemStack("minecraft:diamond");
              diamond.nameTag = "§kDiamond";
              system.run(() => diamond.amount = Math.round(Math.random() * 4) + 1);
              return diamond;
            },
            chance: 5,
          },
          {
            chance: 5,
          },
          {
            item: rawIron,
            chance: 10,
          },
          {
            item: rawGold,
            chance: 10,
          },
          {
            item: new ItemStack("minecraft:emerald"),
            chance: 10,
          },
          {
            item: new ItemStack("minecraft:coal"),
            chance: 10,
          },
          {
            entity: "minecraft:silverfish",
          },
          {
            get item() {
              const gold_nugget = new ItemStack("minecraft:gold_nugget");
              system.run(() => gold_nugget.amount = Math.round(Math.random() * 4) + 1);
              return gold_nugget;
            },
          },
          {
            get item() {
              const iron_nugget = new ItemStack("minecraft:iron_nugget");
              system.run(() => iron_nugget.amount = Math.round(Math.random() * 4) + 1);
              return iron_nugget;
            },
          },
          {
            item: new ItemStack(`minecraft:${cobbleStone}`),
          },
        ],
      },
    };

    return data;
  }
}

system.run(() => {
  const BLOCKLISTS: Record<string, TagDropItem> = {
    "oak_log|oak_wood|stripped_oak_log|stripped_oak_wood": DroppingItem.log("oak_planks"),
    "birch_log|birch_wood|stripped_birch_log|stripped_birch_wood": DroppingItem.log("birch_planks"),
    "acacia_log|acacia_wood|stripped_acacia_log|stripped_acacia_wood": DroppingItem.log("acacia_planks"),
    "spruce_log|spruce_wood|stripped_spruce_log|stripped_spruce_wood": DroppingItem.log("spruce_planks"),
    "dark_oak_log|dark_oak_wood|stripped_dark_oak_log|stripped_dark_oak_wood": DroppingItem.log("dark_oak_planks"),
    "jungle_log|jungle_wood|stripped_jungle_log|stripped_jungle_wood": DroppingItem.log("jungle_planks"),
    "pale_oak_log|pale_oak_wood|stripped_pale_oak_log|stripped_pale_oak_wood": DroppingItem.log("pale_oak_planks"),
    "cherry_log|cherry_wood|stripped_cherry_log|stripped_cherry_wood": DroppingItem.log("cherry_planks"),
    "mangrove_log|mangrove_wood|stripped_mangrove_log|stripped_mangrove_wood": DroppingItem.log("mangrove_planks"),
    "crimson_stem|crimson_hyphae|stripped_crimson_stem|stripped_crimson_hyphae": DroppingItem.log("crimson_planks"),
    "warped_stem|warped_hyphae|stripped_warped_stem|stripped_warped_hyphae": DroppingItem.log("warped_planks"),

    /*=====================================================================*/

    coal_ore: DroppingItem.coalOre("cobblestone"),
    deepslate_coal_ore: DroppingItem.coalOre("cobbled_deepslate"),

    /*=====================================================================*/

    iron_ore: DroppingItem.ironOre("cobblestone"),
    deepslate_iron_ore: DroppingItem.ironOre("cobbled_deepslate"),

    /*=====================================================================*/

    gold_ore: DroppingItem.goldOre("cobblestone"),
    deepslate_gold_ore: DroppingItem.goldOre("cobbled_deepslate"),

    /*=====================================================================*/

    diamond_ore: DroppingItem.diamondOre("cobblestone"),
    deepslate_diamond_ore: DroppingItem.diamondOre("cobbled_deepslate"),
  };

  world.beforeEvents.playerBreakBlock.subscribe((event) => {
    new ChangeDrop(event).init();
  });
  
  class ChangeDrop {
    private event: PlayerBreakBlockBeforeEvent;
    private block: Block;
    private player: Player;
    private dimension: Dimension;
    private tool: ItemStack | undefined;
    private multiplier: number = 1;

    constructor(event: PlayerBreakBlockBeforeEvent) {
      this.event = event;
      this.block = event.block;
      this.player = event.player;
      this.dimension = event.dimension;
      this.tool = event.itemStack;
      this.updateMultiplier();
    }

    private updateMultiplier() {
      if (!this.tool) return;
      const enchantable: ItemEnchantableComponent | undefined =
        this.tool.getComponent("minecraft:enchantable");

      if (!enchantable) return;

      const fortune: Enchantment | undefined =
        enchantable?.getEnchantment("minecraft:fortune");
      if (!fortune) return;

      const { multiplier } = this.getFortuneMultiplier(fortune.level);

      this.multiplier = multiplier;
    }

    private getFortuneMultiplier(fortuneLevel: number) {
      let multiplier: number;
      let chance: number = Math.random();

      if (fortuneLevel === 1) {
        if (chance < 1 / 3) {
          multiplier = 2;
          chance = 1 / 3;
        } else {
          multiplier = 1;
          chance = 2 / 3;
        }
      } else if (fortuneLevel === 2) {
        if (chance < 1 / 4) {
          multiplier = 3;
          chance = 1 / 4;
        } else if (chance < 2 / 4) {
          multiplier = 2;
          chance = 1 / 4;
        } else {
          multiplier = 1;
          chance = 1 / 2;
        }
      } else if (fortuneLevel === 3) {
        if (chance < 1 / 5) {
          multiplier = 4;
          chance = 1 / 5;
        } else if (chance < 2 / 5) {
          multiplier = 3;
          chance = 1 / 5;
        } else if (chance < 3 / 5) {
          multiplier = 2;
          chance = 1 / 5;
        } else {
          multiplier = 1;
          chance = 2 / 5;
        }
      } else {
        multiplier = 1;
        chance = 1;
      }

      return { multiplier, chance };
    }

    public init() {
      const { condition, key } = this.getKey();

      if (this.player.getGameMode() === "creative") return;
      if (!condition) return;

      const data = BLOCKLISTS[key];
      if (data.tool && !this.tool) return;
      if (!this.isCorrectTool(data.tool)) return;

      const hasTag = this.player.hasTag(data.tag) && data.have !== undefined;
      const dontHasTag =
        !this.player.hasTag(data.tag) && data.dont !== undefined;

      if (hasTag) this.spawnItems(data.have!);
      else if (dontHasTag) this.spawnItems(data.dont!);
    }

    private getKey(): { condition: boolean; key: string } {
      const blockId = this.block.typeId.split(":")[1];
      let key = blockId;

      const condition = Object.keys(BLOCKLISTS).some((id) => {
        if (id.includes("|")) {
          return id.split("|").some((splitId) => {
            if (splitId === blockId) {
              key = id;
              return true;
            }
            return false;
          });
        }

        if (id !== blockId) {
          return this.block.getTags().some((tag) => {
            const tagId = tag.includes(":") ? tag.split(":")[1] : tag;
            if (tagId === id) {
              key = tagId;
              return true;
            }
            return false;
          });
        }

        return true;
      });

      return { condition, key };
    }

    private spawnItems(data: GroupDropItem) {
      if (data.type === GroupDropItemType.Random) {
        const item = this.pickRandomDropItem(data.items);
        if (!item || (!item.item && !item.entity)) return;
        this.event.cancel = true;
        system.run(() => {
          this.spawnEntityOrItem(item);
          this.dimension.setBlockType(this.block.location, "minecraft:air");
        });
      } else {
        this.event.cancel = true;
        system.run(() => {
          for (const drop of data.items) {
            if (drop) this.spawnEntityOrItem(drop);
          }
          this.dimension.setBlockType(this.block.location, "minecraft:air");
        });
      }
    }

    private spawnEntityOrItem(item: DropItem) {
      const location = this.block.center();

      if (item.entity) this.dimension.spawnEntity(item.entity, location);
      if (item.item) {
        if (this.tool) item.item.amount *= this.multiplier;

        this.dimension.spawnItem(item.item, location);
      }
    }

    private normalizeDropItems(items: DropItem[]): DropItem[] {
      let totalChance = 0;
      const itemsWithoutChance: DropItem[] = [];

      for (const item of items) {
        if (item.chance !== undefined) {
          totalChance += item.chance;
        } else {
          itemsWithoutChance.push(item);
        }
      }

      const remainingChance = Math.max(0, 100 - totalChance);
      const averageChance =
        itemsWithoutChance.length > 0
          ? remainingChance / itemsWithoutChance.length
          : 0;

      return [
        ...items.filter((item) => item.chance !== undefined),
        ...itemsWithoutChance.map((item) => ({
          ...item,
          chance: averageChance,
        })),
      ];
    }

    private pickRandomDropItem(items: DropItem[]): DropItem | undefined {
      const normalized = this.normalizeDropItems(items);
      let accumulated = 0;
      const random = Math.random() * 100;

      for (const item of normalized) {
        accumulated += item.chance ?? 0;
        if (random <= accumulated) return item;
      }

      return undefined;
    }

    private isCorrectTool(tool: string | string[] | undefined) {
      if (!tool) return true;

      if (Array.isArray(tool)) {
        return tool.every((tag) => {
          if (tag.includes("|")) {
            const tagArray = tag.split("|");
            return tagArray.some((tagId) => {
              if (!tagId.includes(":")) tagId = `minecraft:${tagId}`;

              return this.tool?.getTags().includes(tagId);
            });
          }

          if (!tag.includes(":")) tag = `minecraft:${tag}`;

          return this.tool?.getTags().includes(tag);
        });
      }

      return tool === this.tool?.typeId;
    }
  }
});

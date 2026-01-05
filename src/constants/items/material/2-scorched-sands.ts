import {ItemType} from "@/types";

export const ScorchedSandsMaterial = {
	DesertRabbitMeat: {
		name: '沙漠兔肉',
		icon: '🥩',
		description: '從沙漠兔身上取得的鮮紅肉塊，是荒野中重要的蛋白質來源。',
		quality: 0,
		price: 15
	} as ItemType,

	CactusMeat: {
		name: '仙人掌肉',
		icon: '🌵',
		description: '帶刺仙人掌內部的果肉，雖然口感生澀但飽含水分。',
		quality: 0,
		price: 20
	} as ItemType,

	SandWormBloodClot: {
		name: '沙蟲血塊',
		icon: '🩸',
		description: '沙蟲受傷後凝固的血塊，雖然噁心但有一定的藥用價值。',
		quality: 0,
		price: 10
	} as ItemType,

	ScorpionShell: {
		name: '蠍子殼',
		icon: '🦂',
		description: '沙漠蠍子堅硬的外殼，是製作簡易護甲的基礎素材。',
		quality: 0,
		price: 50
	} as ItemType,

	VultureFeather: {
		name: '禿鷹羽毛',
		icon: '🪶',
		description: '來自荒野獵食者的羽毛，非常輕盈且不沾水。',
		quality: 1,
		price: 50
	} as ItemType,

	BehemothHeart: {
		name: '巨獸之心',
		icon: '🫀',
		description: '沙漠巨獸的力量來源，蘊含強大生命能量的極其珍貴素材。',
		quality: 5,
		price: 1000
	} as ItemType,
}
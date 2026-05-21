const chieucao = 170;
const solechieucao = chieucao % 100;
const cannanglytuong = (solechieucao * 9) / 10;
const cannangtoida = solechieucao;
const cannangtoithieu = (solechieucao * 8) / 10;

console.log(`Cân nặng lý tưởng: ${cannanglytuong}kg, Cân nặng tối đa: ${cannangtoida}kg, Cân nặng tối thiểu: ${cannangtoithieu}kg`);
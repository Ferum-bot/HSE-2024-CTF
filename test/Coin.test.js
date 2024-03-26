const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");

describe("Coin", function () {
  async function deployFixture() {
    const [player, delegate] = await ethers.getSigners();

    const Coin = await ethers.deployContract("Coin");
    await Coin.waitForDeployment();
    const CoinAddr = Coin.target;
    console.log("Адрес Coin токена:", CoinAddr);

    return { Coin, player, delegate };
  }

  it("hack", async function () {
    const { Coin, player, delegate } = await loadFixture(deployFixture);

    // напишите свой контракт и тесты, чтобы получить нужное состояние контракта
    let playerBalance = await Coin.balanceOf(player)
    let delegateBalance = await Coin.balanceOf(delegate)

    console.log(`Баланс игрогка до перевода: ${playerBalance}, баланс делегата до перевода: ${delegateBalance}`)

    await Coin.approve(player, playerBalance)
    await Coin.transferFrom(player, delegate, playerBalance)

    playerBalance = await Coin.balanceOf(player)
    delegateBalance = await Coin.balanceOf(delegate)

    console.log(`Баланс игрогка до перевода: ${playerBalance}, баланс делегата до перевода: ${delegateBalance}`)

    // баланс контракта прокси в токене HSE должен стать 0
    expect(await Coin.balanceOf(player)).to.equal(0);
  });
});

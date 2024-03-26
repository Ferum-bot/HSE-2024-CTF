const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");

describe("Telephone", function () {
  async function deployFixture() {
    const [player, owner] = await ethers.getSigners();

    const Telephone = await ethers.deployContract("Telephone", [owner]);
    await Telephone.waitForDeployment();
    const TelephoneAddr = Telephone.target;
    console.log("Адрес исходного контракта контракта:", TelephoneAddr);

    return { Telephone, player };
  }

  async function deployDropper(telephoneAddress) {
    const Dropper = await ethers.deployContract("TelephoneDrop", [telephoneAddress]);
    await Dropper.waitForDeployment();
    const DropperAddr = Dropper.target;
    console.log("Адрес атакующего контракта:", DropperAddr);

    return Dropper;
  }

  it("hack", async function () {
    const { Telephone, player } = await loadFixture(deployFixture);
    const Dropper = await deployDropper(Telephone.target)

    // напишите свой контракт и тесты, чтобы получить нужное состояние контракта
    await Dropper.dropOwner(player);

    // теперь владелец контракта player, а не owner
    expect(await Telephone.owner()).to.equal(player);
  });
});

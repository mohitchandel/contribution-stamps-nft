import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Mint Language stamp", function () {
  async function deployStampContract() {
    let user: any;
    let contract: any;
    [user] = await ethers.getSigners();
    const StampContract = await ethers.getContractFactory("Stamp");
    contract = await StampContract.deploy();
    return { user, contract };
  }

  describe("Testing Stamps Minting and Functionalities", function () {
    /* The `it("User Should able to Mint Stamps", async function () {` is a test case that checks if a
    user is able to mint stamps. It uses the `safeMint` function of the `Stamp` contract to mint a
    stamp for the user's address with some dummy data. After minting, it checks the balance of the
    user's address to ensure that it is equal to 1, indicating that the minting was successful. */
    it("User Should able to Mint Stamps", async function () {
      const { user, contract } = await loadFixture(deployStampContract);

      const stampData = {
        contributed: true,
        repos: 20,
        username: "jackdeo",
      };

      await contract.safeMint(user.address, "dummy", stampData, 0);
      const balance = await contract.balanceOf(user.address);
      expect(balance).to.equal(1);
    });

    /* The `it("User Should not be able to Mint Stamps", async function () {` is a test case that
    checks if a user is not able to mint stamps. It uses the `safeMint` function of the `Stamp`
    contract to attempt to mint a stamp for the user's address with some dummy data. However, in
    this case, the `stampData` object has the `contributed` property set to `false`, indicating that
    the user is not eligible to mint stamps. The test expects the `safeMint` function to revert with
    the error message "Not eligible mint", indicating that the minting was not successful. */
    it("User Should not be able to Mint Stamps", async function () {
      const { user, contract } = await loadFixture(deployStampContract);
      const stampData = {
        contributed: false,
        repos: 0,
        username: "jackdeo",
      };

      await expect(
        contract.safeMint(user.address, "dummy", stampData, 0)
      ).to.be.revertedWith("Not eligible mint");
    });

    /* The `it("User Should not be able to Mint Stamps twice", async function () {` test case is
    checking if a user is not able to mint stamps twice. */
    it("User Should not be able to Mint Stamps twice", async function () {
      const { user, contract } = await loadFixture(deployStampContract);
      const stampData = {
        contributed: true,
        repos: 10,
        username: "jackdeo",
      };
      await contract.safeMint(user.address, "dummy", stampData, 0);
      await expect(
        contract.safeMint(user.address, "dummy", stampData, 0)
      ).to.be.revertedWith("Can only mint one stamp");
    });

    /* The `it("Stamp Should be soul bound", async function () {` test case is checking if a stamp is
    "soul bound". In this case, it is testing the `safeTransferFrom` function of the `Stamp`
    contract. The `safeTransferFrom` function is used to transfer ownership of a stamp from one
    address to another. */
    it("Stamp Should be soul bound", async function () {
      const { user, contract } = await loadFixture(deployStampContract);
      const stampData = {
        contributed: true,
        repos: 10,
        username: "jackdeo",
      };
      await contract.safeMint(user.address, "dummy", stampData, 0);
      await expect(
        contract.safeTransferFrom(
          user.address,
          "0xAc0BC278C09A2152676cc8b444dB7Fe8d4C6d932",
          0
        )
      ).to.be.reverted;
    });
  });
});

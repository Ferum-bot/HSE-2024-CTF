// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Простой библиотечный контракт для установки времени
contract LibraryContractDrop {
    // хранит временную метку
    uint storedTimeDrop;
    // хранит временную метку
    uint storedTime;

    function setTime(uint _time) public {
        storedTime = _time;
    }
}
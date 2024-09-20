// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract DataStore {
    mapping(address => uint256) public _store;

    // function allows sender to set value
    function setValue(uint256 value_) public {
        _store[msg.sender] = value_;
    }

    // function allows sender to retrieve value
    function getValue() public view returns (uint256) {
        return _store[msg.sender];
    }
}

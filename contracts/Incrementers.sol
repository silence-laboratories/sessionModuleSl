// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Incrementer {
    uint256 public counter;

    event Incremented(uint256 newCounter);

    function increment() public {
        counter += 1;
        emit Incremented(counter);
    }
}

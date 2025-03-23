// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract USDCRewardDistributor {
    IERC20 public usdc;
    address public owner;

    event RewardClaimed(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address _usdc) {
        usdc = IERC20(_usdc);
        owner = msg.sender;
    }

    function claimReward(uint256 amount) external {
        require(usdc.balanceOf(address(this)) >= amount, "Insufficient contract balance");
        require(usdc.transfer(msg.sender, amount), "Transfer failed");
        emit RewardClaimed(msg.sender, amount);
    }
}

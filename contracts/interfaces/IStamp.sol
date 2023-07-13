// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ClaimRequest} from "../libs/StampDataStructs.sol";

interface IStamp {
    function verifyContribution(
        ClaimRequest calldata claimRequest
    ) external pure returns (bool);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IStamp.sol";

contract Stamp is
    ERC721,
    ERC721URIStorage,
    ERC721Burnable,
    Ownable,
    IStamp,
    ERC721Enumerable,
    ERC721Pausable
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Stamp", "STP") {}

    enum Language {
        JavaScript,
        Solidity,
        Rust
    }

    struct MintedData {
        address user;
        Language language;
    }
    mapping(address => MintedData) mintData;
    mapping(address => mapping(Language => bool)) public mintedLanguages;

    function safeMint(
        string memory uri,
        ClaimRequest calldata _claimRequest,
        Language _language
    ) public {
        verifyContribution(_claimRequest);
        require(
            !mintedLanguages[msg.sender][_language],
            "Can only mint one stamp"
        );
        mintData[msg.sender] = MintedData(msg.sender, _language);
        mintedLanguages[msg.sender][_language] = true;

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /*The `verifyContribution` function is a pure function that takes a `ClaimRequest` as input and returns a boolean value. It is used to verify if a user is eligible to mint a stamp based on their contribution.*/
    function verifyContribution(
        ClaimRequest calldata claimRequest
    ) public pure override returns (bool) {
        require(claimRequest.contributed == true, "Not eligible mint");
        require(claimRequest.repos > 0, "Not eligible mint");
        return true;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        require(from == address(0), "Token not transferable");
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

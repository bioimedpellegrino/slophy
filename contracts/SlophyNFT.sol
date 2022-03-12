// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SlophyNFT is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    // Counters
    Counters.Counter private _tokenIds;
    // Uint
    uint256 public mintPrice;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    // Bool
    bool public isPublicMintEnabled;
    bool private revealed = false;
    // String
    string internal baseTokenUri;
    // Address
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor (
        string memory preRevealbaseURI
    ) payable ERC721('SlophyNFT', 'Slophy'){
        mintPrice = 0.28 ether;
        maxSupply = 5000;
        maxPerWallet = 2;
        baseTokenUri = preRevealbaseURI;
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function reserveNFTs(uint256 quantity_) public onlyOwner {
        // Reserve Slophy NFT for the team
        uint totalMinted = _tokenIds.current();
        require(totalMinted.add(quantity_) < maxSupply, "Not enough NFTs left to reserve");
        for (uint i = 0; i < quantity_; i++) {
            totalMinted = totalMinted + 1;
            _tokenIds.increment();
             _safeMint(msg.sender, totalMinted);
        }
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory){
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), '.json'));
    }

    function withdraw() external onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, 'No ether left to withdraw');

        (bool success, ) = (msg.sender).call{ value : balance }('');
        require(success, 'withdraw failed');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'Minting not enabled');
        require(msg.value == quantity_ * mintPrice, 'Wrong mint value');
        require(_tokenIds.current() + quantity_ <= maxSupply, 'Sold out!');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'Exceed max wallet');

        for (uint256 i = 0; i < quantity_; i++){
            uint newTokenId = _tokenIds.current() + 1;
            _tokenIds.increment();
            _safeMint(msg.sender, newTokenId);
        }
    }
}
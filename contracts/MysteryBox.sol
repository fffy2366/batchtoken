// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

// Element MysteryBox
// Deposit the ERC721 Prize NFT into Box first, then user can buy, can open
contract MysteryBox is ERC721, Ownable {
    struct NFT {
        uint256 tokenId;
        address tokenAddress;
        bool opened;
    }

    enum DepositModel {
        ANY, // 0 - can deposit any nft address
        WL_NFT, // 1 - only whitelist nft address
        WL_DEPOSITOR_WL_NFT, // 2 - only whitelist depositor and whitelist nft address
        NONE // 3 - deposit closed, can't deposit
    }

    enum RandomModel {
        PSEUDO, // 0 - pseudo-random, must forbid call from contract
        CHAIN_LINK_VRF // 1 - Chainlink VRF
    }

    // max supply of mystery box nft
    uint256 public maxSupply;

    // current supply of mystery box
    uint256 private currentSupply;

    // mystery box nft uri
    string public baseURI;

    // deposit model
    DepositModel public depositModel;
    mapping(address => bool) private whitelistNFTAddress;

    // random model
    RandomModel private randomModel = RandomModel.PSEUDO;

    // query enable
    bool private queryPrivate = true;

    // allow call open from contract address
    bool public allowContractOpen = true;

    // next auto increment id for deposit prize nft into box
    uint256 private nextNFTId = 0;

    // all nft ids
    uint256[] private allNFTIds;

    // opened NFT ids
    uint256[] private openedNFTIds;

    // nftId => NFT
    mapping(uint256 => NFT) private allNFTs;

    // tokenAddress => tokenId => nftId
    mapping(address => mapping(uint256 => uint256)) private nftIdMap;

    // authority address to call this contract, (buy, open must call from external)
    mapping(address => bool) private authorityCallers;

    // collaborator address
    address public collaborator;

    // collaborator or owner
    modifier onlyCollaboratorOrOwner() {
        require(
            owner() == _msgSender() || collaborator == _msgSender(),
            "only owner or collaborator"
        );
        _;
    }

    constructor(
        string memory symbol,
        string memory name,
        uint256 max,
        string memory uri,
        uint256 model
    ) ERC721(symbol, name) {
        maxSupply = max;
        baseURI = uri;
        depositModel = DepositModel(model);
    }

    // set base uri
    function setBaseURI(string memory uri) public onlyCollaboratorOrOwner {
        baseURI = uri;
    }

    // get base uri
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // get token uri
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _baseURI();
    }

    // set deposit model
    function setDepositModel(DepositModel model)
        external
        onlyCollaboratorOrOwner
    {
        depositModel = model;
    }

    // set max supply of mystery box
    function setMaxSupply(uint256 maxSpl) external onlyCollaboratorOrOwner {
        maxSupply = maxSpl;
    }

    // change allowed deposit prize nft address
    function changeWhitelistNFTAddress(address nft, bool opt)
        external
        onlyCollaboratorOrOwner
    {
        whitelistNFTAddress[nft] = opt;
    }

    // change author address to call this contract
    function changeAuthorizedCallers(address target, bool opt)
        external
        onlyCollaboratorOrOwner
    {
        authorityCallers[target] = opt;
    }

    // set collaborator
    function setCollaborator(address coo) external onlyOwner {
        collaborator = coo;
    }

    // set allow contract open box
    function setAllowContractOpen(bool b) external onlyCollaboratorOrOwner {
        allowContractOpen = b;
    }

    // set random model
    function setRandomModel(RandomModel model)
        external
        onlyCollaboratorOrOwner
    {
        randomModel = model;
    }

    // set query private info , default true
    function setQueryPrivate(bool enable) external onlyCollaboratorOrOwner {
        queryPrivate = enable;
    }

    // current supply of mystery box
    function totalSupply() external view returns (uint256) {
        return currentSupply;
    }

    // mint box nft from authority caller
    function safeMint(address to, uint256 tokenId) public returns (bool) {
        require(authorityCallers[_msgSender()], "only authorities");
        require(allNFTIds.length > 0, "no nft in box, can't mint");
        require(tokenId <= nextNFTId, "tokenId upper supply");
        require(tokenId <= maxSupply, "tokenId upper max limit");
        // mint
        _mint(to, tokenId);
        currentSupply++;
        return true;
    }

    // open box from authority caller
    function openFromAuthority(uint256 tokenId) public returns (bool) {
        require(authorityCallers[_msgSender()], "only authorities");
        return _openBox(tokenId);
    }

    // open box from internal call
    function _openBox(uint256 tokenId) internal returns (bool) {
        // call from contract check, !!! call from attack contract will cause pseudo-random fail
        if (isContract(_msgSender()) && !allowContractOpen) {
            revert("open from contract not allowed");
        }

        // no nft in box
        require(allNFTIds.length > 0, "nft in box empty");

        // random a number
        uint256 arrayIndex = _randomGenerator() % allNFTIds.length;
        uint256 nftId = allNFTIds[arrayIndex];
        NFT storage nft = allNFTs[nftId];
        nft.opened = true;

        // array modify length
        allNFTIds[arrayIndex] = allNFTIds[allNFTIds.length - 1];
        delete allNFTIds[allNFTIds.length - 1];
        allNFTIds.pop();

        // already used nftId
        openedNFTIds.push(nftId);

        // transfer the prize nft to box nft owner
        IERC721(nft.tokenAddress).transferFrom(
            address(this),
            ownerOf(tokenId),
            nft.tokenId
        );

        // burn box nft
        _burn(tokenId);
        currentSupply--;

        return true;
    }

    // query box info
    function getBoxInfo()
        public
        view
        returns (
            uint256 allNFTIdsLen,
            uint256 openedNFTIdsLen,
            uint256 randomModel,
            address collaborator,
            uint256 nextNFTId,
            uint256 currentSupply
        )
    {
        return (
            allNFTIds.length,
            openedNFTIds.length,
            uint256(randomModel),
            collaborator,
            nextNFTId,
            currentSupply
        );
    }

    // query private info
    function getBoxPrivateInfo(
        uint256 arrayType,
        uint256 fromIdx,
        uint256 num
    ) public view returns (uint256[] memory) {
        require(num <= 300, "num 300 limit");
        uint256[] memory result = new uint256[](num);
        if (!queryPrivate) {
            return result;
        }

        // query from allNFTIds array
        if (arrayType == 0) {
            if (fromIdx < allNFTIds.length) {
                if ((fromIdx + num) > allNFTIds.length) {
                    num = allNFTIds.length - fromIdx;
                }
                for (uint256 i = 0; i < num; i++) {
                    result[i] = allNFTIds[i + fromIdx];
                }
            }
        } else {
            // query from openedNFTIds array
            if (fromIdx < openedNFTIds.length) {
                if ((fromIdx + num) > openedNFTIds.length) {
                    num = openedNFTIds.length - fromIdx;
                }
                for (uint256 i = 0; i < num; i++) {
                    result[i] = openedNFTIds[i + fromIdx];
                }
            }
        }
        return result;
    }

    // get NFT info
    function getNFTsInfo(uint256[] memory nftIds)
        external
        view
        returns (NFT[] memory)
    {
        require(nftIds.length <= 200, "array len 200 limit");
        NFT[] memory tmpNFT = new NFT[](nftIds.length);
        if (!queryPrivate) {
            return tmpNFT;
        }
        for (uint256 i = 0; i < nftIds.length; i++) {
            tmpNFT[i] = allNFTs[nftIds[i]];
        }
        return tmpNFT;
    }

    // batchDepositNFT into box, deposit from startTokenId to (startTokenId+num) of same NFT tokenAddress
    function batchDepositNFT(
        address tokenAddress,
        uint256 startTokenId,
        uint256 num
    ) external {
        for (uint256 i = 0; i < num; i++) {
            _depositOneNFT(tokenAddress, startTokenId + i);
        }
    }

    // depositNFT into box, deposit any tokenAddress[], any TokenId[]
    function batchDepositNFTV2(
        address[] memory tokenAddress,
        uint256[] memory tokenId
    ) external {
        require(tokenAddress.length == tokenId.length, "len not math");
        for (uint256 i = 0; i < tokenAddress.length; i++) {
            _depositOneNFT(tokenAddress[i], tokenId[i]);
        }
    }

    // deposit one erc721 nft into box
    function _depositOneNFT(address tokenAddress, uint256 tokenId)
        internal
        returns (uint256)
    {
        IERC721(tokenAddress).safeTransferFrom(
            _msgSender(),
            address(this),
            tokenId
        );
        return 0;
    }

    // Emergency function: In case any ERC721 tokens transfer to this contract directly use "transferFrom" or "mint"
    // batchDepositNFTFromThis(...) like batchDepositNFT(...), but escape safeTransferFrom, directly call _processDepositIntoBox(...)
    function batchDepositNFTFromThis(
        address tokenAddress,
        uint256 startTokenId,
        uint256 num
    ) external onlyCollaboratorOrOwner {
        for (uint256 i = 0; i < num; i++) {
            _processDepositIntoBox(
                _msgSender(),
                tokenAddress,
                startTokenId + i
            );
        }
    }

    // Emergency function: In case any ERC721 tokens transfer to this contract directly use "transferFrom" or "mint"
    // batchDepositNFTFromThisV2(...) like batchDepositNFTV2(...), but escape safeTransferFrom, directly call _processDepositIntoBox(...)
    function batchDepositNFTFromThisV2(
        address[] memory tokenAddress,
        uint256[] memory tokenId
    ) external onlyCollaboratorOrOwner {
        require(tokenAddress.length == tokenId.length, "len not math");
        for (uint256 i = 0; i < tokenAddress.length; i++) {
            _processDepositIntoBox(_msgSender(), tokenAddress[i], tokenId[i]);
        }
    }

    // receive nft transfer in, same as deposit
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        _processDepositIntoBox(from, _msgSender(), tokenId);
        return this.onERC721Received.selector;
    }

    // process deposit nft
    function _processDepositIntoBox(
        address operator,
        address tokenAddress,
        uint256 tokenId
    ) internal returns (uint256) {
        require(allNFTIds.length <= maxSupply, "deposit max limit");

        // deposit not enable
        if (depositModel == DepositModel.NONE) {
            revert("deposit not enable");
        } else if (depositModel == DepositModel.WL_NFT) {
            require(whitelistNFTAddress[tokenAddress], "only wl nft address");
        } else if (depositModel == DepositModel.WL_DEPOSITOR_WL_NFT) {
            require(authorityCallers[operator], "only wl depositor");
            require(whitelistNFTAddress[tokenAddress], "only wl nft address");
        }

        // check the nft owner must change to this contract
        require(
            IERC721(tokenAddress).ownerOf(tokenId) == address(this),
            "token owner is not this contract"
        );

        // !!!check,  if the tokenId already deposited, return ...
        uint256 nftId = nftIdMap[tokenAddress][tokenId];
        if (nftId > 0 && !allNFTs[nftId].opened) {
            // support reTransfer an (tokenAddress,tokenId) to this contract, if the last tokenId has been opened
            return 0;
        }

        NFT memory nft;
        nft.tokenAddress = tokenAddress;
        nft.tokenId = tokenId;
        nft.opened = false;

        nftId = _generateNextNFTId();
        nftIdMap[tokenAddress][tokenId] = nftId;

        allNFTs[nftId] = nft;

        allNFTIds.push(nftId);

        return nftId;
    }

    // !!! pseudo-random a number. can be attacked by contract calls
    function _randomGenerator() internal view returns (uint256) {
        uint256 n = block.timestamp +
            uint256(uint160(_msgSender())) +
            allNFTIds.length;
        if (randomModel == RandomModel.PSEUDO) {
            uint256 loop = (n % 5) + 2;
            for (uint256 i = 0; i < loop; i++) {
                if (
                    uint256(
                        keccak256(
                            abi.encodePacked(blockhash(block.number - i - 1))
                        )
                    ) %
                        2 ==
                    0
                ) n += 2**i;
            }
        } else if (randomModel == RandomModel.CHAIN_LINK_VRF) {
            // not support yet, coming soon...
        }
        return n;
    }

    function _generateNextNFTId() private returns (uint256) {
        return ++nextNFTId;
    }

    // is contract address
    function isContract(address addr) public view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }

    // Emergency function:: claim NFT
    function _claimNFT(
        address tokenAddress,
        uint256 tokenId,
        address recipient,
        uint256 startIdxOfAllIds
    ) internal {
        // transfer nft
        IERC721(tokenAddress).transferFrom(address(this), recipient, tokenId);

        uint256 nftId = nftIdMap[tokenAddress][tokenId];
        if (nftId == 0) {
            return;
        }

        // delete from allNFTIds, try set startIdxOfAllIds > 0 if allNFTIds.length is too large trigger gas limit
        for (uint256 i = startIdxOfAllIds; i < allNFTIds.length; i++) {
            if (allNFTIds[i] == nftId) {
                allNFTIds[i] = allNFTIds[allNFTIds.length - 1];
                delete allNFTIds[allNFTIds.length - 1];
                allNFTIds.pop();
                break;
            }
        }

        // delete from allNFTs
        delete allNFTs[nftId];

        // delete from nftIdMap
        delete nftIdMap[tokenAddress][tokenId];
    }

    // Emergency function: In case any ETH get stuck in the contract unintentionally
    // Only owner can retrieve the asset balance to a recipient address
    function rescueETH(address recipient) external onlyCollaboratorOrOwner {
        uint256 _amount = address(this).balance;
        (bool success, ) = recipient.call{value: _amount}("");
        require(success, "transfer eth failed");
    }

    // Emergency function: In case any ERC20 tokens get stuck in the contract unintentionally
    // Only owner can retrieve the asset balance to a recipient address
    function rescueERC20(address asset, address recipient)
        external
        onlyCollaboratorOrOwner
    {
        IERC20(asset).transfer(
            recipient,
            IERC20(asset).balanceOf(address(this))
        );
    }

    // Emergency function: In case any ERC721 tokens get stuck in the contract unintentionally
    // Only owner can retrieve the asset balance to a recipient address
    // asset- erc721 nft contract address;
    // ids - tokenIds array;
    // recipient - recipient address;
    // startSearchIdx - startSearch idx, default 0, only used for very large array search
    function rescueERC721(
        address asset,
        uint256[] calldata ids,
        address recipient,
        uint256 startSearchIdx
    ) external onlyCollaboratorOrOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            _claimNFT(asset, ids[i], recipient, startSearchIdx);
        }
    }

    function rescueERC721V2(
        address asset,
        uint256 startId,
        uint256 number,
        address recipient,
        uint256 startSearchIdx
    ) external onlyCollaboratorOrOwner {
        for (uint256 i = 0; i < number; i++) {
            _claimNFT(asset, startId + i, recipient, startSearchIdx);
        }
    }

    // Emergency function: In case any ERC1155 tokens get stuck in the contract unintentionally
    // Only owner can retrieve the asset balance to a recipient address
    function rescueERC1155(
        address asset,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        address recipient
    ) external onlyCollaboratorOrOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            IERC1155(asset).safeTransferFrom(
                address(this),
                recipient,
                ids[i],
                amounts[i],
                ""
            );
        }
    }
}

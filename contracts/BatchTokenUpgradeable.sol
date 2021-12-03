//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

// To Use this Dapp: https://rstormsf.github.io/multisender

contract BatchTokenUpgradeable is OwnableUpgradeable {
    mapping(bytes32 => uint256) internal uintStorage;
    mapping(bytes32 => string) internal stringStorage;
    mapping(bytes32 => address) internal addressStorage;
    mapping(bytes32 => bytes) internal bytesStorage;
    mapping(bytes32 => bool) internal boolStorage;
    mapping(bytes32 => int256) internal intStorage;
    event Multisended(uint256 total, address tokenAddress);
    event ClaimedTokens(address token, address owner, uint256 balance);

    modifier hasFee() {
        if (currentFee(msg.sender) > 0) {
            require(msg.value >= currentFee(msg.sender), "Fee");
        }
        _;
    }

    fallback() external payable {}

    function initialize() public initializer {
        __Ownable_init();
        setArrayLimit(200);
        setDiscountStep(0.00005 ether);
        setFee(0.05 ether);
        boolStorage[keccak256("rs_multisender_initialized")] = true;
    }

    function initialized() public view returns (bool) {
        return boolStorage[keccak256("rs_multisender_initialized")];
    }

    function txCount(address customer) public view returns (uint256) {
        return uintStorage[keccak256(abi.encode("txCount", customer))];
    }

    function arrayLimit() public view returns (uint256) {
        return uintStorage[keccak256("arrayLimit")];
    }

    function setArrayLimit(uint256 _newLimit) public onlyOwner {
        require(_newLimit != 0);
        uintStorage[keccak256("arrayLimit")] = _newLimit;
    }

    function discountStep() public view returns (uint256) {
        return uintStorage[keccak256("discountStep")];
    }

    function setDiscountStep(uint256 _newStep) public onlyOwner {
        require(_newStep != 0);
        uintStorage[keccak256("discountStep")] = _newStep;
    }

    function fee() public view returns (uint256) {
        return uintStorage[keccak256("fee")];
    }

    function currentFee(address _customer) public view returns (uint256) {
        if (fee() > discountRate(msg.sender)) {
            return fee() - discountRate(_customer);
        } else {
            return 0;
        }
    }

    function setFee(uint256 _newStep) public onlyOwner {
        require(_newStep != 0);
        uintStorage[keccak256("fee")] = _newStep;
    }

    function discountRate(address _customer) public view returns (uint256) {
        uint256 count = txCount(_customer);
        return count * discountStep();
    }

    function multisendToken(
        address token,
        address[] calldata _contributors,
        uint256[] calldata _balances
    ) public payable hasFee {
        if (token == 0x000000000000000000000000000000000000bEEF) {
            multisendEther(_contributors, _balances);
        } else {
            uint256 total = 0;
            require(_contributors.length <= arrayLimit());
            IERC20Upgradeable erc20token = IERC20Upgradeable(token);
            uint8 i = 0;
            for (i; i < _contributors.length; i++) {
                erc20token.transferFrom(
                    msg.sender,
                    _contributors[i],
                    _balances[i]
                );
                total += _balances[i];
            }
            setTxCount(msg.sender, txCount(msg.sender) + 1);
            emit Multisended(total, token);
        }
    }

    function multisendEther(
        address[] calldata _contributors,
        uint256[] calldata _balances
    ) public payable {
        uint256 total = msg.value;
        uint256 fee = currentFee(msg.sender);
        require(total >= fee);
        require(_contributors.length <= arrayLimit());
        total = total - fee;
        uint256 i = 0;
        for (i; i < _contributors.length; i++) {
            require(total >= _balances[i]);
            total = total - _balances[i];
            payable(_contributors[i]).transfer(_balances[i]);
        }
        setTxCount(msg.sender, txCount(msg.sender) + 1);
        emit Multisended(msg.value, 0x000000000000000000000000000000000000bEEF);
    }

    function claimTokens(address _token) public onlyOwner {
        if (_token == address(0x0)) {
            payable(owner()).transfer(address(this).balance);
            return;
        }
        IERC20Upgradeable erc20token = IERC20Upgradeable(_token);
        uint256 balance = erc20token.balanceOf(address(this));
        erc20token.transfer(owner(), balance);
        emit ClaimedTokens(_token, owner(), balance);
    }

    function setTxCount(address customer, uint256 _txCount) private {
        uintStorage[keccak256(abi.encode("txCount", customer))] = _txCount;
    }
}

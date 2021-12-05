//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title BatchTokenSender, support ETH and ERC20 Tokens, send ether or erc20 token to multiple addresses in batch
 * @dev To Use this Dapp: https://batchtoken.club
 */

contract BatchTokenSender is Ownable {
    event LogTokenBulkSent(address token, uint256 total);
    event LogGetToken(address token, address receiver, uint256 balance);
    address public receiverAddress;
    uint256 public txFee = 0.01 ether;
    uint256 public vipFee = 1 ether;

    /* VIP List */
    mapping(address => bool) public vipList;

    /*
     *  get balance
     */
    function getBalance(address _tokenAddress) public onlyOwner {
        address payable _receiverAddress = getReceiverAddress();
        if (_tokenAddress == address(0)) {
            require(
                _receiverAddress.send(address(this).balance),
                "Get eth failed."
            );
            return;
        }
        IERC20 token = IERC20(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        token.transfer(_receiverAddress, balance);
        emit LogGetToken(_tokenAddress, _receiverAddress, balance);
    }

    /*
     *  Register VIP
     */
    function registerVIP() public payable {
        require(msg.value >= vipFee, "Fee not enough.");
        address payable _receiverAddress = getReceiverAddress();
        vipList[msg.sender] = true;
        require(_receiverAddress.send(msg.value), "Transfer failed.");
    }

    /*
     *  VIP list
     */
    function addToVIPList(address[] calldata _vipList) public onlyOwner {
        for (uint256 i = 0; i < _vipList.length; i++) {
            vipList[_vipList[i]] = true;
        }
    }

    /*
     * Remove address from VIP List by Owner
     */
    function removeFromVIPList(address[] calldata _vipList) public onlyOwner {
        for (uint256 i = 0; i < _vipList.length; i++) {
            vipList[_vipList[i]] = false;
        }
    }

    /*
     * Check isVIP
     */
    function isVIP(address _addr) public view returns (bool) {
        return _addr == owner() || vipList[_addr];
    }

    /*
     * set receiver address
     */
    function setReceiverAddress(address _addr) public onlyOwner {
        require(_addr != address(0), "Address invaild.");
        receiverAddress = _addr;
    }

    /*
     * get receiver address
     */
    function getReceiverAddress() public view returns (address payable) {
        if (receiverAddress == address(0)) {
            return payable(owner());
        }

        return payable(receiverAddress);
    }

    /*
     * set vip fee
     */
    function setVipFee(uint256 _fee) public onlyOwner {
        vipFee = _fee;
    }

    /*
     * set tx fee
     */
    function setTxFee(uint256 _fee) public onlyOwner {
        txFee = _fee;
    }

    function ethSendSameValue(address[] calldata _to, uint256 _value) internal {
        uint256 sendAmount = (_to.length - 1) * _value;
        uint256 remainingValue = msg.value;

        bool vip = isVIP(msg.sender);
        if (vip) {
            require(remainingValue >= sendAmount, "Short value.");
        } else {
            require(remainingValue >= sendAmount + txFee, "Short value.");
        }
        require(_to.length <= 255, "Length gt 255");

        for (uint8 i = 1; i < _to.length; i++) {
            remainingValue = remainingValue - _value;
            (bool success, ) = _to[i].call{value: _value}("");
            require(success, "Transfer failed.");
        }

        emit LogTokenBulkSent(
            0x000000000000000000000000000000000000bEEF,
            msg.value
        );
    }

    function ethSendDifferentValue(
        address[] calldata _to,
        uint256[] calldata _value
    ) internal {
        uint256 sendAmount = _value[0];
        uint256 remainingValue = msg.value;

        bool vip = isVIP(msg.sender);
        if (vip) {
            require(remainingValue >= sendAmount, "Short value.");
        } else {
            require(remainingValue >= sendAmount + txFee, "Short value.");
        }

        require(_to.length == _value.length, "Inconsistent length.");
        require(_to.length <= 255, "Length gt 255");

        for (uint8 i = 1; i < _to.length; i++) {
            remainingValue = remainingValue - _value[i];
            (bool success, ) = _to[i].call{value: _value[i]}("");
            require(success, "Transfer failed.");
        }
        emit LogTokenBulkSent(
            0x000000000000000000000000000000000000bEEF,
            msg.value
        );
    }

    function coinSendSameValue(
        address _tokenAddress,
        address[] calldata _to,
        uint256 _value
    ) internal {
        uint256 sendValue = msg.value;
        bool vip = isVIP(msg.sender);
        if (!vip) {
            require(sendValue >= txFee, "Short value.");
        }
        require(_to.length <= 255, "Length gt 255.");

        address from = msg.sender;
        uint256 sendAmount = (_to.length - 1) * _value;

        IERC20 token = IERC20(_tokenAddress);
        for (uint8 i = 1; i < _to.length; i++) {
            token.transferFrom(from, _to[i], _value);
        }

        emit LogTokenBulkSent(_tokenAddress, sendAmount);
    }

    function coinSendDifferentValue(
        address _tokenAddress,
        address[] calldata _to,
        uint256[] calldata _value
    ) internal {
        uint256 sendValue = msg.value;
        bool vip = isVIP(msg.sender);
        if (!vip) {
            require(sendValue >= txFee, "Short value.");
        }

        require(_to.length == _value.length, "Inconsistent length.");
        require(_to.length <= 255, "Length gt 255");

        uint256 sendAmount = _value[0];
        IERC20 token = IERC20(_tokenAddress);

        for (uint8 i = 1; i < _to.length; i++) {
            token.transferFrom(msg.sender, _to[i], _value[i]);
        }
        emit LogTokenBulkSent(_tokenAddress, sendAmount);
    }

    /*
        Send ether with the same value by a explicit call method
    */

    function sendEth(address[] calldata _to, uint256 _value) public payable {
        ethSendSameValue(_to, _value);
    }

    /*
        Send ether with the different value by a explicit call method
    */
    function bulksend(address[] calldata _to, uint256[] calldata _value)
        public
        payable
    {
        ethSendDifferentValue(_to, _value);
    }

    /*
        Send ether with the different value by a implicit call method
    */

    function bulkSendETHWithDifferentValue(
        address[] calldata _to,
        uint256[] calldata _value
    ) public payable {
        ethSendDifferentValue(_to, _value);
    }

    /*
        Send ether with the same value by a implicit call method
    */

    function bulkSendETHWithSameValue(address[] calldata _to, uint256 _value)
        public
        payable
    {
        ethSendSameValue(_to, _value);
    }

    /*
        Send coin with the same value by a implicit call method
    */

    function bulkSendCoinWithSameValue(
        address _tokenAddress,
        address[] calldata _to,
        uint256 _value
    ) public payable {
        coinSendSameValue(_tokenAddress, _to, _value);
    }

    /*
        Send coin with the different value by a implicit call method, this method can save some fee.
    */
    function bulkSendCoinWithDifferentValue(
        address _tokenAddress,
        address[] calldata _to,
        uint256[] calldata _value
    ) public payable {
        coinSendDifferentValue(_tokenAddress, _to, _value);
    }

    /*
        Send coin with the different value by a explicit call method
    */
    function bulksendToken(
        address _tokenAddress,
        address[] calldata _to,
        uint256[] calldata _value
    ) public payable {
        coinSendDifferentValue(_tokenAddress, _to, _value);
    }

    /*
        Send coin with the same value by a explicit call method
    */
    function drop(
        address _tokenAddress,
        address[] calldata _to,
        uint256 _value
    ) public payable {
        coinSendSameValue(_tokenAddress, _to, _value);
    }
}

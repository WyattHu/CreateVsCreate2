// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SimpleContract.sol";

contract CreateContract {
    // 存储合约地址
    address public createContractAddress;
    address public create2ContractAddress;

    // 使用 CREATE 创建合约
    function createSimpleContract(uint256 _value) public returns (address) {
        SimpleContract simpleContract = new SimpleContract(_value);
        createContractAddress = address(simpleContract);
        return createContractAddress;
    }

    // 使用 CREATE2 创建合约（新版本solidity无需使用内联汇编）
    function create2SimpleContract(uint256 _value) public returns (address) {
        bytes32 salt = keccak256(abi.encode(_value));
        SimpleContract simpleContract = new SimpleContract{salt: salt}(_value);

        create2ContractAddress = address(simpleContract);
        return create2ContractAddress;
    }

    // 计算使用 CREATE2 创建合约的地址
    function computeCreate2Address(
        uint256 _value
    ) public view returns (address) {
        //合约的创建字节码应该包含构造函数的参数
        bytes memory bytecode = abi.encodePacked(
            type(SimpleContract).creationCode,
            abi.encode(_value)
        );
        bytes32 bytecodeHash = keccak256(bytecode);
        bytes32 salt = keccak256(abi.encode(_value));
        return
            address(
                uint160(
                    uint(
                        keccak256(
                            abi.encodePacked(
                                bytes1(0xff),
                                address(this),
                                salt,
                                bytecodeHash
                            )
                        )
                    )
                )
            );
    }
}

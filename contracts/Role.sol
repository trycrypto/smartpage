pragma solidity ^0.5.1;

contract Roles {
    struct Role {
        string name;
    }
    
    address[] public roleAccounts;
    
    mapping (address => Role) roles;
    
    function setRole (address _address, string memory _name) public {
        Role storage role = roles[_address];
        role.name = _name;
        
        roleAccounts.push(_address);
    }
    
    function getRoleAccounts() public view returns (address[] memory){
        return roleAccounts;
    }
    
    function getRole(address _address) public view returns (string memory){
        return roles[_address].name;
    }
    
    function deleteRole(address _address) public {
        delete roles[_address];
    }
}

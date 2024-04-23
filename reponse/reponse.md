# Decrivez le contrat ERC20.sol et expliquez son fonctionnement

Le contrat ERC20.sol est un contrat qui permet de créer des tokens. 
Il est basé sur l'interface ERC20 qui est un standard pour les tokens Ethereum. 
Cette interface définit les fonctions et les événements que doit implémenter un contrat pour être considéré comme un token ERC20.

Voici les methodes principalement utilisées dans le contrat ERC20.sol :

```js
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```


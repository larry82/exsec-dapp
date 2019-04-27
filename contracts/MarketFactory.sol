pragma solidity ^0.5.2;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./Timed.sol";



contract MarketFactory is Ownable {
  Market[] public deployedMarkets;

  enum MarketType {
    BINARY_PREDICTION,
    HEDGE
  }

  function createMarket(string memory name, string memory description, uint256 openingTime, uint256 closingTime) onlyOwner public {

    Market newMarket = new Market(name, description, openingTime, closingTime);
    deployedMarkets.push(newMarket);
  }

  function getDeployedMarkets() public view returns (Market[] memory) {
    return deployedMarkets;
  }
}

contract Market is Timed, Ownable {

  enum PositionType { NO, YES }

  struct Position {
    uint value;
    address payable holder;
    uint shareVolume;
    uint totalVolume;
    PositionType positionType;
    uint retrieved;
    uint settlement;
  }

  string public name;
  string public description;
  uint public totalVolume;
  bool public completed;
  uint public minimum;
  mapping(uint => uint) shareVolumes;

  MarketFactory.MarketType public market_type;

  Position[] public positions;

  constructor (
    string memory name,
    string memory description,
    uint256 openingTime,
    uint256 closingTime
  )
  Timed(openingTime, closingTime)
  Ownable()
  public
  {
    name = name;
    description = description;
    totalVolume = 0;
  }

  function placePosition(PositionType _positionType) onlyWhileOpen public payable {
    uint _positionValue = msg.value;

    require(msg.value >= 1);

    Position memory newPosition = Position({
      value: _positionValue,
      holder: msg.sender,
      shareVolume: shareVolumes[uint(_positionType)],
      totalVolume: totalVolume,
      positionType: _positionType,
      retrieved: 0,
      settlement: 0
      });

    totalVolume += _positionValue;
    shareVolumes[uint(_positionType)] += _positionValue;
    positions.push(newPosition);
  }

  function retrievePosition(uint _targetPositionIndex ,uint[] memory _positionIndexes, uint _value, uint8 _rate) onlyOwner onlyWhileOpen public {
    uint totalSettlement = 0;
    Position storage targetPosition = positions[_targetPositionIndex];

    for (uint i=0; i<_positionIndexes.length; i++) {
      Position storage position = positions[_positionIndexes[i]];

      position.value -= _value;
      position.retrieved += _value;
      totalVolume -= _value;
      shareVolumes[uint(position.positionType)] -= _value;

      uint settlement = SafeMath.div(_value * (100 - _rate), 100);

      totalSettlement += settlement;
      position.settlement += settlement;
      position.holder.transfer(settlement);
    }

    totalVolume -= _value;
    targetPosition.value -= _value;
    targetPosition.settlement = totalSettlement;
    targetPosition.holder.transfer(totalSettlement);
  }
}

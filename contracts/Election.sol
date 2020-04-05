pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Election  {
    struct Candidate {
        uint candidate_id;
        string first_name;
        string last_name;
        uint voteCount;
    }
    
    struct ElectionResult  {
        uint candidate_id;
        string first_name;
        string last_name; 
        uint voteCount;
    }

    struct Voter {
        uint voter_id;
        bool voted;
    }

    mapping(uint  => Voter) public voters;

    mapping(uint  => Candidate) public candidates;

    // Store VoteArs Count
    uint public count = 1;
    
    constructor() public {
        addCandidate("Tulsi","Gabbard");
        addCandidate("Donald","Trump");
        addCandidate("Hillary","Clinton");   
    }
    
    function addCandidate(string memory _first_name,string memory _last_name) public{
        Candidate memory candidate = Candidate(count,_first_name,_last_name,0);
        candidates[count] = candidate;
        count = count + 1;
    }
    
    function vote (uint _candidateId,uint _voterId) public {
        
        require(!voters[_voterId].voted,"Voter aleady  voted");
        // update candidate vote Count
        candidates[_candidateId].voteCount++;

        //Update voter info to true
        voters[_voterId].voted = true;
        
        // trigger voted event
        //emit votedEvent(_candidateId);
    }

    function getCandidates() public view returns (Candidate[] memory){
      Candidate[] memory candidateList = new Candidate[](count);
      for (uint i = 0; i < count; i++) {
          candidateList[i] = candidates[i];
      }
      return candidateList;
    }
    
    function getElectionResult() public view returns (ElectionResult[] memory) {
        ElectionResult [] memory result = new ElectionResult[](count);
        for(uint  i =0; i < count; i++){
            result[i] = ElectionResult(candidates[i].candidate_id,candidates[i].first_name,candidates[i].last_name,candidates[i].voteCount);
        }
        return result;
    }
}
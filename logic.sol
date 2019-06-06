pragma solidity ^0.5.1;

contract Notes {
	struct notes {
		string id;
		string content;
		address owner;
		bool isCreated;
		bool isDeleted;
		uint256 timestamp;
            	}
	mapping(address => mapping(string =>notes)) private userNotes; // all user notes with string indexing 

    // Add a note to list
	function addNote(string memory _content, string memory _noteId) public {
	   require(!userNotes[msg.sender][_noteId].isCreated,"a Note is already Created With This Id");
	   userNotes[msg.sender][_noteId] =notes(_noteId, _content,msg.sender, true, false, now);
        
            }
    // Updating Notes
	function updateNote(string memory _noteId, string memory _content) public  {
	    require(userNotes[msg.sender][_noteId].isCreated, "Note With This Id Is Not even Existed");
	    userNotes[msg.sender][_noteId].content = _content;
	    userNotes[msg.sender][_noteId].timestamp = now;
        	}
        //Deleting Note	
    function deleteNote(string memory _noteId) public  {
	    require(userNotes[msg.sender][_noteId].isCreated, "Note With This Id Is Not even Existed");
	    delete userNotes[msg.sender][_noteId];
	    userNotes[msg.sender][_noteId].isCreated =false;
       }
   function getNoteId(string memory _noteId) public  view returns(string memory) {
           require(userNotes[msg.sender][_noteId].isCreated, "Note With This Id Is Not even Existed");
           return(userNotes[msg.sender][_noteId].id); 
       }
       function getContent(string memory _noteId) public  view returns(string memory) {
           require(userNotes[msg.sender][_noteId].isCreated, "Note With This Id Is Not even Existed");
           return(userNotes[msg.sender][_noteId].content);
       }
       function getTimestamp(string memory _noteId) public  view returns(uint256) {
           require(userNotes[msg.sender][_noteId].isCreated, "Note With This Id Is Not even Existed");
           return(userNotes[msg.sender][_noteId].timestamp);
       }
     }

 function log(message) {
    $('#log').append($('<p>').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function error(message) {
    $('#log').append($('<p>').addClass('dark-red').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb);
        }, 1000);
      }
    });
  }
  const address = "0xb77772c68687874b4c6d56299a2cc6213322e5ef";
  const abi = [{"constant":false,"inputs":[{"name":"_content","type":"string"},{"name":"_noteId","type":"string"}],"name":"addNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_noteId","type":"string"}],"name":"deleteNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_noteId","type":"string"},{"name":"_content","type":"string"}],"name":"updateNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_noteId","type":"string"}],"name":"getContent","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_noteId","type":"string"}],"name":"getNoteId","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_noteId","type":"string"}],"name":"getTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
  $(function () {
    var notes;
    $('#getNotes').click(function (e) {
      e.preventDefault();
      notes.getNoteId.call(document.getElementById("searchId").value, function (err, result1) {
        if (err) {
          return error(err);
        } 
        // The return value is a BigNumber object
        document.getElementById("getNoteId").innerHTML = result1;
      });
    });
    $('#getNotes').click(function (e) {
      e.preventDefault();
            notes.getContent.call(document.getElementById("searchId").value, function (err, result2) {
        if (err) {
          return error(err);
        } 
        // The return value is a BigNumber object
        document.getElementById("getContent").innerHTML = result2;
      });
     });
     $('#getNotes').click(function (e) {
      e.preventDefault();
            notes.getTimestamp.call(document.getElementById("searchId").value, function (err, result3) {
        if (err) {
          return error(err);
        } 
        // The return value is a BigNumber object
        document.getElementById("getTimestamp").innerHTML = result3;
      });
     });
    $('#addNote').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      notes.addNote.sendTransaction(document.getElementById("content").value,document.getElementById("noteId").value,function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    $('#updateNote').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      notes.updateNote.sendTransaction(document.getElementById("noteId").value, document.getElementById("content").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    $('#deleteNote').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      notes.deleteNote.sendTransaction(document.getElementById("searchId").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    if (typeof(web3) === "undefined") {
      error("Unable to find web3. " +
            "Please run MetaMask (or something else that injects web3).");
    } else {
      log("Found injected web3.");
      web3 = new Web3(web3.currentProvider);
      ethereum.enable();
      if (web3.version.network != 3) {
        error("Wrong network detected. Please switch to the Ropsten test network.");
      } else {
        log("Connected to the Ropsten test network.");
        notes = web3.eth.contract(abi).at(address);
        }
    }
  });

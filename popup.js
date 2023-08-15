// Retrieve the active tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Execute a content script to extract title and comments
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: extractData,
      },
      displayData
    );
  });
  
  // Content script to extract title and comments
  function extractData() {
    const title = document.querySelector("h1.title").innerText;
    const comments = Array.from(document.querySelectorAll("#comments #content-text")).map((comment) => comment.innerText);
    return { title, comments };
  }
  
  // Display extracted data in popup
  function displayData(results) {
    const outputDiv = document.getElementById("output");
    const { title, comments } = results[0].result;
    outputDiv.innerHTML = `<strong>Title:</strong> ${title}<br><strong>Comments:</strong> ${comments.join("<br>")}`;
  }
  
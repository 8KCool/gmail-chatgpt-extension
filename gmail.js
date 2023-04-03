var modalShowFlag = 0; //  0: hide, 1: show
var windowFlag = false;
var editBox;

async function sendOpenAIRequest(payload) {
  try {
    // todo API key
    var apiKey = "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";
    const response = await fetch("https://api.openai.com/v1/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (apiKey || ""),
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices[0]?.text;
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {    
    throw new Error("There was a problem with the fetch operation:", error);
  }
}

const useGpt = async () => {
  
  let email = document.querySelector("div.adn.ads");
  editBox.innerText = "please wait...";
  try {
    const { username } = "star";

    const prompt =
      `Respond to the most recent email in comprehensive and professional tone: \n` +
      email.textContent;
    const payload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0.5,
      max_tokens: 50,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      n: 1,
    };
    const gptResponse = await sendOpenAIRequest(payload);
    editBox.innerText = gptResponse;
  } catch (error) {
    editBox.innerText = "Please check  your Open Ai API keys";
    setTimeout(() => {
      editBox.innerText = "";
    }, 2000);

  } finally {
  }
};

window.onload = () => {
  windowFlag = true;  
}

document.addEventListener("click", function(event) {
  if (event.target.matches(".ams.bkH")) {
    showGPTModal();
  }
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "iconClicked") {
    // show the GPT modal
    let hash = window.location.hash;
    // if (hash.startsWith("#inbox/") && windowFlag) {
      showGPTModal();
    // }
  }
});

var gptModal;

const createGPTModal = () => {
  var senderHtml = getSenderEmailText();
  gptModal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal">
        
        <div class="modal-header">
          <h3 id="title">LuxenGPT</h3>
        </div>
        
        <div class="modal-content">
          <h4 class="content-title">Imail Context</h4>
          <div class="sender-email-box" id="senderBox">${senderHtml}</div>
          <h4 class="content-title">Please enter what you want to reply</h4>
          <div class="edit-email-box" id="editBox" contentEditable="true"></div>
        </div>

        <button id="gpt_generate">GPT Generate</button>
        <button id="modal-close">Close</button>
      </div>
    `;

}

const showGPTModal = () => {
  if(modalShowFlag == 0) {
    gptModal = document.createElement("div");
    createGPTModal();
    document.body.appendChild(gptModal);
    const modalOverlay = gptModal.querySelector(".modal-overlay");
    const modalClose = gptModal.querySelector("#modal-close");
    const gptBtn = gptModal.querySelector("#gpt_generate");
    editBox = gptModal.querySelector("#editBox");
    
    modalOverlay.addEventListener("click", hideModal);
    modalClose.addEventListener("click", hideModal);
    gptBtn.addEventListener("click", useGpt);
    modalShowFlag = 1;
  }
}


function showModal() {
  gptModal.style.display = "block";
  modalShowFlag = 1;
}

function hideModal() {
  gptModal.style.display = "none";
  modalShowFlag = 0;
}

const getSenderEmailText = () => {
  if (document.getElementsByClassName("a3s aiL ") && document.getElementsByClassName("a3s aiL ")[0].children && document.getElementsByClassName("a3s aiL ")[0].children[0]) {
    let extractedAbsenderBody = document.getElementsByClassName("a3s aiL ")[0].outerHTML
    return extractedAbsenderBody;
  }
  return "";
}

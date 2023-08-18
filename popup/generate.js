const authUrl = `https://api.fastmail.com/.well-known/jmap`;
const maskedEmailCap = "https://www.fastmail.com/dev/maskedemail";

let container = document.querySelector(".container");
let button = document.querySelector("#generate-button");
let input = document.querySelector("#description-input");

// Grey out the button
function disableButton() {
  button.style.backgroundColor = "#ccc";
  button.style.color = "#888";
  button.disabled = true;
}

// Replace the input box with `results`
function showResults(results) {
  const successMessage = document.createElement("div");
  successMessage.style = input.style.cssText;
  successMessage.innerText = results;
  input.replaceWith(successMessage);
}

async function getRequestHeaders() {
  const creds = await browser.storage.local.get();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${creds.token}`,
  };

  return headers;
}

// Get JMAP session
async function getSession() {
  const response = await fetch(authUrl, {
    method: "GET",
    headers: await getRequestHeaders(),
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

// Make JMAP call to generate a masked email
async function generateMaskedEmail(description) {
  const session = await getSession();
  if (!session) {
    showResults("Failed to establish session with Fastmail");
    return;
  }

  console.log(session);
  const apiUrl = session.apiUrl;
  const accountId = session.primaryAccounts[maskedEmailCap];

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: await getRequestHeaders(),
    body: JSON.stringify({
      using: [
        "urn:ietf:params:jmap:core",
        maskedEmailCap,
      ],
      methodCalls: [
        [
          "MaskedEmail/set",
          {
            accountId: accountId,
            create: {
              "masked-email-extension": {
                state: "enabled",
                description,
              },
            },
          },
          "methodCallIdent_1",
        ],
      ]
    }),
  });

  const data = await response.json();
  console.log(data);

  if (data.methodResponses[0][0] == "error") {
    const err = data.methodResponses[0][1].description;
    showResults(`Failed to create masked email: ${err}`);
    return;
  }

  // Success!
  const email = Object.values(data.methodResponses[0][1].created)[0].email;
  showResults(email);
}

async function generate() {
  await generateMaskedEmail(input.value);
  disableButton();
}

// Add click event listener to the button
button.addEventListener("click", generate);

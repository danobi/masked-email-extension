const tokenInput = document.querySelector("#token");

// Store the currently selected settings using browser.storage.local.
function storeSettings() {
  browser.storage.local.set({
    token: tokenInput.value
  });
}

// Update the options UI with the settings values retrieved from storage,
// or the default settings if the stored settings are empty.
function updateUI(restoredSettings) {
  tokenInput.value = restoredSettings.token || "";
}

function onError(e) {
  console.error(e);
}

// On opening the options page, fetch stored settings and update the UI with them.
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

// On blur, save the currently selected settings.
tokenInput.addEventListener("blur", storeSettings);

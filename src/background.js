chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // ... your code here
    return true // 👈️ Responds asynchronously
  })
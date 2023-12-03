let currentTab = 0;

function initializeBrowser() {
  document.getElementById(`iframe${currentTab}`).classList.add('active');
}

function changeTab(tabIndex) {
  document.getElementById(`iframe${currentTab}`).classList.remove('active');
  currentTab = tabIndex;
  document.getElementById(`iframe${currentTab}`).classList.add('active');
}

function refreshTab() {
  const iframe = document.getElementById(`iframe${currentTab}`);
  iframe.src = iframe.src;
}

function handleInput(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const input = urlInput.value.trim();

    // Check if the input is a valid URL
    if (isValidURL(input)) {
      navigateToURL(input);
    } else {
      searchOnGoogle(input);
    }

    urlInput.value = '';
  }
} // This closing brace was missing in your provided code

function isValidURL(input) {
  try {
    // Use the URL constructor to check if it's a valid URL
    new URL(addHttpsIfNeeded(input));
    return true;
  } catch (error) {
    return false;
  }
}

// ...
function addTab() {
  const tabsContainer = document.getElementById('tabs');
  const newTabIndex = tabsContainer.childElementCount - 1; // -1 to exclude the add button
  const newTab = document.createElement('div');
  newTab.className = 'tab';
  newTab.innerText = `Tab ${newTabIndex + 1}`;
  newTab.onclick = function() { changeTab(newTabIndex); };
  tabsContainer.insertBefore(newTab, tabsContainer.lastChild);

  const newIframe = document.createElement('iframe');
  newIframe.id = `iframe${newTabIndex}`;
  newIframe.className = 'iframe';
  newIframe.src = 'https://www.google.com';
  document.querySelector('.content').appendChild(newIframe);

  changeTab(newTabIndex);
}

function addHttpsIfNeeded(input) {
  if (!input.startsWith('http://') && !input.startsWith('https://')) {
    return `https://${input}`;
  }
  return input;
}
function navigateToURL(url) {
  const iframe = document.getElementById(`iframe${currentTab}`);
  iframe.src = url;
}

function searchOnGoogle(query) {
  const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  navigateToURL(googleSearchURL);
}

// Call the initialization function when the page is loaded
initializeBrowser();

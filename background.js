
// chrome.tabs.onActivated.addListener(activeInfo => move(activeInfo));

// async function move(activeInfo) {
//   try {
//     await chrome.tabs.move(activeInfo.tabId, {index: 0});
//     console.log('Success.');
//   } catch (error) {
//     if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
//       setTimeout(() => move(activeInfo), 50);
//     }
//   }
// }

// chrome.tabs.onUpdated.addListener(function (tabId , info) {
// 	// if (info.status === 'complete') {
// 		 chrome.tabs.executeScript({
// 			 file: '/script.js',
// 			 runAt: "document_start"
// 		 }, () => chrome.runtime.lastError)
//    //  }
//  });
//  chrome.tabs.onUpdated.addListener(function (tabId , info) {
// 	// if (info.status === 'complete') {
// 		 chrome.tabs.executeScript({
// 			 file: '/moysklad.js',
// 			 runAt: "document_start"
// 		 }, () => chrome.runtime.lastError)
//    //  }
//  });
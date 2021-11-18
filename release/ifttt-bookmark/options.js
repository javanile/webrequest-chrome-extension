function setFileError(e){var t=document.getElementById("statusIcon");t.textContent=e,window.setTimeout(function(){t.textContent=""},5e3)}function handleFileSelect(e){"use strict";var t=e.target.files,n=t[0];if(t&&n){var o=document.getElementById("iconImage");if(o.setAttribute("src",DEFAULT_ICON),n.size>FILE_SIZE_LIMIT)return setFileError("File size limit exceeded (max 100KB)"),void(e.srcElement.value="");if(-1===FILE_TYPES.indexOf(n.type))return setFileError("Invalid file type (JPEG or PNG)"),void(e.srcElement.value="");e=new FileReader;e.onload=function(e){e=e.target.result,e="data:image/png;base64,"+window.btoa(e);o.setAttribute("src",e)},e.readAsBinaryString(n)}}function validateOptions(){var e=document.getElementById("customUrl").value,t=document.getElementById("domain").value,n=document.getElementById("notification").checked,o=document.getElementById("notificationTitle").value,i=document.getElementById("notificationText").value,c=!0;return 1024<e.length&&(c=!1),1024<t.length&&(c=!1),c=!0===n&&(256<i.length||256<o.length)?!1:c}function saveOptions(){"use strict";var e=0,t=document.getElementById("customUrl").value,n=-1,o=document.getElementById("domain").value,i=document.getElementById("onlyHostname").checked,c=document.getElementById("iconImage").src,r=document.getElementById("notification").checked,d=document.getElementById("notificationTitle").value,l=document.getElementById("notificationText").value,a=document.getElementsByName("mode");for(e=0;e<a.length;e++)if(a[e].checked){n=e;break}if(!0===validateOptions()){var s={};for(s.customUrl=t,s.mode=n,s.domain=o,s.onlyHostname=i,s.notification={show:r,title:d,text:l},e=0;e<ICON_MAX_KEYS;e++)s["icon"+e]="";for(var l=ITEM_BYTES_LIMIT-"iconxx".length-4,l=new RegExp(".{1,"+l+"}","g"),m=c.match(l),e=0;e<ICON_MAX_KEYS&&e<m.length;e++)void 0!==m[e]&&(s["icon"+e]=m[e]);chrome.storage.sync.set(s,function(){var e=document.getElementById("status");e.textContent="Options saved",void 0!==chrome.runtime.lastError&&(console.error("An error ocurred saving options: "+chrome.runtime.lastError.string),console.error(chrome.runtime.lastError),e.textContent="An error ocurred saving options"),window.setTimeout(function(){e.textContent=""},1800)})}}function restoreOptions(){"use strict";for(var e={customUrl:"https://javanile-webrequest.herokuapp.com/javanile/webrequest-utils/triggers-panel?_bypass_landing_page=yes&triggers=javanile/webrequest-utils/ifttt-trigger,javanile/webrequest-utils/utc-time",mode:4,domain:".*",onlyHostname:!1,notification:{show:!1,title:"Curtom Button",text:"URL doesn't match"}},t=0;t<ICON_MAX_KEYS;t++)e["icon"+t]="";e.icon0=DEFAULT_ICON,chrome.storage.sync.get(e,function(e){if(void 0===chrome.runtime.lastError){document.getElementById("customUrl").value=e.customUrl,document.getElementById("domain").value=e.domain,document.getElementById("onlyHostname").checked=e.onlyHostname,document.getElementsByName("mode")[e.mode].checked=!0;for(var t="",n=0;n<ICON_MAX_KEYS;n++)t+=e["icon"+n];document.getElementById("iconImage").src=t,document.getElementById("notification").checked=e.notification.show,document.getElementById("notificationTitle").value=e.notification.title,document.getElementById("notificationText").value=e.notification.text,!0===e.notification.show&&(document.getElementById("notificationOptions").style.display="block")}else console.error("An error ocurred restoring options: "+chrome.runtime.lastError)})}function resetDomain(){"use strict";document.getElementById("domain").value=".*"}function resetIcon(){"use strict";document.getElementById("iconImage").src=DEFAULT_ICON}function resetNotification(){"use strict";document.getElementById("notificationTitle").value="Custom Button",document.getElementById("notificationText").value="URL doesn't match"}function toggleNotificationOptions(){"use strict";var e=document.getElementById("notificationOptions");""===e.style.display||"none"===e.style.display?e.style.display="block":e.style.display="none"}document.addEventListener("DOMContentLoaded",restoreOptions),document.getElementById("save").addEventListener("click",saveOptions),document.getElementById("iconFilePicker").addEventListener("change",handleFileSelect,!1),document.getElementById("notification").addEventListener("change",toggleNotificationOptions),document.getElementById("domainRestore").addEventListener("click",resetDomain),document.getElementById("notificationRestore").addEventListener("click",resetNotification),document.getElementById("iconRestore").addEventListener("click",resetIcon),window.File&&window.FileReader&&window.FileList&&window.Blob?document.getElementById("iconFilePicker").addEventListener("change",handleFileSelect,!1):console.log("The File APIs are not fully supported in this browser.");
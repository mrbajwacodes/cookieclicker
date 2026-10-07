let cookies = Number(localStorage.getItem('cookie_cookies')) || 0;
let clickpower = Number(localStorage.getItem('cookie_clickpower')) || 1;
let cookiesPerSecond = Number(localStorage.getItem('cookie_cps')) || 0;
let totalClicks = Number(localStorage.getItem('cookie_totalclicks')) || 0;
let totalCookiesClicked = Number(localStorage.getItem('cookie_totalearned')) || 0;
let totalCookiesMade = Number(localStorage.getItem('cookie_totalmade')) || 0;

const cookieCountDisplay = document.getElementById('cookie-count');
const cookieButton = document.getElementById('cookie-btn');
const clickMulti = document.getElementById('clickMulti');
const totalClicksStat = document.getElementById('total-clicks');
const totalCookiesClickedStat = document.getElementById('total-cookies-clicked');
const totalCookiesMadeStat = document.getElementById('total-cookies');
const saveButton = document.getElementById('save');
const deleteButton = document.getElementById('delete')
const cookiesPerSecondDisplay = document.getElementById('cookies-per-second')

const preciseFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2 
});

function updateAllDisplays() {
    cookieCountDisplay.textContent = preciseFormatter.format(cookies);
    clickMulti.textContent = preciseFormatter.format(Math.round(clickpower));
    if (totalClicksStat) totalClicksStat.textContent = preciseFormatter.format(totalClicks);
    if (totalCookiesClickedStat) totalCookiesClickedStat.textContent = preciseFormatter.format(Math.round(totalCookiesClicked));
    if (totalCookiesMadeStat) totalCookiesMadeStat.textContent = preciseFormatter.format(Math.round(totalCookiesMade));
}
updateAllDisplays();

setInterval(() => {
    cookies = cookies + (cookiesPerSecond / 10);
    cookieCountDisplay.textContent = preciseFormatter.format(cookies);
    clickMulti.textContent = preciseFormatter.format(Math.round(clickpower));
    totalCookiesMade = totalCookiesMade + (cookiesPerSecond / 10);
    if (totalCookiesMadeStat) totalCookiesMadeStat.textContent = preciseFormatter.format(Math.round(totalCookiesMade));
    cookiesPerSecondDisplay.textContent = preciseFormatter.format(Math.round(cookiesPerSecond));
}, 100);

cookieButton.addEventListener('click', (e) => {
    cookies = cookies + Math.round(clickpower);
    totalClicks = totalClicks + 1;
    totalCookiesClicked = totalCookiesClicked + clickpower;
    totalCookiesMade = totalCookiesMade + clickpower;

    if (totalCookiesClickedStat) totalCookiesClickedStat.textContent = preciseFormatter.format(Math.round(totalCookiesClicked));
    if (totalClicksStat) totalClicksStat.textContent = preciseFormatter.format(totalClicks);
    cookieCountDisplay.textContent = preciseFormatter.format(cookies);
    clickMulti.textContent = preciseFormatter.format(Math.round(clickpower));
    if (totalCookiesMadeStat) totalCookiesMadeStat.textContent = preciseFormatter.format(Math.round(totalCookiesMade));

    const popup = document.createElement('div');
    popup.classList.add('floating-number');
    popup.innerText = `+${preciseFormatter.format(Math.round(clickpower))}`;
    popup.style.left = `${e.clientX - 15}px`;
    popup.style.top = `${e.clientY - 20}px`;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 800);
});
function saveGame() {
    localStorage.setItem('cookie_cookies', cookies);
    localStorage.setItem('cookie_clickpower', clickpower);
    localStorage.setItem('cookie_cps', cookiesPerSecond);
    localStorage.setItem('cookie_totalclicks', totalClicks);
    localStorage.setItem('cookie_totalearned', totalCookiesClicked);
    localStorage.setItem('cookie_totalmade', totalCookiesMade);
}
deleteButton.addEventListener('click', (e) => {
    localStorage.setItem('cookie_cookies', 0);
    localStorage.setItem('cookie_clickpower', 1);
    localStorage.setItem('cookie_cps', 0);
    localStorage.setItem('cookie_totalclicks', 0);
    localStorage.setItem('cookie_totalearned', 0);
    localStorage.setItem('cookie_totalmade', 0);
    window.location.reload();
});
saveButton.addEventListener('click', (e) => {
    saveGame();
});
setInterval(() => {
saveGame();
}, 5000);
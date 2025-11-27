// ============================
// 1️⃣ Welcome Modal (Session Only)
// ============================
function initWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    const closeBtn = document.getElementById('closeBtn');
    const continueBtn = document.getElementById('continueBtn');

    // If this page does NOT contain the modal → exit
    if (!modal || !closeBtn || !continueBtn) {
        return;
    }

    // Show modal only if user is visiting ANY page for the first time
    if (!sessionStorage.getItem('welcomeShown')) {
        modal.style.display = 'flex';

        const hideModal = () => {
            modal.style.display = 'none';

            // After hiding → don't show again on ANY page
            sessionStorage.setItem('welcomeShown', 'true');
        };

        closeBtn.addEventListener('click', hideModal);
        continueBtn.addEventListener('click', hideModal);

        modal.addEventListener('click', function (e) {
            if (e.target === modal) hideModal();
        });
    }
}

window.addEventListener('load', initWelcomeModal);



// ============================
// 2️⃣ Color-Blind / Dark Mode Toggle
// ============================
function toggleMode() {
    document.body.classList.toggle('colorblind');

    if (document.body.classList.contains('colorblind')) {
        localStorage.setItem('colorMode', 'colorblind');
    } else {
        localStorage.removeItem('colorMode');
    }
}

// Apply saved mode on page load
function applySavedMode() {
    if (localStorage.getItem('colorMode') === 'colorblind') {
        document.body.classList.add('colorblind');
    }
}
window.addEventListener('load', applySavedMode);

// Desktop: double-click anywhere
document.addEventListener('dblclick', toggleMode);

// Mobile: double-tap anywhere
let lastTap = 0;
document.addEventListener('touchend', function() {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) toggleMode();
    lastTap = currentTime;
});


// ============================
// 3️⃣ Auto-Refresh / Back Button Fix
// ============================
window.addEventListener("pageshow", function(event) {
    if (event.persisted) location.reload();
});

window.addEventListener("focus", function() {
    location.reload();
});

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") location.reload();
});

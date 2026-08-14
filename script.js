/* ============================================================
   Sanaullah ScaleFlow University
   script.js — Complete JavaScript (All Parts 1 to 20)
   Version: 1.0 FINAL FIXED
   ============================================================ */

// ============================================================
// PART 1 — DOM REFERENCES & PAGE REGISTRY
// ============================================================

const loader = document.getElementById("loader");
const toastContainer = document.getElementById("toast-container");

const modalContainer = document.getElementById("modal-container");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalCancelBtn = document.getElementById("modalCancelBtn");
const modalConfirmBtn = document.getElementById("modalConfirmBtn");

const darkModeBtn = document.getElementById("darkModeBtn");

const notificationBell = document.getElementById("notificationBell");
const notificationPanel = document.getElementById("notificationPanel");
const notificationCount = document.getElementById("notificationCount");
const markAllReadBtn = document.getElementById("markAllReadBtn");

const scrollTopBtn = document.getElementById("scrollTopBtn");
const currentYear = document.getElementById("currentYear");

const globalSearchInput =
    document.getElementById("globalSearchInput");

const navLinks =
    document.querySelectorAll(".sidebar-menu a[data-page]");


// ============================================================
// SCALEFLOW PAGE REGISTRY
// ============================================================

const pageSections = {};

for (let i = 1; i <= 20; i++) {

    const pageId = "page" + i;
    const section = document.getElementById(pageId);

    if (section) {
        pageSections[pageId] = section;
    }

}


// ============================================================
// SCALEFLOW BASIC STATUS
// ============================================================

console.log("✅ ScaleFlow Part 1 loaded successfully.");

console.log(
    "📄 Available Pages:",
    Object.keys(pageSections)
);

// ============================================================
// PART 2 — TOAST NOTIFICATION SYSTEM
// ============================================================

function showToast(message, type = "info") {

    try {

        // اگر Toast Container موجود نہیں ہے
        if (!toastContainer) {

            console.log(
                "🔔 Toast:",
                message
            );

            return;

        }

        // Toast Element
        const toast = document.createElement("div");

        toast.className = "toast toast-" + type;

        toast.textContent = message;

        // Accessibility
        toast.setAttribute("role", "alert");

        // Container میں شامل کریں
        toastContainer.appendChild(toast);

        // تھوڑی دیر بعد hide کریں
        setTimeout(function() {

            toast.style.opacity = "0";

            toast.style.transition = "opacity 0.3s ease";

            setTimeout(function() {

                if (toast && toast.parentNode) {
                    toast.remove();
                }

            }, 300);

        }, 3000);

    } catch (error) {

        console.error(
            "❌ Toast Error:",
            error
        );

    }

}



// ============================================================
// PART 3 — LOADER & PAGE READY HANDLER
// ============================================================

function hideLoader() {

    try {

        const loaderElement = document.getElementById("loader");

        // اگر Loader HTML میں موجود ہی نہیں
        if (!loaderElement) {

            console.log(
                "ℹ️ Loader element not found. Website can continue normally."
            );

            return;

        }

        // پہلے ہی hide ہو چکا ہے
        if (
            loaderElement.classList.contains("hidden") ||
            loaderElement.style.display === "none"
        ) {

            return;

        }

        // Loader کو hide کریں
        loaderElement.classList.add("hidden");

        // CSS transition کے لیے مختصر وقت
        setTimeout(function () {

            try {

                loaderElement.style.display = "none";
                loaderElement.setAttribute("aria-hidden", "true");

                console.log(
                    "✅ ScaleFlow Loader hidden successfully."
                );

            } catch (error) {

                console.error(
                    "❌ Loader hide error:",
                    error
                );

            }

        }, 300);

    } catch (error) {

        console.error(
            "❌ Loader System Error:",
            error
        );

        // آخری حفاظتی کوشش
        const emergencyLoader =
            document.getElementById("loader");

        if (emergencyLoader) {
            emergencyLoader.style.display = "none";
        }

    }

}


// ============================================================
// DOM READY
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "✅ ScaleFlow DOM is ready."
        );

        // فوراً Loader ختم کرنے کی کوشش
        hideLoader();

    }
);


// ============================================================
// WINDOW LOAD
// ============================================================

window.addEventListener(
    "load",
    function () {

        console.log(
            "✅ ScaleFlow Window loaded."
        );

        hideLoader();

    }
);


// ============================================================
// EMERGENCY FALLBACK
// ============================================================

setTimeout(
    function () {

        const loaderElement =
            document.getElementById("loader");

        if (
            loaderElement &&
            loaderElement.style.display !== "none"
        ) {

            console.log(
                "⚠️ Loader fallback activated."
            );

            hideLoader();

        }

    },
    2000
);


// ============================================================
// PART 4 — MODAL SYSTEM (SAFE & STABLE)
// ============================================================

function openModal(title, bodyHTML, options = {}) {

    try {

        if (modalTitle) {
            modalTitle.textContent = title || "Modal";
        }

        if (modalBody) {
            modalBody.innerHTML = bodyHTML || "No content available.";
        }

        if (modalContainer) {
            modalContainer.classList.add("open");
            modalContainer.setAttribute("aria-hidden", "false");
        }

        document.body.style.overflow = "hidden";

        if (
            options &&
            typeof options.onOpen === "function"
        ) {
            options.onOpen();
        }

    } catch (error) {

        console.error(
            "❌ Modal Open Error:",
            error
        );

    }

}


function closeModal() {

    try {

        if (modalContainer) {

            modalContainer.classList.remove("open");

            modalContainer.setAttribute(
                "aria-hidden",
                "true"
            );

        }

        document.body.style.overflow = "";

    } catch (error) {

        console.error(
            "❌ Modal Close Error:",
            error
        );

    }

}


// ================= MODAL CLOSE BUTTON =================

if (modalCloseBtn) {

    modalCloseBtn.addEventListener(
        "click",
        function () {

            closeModal();

        }
    );

}


// ================= MODAL CANCEL BUTTON =================

if (modalCancelBtn) {

    modalCancelBtn.addEventListener(
        "click",
        function () {

            closeModal();

        }
    );

}


// ================= MODAL CONFIRM BUTTON =================

if (modalConfirmBtn) {

    modalConfirmBtn.addEventListener(
        "click",
        function () {

            showToast(
                "✅ Confirmed!",
                "success"
            );

            closeModal();

        }
    );

}


// ================= CLICK OUTSIDE MODAL =================

if (modalContainer) {

    modalContainer.addEventListener(
        "click",
        function (event) {

            if (event.target === modalContainer) {

                closeModal();

            }

        }
    );

}


// ================= ESC KEY =================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (
                modalContainer &&
                modalContainer.classList.contains("open")
            ) {

                closeModal();

            }

        }

    }
);

    
    // ============================================================
    // PART 5 — DARK MODE (تھیم تبدیل کریں اور محفوظ کریں)
    // ============================================================
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        if (darkModeBtn) darkModeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    }

    (function loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
            if (darkModeBtn) darkModeBtn.textContent = '☀️';
        }
    })();

    darkModeBtn?.addEventListener('click', toggleDarkMode);

    // Settings page theme button
    document.getElementById('settingsThemeBtn')?.addEventListener('click', toggleDarkMode);

    // ============================================================
    // PART 6 — NAVIGATION (صفحات کا تبادلہ)
    // ============================================================
    function navigateTo(pageId) {
        if (!pageSections || !pageSections[pageId]) {
            console.warn("Page not found:", pageId);
            return;
        }
        Object.values(pageSections).forEach(section => {
            if (section) {
                section.classList.remove("active");
            }
        });
        if (pageSections[pageId]) {
            pageSections[pageId].classList.add("active");
        }
        navLinks.forEach(link => {
            link.classList.remove("active");
        });
        const activeLink = document.querySelector(`.sidebar-menu a[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }
        if (notificationPanel) {
            notificationPanel.classList.remove("open");
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            if (!pageId) return;
            navigateTo(pageId);
        });
    });

    // ============================================================
    // PART 7 — SCROLL TOP (بٹن ظاہر/چھپائیں)
    // ============================================================
    window.addEventListener('scroll', function() {
        if (scrollTopBtn) {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        }
    });
    scrollTopBtn?.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================
    // PART 8 — KEYBOARD SHORTCUTS
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (globalSearch) globalSearch.focus();
        }
        if (e.key === 'Escape') {
            if (modalContainer && modalContainer.classList.contains('open')) closeModal();
            if (notificationPanel && notificationPanel.classList.contains('open')) {
                notificationPanel.classList.remove('open');
            }
        }
    });

    // ============================================================
    // PART 9 — CURRENT YEAR (فوٹر میں سال)
    // ============================================================
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ============================================================
    // PART 10 — DASHBOARD STATS & GLOBAL SEARCH (FIXED)
    // ============================================================
    const globalSearchInput = document.getElementById('globalSearchInput');
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.gateway-card, .course-card, .product-card');
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(query) ? 'block' : 'none';
            });
        });
    }

    function updateDashboardStats() {
        const data = {
            name: 'Sanaullah',
            xp: '250 XP',
            level: 'Level 5',
            streak: '7 Days',
            progress: '75%',
            courses: 12,
            certificates: 4,
            achievements: 8,
            projects: 3
        };

        // Only update elements that actually exist
        const studentName = document.getElementById('studentName');
        if (studentName) studentName.textContent = data.name;

        const brainXP = document.getElementById('brainXP');
        if (brainXP) brainXP.textContent = data.xp;

        const currentLevel = document.getElementById('currentLevel');
        if (currentLevel) currentLevel.textContent = data.level;

        const learningStreak = document.getElementById('learningStreak');
        if (learningStreak) learningStreak.textContent = data.streak;

        const overallProgress = document.getElementById('overallProgress');
        if (overallProgress) overallProgress.textContent = data.progress;

        const courseCount = document.getElementById('courseCount');
        if (courseCount) courseCount.textContent = data.courses;

        const certificateCount = document.getElementById('certificateCount');
        if (certificateCount) certificateCount.textContent = data.certificates;

        const achievementCount = document.getElementById('achievementCount');
        if (achievementCount) achievementCount.textContent = data.achievements;

        const projectCount = document.getElementById('projectCount');
        if (projectCount) projectCount.textContent = data.projects;

        const dashName = document.getElementById('dashName');
        if (dashName) dashName.textContent = data.name;

        const dashLevel = document.getElementById('dashLevel');
        if (dashLevel) dashLevel.textContent = data.level.replace('Level ', '');

        const dashXP = document.getElementById('dashXP');
        if (dashXP) dashXP.textContent = data.xp.replace(' XP', '');

        const dashStreak = document.getElementById('dashStreak');
        if (dashStreak) dashStreak.textContent = data.streak.replace(' Days', '');

        const dashCourses = document.getElementById('dashCourses');
        if (dashCourses) dashCourses.textContent = data.courses;

        const dashCerts = document.getElementById('dashCerts');
        if (dashCerts) dashCerts.textContent = data.certificates;

        const dashAchievements = document.getElementById('dashAchievements');
        if (dashAchievements) dashAchievements.textContent = data.achievements;

        const dashProgress = document.getElementById('dashProgress');
        if (dashProgress) dashProgress.textContent = data.progress;

        const xpTotal = document.getElementById('xpTotal');
        if (xpTotal) xpTotal.textContent = data.xp.replace(' XP', '');

        const badgeTotal = document.getElementById('badgeTotal');
        if (badgeTotal) badgeTotal.textContent = data.achievements;

        const levelTotal = document.getElementById('levelTotal');
        if (levelTotal) levelTotal.textContent = data.level.replace('Level ', '');

        const rewardTotal = document.getElementById('rewardTotal');
        if (rewardTotal) rewardTotal.textContent = '3';
    }

    // ============================================================
    // PART 11 — CONTINUE LEARNING PROGRESS
    // ============================================================
    const continueProgressBtn = document.getElementById('continueProgressBtn');
    const continueProgress = document.getElementById('continueProgress');
    const progressText = document.getElementById('progressText');

    function updateContinueLearningProgress(value) {
        if (!continueProgress) return;
        const progress = Math.max(0, Math.min(100, Number(value) || 0));
        continueProgress.style.width = progress + "%";
        continueProgress.setAttribute("aria-valuenow", progress);
        if (progressText) {
            progressText.textContent = progress + "% Complete";
        }
        return progress;
    }

    if (continueProgressBtn) {
        continueProgressBtn.addEventListener("click", function () {
            let currentProgress = parseInt(continueProgress?.style.width) || 65;
            if (currentProgress >= 100) {
                updateContinueLearningProgress(100);
                showToast("🎉 Course Completed Successfully!", "success");
                return;
            }
            currentProgress += 5;
            currentProgress = updateContinueLearningProgress(currentProgress);
            showToast("📈 Learning Progress Updated (" + currentProgress + "%)", "info");
        });
    }
    updateContinueLearningProgress(65);

    // ============================================================
    // PART 12 — TASKS CHECKBOXES
    // ============================================================
    document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (label) {
                if (this.checked) {
                    label.style.textDecoration = 'line-through';
                    label.style.opacity = '0.6';
                    showToast('🎉 Task completed!', 'success');
                } else {
                    label.style.textDecoration = 'none';
                    label.style.opacity = '1';
                }
            }
        });
    });

    // ============================================================
    // PART 13 — QUICK ACTIONS MAPPING
    // ============================================================
    const quickActions = {
        quickStartLearning: 'page4',
        quickAskAI: 'page7',
        quickBrowseCourses: 'page3',
        quickMyCertificates: 'page5',
        dashResumeLearning: 'page4',
        dashBrowseCourses: 'page3',
        dashAskAI: 'page7',
        dashCertificates: 'page5'
    };

    Object.keys(quickActions).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function() {
                navigateTo(quickActions[id]);
            });
        }
    });

    // Home page hero buttons
    document.getElementById('continueLearningBtn')?.addEventListener('click', function() {
        navigateTo('page4');
    });
    document.getElementById('browseCoursesBtn')?.addEventListener('click', function() {
        navigateTo('page3');
    });

    // ============================================================
    // PART 14 — AI CHAT MODULE
    // ============================================================
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatClearBtn = document.getElementById('chatClearBtn');
    const chatVoiceBtn = document.getElementById('chatVoiceBtn');

    if (chatSendBtn && chatInput && chatMessages) {
        chatSendBtn.addEventListener('click', function() {
            const msg = chatInput.value.trim();
            if (!msg) return;
            const userMsg = document.createElement('div');
            userMsg.className = 'message user';
            userMsg.textContent = msg;
            chatMessages.appendChild(userMsg);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const aiMsg = document.createElement('div');
                aiMsg.className = 'message ai';
                const responses = [
                    "That's a great question! Let me think about it...",
                    "I understand. Here's what I can help you with.",
                    "Good point! Let me explain it step by step.",
                    "Excellent! You're on the right track."
                ];
                aiMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
                chatMessages.appendChild(aiMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') chatSendBtn.click();
        });
    }

    if (chatClearBtn && chatMessages) {
        chatClearBtn.addEventListener('click', function() {
            chatMessages.innerHTML = '';
            const welcome = document.createElement('div');
            welcome.className = 'message ai';
            welcome.textContent = 'Hello! How can I assist you today?';
            chatMessages.appendChild(welcome);
            showToast('Chat cleared', 'info');
        });
    }

    if (chatVoiceBtn) {
        chatVoiceBtn.addEventListener('click', function() {
            showToast('🎤 Voice input activated (demo)', 'info');
        });
    }

    // Prompt suggestion buttons
    document.getElementById('promptClosure')?.addEventListener('click', function() {
        if (chatInput) chatInput.value = 'Explain closures';
        chatSendBtn?.click();
    });
    document.getElementById('promptHoisting')?.addEventListener('click', function() {
        if (chatInput) chatInput.value = 'What is hoisting?';
        chatSendBtn?.click();
    });
    document.getElementById('promptAsync')?.addEventListener('click', function() {
        if (chatInput) chatInput.value = 'Help with async/await';
        chatSendBtn?.click();
    });
   

    // ============================================================
// PART 15 — SCALEFLOW AUTHENTICATION (FIXED)
// ============================================================

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzlBu8WiCFSyszAa0gB8Uj-YibclzKlo1Hhd5eBYULcayQIuS9YdNEIFLV68GHMY6x5/exec";


// ================= LOGIN =================

document.getElementById("loginForm")?.addEventListener("submit", async function(e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        showToast("⚠️ Please enter Email and Password", "warning");
        return;
    }

    try {

        showToast("🔄 Checking account...", "info");

        const res = await fetch(
            `${WEB_APP_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        );

        const data = await res.json();

        if (data.status === "success") {

            localStorage.setItem("studentLoggedIn", "true");
            localStorage.setItem("studentName", data.fullName);
            localStorage.setItem("studentEmail", email);

            showToast("✅ Login Successful", "success");

            setTimeout(() => {
                location.reload();
            }, 1000);

        } else {

            showToast(data.message || "❌ Invalid Email or Password", "error");

        }

    } catch (err) {

        console.error(err);
        showToast("❌ Server Connection Error", "error");

    }

});


// ================= REGISTER =================

document.getElementById("registerLink")?.addEventListener("click", async function(e){

    ...
});
     

    // ============================================================
    // PART 16 — PROFILE EDIT MODAL
    // ============================================================
    document.getElementById('editProfileBtn')?.addEventListener('click', function() {
        openModal('✏️ Edit Profile', `
            <form id="profileEditForm">
                <div class="form-group mb-3">
                    <label>Full Name</label>
                    <input type="text" id="editName" class="w-full form-control" value="Sanaullah">
                </div>
                <div class="form-group mb-3">
                    <label>Email</label>
                    <input type="email" id="editEmail" class="w-full form-control" value="sanaullah@scaleflow.com">
                </div>
                <button type="submit" class="btn-primary w-full">Save Changes</button>
            </form>
        `);

        document.getElementById('profileEditForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('✅ Profile updated!', 'success');
            closeModal();
        });
    });

    // ============================================================
    // PART 17 — NOTIFICATION PANEL TOGGLE & MARK READ
    // ============================================================
    notificationBell?.addEventListener('click', function() {
        if (notificationPanel) {
            notificationPanel.classList.toggle('open');
        }
    });

    markAllReadBtn?.addEventListener('click', function() {
        document.querySelectorAll('.notification-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        if (notificationCount) notificationCount.textContent = '0';
        showToast('✅ All notifications marked as read.', 'success');
    });

    // ============================================================
    // PART 18 — COURSE FILTERS & SEARCH (PAGE 3)
    // ============================================================
    const filterButtons = document.querySelectorAll('.filter-buttons .btn-secondary, .filter-buttons .btn-primary');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.textContent.trim().toLowerCase();
            const cards = document.querySelectorAll('#courseGrid .course-card');
            cards.forEach(card => {
                const difficulty = card.dataset.difficulty || '';
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = difficulty === filter ? 'block' : 'none';
                }
            });
        });
    });

    document.getElementById('courseSearchInput')?.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('#courseGrid .course-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    });

    // ============================================================
    // PART 19 — MARKETPLACE CART & BUSINESS HUBS (DEMO)
    // ============================================================
    let cartCount = 0;
    document.querySelectorAll('.product-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            cartCount++;
            const cartBtn = document.getElementById('marketplaceCart');
            if (cartBtn) cartBtn.textContent = `🛒 Cart (${cartCount})`;
            showToast('🛒 Item added to cart!', 'success');
        });
    });

    document.getElementById('marketplaceCart')?.addEventListener('click', function() {
        showToast(`🛒 You have ${cartCount} items in your cart.`, 'info');
    });

    document.getElementById('marketplaceCheckout')?.addEventListener('click', function() {
        if (cartCount === 0) {
            showToast('⚠️ Your cart is empty.', 'warning');
        } else {
            showToast('✅ Checkout successful! Thank you for your purchase.', 'success');
            cartCount = 0;
            const cartBtn = document.getElementById('marketplaceCart');
            if (cartBtn) cartBtn.textContent = '🛒 Cart (0)';
        }
    });

    document.querySelectorAll('.business-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.business-card');
            const title = card?.querySelector('h3')?.textContent || 'Business';
            showToast(`📂 Opening ${title}... (Demo)`, 'info');
        });
    });

    // ============================================================
    // PART 20 — SETTINGS BACKUP, PASSWORD, 2FA & BOOT STARTUP
    // ============================================================
    document.getElementById('settingsBackupBtn')?.addEventListener('click', function() {
        showToast('💾 Backup initiated. Your data will be saved.', 'info');
    });
    document.getElementById('settingsChangePassword')?.addEventListener('click', function() {
        showToast('🔐 Password change form will open.', 'info');
    });
    document.getElementById('settingsEnable2FA')?.addEventListener('click', function() {
        showToast('📱 Two-factor authentication enabled.', 'success');
    });

    // ===== GLOBAL EXPOSE =====
    global.ScaleFlow = {
        showToast,
        openModal,
        closeModal,
        navigateTo,
        toggleDarkMode,
        hideLoader,
        updateDashboardStats
    };

    // ===== BOOT STARTUP =====
    document.addEventListener("DOMContentLoaded", function () {
        console.log("🚀 DOM Loaded");
        try {
            navigateTo("page1");
            updateDashboardStats();
            showToast("🎓 Welcome to ScaleFlow University", "success");
        } catch (error) {
            console.error("Startup Error:", error);
        }

        setTimeout(function () {
            try {
                hideLoader();
            } catch (error) {
                console.error("Loader Error:", error);
                if (loader) loader.style.display = "none";
            }
        }, 300);

        console.log("✅ ScaleFlow University JavaScript complete and running!");
    });

})(window);

/* =========================================
   EDUCATION HOME
   ========================================= */

function searchEducation() {

    const input = document.getElementById("educationSearchInput");
    const results = document.getElementById("educationSearchResults");

    if (!input || !results) {
        return;
    }

    const searchText = input.value.trim().toLowerCase();

    results.innerHTML = "";

    if (!searchText) {
        return;
    }

    const educationCards = document.querySelectorAll(".education-card");

    let found = 0;

    educationCards.forEach(function(card) {

        const text = card.innerText.toLowerCase();

        if (text.includes(searchText)) {

            const result = card.cloneNode(true);

            results.appendChild(result);

            found++;

        }

    });

    if (found === 0) {

        results.innerHTML =
            "<p>❌ No related education found.</p>";

    }

}


/* =========================================
   SEARCH BUTTON
   ========================================= */

function setupEducationSearch() {

    const button =
        document.getElementById("educationSearchBtn");

    const input =
        document.getElementById("educationSearchInput");

    if (!button || !input) {
        return;
    }

    button.addEventListener("click", function() {

        searchEducation();

    });

    input.addEventListener("keyup", function(event) {

        if (event.key === "Enter") {

            searchEducation();

        }

    });

}


/* =========================================
   EDUCATION HOME START
   ========================================= */

function startEducationHome() {

    setupEducationSearch();

}


/* =========================================
   START
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

    startEducationHome();

});

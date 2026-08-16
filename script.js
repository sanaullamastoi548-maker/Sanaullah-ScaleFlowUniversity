// ============================================================
// SCALEFLOW UNIVERSITY — FRONTEND JAVASCRIPT (PARTS 1 TO 20)
// ============================================================

(function(global) {

// ============================================================
// PART 1 — DOM REFERENCES & PAGE REGISTRY & NAVIGATION
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

const globalSearchInput = document.getElementById("globalSearchInput");
const navLinks = document.querySelectorAll(".sidebar-menu a[data-page]");

const pageSections = {};

for (let i = 1; i <= 20; i++) {
    const pageId = "page" + i;
    const section = document.getElementById(pageId);
    if (section) {
        pageSections[pageId] = section;
    }
}

function navigateTo(pageId) {
    try {
        Object.keys(pageSections).forEach(id => {
            if (pageSections[id]) {
                pageSections[id].classList.remove("active");
            }
        });

        if (pageSections[pageId]) {
            pageSections[pageId].classList.add("active");
        }

        navLinks.forEach(link => {
            if (link.getAttribute("data-page") === pageId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
        console.log("📄 Navigated to:", pageId);
    } catch (error) {
        console.error("❌ Navigation Error:", error);
    }
}

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const pageId = this.getAttribute("data-page");
        if (pageId) {
            navigateTo(pageId);
        }
    });
});

console.log("✅ ScaleFlow Part 1 loaded successfully.");


// ============================================================
// PART 2 — TOAST NOTIFICATION SYSTEM
// ============================================================

function showToast(message, type = "info") {
    try {
        if (!toastContainer) {
            console.log("🔔 Toast:", message);
            return;
        }

        const toast = document.createElement("div");
        toast.className = "toast toast-" + type;
        toast.textContent = message;
        toast.setAttribute("role", "alert");
        toastContainer.appendChild(toast);

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
        console.error("❌ Toast Error:", error);
    }
}


// ============================================================
// PART 3 — LOADER & PAGE READY HANDLER
// ============================================================

function hideLoader() {
    try {
        const loaderElement = document.getElementById("loader");
        if (!loaderElement) return;

        if (loaderElement.classList.contains("hidden") || loaderElement.style.display === "none") {
            return;
        }

        loaderElement.classList.add("hidden");
        setTimeout(function () {
            try {
                loaderElement.style.display = "none";
                loaderElement.setAttribute("aria-hidden", "true");
            } catch (error) {
                console.error("❌ Loader hide error:", error);
            }
        }, 300);
    } catch (error) {
        console.error("❌ Loader System Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    hideLoader();
});

window.addEventListener("load", function () {
    hideLoader();
});


// ============================================================
// PART 4 — MODAL SYSTEM (SAFE & STABLE)
// ============================================================

function openModal(title, bodyHTML, options = {}) {
    try {
        if (modalTitle) modalTitle.textContent = title || "Modal";
        if (modalBody) modalBody.innerHTML = bodyHTML || "No content available.";
        if (modalContainer) {
            modalContainer.classList.add("open");
            modalContainer.setAttribute("aria-hidden", "false");
        }
        document.body.style.overflow = "hidden";
        if (options && typeof options.onOpen === "function") {
            options.onOpen();
        }
    } catch (error) {
        console.error("❌ Modal Open Error:", error);
    }
}

function closeModal() {
    try {
        if (modalContainer) {
            modalContainer.classList.remove("open");
            modalContainer.setAttribute("aria-hidden", "true");
        }
        document.body.style.overflow = "";
    } catch (error) {
        console.error("❌ Modal Close Error:", error);
    }
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (modalCancelBtn) modalCancelBtn.addEventListener("click", closeModal);
if (modalConfirmBtn) {
    modalConfirmBtn.addEventListener("click", function () {
        showToast("✅ Confirmed!", "success");
        closeModal();
    });
}

if (modalContainer) {
    modalContainer.addEventListener("click", function (event) {
        if (event.target === modalContainer) closeModal();
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modalContainer && modalContainer.classList.contains("open")) {
        closeModal();
    }
});


// ============================================================
// PART 5 — APP LAYOUT & DARK MODE TOGGLE
// ============================================================

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    showToast(isDark ? "🌙 Dark Mode Enabled" : "☀️ Light Mode Enabled", "info");
}

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", toggleDarkMode);
}


// ============================================================
// PART 6 — NOTIFICATION PANEL & BADGE
// ============================================================

if (notificationBell && notificationPanel) {
    notificationBell.addEventListener("click", function(e) {
        e.stopPropagation();
        notificationPanel.classList.toggle("open");
    });

    document.addEventListener("click", function(e) {
        if (!notificationPanel.contains(e.target) && e.target !== notificationBell) {
            notificationPanel.classList.remove("open");
        }
    });
}

if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", function() {
        if (notificationCount) notificationCount.style.display = "none";
        showToast("All notifications marked as read", "success");
    });
}


// ============================================================
// PART 7 — SIDEBAR UTILS & FOOTER YEAR
// ============================================================

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// ============================================================
// PART 8 — GLOBAL SEARCH SYSTEM
// ============================================================

if (globalSearchInput) {
    globalSearchInput.addEventListener("input", function() {
        const query = this.value.toLowerCase().trim();
        if (!query) return;
        console.log("Searching globally for:", query);
    });
}


// ============================================================
// PART 9 — HERO SECTION ACTIONS
// ============================================================

const exploreCoursesBtn = document.getElementById("exploreCoursesBtn");
if (exploreCoursesBtn) {
    exploreCoursesBtn.addEventListener("click", function() {
        navigateTo("page2");
    });
}


// ============================================================
// PART 10 — BUTTONS & INTERACTIONS
// ============================================================

document.querySelectorAll(".btn-primary, .btn-secondary").forEach(btn => {
    // General click effects
});


// ============================================================
// PART 11 — CONTINUE LEARNING PROGRESS
// ============================================================

const continueProgressBtn = document.getElementById("continueProgressBtn");
const continueProgress = document.getElementById("continueProgress");
const progressText = document.getElementById("progressText");

function updateContinueLearningProgress(value) {
    if (!continueProgress) return 0;
    let progress = Number(value);
    if (!Number.isFinite(progress)) progress = 0;
    progress = Math.max(0, Math.min(100, progress));

    continueProgress.style.width = progress + "%";
    continueProgress.setAttribute("aria-valuenow", String(progress));

    if (progressText) {
        progressText.textContent = progress + "% Complete";
    }
    return progress;
}

if (continueProgressBtn) {
    continueProgressBtn.addEventListener("click", function () {
        const currentWidth = continueProgress ? parseFloat(continueProgress.style.width) : 65;
        let currentProgress = Number.isFinite(currentWidth) ? currentWidth : 65;

        if (currentProgress >= 100) {
            updateContinueLearningProgress(100);
            showToast("🎉 Course Completed Successfully!", "success");
            return;
        }

        currentProgress += 5;
        if (currentProgress > 100) currentProgress = 100;

        const updatedProgress = updateContinueLearningProgress(currentProgress);

        if (updatedProgress >= 100) {
            showToast("🎉 Course Completed Successfully!", "success");
        } else {
            showToast("📈 Learning Progress Updated (" + updatedProgress + "%)", "info");
        }
    });
}

if (continueProgress) {
    updateContinueLearningProgress(65);
}


// ============================================================
// PART 12 — DASHBOARD STATS & METRICS
// ============================================================

function updateDashboardStats() {
    const statElements = document.querySelectorAll(".stat-box strong, .dashboard-box span");
    statElements.forEach(el => {
        // Safe update placeholder
    });
}


// ============================================================
// PART 12D — LOGIN & REGISTRATION FRONTEND BRIDGE
// ============================================================

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");

const loginSection = document.getElementById("loginSection");
const registrationSection = document.getElementById("registrationSection");
const registerLink = document.getElementById("registerLink");
const backToLoginLink = document.getElementById("backToLoginLink");
const registrationForm = document.getElementById("registrationForm");
const registerSubmitBtn = document.getElementById("registerSubmitBtn");

if (registerLink) {
    registerLink.addEventListener("click", function(event) {
        event.preventDefault();
        if (loginSection) loginSection.style.display = "none";
        if (registrationSection) registrationSection.style.display = "block";
    });
}

if (backToLoginLink) {
    backToLoginLink.addEventListener("click", function(event) {
        event.preventDefault();
        if (registrationSection) registrationSection.style.display = "none";
        if (loginSection) loginSection.style.display = "block";
    });
}

// Login Event Listener (Connected via google.script.run to Backend Apps Script)
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = loginEmail ? loginEmail.value.trim() : "";
        const password = loginPassword ? loginPassword.value : "";

        if (!email || !password) {
            showToast("⚠️ Please enter Email and Password.", "warning");
            return;
        }

        if (loginSubmitBtn) {
            loginSubmitBtn.disabled = true;
            loginSubmitBtn.textContent = "Signing In...";
            loginSubmitBtn.style.opacity = "0.7";
        }

        // Calling Google Apps Script backend function safely
        if (typeof google !== "undefined" && google.script && google.script.run) {
            google.script.run
                .withSuccessHandler(function(result) {
                    if (loginSubmitBtn) {
                        loginSubmitBtn.disabled = false;
                        loginSubmitBtn.textContent = "Sign In";
                        loginSubmitBtn.style.opacity = "1";
                    }

                    if (!result || !result.success) {
                        showToast("❌ " + (result?.message || "Login failed."), "error");
                        return;
                    }

                    showToast("✅ Welcome, " + result.student.fullName + "!", "success");
                    window.ScaleFlowCurrentStudent = result.student;
                    navigateTo("page1");
                })
                .withFailureHandler(function(error) {
                    if (loginSubmitBtn) {
                        loginSubmitBtn.disabled = false;
                        loginSubmitBtn.textContent = "Sign In";
                        loginSubmitBtn.style.opacity = "1";
                    }
                    console.error("Login backend error:", error);
                    showToast("❌ Login system error.", "error");
                })
                .loginStudent(email, password);
        } else {
            // Local fallback simulation if tested outside Google Apps Script environment
            setTimeout(() => {
                if (loginSubmitBtn) {
                    loginSubmitBtn.disabled = false;
                    loginSubmitBtn.textContent = "Sign In";
                    loginSubmitBtn.style.opacity = "1";
                }
                showToast("✅ Mock Login Successful!", "success");
                navigateTo("page1");
            }, 1000);
        }
    });
}

// Registration Event Listener
if (registrationForm) {
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("registerFullName")?.value.trim() || "";
        const email = document.getElementById("registerEmail")?.value.trim() || "";
        const password = document.getElementById("registerPassword")?.value || "";
        const confirmPassword = document.getElementById("registerConfirmPassword")?.value || "";
        const terms = document.getElementById("registerTerms");

        if (!fullName || !email) {
            showToast("⚠️ Please fill in all required fields.", "warning");
            return;
        }
        if (password.length < 8) {
            showToast("⚠️ Password must contain at least 8 characters.", "warning");
            return;
        }
        if (password !== confirmPassword) {
            showToast("⚠️ Passwords do not match.", "warning");
            return;
        }
        if (!terms || !terms.checked) {
            showToast("⚠️ Please accept the Terms and Conditions.", "warning");
            return;
        }

        if (registerSubmitBtn) {
            registerSubmitBtn.disabled = true;
            registerSubmitBtn.textContent = "Creating Account...";
            registerSubmitBtn.style.opacity = "0.7";
        }

        if (typeof google !== "undefined" && google.script && google.script.run) {
            google.script.run
                .withSuccessHandler(function(result) {
                    if (registerSubmitBtn) {
                        registerSubmitBtn.disabled = false;
                        registerSubmitBtn.textContent = "Create Account";
                        registerSubmitBtn.style.opacity = "1";
                    }

                    if (!result || !result.success) {
                        showToast("❌ " + (result?.message || "Registration failed."), "error");
                        return;
                    }

                    showToast("🎉 Account created successfully!", "success");
                    registrationForm.reset();
                    if (registrationSection) registrationSection.style.display = "none";
                    if (loginSection) loginSection.style.display = "block";
                    if (loginEmail) loginEmail.value = result.email;
                })
                .withFailureHandler(function(error) {
                    if (registerSubmitBtn) {
                        registerSubmitBtn.disabled = false;
                        registerSubmitBtn.textContent = "Create Account";
                        registerSubmitBtn.style.opacity = "1";
                    }
                    console.error("Registration backend error:", error);
                    showToast("❌ Registration system error.", "error");
                })
                .registerStudent({ fullName, email, password, confirmPassword });
        } else {
            setTimeout(() => {
                if (registerSubmitBtn) {
                    registerSubmitBtn.disabled = false;
                    registerSubmitBtn.textContent = "Create Account";
                    registerSubmitBtn.style.opacity = "1";
                }
                showToast("🎉 Mock Account Created!", "success");
                if (registrationSection) registrationSection.style.display = "none";
                if (loginSection) loginSection.style.display = "block";
            }, 1000);
        }
    });
}


// ============================================================
// PART 13 — QUICK ACTIONS
// ============================================================

document.querySelectorAll(".quick-action-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        const label = this.querySelector(".label")?.textContent || "Action";
        showToast("🚀 Triggered: " + label, "info");
    });
});


// ============================================================
// PART 14 — AI CHAT MODULE
// ============================================================

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatClearBtn = document.getElementById('chatClearBtn');
const chatVoiceBtn = document.getElementById('chatVoiceBtn');

function sendChatMessage() {
    if (!chatMessages || !chatInput) return;
    const msg = chatInput.value.trim();
    if (!msg) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = msg;
    chatMessages.appendChild(userMsg);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(function () {
        if (!chatMessages) return;
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.textContent = "That's a great question! Let me help you with ScaleFlow AI.";
        chatMessages.appendChild(aiMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
}

if (chatSendBtn) chatSendBtn.addEventListener('click', sendChatMessage);
if (chatInput) {
    chatInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendChatMessage();
        }
    });
}

if (chatClearBtn) {
    chatClearBtn.addEventListener('click', function () {
        if (!chatMessages) return;
        chatMessages.innerHTML = '';
        const welcome = document.createElement('div');
        welcome.className = 'message ai';
        welcome.textContent = 'Hello! How can I assist you today?';
        chatMessages.appendChild(welcome);
        showToast('Chat cleared', 'info');
    });
}

if (chatVoiceBtn) {
    chatVoiceBtn.addEventListener('click', function () {
        showToast('🎤 Voice input activated (demo)', 'info');
    });
}


// ============================================================
// PART 15 — SCALEFLOW AUTHENTICATION EXTRA HANDLER
// ============================================================

document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    // Extra secure handler validation placeholder
});


// ============================================================
// PART 16 — COURSES & FILTERS
// ============================================================

document.querySelectorAll(".filter-buttons button").forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".filter-buttons button").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        showToast("📁 Filter applied", "info");
    });
});


// ============================================================
// PART 17 — ACHIEVEMENTS & PROGRESS TIMELINE
// ============================================================

document.querySelectorAll(".achievement-card").forEach(card => {
    card.addEventListener("click", function() {
        if (this.classList.contains("locked")) {
            showToast("🔒 Complete previous milestones to unlock!", "warning");
        } else {
            showToast("🏆 Achievement unlocked!", "success");
        }
    });
});


// ============================================================
// PART 18 — MARKETPLACE & BUSINESS HUBS
// ============================================================

document.querySelectorAll('.business-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.business-card');
        const title = card?.querySelector('h3')?.textContent || 'Business';
        showToast(`📂 Opening ${title}... (Demo)`, 'info');
    });
});


// ============================================================
// PART 19 — MARKETPLACE CART SYSTEM
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


// ============================================================
// PART 20 — SETTINGS, GLOBAL APP & SAFE BOOT STARTUP
// ============================================================

document.getElementById("settingsBackupBtn")?.addEventListener("click", function () {
    showToast("💾 Backup system is ready.", "info");
});

document.getElementById("settingsChangePassword")?.addEventListener("click", function () {
    showToast("🔐 Password change interface is ready.", "info");
});

document.getElementById("settingsEnable2FA")?.addEventListener("click", function () {
    showToast("📱 2FA interface is ready.", "info");
});

global.ScaleFlow = {
    showToast: showToast,
    openModal: openModal,
    closeModal: closeModal,
    navigateTo: navigateTo,
    toggleDarkMode: toggleDarkMode,
    hideLoader: hideLoader,
    updateDashboardStats: updateDashboardStats,
    updateContinueLearningProgress: updateContinueLearningProgress
};

function startScaleFlowApp() {
    console.log("🚀 ScaleFlow University starting...");
    try {
        navigateTo("page1");
    } catch (error) {
        console.error("Navigation startup error:", error);
    }
    try {
        updateDashboardStats();
    } catch (error) {
        console.error("Dashboard startup error:", error);
    }
    try {
        showToast("🎓 Welcome to ScaleFlow University", "success");
    } catch (error) {
        console.error("Welcome message error:", error);
    }
    console.log("✅ ScaleFlow University frontend is running.");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startScaleFlowApp);
} else {
    startScaleFlowApp();
}

setTimeout(function () {
    try {
        hideLoader();
    } catch (error) {
        const safeLoader = document.getElementById("loader");
        if (safeLoader) safeLoader.style.display = "none";
    }
}, 1000);

console.log("✅ ScaleFlow University JavaScript initialized successfully for all 20 Sections.");

})(window);

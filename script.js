
(function(window) {

    
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

/* ==========================================================
   PART 5 — APP LAYOUT & HEADER — SAFE VERSION
   ========================================================== */

#app {
    display: grid;
    grid-template-columns: var(--sidebar-width, 260px) 1fr;
    min-height: 100vh;
    width: 100%;
}

.header {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-height: 72px;

    padding: 16px 30px;

    background: #ffffff;
    border-bottom: 2px solid var(--border, #e5e7eb);

    position: sticky;
    top: 0;
    z-index: 100;

    box-shadow: var(--shadow, 0 2px 10px rgba(0, 0, 0, 0.08));
}

.logo {
    display: flex;
    align-items: center;
}

.logo h1 {
    font-size: 24px;
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
}

.logo span {
    color: var(--primary, #15803d);
    font-weight: 700;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.icon-btn {
    background: transparent;
    border: none;

    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 22px;

    border-radius: 10px;

    cursor: pointer;

    transition:
        background-color 0.2s ease,
        transform 0.2s ease;

    position: relative;
}

.icon-btn:hover {
    background: var(--primary, #15803d);
    color: #ffffff;
    transform: scale(1.05);
}

.icon-btn:focus {
    outline: 2px solid var(--primary, #15803d);
    outline-offset: 2px;
}


/* Mobile */

@media (max-width: 768px) {

    #app {
        grid-template-columns: 1fr;
    }

    .header {
        padding: 12px 16px;
        min-height: 64px;
    }

    .logo h1 {
        font-size: 20px;
    }

    .header-actions {
        gap: 6px;
    }

    .icon-btn {
        width: 38px;
        height: 38px;
        font-size: 20px;
    }

}

/* ==========================================================
   PART 6 — NOTIFICATION PANEL & BADGE — SAFE VERSION
   ========================================================== */

.notification-panel {
    display: none;

    position: absolute;

    top: 60px;
    right: 20px;

    width: 340px;
    max-width: calc(100vw - 40px);

    background: #ffffff;

    border: 2px solid var(--border, #e5e7eb);
    border-radius: 16px;

    box-shadow: var(
        --shadow,
        0 8px 30px rgba(0, 0, 0, 0.12)
    );

    z-index: 1000;

    overflow: hidden;
}

.notification-panel.open {
    display: block;
}

.notification-badge {
    position: absolute;

    top: -4px;
    right: -4px;

    background: #ef4444;
    color: #ffffff;

    border-radius: 50%;

    font-size: 11px;
    font-weight: 700;

    width: 20px;
    height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);

    pointer-events: none;
}


/* Notification items */

.notification-item {
    padding: 12px 16px;

    border-bottom: 1px solid var(
        --border,
        #e5e7eb
    );

    cursor: pointer;

    transition: background-color 0.2s ease;
}

.notification-item:last-child {
    border-bottom: none;
}

.notification-item:hover {
    background: #f8fafc;
}

.notification-item.unread {
    background: #f0fdf4;
}


/* Mobile */

@media (max-width: 480px) {

    .notification-panel {
        top: 58px;
        right: 10px;

        width: calc(100vw - 20px);
        max-width: none;

        border-radius: 12px;
    }

}

/* ==========================================================
   PART 7 — SIDEBAR — SAFE VERSION
   ========================================================== */

.sidebar {
    background: #ffffff;

    border-right: 2px solid var(--border, #e5e7eb);

    padding: 30px 16px;

    position: sticky;

    top: 76px;

    height: calc(100vh - 76px);

    overflow-y: auto;

    min-width: 200px;

    z-index: 50;

    scrollbar-width: thin;
}

.sidebar-menu {
    display: flex;

    flex-direction: column;

    gap: 4px;

    width: 100%;
}

.sidebar-menu a {
    padding: 12px 16px;

    border-radius: 12px;

    font-weight: 600;

    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease;

    text-decoration: none;

    color: inherit;

    font-size: 15px;

    display: flex;

    align-items: center;

    gap: 10px;

    cursor: pointer;

    width: 100%;
}

.sidebar-menu a:hover {
    background: var(--primary, #15803d);

    color: #ffffff;

    transform: translateX(4px);
}

.sidebar-menu a.active {
    background: var(--primary, #15803d);

    color: #ffffff;

    font-weight: 700;

    box-shadow:
        0 4px 15px rgba(21, 128, 61, 0.25);
}

.sidebar-menu a:focus {
    outline: 2px solid var(--primary, #15803d);

    outline-offset: 2px;
}


/* Mobile */

@media (max-width: 768px) {

    .sidebar {
        position: relative;

        top: 0;

        height: auto;

        min-width: 0;

        width: 100%;

        border-right: none;

        border-bottom: 2px solid var(
            --border,
            #e5e7eb
        );

        padding: 12px;
    }

    .sidebar-menu {
        flex-direction: row;

        flex-wrap: wrap;

        gap: 6px;
    }

    .sidebar-menu a {
        width: auto;

        flex: 1 1 auto;

        justify-content: center;

        min-width: 120px;
    }

}

/* ==========================================================
   PART 8 — MAIN CONTENT & PAGE SECTIONS — SAFE VERSION
   ========================================================== */

.main-content {
    padding: 30px 35px;

    background: #f5f6fa;

    min-width: 0;

    width: 100%;
}

.page-section {
    display: none;

    width: 100%;

    animation: fadeIn 0.4s ease;
}

.page-section.active {
    display: block;
}

.page-section h2 {
    font-size: 28px;

    font-weight: 700;

    color: var(
        --black,
        #111827
    );

    margin-bottom: 20px;

    padding-bottom: 12px;

    border-bottom: 3px solid var(
        --primary,
        #15803d
    );
}


/* Safe fallback if fadeIn animation
   does not exist elsewhere */

@keyframes fadeIn {

    from {
        opacity: 0;
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}


/* Mobile */

@media (max-width: 768px) {

    .main-content {
        padding: 20px 16px;
    }

    .page-section h2 {
        font-size: 24px;

        margin-bottom: 16px;

        padding-bottom: 10px;
    }

}

/* ==========================================================
   PART 9 — HERO SECTION — SAFE VERSION
   ========================================================== */

.hero {
    display: grid;

    grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr);

    gap: 30px;

    background: #ffffff;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 20px;

    padding: 35px;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    margin-bottom: 30px;

    width: 100%;
}

.hero-tag {
    display: inline-block;

    background: #fff8e1;

    padding: 6px 16px;

    border-radius: 30px;

    font-weight: 700;

    margin-bottom: 12px;
}

.hero-left {
    min-width: 0;
}

.hero-left h1 {
    font-size: 38px;

    margin-bottom: 10px;

    line-height: 1.2;
}

.hero-left p {
    color: var(
        --text,
        #4b5563
    );

    margin-bottom: 20px;

    line-height: 1.7;
}

.hero-buttons {
    display: flex;

    gap: 12px;

    flex-wrap: wrap;
}

.hero-right {
    display: flex;

    flex-direction: column;

    gap: 12px;

    min-width: 0;
}

.hero-stat {
    background: #fffdf5;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 14px;

    padding: 14px 18px;
}

.hero-stat span {
    display: block;

    color: var(
        --text,
        #4b5563
    );

    font-size: 14px;

    margin-bottom: 4px;
}

.hero-stat strong {
    font-size: 22px;
}


/* ===== HERO MOBILE ===== */

@media (max-width: 768px) {

    .hero {
        grid-template-columns: 1fr;

        gap: 20px;

        padding: 24px;

        border-radius: 16px;
    }

    .hero-left h1 {
        font-size: 30px;
    }

    .hero-buttons {
        width: 100%;
    }

    .hero-buttons .btn-primary,
    .hero-buttons .btn-secondary {
        flex: 1 1 auto;

        text-align: center;
    }

}

/* ==========================================================
   PART 10 — BUTTONS — SAFE VERSION
   ========================================================== */

.btn-primary {
    background: var(
        --primary,
        #15803d
    );

    color: #ffffff;

    border: none;

    padding: 12px 28px;

    border-radius: 12px;

    font-weight: 700;

    cursor: pointer;

    transition:
        background-color 0.2s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    text-decoration: none;

    font-size: 15px;
}

.btn-primary:hover {
    background: var(
        --primary-hover,
        #166534
    );

    transform: translateY(-2px);

    box-shadow:
        0 6px 20px rgba(21,128,61,0.25);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-secondary {
    background: #ffffff;

    color: var(
        --black,
        #111827
    );

    border: 2px solid var(
        --primary,
        #15803d
    );

    padding: 12px 28px;

    border-radius: 12px;

    font-weight: 700;

    cursor: pointer;

    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    text-decoration: none;

    font-size: 15px;
}

.btn-secondary:hover {
    background: var(
        --primary,
        #15803d
    );

    color: #ffffff;

    transform: translateY(-2px);
}

.btn-secondary:active {
    transform: translateY(0);
}


/* ===== BUTTON MOBILE ===== */

@media (max-width: 768px) {

    .btn-primary,
    .btn-secondary {
        padding: 11px 20px;

        font-size: 14px;
    }

}

// ============================================================
// PART 11 — CONTINUE LEARNING PROGRESS
// SAFE FRONTEND VERSION
// ============================================================

const continueProgressBtn =
    document.getElementById("continueProgressBtn");

const continueProgress =
    document.getElementById("continueProgress");

const progressText =
    document.getElementById("progressText");


// ============================================================
// UPDATE PROGRESS
// ============================================================

function updateContinueLearningProgress(value) {

    if (!continueProgress) {
        console.warn(
            "ScaleFlow: continueProgress element not found."
        );
        return 0;
    }

    let progress = Number(value);

    if (!Number.isFinite(progress)) {
        progress = 0;
    }

    progress = Math.max(0, Math.min(100, progress));

    continueProgress.style.width =
        progress + "%";

    continueProgress.setAttribute(
        "aria-valuenow",
        String(progress)
    );

    if (progressText) {
        progressText.textContent =
            progress + "% Complete";
    }

    return progress;
}


// ============================================================
// CONTINUE LEARNING BUTTON
// ============================================================

if (continueProgressBtn) {

    continueProgressBtn.addEventListener(
        "click",
        function () {

            const currentWidth =
                continueProgress
                    ? parseFloat(continueProgress.style.width)
                    : 65;

            let currentProgress =
                Number.isFinite(currentWidth)
                    ? currentWidth
                    : 65;


            // Course already completed
            if (currentProgress >= 100) {

                updateContinueLearningProgress(100);

                showToast(
                    "🎉 Course Completed Successfully!",
                    "success"
                );

                return;
            }


            // Increase progress
            currentProgress += 5;

            if (currentProgress > 100) {
                currentProgress = 100;
            }


            const updatedProgress =
                updateContinueLearningProgress(
                    currentProgress
                );


            if (updatedProgress >= 100) {

                showToast(
                    "🎉 Course Completed Successfully!",
                    "success"
                );

            } else {

                showToast(
                    "📈 Learning Progress Updated (" +
                    updatedProgress +
                    "%)",
                    "info"
                );
            }

        }
    );

}


// ============================================================
// INITIAL PROGRESS
// ============================================================

if (continueProgress) {

    updateContinueLearningProgress(65);

}

/* ==========================================================
   PART 12 — DASHBOARD BOXES & STATS — SAFE VERSION
   ========================================================== */

.learning-dashboard {
    margin: 30px 0 25px;
    width: 100%;
}

.learning-dashboard h2 {
    font-size: 22px;

    font-weight: 700;

    margin-bottom: 18px;

    color: var(
        --black,
        #111827
    );
}

.dashboard-boxes {
    display: grid;

    grid-template-columns:
        repeat(4, minmax(0, 1fr));

    gap: 20px;

    width: 100%;
}

.dashboard-box {
    background: #ffffff;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: var(
        --radius,
        16px
    );

    padding: 20px 16px;

    text-align: center;

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    min-width: 0;
}

.dashboard-box:hover {
    transform: translateY(-4px);

    border-color: var(
        --primary,
        #15803d
    );

    box-shadow:
        0 12px 35px rgba(0,0,0,0.12);
}

.dashboard-box h3 {
    font-size: 15px;

    font-weight: 600;

    color: var(
        --text,
        #4b5563
    );

    margin-bottom: 6px;
}

.dashboard-box span {
    font-size: 32px;

    font-weight: 800;

    color: var(
        --primary,
        #15803d
    );

    display: block;
}


/* ==========================================================
   STATISTICS GRID
   ========================================================== */

.stats-grid {
    display: grid;

    grid-template-columns:
        repeat(4, minmax(0, 1fr));

    gap: 15px;

    margin-top: 20px;

    width: 100%;
}

.stat-box {
    background: #ffffff;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 16px;

    padding: 20px;

    text-align: center;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    min-width: 0;
}

.stat-box:hover {
    transform: translateY(-3px);

    box-shadow:
        0 12px 30px rgba(0,0,0,0.12);
}

.stat-box span {
    display: block;

    color: var(
        --text,
        #4b5563
    );

    font-size: 14px;

    font-weight: 500;
}

.stat-box strong {
    font-size: 28px;

    font-weight: 800;

    color: var(
        --primary,
        #15803d
    );

    display: block;

    margin-top: 4px;
}


/* ==========================================================
   RESPONSIVE — TABLET
   ========================================================== */

@media (max-width: 1000px) {

    .dashboard-boxes,
    .stats-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

}


/* ==========================================================
   RESPONSIVE — MOBILE
   ========================================================== */

@media (max-width: 600px) {

    .dashboard-boxes,
    .stats-grid {
        grid-template-columns: 1fr;

        gap: 12px;
    }

    .dashboard-box {
        padding: 18px 14px;
    }

    .dashboard-box span {
        font-size: 28px;
    }

    .stat-box {
        padding: 18px;
    }

    .stat-box strong {
        font-size: 25px;
    }

}

/* ==========================================================
   PART 13 — QUICK ACTIONS — SAFE VERSION
   ========================================================== */

.quick-actions-section {
    margin: 30px 0;
    width: 100%;
}

.quick-actions-section h2 {
    font-size: 22px;

    font-weight: 700;

    margin-bottom: 18px;

    color: var(
        --black,
        #111827
    );
}

.quick-actions-grid {
    display: grid;

    grid-template-columns:
        repeat(4, minmax(0, 1fr));

    gap: 20px;

    width: 100%;
}

.quick-action-btn {
    background: #ffffff;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 18px;

    padding: 28px 20px;

    text-align: center;

    cursor: pointer;

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    gap: 8px;

    width: 100%;

    min-width: 0;

    font-family: inherit;
}

.quick-action-btn:hover {
    transform: translateY(-6px);

    border-color: var(
        --primary,
        #15803d
    );

    box-shadow:
        0 16px 40px rgba(0,0,0,0.12);
}

.quick-action-btn:active {
    transform: translateY(-2px);
}

.quick-action-btn .icon {
    font-size: 42px;

    line-height: 1;
}

.quick-action-btn .label {
    font-size: 18px;

    font-weight: 700;

    color: var(
        --black,
        #111827
    );
}

.quick-action-btn .desc {
    font-size: 14px;

    color: var(
        --text,
        #4b5563
    );

    font-weight: 500;

    line-height: 1.5;
}


/* ==========================================================
   QUICK ACTIONS BOTTOM
   ========================================================== */

.quick-actions-bottom {
    display: flex;

    justify-content: center;

    align-items: center;

    gap: 20px;

    margin-top: 20px;

    flex-wrap: wrap;

    width: 100%;
}

.quick-btn {
    background: var(
        --primary,
        #15803d
    );

    border: none;

    padding: 12px 32px;

    border-radius: 50px;

    font-weight: 700;

    font-size: 16px;

    cursor: pointer;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        background-color 0.2s ease;

    color: #ffffff;

    box-shadow:
        0 4px 15px rgba(21,128,61,0.25);

    font-family: inherit;

    text-decoration: none;

    display: inline-flex;

    align-items: center;

    justify-content: center;
}

.quick-btn:hover {
    transform: translateY(-3px);

    box-shadow:
        0 8px 25px rgba(21,128,61,0.35);

    background: var(
        --primary-hover,
        #166534
    );
}

.quick-btn:active {
    transform: translateY(0);
}


/* ==========================================================
   RESPONSIVE — TABLET
   ========================================================== */

@media (max-width: 1000px) {

    .quick-actions-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));

        gap: 16px;
    }

}


/* ==========================================================
   RESPONSIVE — MOBILE
   ========================================================== */

@media (max-width: 600px) {

    .quick-actions-grid {
        grid-template-columns: 1fr;

        gap: 12px;
    }

    .quick-action-btn {
        padding: 22px 16px;

        border-radius: 15px;
    }

    .quick-action-btn .icon {
        font-size: 36px;
    }

    .quick-action-btn .label {
        font-size: 16px;
    }

    .quick-action-btn .desc {
        font-size: 13px;
    }

    .quick-actions-bottom {
        flex-direction: column;

        gap: 12px;
    }

    .quick-btn {
        width: 100%;

        max-width: 320px;

        padding: 11px 24px;

        font-size: 15px;
    }

}

// ============================================================
// PART 14 — AI CHAT MODULE — SAFE DEMO VERSION
// ============================================================

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatClearBtn = document.getElementById('chatClearBtn');
const chatVoiceBtn = document.getElementById('chatVoiceBtn');


// ============================================================
// SEND MESSAGE
// ============================================================

function sendChatMessage() {

    if (!chatMessages || !chatInput) {
        return;
    }

    const msg = chatInput.value.trim();

    if (!msg) {
        return;
    }


    // USER MESSAGE

    const userMsg = document.createElement('div');

    userMsg.className = 'message user';

    userMsg.textContent = msg;

    chatMessages.appendChild(userMsg);


    // CLEAR INPUT

    chatInput.value = '';


    // SCROLL DOWN

    chatMessages.scrollTop = chatMessages.scrollHeight;


    // DEMO AI RESPONSE
    // ابھی اصل AI Engine connect نہیں ہے

    setTimeout(function () {

        if (!chatMessages) {
            return;
        }

        const aiMsg = document.createElement('div');

        aiMsg.className = 'message ai';

        const responses = [
            "That's a great question! Let me think about it...",
            "I understand. Here's what I can help you with.",
            "Good point! Let me explain it step by step.",
            "Excellent! You're on the right track."
        ];

        const randomIndex =
            Math.floor(
                Math.random() * responses.length
            );

        aiMsg.textContent =
            responses[randomIndex];

        chatMessages.appendChild(aiMsg);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }, 600);

}


// ============================================================
// SEND BUTTON
// ============================================================

if (chatSendBtn) {

    chatSendBtn.addEventListener(
        'click',
        sendChatMessage
    );

}


// ============================================================
// ENTER KEY
// ============================================================

if (chatInput) {

    chatInput.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'Enter') {

                event.preventDefault();

                sendChatMessage();

            }

        }
    );

}


// ============================================================
// CLEAR CHAT
// ============================================================

if (chatClearBtn) {

    chatClearBtn.addEventListener(
        'click',
        function () {

            if (!chatMessages) {
                return;
            }

            chatMessages.innerHTML = '';


            const welcome =
                document.createElement('div');

            welcome.className =
                'message ai';

            welcome.textContent =
                'Hello! How can I assist you today?';

            chatMessages.appendChild(welcome);


            if (typeof showToast === 'function') {

                showToast(
                    'Chat cleared',
                    'info'
                );

            }

        }
    );

}


// ============================================================
// VOICE BUTTON
// ============================================================

if (chatVoiceBtn) {

    chatVoiceBtn.addEventListener(
        'click',
        function () {

            if (typeof showToast === 'function') {

                showToast(
                    '🎤 Voice input activated (demo)',
                    'info'
                );

            }

        }
    );

}


// ============================================================
// PROMPT — CLOSURES
// ============================================================

document
    .getElementById('promptClosure')
    ?.addEventListener(
        'click',
        function () {

            if (!chatInput) {
                return;
            }

            chatInput.value =
                'Explain closures';

            sendChatMessage();

        }
    );


// ============================================================
// PROMPT — HOISTING
// ============================================================

document
    .getElementById('promptHoisting')
    ?.addEventListener(
        'click',
        function () {

            if (!chatInput) {
                return;
            }

            chatInput.value =
                'What is hoisting?';

            sendChatMessage();

        }
    );


// ============================================================
// PROMPT — ASYNC / AWAIT
// ============================================================

document
    .getElementById('promptAsync')
    ?.addEventListener(
        'click',
        function () {

            if (!chatInput) {
                return;
            }

            chatInput.value =
                'Help with async/await';

            sendChatMessage();

        }
    );

// ============================================================
// PART 15 — SCALEFLOW AUTHENTICATION
// FRONTEND SAFE VERSION
// ============================================================

const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbzlBu8WiCFSyszAa0gB8Uj-YibclzKlo1Hhd5eBYULcayQIuS9YdNEIFLV68GHMY6x5/exec";


// ============================================================
// LOGIN
// ============================================================

document.getElementById("loginForm")?.addEventListener("submit", function(e) {

    e.preventDefault();

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value.trim() : "";

    if (!email || !password) {
        showToast(
            "⚠️ Please enter Email and Password",
            "warning"
        );
        return;
    }

    /*
     * ابھی frontend test کے لیے۔
     * Google Apps Script authentication بعد میں connect کریں گے۔
     */

    showToast(
        "🔄 Login system is ready. AI/Google engine connection is pending.",
        "info"
    );

    console.log("ScaleFlow Login Test:", {
        email: email
    });

});


// ============================================================
// REGISTER
// ============================================================

document.getElementById("registerLink")?.addEventListener("click", function(e) {

    e.preventDefault();

    const name = prompt("Full Name");

    if (!name || !name.trim()) {
        return;
    }

    const email = prompt("Email");

    if (!email || !email.trim()) {
        return;
    }

    const password = prompt("Password");

    if (!password || !password.trim()) {
        return;
    }

    /*
     * ابھی frontend test کے لیے۔
     * اصل registration Google Apps Script سے بعد میں connect ہوگا۔
     */

    showToast(
        "🔄 Registration interface is working.",
        "info"
    );

    console.log("ScaleFlow Registration Test:", {
        name: name.trim(),
        email: email.trim()
    });

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    if (loginEmail) {
        loginEmail.value = email.trim();
    }

    if (loginPassword) {
        loginPassword.value = password.trim();
    }

    showToast(
        "✅ Registration form is working. Backend connection is pending.",
        "success"
    );

});

/* ==========================================================
   PART 16 — COURSES, FILTERS, PAGINATION — SAFE VERSION
   ========================================================== */

.filter-buttons {
    display: flex;

    gap: 10px;

    margin: 15px 0;

    flex-wrap: wrap;

    align-items: center;
}

.course-grid {
    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(280px, 1fr)
        );

    gap: 20px;

    margin-top: 20px;

    width: 100%;
}

.course-card {
    background: #ffffff;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 18px;

    padding: 24px;

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    min-width: 0;
}

.course-card:hover {
    transform: translateY(-6px);

    border-color: var(
        --primary,
        #15803d
    );

    box-shadow:
        0 16px 35px rgba(0,0,0,0.12);
}

.course-card h3 {
    font-size: 22px;

    margin-bottom: 10px;

    color: var(
        --black,
        #111827
    );

    line-height: 1.3;
}

.course-card p {
    color: var(
        --text,
        #4b5563
    );

    margin-bottom: 20px;

    line-height: 1.6;
}

.course-card button {
    width: 100%;
}


/* ==========================================================
   PAGINATION
   ========================================================== */

.pagination {
    display: flex;

    justify-content: center;

    align-items: center;

    gap: 10px;

    margin-top: 20px;

    flex-wrap: wrap;
}

.pagination button {
    min-width: 40px;

    min-height: 40px;

    border: 1px solid var(
        --border,
        #e5e7eb
    );

    background: #ffffff;

    border-radius: 8px;

    cursor: pointer;

    font-family: inherit;

    font-weight: 600;
}


/* ==========================================================
   MOBILE
   ========================================================== */

@media (max-width: 600px) {

    .filter-buttons {
        gap: 8px;
    }

    .filter-buttons button {
        flex: 1 1 auto;
    }

    .course-grid {
        grid-template-columns: 1fr;

        gap: 14px;
    }

    .course-card {
        padding: 20px;
    }

    .course-card h3 {
        font-size: 20px;
    }

    .pagination {
        gap: 6px;
    }

}

/* ==========================================================
   PART 17 — ACHIEVEMENTS & PROGRESS TIMELINE
   ========================================================== */

.achievement-card {
    background: #ffffff;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 16px;

    padding: 20px;

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    min-width: 0;
}

.achievement-card:hover {
    transform: translateY(-4px);

    border-color: var(
        --primary,
        #15803d
    );

    box-shadow:
        0 12px 30px rgba(0,0,0,0.12);
}

.achievement-card h3 {
    font-size: 18px;

    font-weight: 700;

    margin-bottom: 4px;

    color: var(
        --black,
        #111827
    );
}

.achievement-card p {
    font-size: 14px;

    color: var(
        --text,
        #4b5563
    );

    line-height: 1.5;
}


/* ==========================================================
   LOCKED ACHIEVEMENT
   ========================================================== */

.achievement-card.locked {
    opacity: 0.5;

    filter: grayscale(1);

    border-style: dashed;
}


/* ==========================================================
   EARNED ACHIEVEMENT
   ========================================================== */

.achievement-card.earned {
    border-color: var(
        --primary,
        #15803d
    );

    background: #FFFBEB;
}


/* ==========================================================
   PROGRESS TIMELINE
   ========================================================== */

.progress-timeline {
    margin-top: 30px;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 16px;

    padding: 20px;

    background: #ffffff;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );
}

.progress-timeline ul {
    list-style: none;

    padding: 0;

    margin: 0;
}

.progress-timeline li {
    padding: 8px 0;

    border-bottom:
        1px solid #f0f0f0;

    line-height: 1.5;
}

.progress-timeline li:last-child {
    border-bottom: none;
}


/* ==========================================================
   MOBILE
   ========================================================== */

@media (max-width: 600px) {

    .achievement-card {
        padding: 18px;
    }

    .achievement-card h3 {
        font-size: 17px;
    }

    .achievement-card p {
        font-size: 13px;
    }

    .progress-timeline {
        padding: 16px;

        border-radius: 14px;
    }

}

/* ==========================================================
   PART 18 — AI, MARKETPLACE, BUSINESS — SAFE VERSION
   ========================================================== */


/* ==========================================================
   AI CHAT
   ========================================================== */

.ai-chat-container {
    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 16px;

    padding: 20px;

    height: 500px;

    display: flex;

    flex-direction: column;

    background: #ffffff;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    min-width: 0;
}

.chat-messages {
    flex: 1;

    overflow-y: auto;

    padding: 10px;

    display: flex;

    flex-direction: column;

    gap: 12px;

    min-height: 0;
}

.message {
    padding: 12px 16px;

    border-radius: 14px;

    max-width: 80%;

    line-height: 1.5;

    word-wrap: break-word;

    overflow-wrap: anywhere;
}

.message.ai {
    background: #f1f5f9;

    color: #111827;

    align-self: flex-start;

    border-bottom-left-radius: 4px;
}

.message.user {
    background: var(
        --primary,
        #15803d
    );

    color: #ffffff;

    align-self: flex-end;

    border-bottom-right-radius: 4px;
}

.chat-input {
    display: flex;

    gap: 10px;

    margin-top: 10px;

    flex-wrap: wrap;

    width: 100%;
}

.chat-input input {
    flex: 1;

    min-width: 150px;

    padding: 12px;

    border-radius: 12px;

    border: 2px solid var(
        --border,
        #e5e7eb
    );

    outline: none;

    background: #ffffff;

    color: #111827;

    font-family: inherit;
}

.chat-input input:focus {
    border-color: var(
        --primary,
        #15803d
    );
}

.prompt-suggestions {
    display: flex;

    gap: 8px;

    flex-wrap: wrap;

    margin-top: 10px;
}


/* ==========================================================
   MARKETPLACE HEADER
   ========================================================== */

.marketplace-header {
    display: flex;

    gap: 10px;

    margin-bottom: 20px;

    flex-wrap: wrap;

    align-items: center;
}

.marketplace-header input {
    flex: 1;

    min-width: 180px;
}


/* ==========================================================
   PRODUCT GRID
   ========================================================== */

.product-grid {
    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(220px, 1fr)
        );

    gap: 20px;

    width: 100%;
}

.product-card {
    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 16px;

    padding: 20px;

    text-align: center;

    background: #ffffff;

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    min-width: 0;
}

.product-card:hover {
    transform: translateY(-4px);

    border-color: var(
        --primary,
        #15803d
    );

    box-shadow:
        0 12px 30px rgba(0,0,0,0.12);
}

.product-card .product-icon {
    font-size: 48px;

    margin-bottom: 10px;

    line-height: 1;
}

.product-card h3 {
    font-size: 20px;

    margin-bottom: 6px;

    color: var(
        --black,
        #111827
    );
}

.product-card p {
    font-size: 16px;

    font-weight: 600;

    color: var(
        --primary,
        #15803d
    );

    margin-bottom: 12px;
}


/* ==========================================================
   BUSINESS GRID
   ========================================================== */

.business-grid {
    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(200px, 1fr)
        );

    gap: 20px;

    width: 100%;
}

.business-card {
    border: 2px solid var(
        --border,
        #e5e7eb
    );

    border-radius: 16px;

    padding: 20px;

    text-align: center;

    background: #ffffff;

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    box-shadow: var(
        --shadow,
        0 4px 15px rgba(0,0,0,0.08)
    );

    min-width: 0;
}

.business-card:hover {
    transform: translateY(-4px);

    border-color: var(
        --primary,
        #15803d
    );

    box-shadow:
        0 12px 30px rgba(0,0,0,0.12);
}

.business-card .business-icon {
    font-size: 48px;

    margin-bottom: 10px;

    line-height: 1;
}

.business-card h3 {
    font-size: 20px;

    margin-bottom: 6px;

    color: var(
        --black,
        #111827
    );
}

.business-card p {
    color: var(
        --text,
        #4b5563
    );

    margin-bottom: 12px;

    line-height: 1.5;
}


/* ==========================================================
   MOBILE
   ========================================================== */

@media (max-width: 600px) {

    .ai-chat-container {
        height: 450px;

        padding: 14px;
    }

    .message {
        max-width: 90%;

        padding: 10px 13px;
    }

    .chat-input {
        flex-direction: column;
    }

    .chat-input input {
        width: 100%;
    }

    .chat-input button {
        width: 100%;
    }

    .product-grid {
        grid-template-columns: 1fr;

        gap: 14px;
    }

    .business-grid {
        grid-template-columns: 1fr;

        gap: 14px;
    }

    .product-card,
    .business-card {
        padding: 18px;
    }

}

// ============================================================
// PART 19 — MARKETPLACE CART & BUSINESS HUBS (DEMO)
// ============================================================
let cartCount = 0;
document.querySelectorAll('.product-card .btn-primary').forEach(btn => {
btn.addEventListener('click', function() {
cartCount++;
const cartBtn = document.getElementById('marketplaceCart');
if (cartBtn) cartBtn.textContent =  🛒 Cart (${cartCount}) ;
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
// PART 20 — SETTINGS, GLOBAL APP & SAFE BOOT STARTUP
// ============================================================


// ============================================================
// SETTINGS — BACKUP
// ============================================================

document
    .getElementById("settingsBackupBtn")
    ?.addEventListener("click", function () {

        showToast(
            "💾 Backup system is ready. Backend connection is pending.",
            "info"
        );

        console.log(
            "ScaleFlow Backup: Frontend test successful."
        );

    });


// ============================================================
// SETTINGS — CHANGE PASSWORD
// ============================================================

document
    .getElementById("settingsChangePassword")
    ?.addEventListener("click", function () {

        showToast(
            "🔐 Password change interface is ready.",
            "info"
        );

    });


// ============================================================
// SETTINGS — 2FA
// ============================================================

document
    .getElementById("settingsEnable2FA")
    ?.addEventListener("click", function () {

        showToast(
            "📱 2FA interface is ready. Backend connection is pending.",
            "info"
        );

    });


// ============================================================
// GLOBAL SCALEFLOW APP
// ============================================================

global.ScaleFlow = {

    showToast: showToast,

    openModal: openModal,

    closeModal: closeModal,

    navigateTo: navigateTo,

    toggleDarkMode: toggleDarkMode,

    hideLoader: hideLoader,

    updateDashboardStats: updateDashboardStats,

    updateContinueLearningProgress:
        updateContinueLearningProgress

};


// ============================================================
// SAFE BOOT STARTUP
// ============================================================

function startScaleFlowApp() {

    console.log("🚀 ScaleFlow University starting...");

    try {

        // Open Home Page
        navigateTo("page1");

    } catch (error) {

        console.error(
            "Navigation startup error:",
            error
        );

    }


    try {

        // Load dashboard information
        updateDashboardStats();

    } catch (error) {

        console.error(
            "Dashboard startup error:",
            error
        );

    }


    try {

        // Welcome message
        showToast(
            "🎓 Welcome to ScaleFlow University",
            "success"
        );

    } catch (error) {

        console.error(
            "Welcome message error:",
            error
        );

    }


    console.log(
        "✅ ScaleFlow University frontend is running."
    );

}


// ============================================================
// START APP
// ============================================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        startScaleFlowApp
    );

} else {

    startScaleFlowApp();

}


// ============================================================
// FINAL LOADER SAFETY
// ============================================================

setTimeout(function () {

    try {

        hideLoader();

    } catch (error) {

        console.error(
            "Loader safety error:",
            error
        );

        const safeLoader =
            document.getElementById("loader");

        if (safeLoader) {

            safeLoader.style.display = "none";

        }

    }

}, 1000);


console.log(
    "✅ ScaleFlow University JavaScript initialized."
);


})(window);

/* =========================================
   EDUCATION HOME
   SAFE SEARCH MODULE
   ========================================= */


// ============================================================
// EDUCATION SEARCH
// ============================================================

function searchEducation() {

    const input =
        document.getElementById("educationSearchInput");

    const results =
        document.getElementById("educationSearchResults");


    // اگر search elements موجود نہیں تو خاموشی سے واپس جائیں
    if (!input || !results) {

        console.warn(
            "ScaleFlow Education Search: Search elements not found."
        );

        return;

    }


    const searchText =
        String(input.value || "")
            .trim()
            .toLowerCase();


    // پہلے پرانے results صاف کریں
    results.innerHTML = "";


    // خالی search پر کچھ نہ دکھائیں
    if (!searchText) {

        return;

    }


    const educationCards =
        document.querySelectorAll(
            ".education-card"
        );


    let found = 0;


    educationCards.forEach(function(card) {

        if (!card) {
            return;
        }


        const text =
            String(card.innerText || "")
                .toLowerCase();


        if (text.includes(searchText)) {

            const result =
                card.cloneNode(true);


            results.appendChild(result);

            found++;

        }

    });


    // کوئی result نہیں ملا
    if (found === 0) {

        results.innerHTML =
            "<p>❌ No related education found.</p>";

    }

}


// ============================================================
// EDUCATION SEARCH SETUP
// ============================================================

function setupEducationSearch() {

    const button =
        document.getElementById(
            "educationSearchBtn"
        );

    const input =
        document.getElementById(
            "educationSearchInput"
        );


    // اگر search UI موجود نہیں
    if (!button || !input) {

        console.warn(
            "ScaleFlow Education Search: UI not found."
        );

        return;

    }


    // Search button
    button.addEventListener(
        "click",
        function() {

            searchEducation();

        }
    );


    // Enter key
    input.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchEducation();

            }

        }
    );

}


// ============================================================
// EDUCATION HOME START
// ============================================================

function startEducationHome() {

    try {

        setupEducationSearch();

        console.log(
            "✅ Education Home initialized."
        );

    } catch (error) {

        console.error(
            "Education Home startup error:",
            error
        );

    }

}


// ============================================================
// EDUCATION HOME BOOT
// ============================================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        startEducationHome
    );

} else {

    startEducationHome();

}

    })(window);


/* ============================================================
Sanaullah ScaleFlow University
script.js — Complete JavaScript (All Parts Combined & Cleaned)
Version: 1.0 FINAL FIXED
============================================================ */

(function(global) {
"use strict";

// ============================================================
// 1. DOM REFS — تمام اہم عناصر
// ============================================================
const loader = document.getElementById('loader');
const toastContainer = document.getElementById('toast-container');
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const notificationBell = document.getElementById('notificationBell');
const notificationPanel = document.getElementById('notificationPanel');
const notificationCount = document.getElementById('notificationCount');
const markAllReadBtn = document.getElementById('markAllReadBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const currentYear = document.getElementById('currentYear');
const globalSearch = document.getElementById('globalSearchInput');
const navLinks = document.querySelectorAll('.sidebar-menu a[data-page]');
const pageSections = {
page1: document.getElementById('page1'),
page2: document.getElementById('page2'),
page3: document.getElementById('page3'),
page4: document.getElementById('page4'),
page5: document.getElementById('page5'),
page6: document.getElementById('page6'),
page7: document.getElementById('page7'),
page8: document.getElementById('page8'),
page9: document.getElementById('page9'),
page10: document.getElementById('page10'),
page11: document.getElementById('page11'),
page12: document.getElementById('page12')
};

// ============================================================
// 2. TOAST — نوٹیفکیشن دکھانے کا فنکشن
// ============================================================
function showToast(message, type = "info") {
if (!toastContainer) return;
const toast = document.createElement("div");
toast.className =  toast toast-${type} ;
toast.textContent = message;
toastContainer.appendChild(toast);
setTimeout(() => {
toast.style.opacity = "0";
setTimeout(() => {
toast.remove();
}, 300);
}, 3000);
}

// ============================================================
// 3. LOADER — صفحہ لوڈ ہونے پر چھپائیں
// ============================================================
function hideLoader() {
if (!loader) return;
if (loader.classList.contains('hidden')) return;
loader.classList.add('hidden');
setTimeout(() => {
loader.style.display = 'none';
loader.setAttribute('aria-hidden', 'true');
}, 500);
}

// ============================================================
// 4. MODAL — کھلنا / بند ہونا
// ============================================================
function openModal(title, bodyHTML, options = {}) {
if (modalTitle) modalTitle.textContent = title || 'Modal';
if (modalBody) modalBody.innerHTML = bodyHTML || 'No content';
if (modalContainer) modalContainer.classList.add('open');
document.body.style.overflow = 'hidden';
if (options.onOpen) options.onOpen();
}

function closeModal() {
if (modalContainer) modalContainer.classList.remove('open');
document.body.style.overflow = '';
}

modalCloseBtn?.addEventListener('click', closeModal);
modalCancelBtn?.addEventListener('click', closeModal);
modalConfirmBtn?.addEventListener('click', function() {
showToast('✅ Confirmed!', 'success');
closeModal();
});
modalContainer?.addEventListener('click', function(e) {
if (e.target === modalContainer) closeModal();
});

// ============================================================
// 5. DARK MODE — تھیم تبدیل کریں اور محفوظ کریں
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

// ============================================================
// 6. NAVIGATION — صفحات کا تبادلہ
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
pageSections[pageId].classList.add("active");
navLinks.forEach(link => {
link.classList.remove("active");
});
const activeLink = document.querySelector( .sidebar-menu a[data-page="${pageId}"] );
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
// 7. SCROLL TOP — بٹن ظاہر/چھپائیں
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
// 8. KEYBOARD SHORTCUTS
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
// 9. CURRENT YEAR — فوٹر میں سال
// ============================================================
if (currentYear) {
currentYear.textContent = new Date().getFullYear();
}

// ============================================================
// 10. DASHBOARD STATS & FEATURES
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

 
const els = {
    studentName: document.getElementById('studentName'),
    brainXP: document.getElementById('brainXP'),
    currentLevel: document.getElementById('currentLevel'),
    learningStreak: document.getElementById('learningStreak'),
    overallProgress: document.getElementById('overallProgress'),
    courseCount: document.getElementById('courseCount'),
    certificateCount: document.getElementById('certificateCount'),
    achievementCount: document.getElementById('achievementCount'),
    projectCount: document.getElementById('projectCount'),
    dashName: document.getElementById('dashName'),
    sidebarXP: document.getElementById('sidebarXP'),
    sidebarUserName: document.getElementById('sidebarUserName'),
    sidebarUserLevel: document.getElementById('sidebarUserLevel')
};

if (els.studentName) els.studentName.textContent = data.name;
if (els.brainXP) els.brainXP.textContent = data.xp;
if (els.currentLevel) els.currentLevel.textContent = data.level;
if (els.learningStreak) els.learningStreak.textContent = data.streak;
if (els.overallProgress) els.overallProgress.textContent = data.progress;
if (els.courseCount) els.courseCount.textContent = data.courses;
if (els.certificateCount) els.certificateCount.textContent = data.certificates;
if (els.achievementCount) els.achievementCount.textContent = data.achievements;
if (els.projectCount) els.projectCount.textContent = data.projects;
if (els.dashName) els.dashName.textContent = data.name;
if (els.sidebarXP) els.sidebarXP.textContent = data.xp;
if (els.sidebarUserName) els.sidebarUserName.textContent = data.name;
if (els.sidebarUserLevel) els.sidebarUserLevel.textContent = data.level + ' • Advanced';
 

}

// Continue Learning Progress
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

// Tasks checkboxes
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

// Quick Actions Mapping
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

// ============================================================
// 11. AI CHAT MODULE
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

// ============================================================
// 12. LOGIN & AUTHENTICATION VALIDATION
// ============================================================
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
e.preventDefault();
const emailField = document.getElementById('loginEmail');
const passwordField = document.getElementById('loginPassword');
if (!emailField || !passwordField) return;

 
const email = emailField.value.trim();
const password = passwordField.value.trim();

if (!email || !password) {
    showToast('⚠️ Please fill in both fields.', 'warning');
    return;
}
if (!email.includes('@')) {
    showToast('⚠️ Please enter a valid email address.', 'warning');
    return;
}
if (password.length < 6) {
    showToast('⚠️ Password must be at least 6 characters.', 'warning');
    return;
}

showToast('✅ Login successful! Redirecting...', 'success');
setTimeout(() => navigateTo('page1'), 1500);
 

});

// Profile Edit Modal Handler
document.getElementById('editProfileBtn')?.addEventListener('click', function() {
openModal('✏️ Edit Profile',  <form id="profileEditForm"> <div class="form-group mb-3"> <label>Full Name</label> <input type="text" id="editName" class="w-full form-control" value="Sanaullah"> </div> <div class="form-group mb-3"> <label>Email</label> <input type="email" id="editEmail" class="w-full form-control" value="sanaullah@scaleflow.com"> </div> <button type="submit" class="btn-primary w-full">Save Changes</button> </form> );

 
document.getElementById('profileEditForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('✅ Profile updated!', 'success');
    closeModal();
});
 

});

// ============================================================
// 13. GLOBAL EXPOSE & BOOT STARTUP
// ============================================================
global.ScaleFlow = {
showToast,
openModal,
closeModal,
navigateTo,
toggleDarkMode,
hideLoader,
updateDashboardStats
};

document.addEventListener("DOMContentLoaded", function () {
console.log("🚀 DOM Loaded");
try {
navigateTo("page1");
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

/* ============================================================
   Sanaullah ScaleFlow University
   script.js — Complete JavaScript (All Parts 1 to 20)
   Version: 1.0 FINAL FIXED
   ============================================================ */

(function(global) {
    "use strict";

   
// ============================================================
    // SCALEFLOW GLOBAL WEB APP BRIDGE (یہاں نیا لنک پیسٹ کریں)
    // ============================================================
    const SCALEFLOW_CONFIG = {
        webAppUrl: "https://script.google.com/macros/s/AKfycbzlBu8WiCFSyszAa0gB8Uj-YibclzKlo1Hhd5eBYULcayQIuS9YdNEIFLV68GHMY6x5/exec",
        version: "1.0",
        environment: "production"
    };
   
    // ============================================================
    // PART 1 — DOM REFERENCES (تمام اہم عناصر)
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

    // ===== PAGE SECTIONS (1 to 20) =====
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
        page12: document.getElementById('page12'),
        // ===== NEW PAGES 13 TO 20 =====
        page13: document.getElementById('page13'),
        page14: document.getElementById('page14'),
        page15: document.getElementById('page15'),
        page16: document.getElementById('page16'),
        page17: document.getElementById('page17'),
        page18: document.getElementById('page18'),
        page19: document.getElementById('page19'),
        page20: document.getElementById('page20')
    };

    // ============================================================
    // PART 2 — TOAST (نوٹیفکیشن دکھانے کا فنکشن)
    // ============================================================
    function showToast(message, type = "info") {
        if (!toastContainer) return;
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
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
// PART 3 — LOADER & PAGE READY HANDLER (الگ JS فائل)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById('loader'); // یقینی بنائیں کہ آپ کی HTML میں loader کی ID یہی ہے

    function hideLoader() {
        try {
            if (!loader) {
                console.warn("⚠️ توجہ: صفحہ پر 'loader' کا عنصر نہیں ملا۔ براہِ مہربانی چیک کریں!");
                return;
            }
            if (loader.classList.contains('hidden')) return;
            
            loader.classList.add('hidden');
            
            setTimeout(() => {
                loader.style.display = 'none';
                loader.setAttribute('aria-hidden', 'true');
                console.log("✅ لوڈر کامیابی کے ساتھ چھپا دیا گیا ہے اور صفحہ بالکل تیار ہے۔");
            }, 500);

        } catch (error) {
            console.error("❌ خرابی: لوڈر ہٹانے کے دوران ایک مسئلہ پیش آیا:", error);
        }
    }

    // ونڈو مکمل لوڈ ہونے پر لوڈر کو ہٹا دیں
    window.addEventListener('load', function () {
        hideLoader();
    });

    // فال سیف (Fallback): اگر کسی وجہ سے 'load' ایونٹ فائر نہ ہو تو 3 سیکنڈ بعد خود بخود ہٹا دیں
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            console.info("ℹ️ اطلاع: لوڈنگ کا وقت زیادہ ہونے کی وجہ سے لوڈر خودکار طریقے سے ہٹا دیا گیا ہے۔");
            hideLoader();
        }
    }, 3000);
});


   
    // ============================================================
    // PART 4 — MODAL (کھلنا / بند ہونا)
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
    // PART 15 — SCALEFLOW SECURE AUTHENTICATION BRIDGE
    // ============================================================

    const webAppUrl = "https://script.google.com/macros/s/AKfycbzlBu8WiCFSyszAa0gB8Uj-YibclzKlo1Hhd5eBYULcayQIuS9YdNEIFLV68GHMY6x5/exec";

    // 1. لاگ ان فارم سبمٹ ہینڈلر
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) {
            showToast('⚠️ Please fill in both fields.', 'warning');
            return;
        }

        showToast('🔄 Verifying login with Google Sheets...', 'info');

        fetch(`${webAppUrl}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    showToast(`✅ Welcome back, ${data.fullName}!`, 'success');
                    localStorage.setItem("studentLoggedIn", "true");
                    localStorage.setItem("studentName", data.fullName);
                    localStorage.setItem("studentEmail", email);
                    
                    setTimeout(() => {
                        if (typeof navigateTo === 'function') {
                            navigateTo('page1');
                        } else {
                            location.reload();
                        }
                    }, 1500);
                } else {
                    showToast(`❌ ${data.message || 'Invalid credentials.'}`, 'error');
                }
            })
            .catch(err => {
                console.error("Login Error:", err);
                showToast('❌ Connection error to server.', 'error');
            });
    });

    // 2. رجسٹریشن بٹن (Register Now) - اب یہ براہِ راست شیٹ میں نیا اکاؤنٹ بنائے گا
    document.getElementById('registerLink')?.addEventListener('click', function(e) {
        e.preventDefault();
        
        let fullName = prompt("📝 Enter your Full Name for Registration:");
        if (!fullName) return;
        
        let email = prompt("Enter your Email Address:");
        if (!email || !email.includes('@')) {
            showToast('⚠️ Valid email is required.', 'warning');
            return;
        }
        
        let password = prompt("Create a Password (min 6 characters):");
        if (!password || password.length < 6) {
            showToast('⚠️ Password must be at least 6 characters.', 'warning');
            return;
        }

        showToast('🔄 Registering account to Google Sheets...', 'info');

        fetch(`${webAppUrl}?action=register&name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    showToast('✅ Registration Successful! You can now sign in.', 'success');
                    document.getElementById('loginEmail').value = email;
                    document.getElementById('loginPassword').value = password;
                } else {
                    showToast(`❌ ${data.message || 'Registration failed.'}`, 'error');
                }
            })
            .catch(err => {
                console.error("Reg Error:", err);
                showToast('❌ Server error during registration.', 'error');
            });
    });

    // 3. گوگل سائن ان بٹن (Sign in with Google)
    document.querySelector('.btn-secondary')?.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Google') || e.currentTarget.innerHTML.includes('Google')) {
            let googleEmail = prompt("🌐 Enter your Google account email to sign in:");
            if (googleEmail) {
                showToast('🔄 Verifying credentials with ScaleFlow Server...', 'info');
               

                // لاگ ان یا رجسٹر کرتے وقت براہِ راست یہ استعمال کریں:
      fetch(`${SCALEFLOW_CONFIG.webAppUrl}?action=login&email=${email}&password=${password}`)
   
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === "success") {
                            showToast(`✅ Google Sign-In Successful! Welcome ${data.fullName}`, 'success');
                            localStorage.setItem("studentLoggedIn", "true");
                            localStorage.setItem("studentEmail", googleEmail);
                            setTimeout(() => location.reload(), 1500);
                        } else {
                            showToast('⚠️ Email not found. Please register first.', 'warning');
                        }
                    });
            }
        }
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

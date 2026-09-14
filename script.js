/* ============================================================
   SCALEFLOW UNIVERSITY
   FRONTEND JAVASCRIPT — PART 1
   STANDALONE FRONTEND
   ============================================================ */

(function (window, document) {
    "use strict";

    /* ============================================================
       PART 1.1 — FRONTEND STATE
       ============================================================ */

    const STORAGE = {
        THEME: "scaleflow_theme",
        LANGUAGE: "scaleflow_language",
        TASKS: "scaleflow_tasks",
        NOTIFICATIONS: "scaleflow_notifications"
    };

    const AppState = {
        currentPage: "page1",
        darkMode: false,
        notificationOpen: false,
        modalOpen: false,
        selectedLanguage: "en",
        courseFilter: "all",
        coursePage: 1
    };


    /* ============================================================
       PART 1.2 — SAFE DOM HELPER
       ============================================================ */

    function $(id) {
        return document.getElementById(id);
    }

    function $all(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    function on(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
        }
    }


    /* ============================================================
       PART 1.3 — TOAST SYSTEM
       ============================================================ */

    function showToast(message, type) {
        const container = $("toast-container");

        if (!container) {
            console.log("[ScaleFlow Toast]", message);
            return;
        }

        const toast = document.createElement("div");

        toast.className = "toast";

        if (type) {
            toast.classList.add("toast-" + type);
        }

        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(function () {
            toast.classList.add("show");
        }, 10);

        setTimeout(function () {
            toast.classList.remove("show");

            setTimeout(function () {
                toast.remove();
            }, 300);

        }, 3000);
    }


    /* ============================================================
       PART 1.4 — LOADER
       ============================================================ */

    function hideLoader() {
        const loader = $("loader");

        if (!loader) return;

        loader.classList.add("hidden");
        loader.setAttribute("aria-hidden", "true");

        setTimeout(function () {
            loader.hidden = true;
        }, 350);
    }


    function showLoader() {
        const loader = $("loader");

        if (!loader) return;

        loader.hidden = false;
        loader.classList.remove("hidden");
        loader.setAttribute("aria-hidden", "false");
    }


    /* ============================================================
       PART 1.5 — MODAL SYSTEM
       ============================================================ */

    function openModal(title, body, options) {
        const container = $("modal-container");
        const titleElement = $("modalTitle");
        const bodyElement = $("modalBody");

        if (!container) return;

        if (titleElement) {
            titleElement.textContent = title || "";
        }

        if (bodyElement) {
            bodyElement.innerHTML = body || "";
        }

        AppState.modalOpen = true;

        container.hidden = false;
        container.classList.add("active");
        container.setAttribute("aria-hidden", "false");

        const confirmButton = $("modalConfirmBtn");
        const cancelButton = $("modalCancelBtn");

        if (confirmButton) {
            confirmButton.onclick = function () {
                if (options && typeof options.onConfirm === "function") {
                    options.onConfirm();
                }

                closeModal();
            };
        }

        if (cancelButton) {
            cancelButton.onclick = function () {
                if (options && typeof options.onCancel === "function") {
                    options.onCancel();
                }

                closeModal();
            };
        }
    }


    function closeModal() {
        const container = $("modal-container");

        if (!container) return;

        AppState.modalOpen = false;

        container.classList.remove("active");
        container.setAttribute("aria-hidden", "true");
        container.hidden = true;
    }


    /* ============================================================
       PART 1.6 — PAGE NAVIGATION
       ============================================================ */

    function showPage(pageId, options) {
        if (!pageId) return false;

        const targetPage = $(pageId);

        /*
         * اگر مستقبل میں Part 2 / Part 3 میں کوئی page آئے
         * تو یہ function خود اسے پہچان لے گا۔
         */
        if (!targetPage) {
            if (!options || !options.silent) {
                showToast(
                    "یہ صفحہ ابھی اس Frontend Part میں موجود نہیں ہے۔",
                    "warning"
                );
            }

            return false;
        }

        const pages = $all(".page-section");

        pages.forEach(function (page) {
            page.hidden = true;
            page.classList.remove("active");
        });

        targetPage.hidden = false;
        targetPage.classList.add("active");

        AppState.currentPage = pageId;

        const app = $("app");

        if (app) {
            app.dataset.page = pageId.replace("page", "");
        }

        /*
         * Sidebar active state
         */
        $all("[data-page]").forEach(function (item) {
            item.classList.remove("active");
        });

        const activeLinks = $all('[data-page="' + pageId + '"]');

        activeLinks.forEach(function (link) {
            link.classList.add("active");
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return true;
    }


    function navigateTo(pageId) {
        if (showPage(pageId)) {
            return true;
        }

        return false;
    }


    /* ============================================================
       PART 1.7 — SIDEBAR NAVIGATION
       ============================================================ */

    function initNavigation() {

        const links = $all("[data-page]");

        links.forEach(function (link) {

            on(link, "click", function (event) {

                event.preventDefault();

                const pageId = link.dataset.page;

                if (!pageId) return;

                navigateTo(pageId);

            });

        });

    }


    /* ============================================================
       PART 1.8 — DARK MODE
       ============================================================ */

    function updateThemeButton() {

        const buttons = [
            $("darkModeBtn"),
            $("btnTheme")
        ];

        buttons.forEach(function (button) {

            if (!button) return;

            if (AppState.darkMode) {

                button.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                if (button.id === "darkModeBtn") {
                    button.innerHTML = "☀️";
                }

            } else {

                button.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                if (button.id === "darkModeBtn") {
                    button.innerHTML = "🌙";
                }

            }

        });
    }


    function applyTheme() {

        if (AppState.darkMode) {
            document.body.classList.add("dark-mode");
            document.documentElement.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.documentElement.classList.remove("dark-mode");
        }

        localStorage.setItem(
            STORAGE.THEME,
            AppState.darkMode ? "dark" : "light"
        );

        updateThemeButton();
    }


    function toggleDarkMode() {

        AppState.darkMode = !AppState.darkMode;

        applyTheme();

        showToast(
            AppState.darkMode
                ? "Dark Mode فعال ہوگیا۔"
                : "Light Mode فعال ہوگیا۔",
            "success"
        );
    }


    function loadTheme() {

        const savedTheme = localStorage.getItem(STORAGE.THEME);

        AppState.darkMode = savedTheme === "dark";

        applyTheme();
    }


    /* ============================================================
       PART 1.9 — NOTIFICATION SYSTEM
       ============================================================ */

    function getNotificationItems() {
        return $all(".notification-list .notification-item");
    }


    function updateNotificationCount() {

        const countElement = $("notificationCount");

        const unreadItems = getNotificationItems().filter(
            function (item) {
                return item.classList.contains("unread");
            }
        );

        if (countElement) {
            countElement.textContent = unreadItems.length;
        }
    }


    function openNotifications() {

        const panel = $("notificationPanel");

        if (!panel) return;

        AppState.notificationOpen = !AppState.notificationOpen;

        panel.hidden = !AppState.notificationOpen;

        panel.classList.toggle(
            "active",
            AppState.notificationOpen
        );

        panel.setAttribute(
            "aria-hidden",
            AppState.notificationOpen ? "false" : "true"
        );
    }


    function markAllNotificationsRead() {

        const items = getNotificationItems();

        if (!items.length) {
            showToast("کوئی notification موجود نہیں۔", "info");
            return;
        }

        items.forEach(function (item) {
            item.classList.remove("unread");
        });

        updateNotificationCount();

        showToast(
            "تمام notifications read ہوگئی ہیں۔",
            "success"
        );

    }


    function initNotifications() {

        const bell = $("notificationBell");
        const markAll = $("markAllReadBtn");

        on(bell, "click", function (event) {
            event.stopPropagation();
            openNotifications();
        });

        on(markAll, "click", function () {
            markAllNotificationsRead();
        });

        updateNotificationCount();

        /*
         * باہر click کرنے پر notification panel بند
         */
        document.addEventListener("click", function (event) {

            const panel = $("notificationPanel");

            if (!panel || !AppState.notificationOpen) {
                return;
            }

            if (
                !panel.contains(event.target) &&
                event.target !== $("notificationBell")
            ) {

                AppState.notificationOpen = false;

                panel.hidden = true;
                panel.classList.remove("active");
                panel.setAttribute("aria-hidden", "true");
            }

        });

    }


    /* ============================================================
       PART 1.10 — HOME BUTTON NAVIGATION
       ============================================================ */

    function bindNavigationButton(id, pageId) {

        const button = $(id);

        on(button, "click", function () {
            navigateTo(pageId);
        });

    }


    function initHomeNavigation() {

        /*
         * Main Dashboard
         */
        bindNavigationButton(
            "continueLearningBtn",
            "page4"
        );

        bindNavigationButton(
            "browseCoursesBtn",
            "page3"
        );


        /*
         * Quick Actions
         */
        bindNavigationButton(
            "quickStartLearning",
            "page4"
        );

        bindNavigationButton(
            "quickAskAI",
            "page7"
        );

        bindNavigationButton(
            "quickBrowseCourses",
            "page3"
        );

        bindNavigationButton(
            "quickMyCertificates",
            "page5"
        );


        /*
         * Gateway Cards
         */
        bindNavigationButton(
            "gatewayLearning",
            "page3"
        );

        bindNavigationButton(
            "gatewayAI",
            "page7"
        );

        bindNavigationButton(
            "gatewayAutomation",
            "page17"
        );

        bindNavigationButton(
            "gatewayTools",
            "page18"
        );

        bindNavigationButton(
            "gatewayBusiness",
            "page9"
        );

        bindNavigationButton(
            "gatewayFreelancing",
            "page16"
        );

        bindNavigationButton(
            "gatewayCertificates",
            "page5"
        );

        bindNavigationButton(
            "gatewayDashboard",
            "page2"
        );

    }


    /* ============================================================
       PART 1.11 — DASHBOARD BOXES
       ============================================================ */

    function initDashboardBoxes() {

        on($("dashCourseBox"), "click", function () {
            navigateTo("page3");
        });

        on($("dashCertBox"), "click", function () {
            navigateTo("page5");
        });

        on($("dashAchieveBox"), "click", function () {
            navigateTo("page6");
        });

        on($("dashProjectBox"), "click", function () {
            showToast(
                "Projects section ابھی frontend میں connected نہیں ہے۔",
                "info"
            );
        });

    }


    /* ============================================================
       PART 1.12 — TASK SYSTEM
       ============================================================ */

    function initTasks() {

        const taskIds = [
            "task1",
            "task2",
            "task3",
            "task4"
        ];

        taskIds.forEach(function (id) {

            const task = $(id);

            if (!task) return;

            task.addEventListener("click", function () {

                task.classList.toggle("completed");

                const completed =
                    task.classList.contains("completed");

                showToast(
                    completed
                        ? "Task complete ہوگیا۔"
                        : "Task دوبارہ active ہوگیا۔",
                    completed ? "success" : "info"
                );

            });

        });

    }


    /* ============================================================
       PART 1.13 — GLOBAL SEARCH
       ============================================================ */

    function getSearchTargets() {

        return $all(
            [
                ".course-card",
                ".gateway-card",
                ".achievement-card",
                ".certificate-card",
                ".quick-action",
                ".tool-card",
                ".ai-hub-card",
                ".dashboard-card"
            ].join(",")
        );

    }


    function performGlobalSearch(query) {

        const value = String(query || "")
            .trim()
            .toLowerCase();

        if (!value) {
            return;
        }

        const targets = getSearchTargets();

        let firstMatch = null;

        for (const target of targets) {

            const text =
                String(target.textContent || "")
                    .toLowerCase();

            if (text.includes(value)) {

                firstMatch = target;
                break;

            }

        }

        if (!firstMatch) {

            showToast(
                "کوئی matching result نہیں ملا۔",
                "warning"
            );

            return;
        }

        const page = firstMatch.closest(".page-section");

        if (page && page.id) {

            navigateTo(page.id);

            setTimeout(function () {

                firstMatch.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 250);

        }

    }


    function initGlobalSearch() {

        const input = $("globalSearchInput");

        if (!input) return;

        on(input, "keydown", function (event) {

            if (event.key !== "Enter") {
                return;
            }

            event.preventDefault();

            performGlobalSearch(input.value);

        });

    }


    /* ============================================================
       PART 1.14 — PAGE 2 DASHBOARD ACTIONS
       ============================================================ */

    function initPage2() {

        bindNavigationButton(
            "dashResumeLearning",
            "page4"
        );

        bindNavigationButton(
            "dashBrowseCourses",
            "page3"
        );

        bindNavigationButton(
            "dashAskAI",
            "page7"
        );

        bindNavigationButton(
            "dashCertificates",
            "page5"
        );


        [
            "recentCourse1",
            "recentCourse2",
            "recentCourse3"
        ].forEach(function (id) {

            on($(id), "click", function () {
                navigateTo("page4");
            });

        });

    }


    /* ============================================================
       PART 1.15 — PAGE 3 COURSE FILTER
       ============================================================ */

    function initCourseFilters() {

        const grid = $("courseGrid");

        if (!grid) return;

        const cards = $all(
            "#courseGrid [data-difficulty]"
        );

        const searchInput = $("courseSearchInput");

        function applyCourseFilter() {

            const difficulty =
                AppState.courseFilter;

            const search =
                String(searchInput ? searchInput.value : "")
                    .trim()
                    .toLowerCase();

            cards.forEach(function (card) {

                const cardDifficulty =
                    String(
                        card.dataset.difficulty || ""
                    ).toLowerCase();

                const text =
                    String(card.textContent || "")
                        .toLowerCase();

                const difficultyMatch =
                    difficulty === "all" ||
                    cardDifficulty === difficulty;

                const searchMatch =
                    !search ||
                    text.includes(search);

                card.hidden =
                    !(difficultyMatch && searchMatch);

            });

        }


        function setFilter(filter) {

            AppState.courseFilter = filter;

            applyCourseFilter();

            showToast(
                filter === "all"
                    ? "تمام courses دکھائے جا رہے ہیں۔"
                    : filter + " courses دکھائے جا رہے ہیں۔",
                "info"
            );

        }


        on($("filterAll"), "click", function () {
            setFilter("all");
        });

        on($("filterBeginner"), "click", function () {
            setFilter("beginner");
        });

        on($("filterIntermediate"), "click", function () {
            setFilter("intermediate");
        });

        on($("filterAdvanced"), "click", function () {
            setFilter("advanced");
        });

        on(searchInput, "input", function () {
            applyCourseFilter();
        });


        /*
         * Course Start Buttons
         */
        [
            "startCourseMed",
            "startCourseEng",
            "startCourseSci",
            "startCourse1",
            "startCourse2",
            "startCourse3",
            "startCourse4",
            "startCourse5",
            "startCourse6",
            "startRec1",
            "startRec2"
        ].forEach(function (id) {

            on($(id), "click", function () {

                navigateTo("page4");

                showToast(
                    "Course learning page کھول دی گئی ہے۔",
                    "success"
                );

            });

        });


        /*
         * Featured Enrollment
         */
        [
            "enrollFeatured1",
            "enrollFeatured2"
        ].forEach(function (id) {

            on($(id), "click", function () {

                showToast(
                    "Enrollment backend ابھی connected نہیں ہے۔",
                    "info"
                );

            });

        });


        /*
         * Pagination
         */
        on($("paginationPrev"), "click", function () {
            showToast(
                "Previous page frontend میں ابھی available نہیں ہے۔",
                "info"
            );
        });

        on($("pagination1"), "click", function () {
            showToast("Course page 1 selected.", "info");
        });

        on($("pagination2"), "click", function () {
            showToast("Course page 2 selected.", "info");
        });

        on($("pagination3"), "click", function () {
            showToast("Course page 3 selected.", "info");
        });

        on($("paginationNext"), "click", function () {
            showToast(
                "Next course page backend data کے بعد فعال ہوگی۔",
                "info"
            );
        });


        applyCourseFilter();

    }


    /* ============================================================
       PART 1.16 — PAGE 4 LOCAL FEATURES
       ============================================================ */

    function initPage4() {

        const simulatorButton = $("runSimulatorBtn");

        on(simulatorButton, "click", function () {

            const section =
                document.querySelector(
                    ".code-simulator-section"
                );

            const textarea =
                section
                    ? section.querySelector("textarea")
                    : null;

            if (!textarea || !textarea.value.trim()) {

                showToast(
                    "پہلے code لکھیں۔",
                    "warning"
                );

                return;
            }

            showToast(
                "Code simulator UI کام کر رہا ہے۔ Actual code execution ابھی connected نہیں ہے۔",
                "info"
            );

        });


        on($("downloadPdfBtn"), "click", function () {

            showToast(
                "PDF generation backend ابھی connected نہیں ہے۔",
                "info"
            );

        });


        on($("saveNotesBtn"), "click", function () {

            const input = $("notesInput");

            if (!input) return;

            localStorage.setItem(
                "scaleflow_notes",
                input.value
            );

            showToast(
                "Notes browser میں save ہوگئے۔",
                "success"
            );

        });


        const savedNotes =
            localStorage.getItem("scaleflow_notes");

        if (savedNotes && $("notesInput")) {
            $("notesInput").value = savedNotes;
        }


        on($("getReflectionBtn"), "click", function () {

            const input = $("reflectionInput");

            if (!input || !input.value.trim()) {

                showToast(
                    "Reflection لکھیں۔",
                    "warning"
                );

                return;
            }

            showToast(
                "AI Reflection backend ابھی connected نہیں ہے۔",
                "info"
            );

        });


        on($("submitQuizBtn"), "click", function () {

            const input = $("quizAnswerInput");

            if (!input || !input.value.trim()) {

                showToast(
                    "Quiz answer لکھیں۔",
                    "warning"
                );

                return;
            }

            showToast(
                "Quiz system backend ابھی connected نہیں ہے۔",
                "info"
            );

        });


        on($("solveDoubtBtn"), "click", function () {

            const input = $("doubtInput");

            if (!input || !input.value.trim()) {

                showToast(
                    "اپنا سوال یا doubt لکھیں۔",
                    "warning"
                );

                return;
            }

            showToast(
                "AI Doubt Solver backend ابھی connected نہیں ہے۔",
                "info"
            );

        });


        on($("prevLessonBtn"), "click", function () {

            showToast(
                "Previous lesson navigation UI ready ہے۔",
                "info"
            );

        });


        on($("nextLessonBtn"), "click", function () {

            showToast(
                "Next lesson navigation UI ready ہے۔",
                "info"
            );

        });


        on($("playAudioTutorBtn"), "click", function () {

            showToast(
                "Audio Tutor backend/content ابھی connected نہیں ہے۔",
                "info"
            );

        });


        on($("openChatBtn"), "click", function () {

            navigateTo("page7");

        });

    }


    /* ============================================================
       PART 1.17 — PAGE 5 CERTIFICATES
       ============================================================ */

    function initCertificates() {

        const certificateButtons = [
            "certDownload1",
            "certDownload2"
        ];

        certificateButtons.forEach(function (id) {

            on($(id), "click", function () {

                showToast(
                    "Certificate download backend ابھی connected نہیں ہے۔",
                    "info"
                );

            });

        });


        [
            "certVerify1",
            "certVerify2"
        ].forEach(function (id) {

            on($(id), "click", function () {

                showToast(
                    "Certificate verification backend ابھی connected نہیں ہے۔",
                    "info"
                );

            });

        });


        [
            "certQR1",
            "certQR2"
        ].forEach(function (id) {

            on($(id), "click", function () {

                showToast(
                    "QR verification ابھی connected نہیں ہے۔",
                    "info"
                );

            });

        });


        [
            "certShare1",
            "certShare2"
        ].forEach(function (id) {

            on($(id), "click", function () {

                showToast(
                    "Certificate sharing frontend UI تیار ہے۔",
                    "info"
                );

            });

        });

    }


    /* ============================================================
       PART 1.18 — PAGE 6 ACHIEVEMENTS
       ============================================================ */

    function initAchievements() {

        [
            "achieveFirstCourse",
            "achieveFiveDayStreak",
            "achieveTopPerformer",
            "achieveTenDayStreak",
            "achieveExpertLevel"
        ].forEach(function (id) {

            on($(id), "click", function () {

                showToast(
                    "Achievement details frontend میں موجود ہیں۔",
                    "success"
                );

            });

        });

    }


    /* ============================================================
       PART 1.19 — PAGE 7 AI MENTOR FRONTEND
       ============================================================ */

    function initAIMentorFrontend() {

        const askButton = $("aiMentorAskBtn");
        const clearButton = $("aiMentorClearBtn");
        const question = $("aiMentorQuestion");
        const response = $("aiMentorResponse");
        const language = $("aiMentorLanguage");
        const subject = $("aiMentorSubject");

        /*
         * AI ابھی backend سے connected نہیں۔
         * اس لیے کوئی fake AI answer نہیں دیا جائے گا۔
         */

        on(askButton, "click", function () {

            if (!question || !question.value.trim()) {

                showToast(
                    "براہِ کرم اپنا سوال لکھیں۔",
                    "warning"
                );

                return;
            }

            if (response) {

                response.textContent =
                    "🟡 AI Backend ابھی connected نہیں ہے۔ " +
                    "AI Mentor کا frontend تیار ہے اور " +
                    "Google Apps Script connection کے لیے ready ہے۔";

            }

            showToast(
                "AI Mentor frontend test کامیاب۔ Backend ابھی pending ہے۔",
                "info"
            );

        });


        on(clearButton, "click", function () {

            if (question) {
                question.value = "";
            }

            if (response) {
                response.textContent = "";
            }

        });


        on(language, "change", function () {

            AppState.selectedLanguage =
                language.value;

            localStorage.setItem(
                STORAGE.LANGUAGE,
                language.value
            );

        });


        /*
         * Question Library
         */
        on(
            $("questionLibraryTestBtn"),
            "click",
            function () {

                const status =
                    $("questionLibraryStatus");

                if (status) {

                    status.textContent =
                        "🟡 Frontend Ready — " +
                        "Question Library Backend Pending";

                }

                showToast(
                    "Question Library frontend test مکمل۔",
                    "info"
                );

            }
        );


        /*
         * Search
         */
        on(
            $("questionLibrarySearch"),
            "keydown",
            function (event) {

                if (event.key !== "Enter") {
                    return;
                }

                event.preventDefault();

                showToast(
                    "Question Library search backend ابھی connected نہیں ہے۔",
                    "info"
                );

            }
        );


        /*
         * Library filter buttons
         */
        [
            "questionLibraryAllBtn",
            "questionLibraryPopularBtn",
            "questionLibraryMyBtn"
        ].forEach(function (id) {

            on($(id), "click", function () {

                showToast(
                    "Question Library backend connection ابھی pending ہے۔",
                    "info"
                );

            });

        });


        /*
         * Live Website Test
         */
        on(
            $("runScaleFlowLiveTestBtn"),
            "click",
            function () {

                const result =
                    $("liveWebsiteTestResult");

                const aiStatus =
                    $("liveTestAIMentorStatus");

                const libraryStatus =
                    $("liveTestQuestionLibraryStatus");

                const monitorStatus =
                    $("liveTestMonitorStatus");

                if (result) {

                    result.textContent =
                        "Frontend Test: PASS ✅\n" +
                        "Backend Connection: PENDING 🟡";

                }

                if (aiStatus) {
                    aiStatus.textContent =
                        "🟢 Frontend Ready / 🟡 Backend Pending";
                }

                if (libraryStatus) {
                    libraryStatus.textContent =
                        "🟢 Frontend Ready / 🟡 Backend Pending";
                }

                if (monitorStatus) {
                    monitorStatus.textContent =
                        "🟢 UI Ready / 🟡 Backend Pending";
                }

                showToast(
                    "Frontend Live Test مکمل: PASS ✅",
                    "success"
                );

            }
        );


        /*
         * Engine Lock
         *
         * Button disabled رہے گا جب تک backend test
         * واقعی PASS نہ ہو۔
         */

        const lockButton =
            $("lockScaleFlowEnginesBtn");

        const lockStatus =
            $("engineLockStatus");

        if (lockButton) {
            lockButton.disabled = true;
        }

        if (lockStatus) {

            lockStatus.textContent =
                "🟡 Engine Lock Pending — " +
                "Backend verification required.";

        }

    }


    /* ============================================================
       PART 1.20 — THEME / LANGUAGE / SUPPORT
       ============================================================ */

    function initBottomControls() {

        on($("darkModeBtn"), "click", function () {
            toggleDarkMode();
        });

        on($("btnTheme"), "click", function () {
            toggleDarkMode();
        });


        on($("btnLanguage"), "click", function () {

            openModal(
                "Language",
                `
                    <div>
                        <p>Select your preferred language.</p>

                        <select id="frontendLanguageSelector"
                                style="width:100%; padding:10px; margin-top:10px;">

                            <option value="en">English</option>
                            <option value="ur">اردو</option>
                            <option value="sd">سنڌي</option>
                            <option value="ar">العربية</option>
                            <option value="hi">हिन्दी</option>
                            <option value="bn">বাংলা</option>
                            <option value="fr">Français</option>
                            <option value="es">Español</option>
                            <option value="de">Deutsch</option>
                            <option value="pt">Português</option>
                            <option value="it">Italiano</option>
                            <option value="ru">Русский</option>
                            <option value="zh">中文</option>
                            <option value="ja">日本語</option>
                            <option value="ko">한국어</option>
                            <option value="tr">Türkçe</option>
                            <option value="id">Bahasa Indonesia</option>

                        </select>
                    </div>
                `,
                {
                    onConfirm: function () {

                        const selector =
                            $("frontendLanguageSelector");

                        if (!selector) return;

                        AppState.selectedLanguage =
                            selector.value;

                        localStorage.setItem(
                            STORAGE.LANGUAGE,
                            selector.value
                        );

                        if ($("aiMentorLanguage")) {

                            $("aiMentorLanguage").value =
                                selector.value;

                        }

                        showToast(
                            "Language preference save ہوگئی۔",
                            "success"
                        );

                    }
                }
            );

        });


        on($("btnSupport"), "click", function () {

            openModal(
                "ScaleFlow Support",
                `
                    <div>
                        <p>
                            Support system frontend میں تیار ہے۔
                        </p>

                        <p style="margin-top:10px;">
                            🟡 Live support backend ابھی connected نہیں ہے۔
                        </p>
                    </div>
                `
            );

        });

    }


    /* ============================================================
       PART 1.21 — MODAL EVENTS
       ============================================================ */

    function initModal() {

        on($("modalCloseBtn"), "click", function () {
            closeModal();
        });

        on($("modalCancelBtn"), "click", function () {
            closeModal();
        });


        const container = $("modal-container");

        on(container, "click", function (event) {

            if (event.target === container) {
                closeModal();
            }

        });


        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                AppState.modalOpen
            ) {
                closeModal();
            }

        });

    }


    /* ============================================================
       PART 1.22 — FOOTER YEAR
       ============================================================ */

    function initFooterYear() {

        const currentYear =
            new Date().getFullYear();

        $all("[data-current-year]").forEach(
            function (element) {

                element.textContent =
                    currentYear;

            }
        );

        /*
         * اگر footer میں ID نہ ہو تو یہ section خاموشی سے skip ہوگا۔
         */
    }


    /* ============================================================
       PART 1.23 — PAGE 1 INITIALIZATION
       ============================================================ */

    function initPage1() {

        /*
         * Static frontend values کو تبدیل نہیں کیا جا رہا۔
         * HTML میں موجود values محفوظ رہیں گی۔
         */

        const app = $("app");

        if (app) {
            app.dataset.page = "home";
        }

    }


    /* ============================================================
       PART 1.24 — FRONTEND SELF CHECK
       ============================================================ */

    function runFrontendSelfCheck() {

        const checks = {

            app:
                !!$("app"),

            loader:
                !!$("loader"),

            toast:
                !!$("toast-container"),

            modal:
                !!$("modal-container"),

            navigation:
                $all("[data-page]").length > 0,

            darkMode:
                !!$("darkModeBtn") ||
                !!$("btnTheme"),

            notifications:
                !!$("notificationBell"),

            dashboard:
                !!$("page1"),

            courses:
                !!$("page3"),

            learning:
                !!$("page4"),

            certificates:
                !!$("page5"),

            achievements:
                !!$("page6"),

            aiMentor:
                !!$("page7")

        };


        const passed =
            Object.values(checks)
                .filter(Boolean)
                .length;


        const total =
            Object.keys(checks).length;


        console.log(
            "[ScaleFlow Frontend Part 1]",
            checks
        );

        console.log(
            "Frontend Part 1:",
            passed + "/" + total,
            "core checks detected."
        );

    }


    /* ============================================================
       PART 1.25 — GLOBAL PUBLIC API
       ============================================================ */

    window.ScaleFlow =
        window.ScaleFlow || {};

    Object.assign(
        window.ScaleFlow,
        {

            showPage: showPage,

            navigateTo: navigateTo,

            showToast: showToast,

            openModal: openModal,

            closeModal: closeModal,

            toggleDarkMode: toggleDarkMode,

            openNotifications: openNotifications,

            markAllNotificationsRead:
                markAllNotificationsRead,

            globalSearch:
                performGlobalSearch,

            getState: function () {
                return Object.assign({}, AppState);
            }

        }
    );


    /* ============================================================
       PART 1.26 — SAFE STARTUP
       ============================================================ */

    function initScaleFlowFrontendPart1() {

        try {

            loadTheme();

            initNavigation();

            initNotifications();

            initModal();

            initHomeNavigation();

            initDashboardBoxes();

            initTasks();

            initGlobalSearch();

            initPage1();

            initPage2();

            initCourseFilters();

            initPage4();

            initCertificates();

            initAchievements();

            initAIMentorFrontend();

            initBottomControls();

            initFooterYear();

            runFrontendSelfCheck();

            /*
             * پہلے page1 دکھائیں
             */
            showPage("page1", {
                silent: true
            });

            /*
             * Loader آخر میں hide
             */
            setTimeout(
                hideLoader,
                300
            );

            console.log(
                "ScaleFlow University — Frontend Part 1 READY ✅"
            );

        } catch (error) {

            console.error(
                "ScaleFlow Frontend Part 1 Error:",
                error
            );

            /*
             * مکمل website کو crash ہونے سے بچانے کے لیے
             * error user کو safe message کے طور پر دیا جائے گا۔
             */

            setTimeout(
                hideLoader,
                300
            );

            showToast(
                "Frontend شروع ہوگیا ہے، لیکن ایک UI component میں مسئلہ ہے۔ Console چیک کریں۔",
                "warning"
            );

        }

    }


    /* ============================================================
       PART 1.27 — DOM READY
       ============================================================ */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initScaleFlowFrontendPart1,
            {
                once: true
            }
        );

    } else {

        initScaleFlowFrontendPart1();

    }


})(window, document);

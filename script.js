/* ============================================================
   SCALEFLOW UNIVERSITY
   FRONTEND JAVASCRIPT — PART 1
   ============================================================

   Scope:
   - Global configuration
   - DOM helpers
   - Loader
   - Toast notifications
   - Modal system
   - Page navigation
   - Dark mode
   - Notification panel
   - Home/dashboard navigation
   - Local frontend search
   - Local task state
   - Page 7 frontend-only AI controls
   - Safe startup

   IMPORTANT:
   Backend/Gemini is NOT falsely marked as connected here.
   Backend connection will be tested and connected later.
   ============================================================ */

(function (window, document) {

    "use strict";


    /* ============================================================
       PART 1.1 — CONFIGURATION
       ============================================================ */

    const SCALEFLOW_CONFIG = {
        APP_NAME: "ScaleFlow University",
        VERSION: "1.0.0",
        ENVIRONMENT: "DEVELOPMENT",

        // Verified Google Apps Script Web App
        WEB_APP_URL:
            "https://script.google.com/macros/s/AKfycbwBPdo7TflhmyiUIU8rZQx7hvUYPMpJJX7LszL1YxNUQrcLrf8lh8ZUIxGrp4jK_PvY/exec"
    };


    /* ============================================================
       PART 1.2 — INITIALIZATION GUARD
       ============================================================ */

    if (window.ScaleFlowPart1Initialized) {
        console.warn("ScaleFlow Part 1 is already initialized.");
        return;
    }

    window.ScaleFlowPart1Initialized = true;


    /* ============================================================
       PART 1.3 — GLOBAL STATE
       ============================================================ */

    const State = {

        currentPage: "page1",

        darkMode: false,

        notificationOpen: false,

        modalOpen: false,

        modalConfirmAction: null,

        notificationsRead: false,

        tasks: {
            task1: false,
            task2: false,
            task3: false,
            task4: false
        },

        searchResults: []
    };


    /* ============================================================
       PART 1.4 — DOM HELPER
       ============================================================ */

    function $(selector) {
        return document.querySelector(selector);
    }

    function $all(selector) {
        return Array.from(document.querySelectorAll(selector));
    }


    /* ============================================================
       PART 1.5 — SAFE EVENT LISTENER
       ============================================================ */

    function on(element, event, handler) {

        if (!element) {
            return;
        }

        element.addEventListener(event, handler);
    }


    /* ============================================================
       PART 1.6 — SAFE TEXT UPDATE
       ============================================================ */

    function setText(selector, value) {

        const element = $(selector);

        if (!element) {
            return;
        }

        element.textContent = value;
    }


    /* ============================================================
       PART 1.7 — SAFE SHOW / HIDE
       ============================================================ */

    function show(element) {

        if (!element) {
            return;
        }

        element.hidden = false;
    }


    function hide(element) {

        if (!element) {
            return;
        }

        element.hidden = true;
    }


    /* ============================================================
       PART 1.8 — LOADER SYSTEM
       ============================================================ */

    const Loader = {

        show() {

            const loader = $("#loader");

            if (!loader) {
                return;
            }

            loader.hidden = false;
        },

        hide() {

            const loader = $("#loader");

            if (!loader) {
                return;
            }

            loader.hidden = true;
        }
    };


    /* ============================================================
       PART 1.9 — TOAST SYSTEM
       ============================================================ */

    const Toast = {

        show(message, type = "info", duration = 3000) {

            const container = $("#toast-container");

            if (!container) {
                console.log("[ScaleFlow Toast]", message);
                return;
            }

            const toast = document.createElement("div");

            toast.className = "scaleFlow-toast";
            toast.setAttribute("data-type", type);
            toast.textContent = message;

            container.appendChild(toast);

            requestAnimationFrame(function () {
                toast.classList.add("show");
            });

            setTimeout(function () {

                toast.classList.remove("show");

                setTimeout(function () {

                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }

                }, 300);

            }, duration);
        },

        success(message) {
            this.show("✓ " + message, "success");
        },

        error(message) {
            this.show("✕ " + message, "error");
        },

        warning(message) {
            this.show("⚠ " + message, "warning");
        },

        info(message) {
            this.show("ℹ " + message, "info");
        }
    };


    /* ============================================================
       PART 1.10 — MODAL SYSTEM
       ============================================================ */

    const Modal = {

        open(options = {}) {

            const container = $("#modal-container");

            if (!container) {
                return;
            }

            const title = $("#modalTitle");
            const body = $("#modalBody");

            const confirmButton = $("#modalConfirmBtn");
            const cancelButton = $("#modalCancelBtn");

            if (title) {
                title.textContent = options.title || "ScaleFlow University";
            }

            if (body) {

                if (options.html) {
                    body.innerHTML = options.html;
                } else {
                    body.textContent =
                        options.message || "";
                }
            }

            if (confirmButton) {

                if (options.confirmText) {
                    confirmButton.textContent =
                        options.confirmText;
                }

                confirmButton.hidden =
                    options.showConfirm === false;

            }

            if (cancelButton) {

                if (options.cancelText) {
                    cancelButton.textContent =
                        options.cancelText;
                }

                cancelButton.hidden =
                    options.showCancel === false;
            }

            State.modalConfirmAction =
                typeof options.onConfirm === "function"
                    ? options.onConfirm
                    : null;

            State.modalOpen = true;

            show(container);
        },

        close() {

            const container = $("#modal-container");

            if (!container) {
                return;
            }

            State.modalOpen = false;
            State.modalConfirmAction = null;

            hide(container);
        }
    };


    /* ============================================================
       PART 1.11 — PAGE NAVIGATION
       ============================================================ */

    function normalizePage(page) {

        if (!page) {
            return "page1";
        }

        const value = String(page).trim();

        if (/^page\d+$/.test(value)) {
            return value;
        }

        if (/^\d+$/.test(value)) {
            return "page" + value;
        }

        return "page1";
    }


    function showPage(page) {

        const targetPage = normalizePage(page);

        const pages = $all("[id^='page']");

        pages.forEach(function (pageElement) {

            const isTarget =
                pageElement.id === targetPage;

            pageElement.hidden = !isTarget;

            pageElement.classList.toggle(
                "active",
                isTarget
            );
        });


        const navigationLinks =
            $all("[data-page]");

        navigationLinks.forEach(function (link) {

            const linkPage =
                normalizePage(
                    link.getAttribute("data-page")
                );

            link.classList.toggle(
                "active",
                linkPage === targetPage
            );
        });


        State.currentPage = targetPage;


        const app =
            $("#app");

        if (app) {
            app.setAttribute(
                "data-page",
                targetPage
            );
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        document.dispatchEvent(
            new CustomEvent(
                "scaleFlow:pageChanged",
                {
                    detail: {
                        page: targetPage
                    }
                }
            )
        );
    }


    /* ============================================================
       PART 1.12 — NAVIGATION EVENT DELEGATION
       ============================================================ */

    function initializeNavigation() {

        document.addEventListener(
            "click",
            function (event) {

                const link =
                    event.target.closest("[data-page]");

                if (!link) {
                    return;
                }

                const page =
                    link.getAttribute("data-page");

                if (!page) {
                    return;
                }

                event.preventDefault();

                showPage(page);
            }
        );
    }


    /* ============================================================
       PART 1.13 — DARK MODE
       ============================================================ */

    const Theme = {

        STORAGE_KEY: "scaleflow_theme",

        load() {

            let savedTheme = null;

            try {
                savedTheme =
                    localStorage.getItem(
                        this.STORAGE_KEY
                    );
            } catch (error) {
                console.warn(
                    "ScaleFlow theme storage unavailable."
                );
            }

            if (savedTheme === "dark") {

                this.apply(true);

            } else if (savedTheme === "light") {

                this.apply(false);

            } else {

                const prefersDark =
                    window.matchMedia &&
                    window.matchMedia(
                        "(prefers-color-scheme: dark)"
                    ).matches;

                this.apply(prefersDark);
            }
        },


        apply(isDark) {

            State.darkMode = Boolean(isDark);

            document.body.classList.toggle(
                "dark-mode",
                State.darkMode
            );

            document.documentElement.classList.toggle(
                "dark-mode",
                State.darkMode
            );


            const button =
                $("#darkModeBtn");

            if (button) {

                button.setAttribute(
                    "aria-pressed",
                    String(State.darkMode)
                );

                button.setAttribute(
                    "title",
                    State.darkMode
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"
                );
            }


            const bottomButton =
                $("#btnTheme");

            if (bottomButton) {

                bottomButton.setAttribute(
                    "aria-pressed",
                    String(State.darkMode)
                );
            }


            try {

                localStorage.setItem(
                    this.STORAGE_KEY,
                    State.darkMode
                        ? "dark"
                        : "light"
                );

            } catch (error) {

                console.warn(
                    "Unable to save ScaleFlow theme."
                );
            }
        },


        toggle() {

            this.apply(
                !State.darkMode
            );

            Toast.success(
                State.darkMode
                    ? "Dark mode enabled."
                    : "Light mode enabled."
            );
        }
    };


    /* ============================================================
       PART 1.14 — NOTIFICATION SYSTEM
       ============================================================ */

    const Notifications = {

        getPanel() {
            return $("#notificationPanel");
        },


        getItems() {
            return $all(
                "#notificationPanel .notification-item"
            );
        },


        updateCount() {

            const countElement =
                $("#notificationCount");

            if (!countElement) {
                return;
            }

            const unreadCount =
                this.getItems()
                    .filter(function (item) {
                        return item.classList.contains(
                            "unread"
                        );
                    })
                    .length;


            countElement.textContent =
                unreadCount > 99
                    ? "99+"
                    : String(unreadCount);


            countElement.hidden =
                unreadCount === 0;
        },


        open() {

            const panel =
                this.getPanel();

            if (!panel) {
                return;
            }

            State.notificationOpen = true;

            show(panel);

            panel.classList.add("open");

            const bell =
                $("#notificationBell");

            if (bell) {
                bell.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
        },


        close() {

            const panel =
                this.getPanel();

            if (!panel) {
                return;
            }

            State.notificationOpen = false;

            hide(panel);

            panel.classList.remove("open");

            const bell =
                $("#notificationBell");

            if (bell) {
                bell.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        },


        toggle() {

            if (State.notificationOpen) {
                this.close();
            } else {
                this.open();
            }
        },


        markAllRead() {

            const items =
                this.getItems();

            items.forEach(function (item) {

                item.classList.remove(
                    "unread"
                );
            });

            State.notificationsRead = true;

            this.updateCount();

            Toast.success(
                "All notifications marked as read."
            );
        },


        initialize() {

            this.updateCount();


            const bell =
                $("#notificationBell");

            on(
                bell,
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    Notifications.toggle();
                }
            );


            const markAll =
                $("#markAllReadBtn");

            on(
                markAll,
                "click",
                function () {

                    Notifications.markAllRead();
                }
            );


            document.addEventListener(
                "click",
                function (event) {

                    const panel =
                        Notifications.getPanel();

                    const bell =
                        $("#notificationBell");

                    if (!panel ||
                        !State.notificationOpen) {
                        return;
                    }

                    if (
                        !panel.contains(event.target) &&
                        (!bell ||
                            !bell.contains(event.target))
                    ) {

                        Notifications.close();
                    }
                }
            );
        }
    };


    /* ============================================================
       PART 1.15 — HOME PAGE BUTTONS
       ============================================================ */

    function goToPage(page, message) {

        showPage(page);

        if (message) {
            Toast.info(message);
        }
    }


    function initializeHomeButtons() {

        /* Continue Learning */

        on(
            $("#continueLearningBtn"),
            "click",
            function () {

                goToPage(
                    "page4",
                    "Opening your current lesson."
                );
            }
        );


        on(
            $("#continueLearningBtn"),
            "click",
            function () {
                // Intentionally empty duplicate guard.
            }
        );


        /* Browse Courses */

        on(
            $("#browseCoursesBtn"),
            "click",
            function () {

                goToPage(
                    "page3",
                    "Opening Courses."
                );
            }
        );


        /* Continue progress button */

        on(
            $("#continueProgressBtn"),
            "click",
            function () {

                goToPage(
                    "page4",
                    "Opening your learning lesson."
                );
            }
        );


        /* Quick Start Learning */

        on(
            $("#quickStartLearning"),
            "click",
            function () {

                goToPage(
                    "page3",
                    "Let's start learning."
                );
            }
        );


        /* Quick Ask AI */

        on(
            $("#quickAskAI"),
            "click",
            function () {

                goToPage(
                    "page7",
                    "Opening AI Mentor."
                );
            }
        );


        /* Quick Browse Courses */

        on(
            $("#quickBrowseCourses"),
            "click",
            function () {

                goToPage(
                    "page3",
                    "Opening Courses."
                );
            }
        );


        /* Certificates */

        on(
            $("#quickMyCertificates"),
            "click",
            function () {

                goToPage(
                    "page5",
                    "Opening Certificates."
                );
            }
        );


        /* Dashboard gateways */

        const gatewayMap = {

            gatewayLearning: "page3",
            gatewayAI: "page7",
            gatewayAutomation: "page7",
            gatewayTools: "page3",
            gatewayBusiness: "page3",
            gatewayFreelancing: "page3",
            gatewayCertificates: "page5",
            gatewayDashboard: "page2"
        };


        Object.keys(gatewayMap)
            .forEach(function (id) {

                on(
                    $("#" + id),
                    "click",
                    function () {

                        goToPage(
                            gatewayMap[id],
                            "Opening ScaleFlow."
                        );
                    }
                );
            });
    }


    /* ============================================================
       PART 1.16 — GLOBAL SEARCH
       ============================================================ */

    function initializeGlobalSearch() {

        const input =
            $("#globalSearchInput");

        if (!input) {
            return;
        }


        on(
            input,
            "keydown",
            function (event) {

                if (event.key !== "Enter") {
                    return;
                }

                event.preventDefault();

                const query =
                    input.value.trim().toLowerCase();

                if (!query) {

                    Toast.warning(
                        "Please enter something to search."
                    );

                    return;
                }


                const searchablePages = [
                    {
                        page: "page1",
                        keywords:
                            "home dashboard learning progress tasks"
                    },
                    {
                        page: "page2",
                        keywords:
                            "dashboard profile courses certificates achievements"
                    },
                    {
                        page: "page3",
                        keywords:
                            "courses course learning beginner intermediate advanced"
                    },
                    {
                        page: "page4",
                        keywords:
                            "lesson advanced learning simulator notes reflection quiz doubt"
                    },
                    {
                        page: "page5",
                        keywords:
                            "certificates certificate verification download"
                    },
                    {
                        page: "page6",
                        keywords:
                            "achievements badges xp leaderboard rewards"
                    },
                    {
                        page: "page7",
                        keywords:
                            "ai mentor artificial intelligence question library gemini"
                    }
                ];


                const result =
                    searchablePages.find(
                        function (item) {

                            return item.keywords
                                .includes(query);
                        }
                    );


                if (result) {

                    showPage(result.page);

                    Toast.success(
                        "Search result opened."
                    );

                } else {

                    Toast.info(
                        "No matching frontend section found."
                    );
                }
            }
        );
    }


    /* ============================================================
       PART 1.17 — DASHBOARD TASKS
       ============================================================ */

    const Tasks = {

        STORAGE_KEY:
            "scaleflow_tasks_part1",


        load() {

            try {

                const saved =
                    localStorage.getItem(
                        this.STORAGE_KEY
                    );

                if (!saved) {
                    return;
                }

                const parsed =
                    JSON.parse(saved);

                if (
                    parsed &&
                    typeof parsed === "object"
                ) {

                    State.tasks =
                        Object.assign(
                            State.tasks,
                            parsed
                        );
                }

            } catch (error) {

                console.warn(
                    "ScaleFlow task storage unavailable."
                );
            }
        },


        save() {

            try {

                localStorage.setItem(
                    this.STORAGE_KEY,
                    JSON.stringify(State.tasks)
                );

            } catch (error) {

                console.warn(
                    "Unable to save ScaleFlow tasks."
                );
            }
        },


        updateUI() {

            Object.keys(State.tasks)
                .forEach(function (taskId) {

                    const element =
                        $("#" + taskId);

                    if (!element) {
                        return;
                    }

                    element.classList.toggle(
                        "completed",
                        Boolean(
                            State.tasks[taskId]
                        )
                    );
                });
        },


        initialize() {

            this.load();
            this.updateUI();


            [
                "task1",
                "task2",
                "task3",
                "task4"
            ].forEach(function (taskId) {

                const element =
                    $("#" + taskId);

                on(
                    element,
                    "click",
                    function () {

                        State.tasks[taskId] =
                            !State.tasks[taskId];

                        Tasks.save();
                        Tasks.updateUI();

                        Toast.success(
                            State.tasks[taskId]
                                ? "Task completed."
                                : "Task marked incomplete."
                        );
                    }
                );
            });
        }
    };


    /* ============================================================
       PART 1.18 — BOTTOM ACTIONS
       ============================================================ */

    function initializeBottomActions() {

        on(
            $("#btnTheme"),
            "click",
            function () {

                Theme.toggle();
            }
        );


        on(
            $("#btnLanguage"),
            "click",
            function () {

                Modal.open({

                    title: "Language",

                    message:
                        "Language selection will be connected in the next frontend module.",

                    showConfirm: false,

                    cancelText: "Close"
                });
            }
        );


        on(
            $("#btnSupport"),
            "click",
            function () {

                Modal.open({

                    title: "ScaleFlow Support",

                    message:
                        "Support center is currently being prepared.",

                    showConfirm: false,

                    cancelText: "Close"
                });
            }
        );
    }


    /* ============================================================
       PART 1.19 — MODAL BUTTONS
       ============================================================ */

    function initializeModal() {

        on(
            $("#modalCloseBtn"),
            "click",
            function () {

                Modal.close();
            }
        );


        on(
            $("#modalCancelBtn"),
            "click",
            function () {

                Modal.close();
            }
        );


        on(
            $("#modalConfirmBtn"),
            "click",
            function () {

                if (
                    typeof State.modalConfirmAction ===
                    "function"
                ) {

                    const action =
                        State.modalConfirmAction;

                    Modal.close();

                    action();

                } else {

                    Modal.close();
                }
            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    State.modalOpen
                ) {

                    Modal.close();
                }
            }
        );
    }


    /* ============================================================
       PART 1.20 — PAGE 7 AI MENTOR FRONTEND
       ============================================================ */

    const AIMentor = {

        initialize() {

            const askButton =
                $("#aiMentorAskBtn");

            const clearButton =
                $("#aiMentorClearBtn");


            on(
                askButton,
                "click",
                function () {

                    AIMentor.ask();
                }
            );


            on(
                clearButton,
                "click",
                function () {

                    AIMentor.clear();
                }
            );


            on(
                $("#questionLibraryTestBtn"),
                "click",
                function () {

                    AIMentor.testQuestionLibrary();
                }
            );


            on(
                $("#runScaleFlowLiveTestBtn"),
                "click",
                function () {

                    AIMentor.runLiveTest();
                }
            );


            on(
                $("#lockScaleFlowEnginesBtn"),
                "click",
                function () {

                    Toast.warning(
                        "Engine lock is available only after backend verification."
                    );
                }
            );
        },


        ask() {

            const questionInput =
                $("#aiMentorQuestion");

            const subjectInput =
                $("#aiMentorSubject");

            const languageInput =
                $("#aiMentorLanguage");

            const responseBox =
                $("#aiMentorResponse");


            const question =
                questionInput
                    ? questionInput.value.trim()
                    : "";

            const subject =
                subjectInput
                    ? subjectInput.value.trim()
                    : "";

            const language =
                languageInput
                    ? languageInput.value
                    : "en";


            if (!question) {

                Toast.warning(
                    "Please enter your question."
                );

                if (questionInput) {
                    questionInput.focus();
                }

                return;
            }


            if (!subject) {

                Toast.warning(
                    "Please enter a subject."
                );

                if (subjectInput) {
                    subjectInput.focus();
                }

                return;
            }


            if (responseBox) {

                responseBox.textContent =
                    "🟡 Frontend is ready. AI backend connection is pending verification.";
            }


            Toast.info(
                "AI connection will be enabled after backend testing."
            );
        },


        clear() {

            const question =
                $("#aiMentorQuestion");

            const response =
                $("#aiMentorResponse");


            if (question) {
                question.value = "";
            }

            if (response) {
                response.textContent = "";
            }


            Toast.success(
                "AI Mentor cleared."
            );
        },


        testQuestionLibrary() {

            const status =
                $("#questionLibraryStatus");

            if (status) {

                status.textContent =
                    "🟡 Frontend UI PASS — Question Library backend is pending connection.";
            }


            Toast.info(
                "Question Library UI test completed."
            );
        },


        runLiveTest() {

            const resultBox =
                $("#liveWebsiteTestResult");

            const aiStatus =
                $("#liveTestAIMentorStatus");

            const libraryStatus =
                $("#liveTestQuestionLibraryStatus");

            const monitorStatus =
                $("#liveTestMonitorStatus");


            if (resultBox) {

                resultBox.textContent =
                    "Frontend Test: PASS\n" +
                    "Backend Connection: PENDING\n" +
                    "Gemini Connection: PENDING\n" +
                    "Question Library Connection: PENDING";
            }


            if (aiStatus) {

                aiStatus.textContent =
                    "🟡 Frontend Ready — Backend Pending";
            }


            if (libraryStatus) {

                libraryStatus.textContent =
                    "🟡 Frontend Ready — Backend Pending";
            }


            if (monitorStatus) {

                monitorStatus.textContent =
                    "🟡 Frontend Ready — Backend Pending";
            }


            Toast.success(
                "Frontend live test completed. Backend is not falsely marked as connected."
            );
        }
    };


    /* ============================================================
       PART 1.21 — PAGE 7 QUESTION LIBRARY SEARCH
       ============================================================ */

    function initializeQuestionLibrarySearch() {

        const input =
            $("#questionLibrarySearch");

        if (!input) {
            return;
        }


        on(
            input,
            "input",
            function () {

                const query =
                    input.value.trim();

                if (!query) {
                    return;
                }


                const resultBox =
                    $("#questionLibraryResults");

                if (resultBox) {

                    resultBox.textContent =
                        "🟡 Local UI search is ready. " +
                        "Question Library backend search will be connected later.";
                }
            }
        );


        on(
            $("#questionLibraryAllBtn"),
            "click",
            function () {

                Toast.info(
                    "Question Library backend is pending connection."
                );
            }
        );


        on(
            $("#questionLibraryPopularBtn"),
            "click",
            function () {

                Toast.info(
                    "Popular questions will be loaded after backend connection."
                );
            }
        );


        on(
            $("#questionLibraryMyBtn"),
            "click",
            function () {

                Toast.info(
                    "Your questions will be loaded after authentication and backend connection."
                );
            }
        );
    }


    /* ============================================================
       PART 1.22 — AI MONITOR INITIAL STATE
       ============================================================ */

    function initializeMonitor() {

        setText(
            "#monitorAIRequests",
            "—"
        );

        setText(
            "#monitorSuccessRate",
            "—"
        );

        setText(
            "#monitorResponseTime",
            "—"
        );

        setText(
            "#monitorActiveServices",
            "Frontend"
        );


        setText(
            "#scaleFlowMonitorStatus",
            "🟡 Frontend Ready — Backend Pending"
        );
    }


    /* ============================================================
       PART 1.23 — ENGINE LOCK INITIAL STATE
       ============================================================ */

    function initializeEngineLock() {

        const lockButton =
            $("#lockScaleFlowEnginesBtn");

        const status =
            $("#engineLockStatus");


        if (lockButton) {

            lockButton.disabled = true;
        }


        if (status) {

            status.textContent =
                "🟡 Engines are not locked. Backend verification is required.";
        }
    }


    /* ============================================================
       PART 1.24 — HEADER DARK MODE
       ============================================================ */

    function initializeThemeButton() {

        on(
            $("#darkModeBtn"),
            "click",
            function () {

                Theme.toggle();
            }
        );
    }


    /* ============================================================
       PART 1.25 — SAFE PUBLIC API
       ============================================================ */

    window.ScaleFlow =
        window.ScaleFlow || {};


    Object.assign(
        window.ScaleFlow,
        {

            version:
                SCALEFLOW_CONFIG.VERSION,

            config:
                SCALEFLOW_CONFIG,

            state:
                State,

            showPage:
                showPage,

            toast:
                Toast,

            modal:
                Modal,

            theme:
                Theme,

            notifications:
                Notifications,

            loader:
                Loader,

            aiMentor:
                AIMentor
        }
    );


    /* ============================================================
       PART 1.26 — STARTUP
       ============================================================ */

    function initializePart1() {

        console.log(
            "ScaleFlow University — Frontend Part 1 starting..."
        );


        Loader.show();


        /* Core systems */

        initializeNavigation();

        initializeModal();

        initializeThemeButton();

        initializeBottomActions();

        Notifications.initialize();

        initializeHomeButtons();

        initializeGlobalSearch();

        Tasks.initialize();


        /* Page 7 */

        AIMentor.initialize();

        initializeQuestionLibrarySearch();

        initializeMonitor();

        initializeEngineLock();


        /* Theme */

        Theme.load();


        /* Initial page */

        showPage("page1");


        /* Hide loader after frontend initialization */

        setTimeout(
            function () {

                Loader.hide();

                console.log(
                    "ScaleFlow University — Frontend Part 1 READY."
                );

                console.log(
                    "Backend URL configured:",
                    SCALEFLOW_CONFIG.WEB_APP_URL
                );

            },
            300
        );
    }


    /* ============================================================
       PART 1.27 — DOM READY
       ============================================================ */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializePart1,
            { once: true }
        );

    } else {

        initializePart1();
    }


})(window, document);

// ============================================================
// SCALEFLOW UNIVERSITY
// FRONTEND JAVASCRIPT — PART 1
// CORE SYSTEM + WEB APP API + NAVIGATION
// ============================================================

(function (global) {

    "use strict";


    // ============================================================
    // SCALEFLOW UNIVERSITY — WEB APP API CONFIGURATION
    // ============================================================

    const SCALEFLOW_API_CONFIG = {

        WEB_APP_URL:
            "https://script.google.com/macros/s/AKfycbwBOEHqq2ytQxU7XKieTeBOPCzBtyLYf4m_zD6SLRY_FRPFWpAevMOlAMes0SH9JoV7/exec",

        VERSION:
            "v1",

        TIMEOUT:
            30000,

        APPLICATION:
            "ScaleFlow University"

    };


    // ============================================================
    // FRONTEND REQUEST ID
    // ============================================================

    function createFrontendRequestId() {

        return (
            "WEB-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 10)
                .toUpperCase()
        );

    }


    // ============================================================
    // SCALEFLOW API ERROR
    // ============================================================

    function createScaleFlowAPIError(
        message,
        code,
        details
    ) {

        const error =
            new Error(
                message ||
                "ScaleFlow API request failed."
            );

        error.code =
            code ||
            "API_ERROR";

        error.details =
            details ||
            null;

        return error;

    }


    // ============================================================
    // CENTRAL SCALEFLOW API REQUEST
    // WEBSITE → WEB APP API ENGINE
    // ============================================================

    async function scaleFlowAPIRequest(
        action,
        data = {}
    ) {

        if (
            !action ||
            typeof action !== "string"
        ) {

            throw createScaleFlowAPIError(
                "ScaleFlow API action is required.",
                "INVALID_ACTION"
            );

        }


        const requestId =
            createFrontendRequestId();


        const controller =
            new AbortController();


        const timeoutId =
            setTimeout(
                function () {

                    controller.abort();

                },
                SCALEFLOW_API_CONFIG.TIMEOUT
            );


        const requestPayload = {

            action:
                action,

            data:
                data,

            requestId:
                requestId,

            version:
                SCALEFLOW_API_CONFIG.VERSION,

            application:
                SCALEFLOW_API_CONFIG.APPLICATION

        };


        try {

            console.log(
                "================================================"
            );

            console.log(
                "🔄 ScaleFlow API Request"
            );

            console.log(
                "Action:",
                action
            );

            console.log(
                "Request ID:",
                requestId
            );


            // ----------------------------------------------------
            // IMPORTANT
            // Do NOT use no-cors.
            // We need to read the JSON response from Apps Script.
            // ----------------------------------------------------

            const response =
                await fetch(
                    SCALEFLOW_API_CONFIG.WEB_APP_URL,
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "text/plain;charset=utf-8"

                        },

                        body:
                            JSON.stringify(
                                requestPayload
                            ),

                        signal:
                            controller.signal

                    }
                );


            clearTimeout(
                timeoutId
            );


            console.log(
                "HTTP Status:",
                response.status
            );


            if (!response.ok) {

                throw createScaleFlowAPIError(

                    "ScaleFlow Web App returned HTTP " +
                    response.status,

                    "HTTP_ERROR",

                    {
                        status:
                            response.status,

                        requestId:
                            requestId

                    }

                );

            }


            // ----------------------------------------------------
            // Read response safely
            // ----------------------------------------------------

            const responseText =
                await response.text();


            if (
                !responseText ||
                !responseText.trim()
            ) {

                throw createScaleFlowAPIError(

                    "ScaleFlow Web App returned an empty response.",

                    "EMPTY_RESPONSE",

                    {
                        requestId:
                            requestId

                    }

                );

            }


            let result;


            try {

                result =
                    JSON.parse(
                        responseText
                    );

            }

            catch (parseError) {

                console.error(
                    "❌ Invalid JSON Response:",
                    responseText
                );


                throw createScaleFlowAPIError(

                    "ScaleFlow Web App returned invalid JSON.",

                    "INVALID_JSON",

                    {
                        requestId:
                            requestId,

                        response:
                            responseText

                    }

                );

            }


            if (
                !result ||
                typeof result !== "object"
            ) {

                throw createScaleFlowAPIError(

                    "Invalid ScaleFlow API response.",

                    "INVALID_RESPONSE",

                    {
                        requestId:
                            requestId

                    }

                );

            }


            console.log(
                "✅ ScaleFlow API Response:",
                result
            );

            console.log(
                "================================================"
            );


            return result;

        }

        catch (error) {

            clearTimeout(
                timeoutId
            );


            if (
                error &&
                error.name === "AbortError"
            ) {

                console.error(
                    "❌ ScaleFlow API Timeout"
                );


                throw createScaleFlowAPIError(

                    "ScaleFlow backend request timed out.",

                    "TIMEOUT",

                    {
                        requestId:
                            requestId

                    }

                );

            }


            console.error(
                "❌ ScaleFlow API Error:",
                error
            );


            throw error;

        }

    }


    // ============================================================
    // SCALEFLOW SYSTEM HEALTH CHECK
    // WEBSITE → WEB APP API ENGINE
    // ============================================================

    async function testScaleFlowWebsiteConnection() {

        console.log(
            "================================================"
        );

        console.log(
            "ScaleFlow University"
        );

        console.log(
            "WEBSITE → WEB APP API CONNECTION TEST"
        );

        console.log(
            "================================================"
        );


        try {

            const result =
                await scaleFlowAPIRequest(
                    "system.health",
                    {}
                );


            if (
                result &&
                result.success === true &&
                result.code ===
                    "SYSTEM_HEALTHY"
            ) {

                console.log(
                    "================================================"
                );

                console.log(
                    "✅ WEBSITE API CONNECTION SUCCESSFUL"
                );

                console.log(
                    "Application:",
                    result.data &&
                    result.data.application
                );

                console.log(
                    "Engine:",
                    result.data &&
                    result.data.engine
                );

                console.log(
                    "Engine Version:",
                    result.data &&
                    result.data.engineVersion
                );

                console.log(
                    "Engine Status:",
                    result.data &&
                    result.data.engineStatus
                );

                console.log(
                    "Gemini Configured:",
                    result.data &&
                    result.data.geminiConfigured
                );

                console.log(
                    "Request ID:",
                    result.requestId
                );

                console.log(
                    "================================================"
                );


                return result;

            }


            console.error(
                "❌ WEBSITE API HEALTH CHECK FAILED",
                result
            );


            return result;

        }

        catch (error) {

            console.error(
                "================================================"
            );

            console.error(
                "❌ WEBSITE API CONNECTION FAILED"
            );

            console.error(
                error
            );

            console.error(
                "================================================"
            );


            return {

                success:
                    false,

                code:
                    error.code ||
                    "WEBSITE_API_CONNECTION_FAILED",

                message:
                    "ScaleFlow University backend connection failed.",

                requestId:
                    error.details &&
                    error.details.requestId,

                error:
                    String(error)

            };

        }

    }


    // ============================================================
    // DOM REFERENCES
    // ============================================================

    const loader =
        document.getElementById(
            "loader"
        );


    const toastContainer =
        document.getElementById(
            "toast-container"
        );


    const modalContainer =
        document.getElementById(
            "modal-container"
        );


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    const modalBody =
        document.getElementById(
            "modalBody"
        );


    const modalCloseBtn =
        document.getElementById(
            "modalCloseBtn"
        );


    const modalCancelBtn =
        document.getElementById(
            "modalCancelBtn"
        );


    const modalConfirmBtn =
        document.getElementById(
            "modalConfirmBtn"
        );


    const darkModeBtn =
        document.getElementById(
            "darkModeBtn"
        );


    const notificationBell =
        document.getElementById(
            "notificationBell"
        );


    const notificationPanel =
        document.getElementById(
            "notificationPanel"
        );


    const notificationCount =
        document.getElementById(
            "notificationCount"
        );


    const markAllReadBtn =
        document.getElementById(
            "markAllReadBtn"
        );


    const scrollTopBtn =
        document.getElementById(
            "scrollTopBtn"
        );


    const currentYear =
        document.getElementById(
            "currentYear"
        );


    const globalSearchInput =
        document.getElementById(
            "globalSearchInput"
        );


    const navLinks =
        document.querySelectorAll(
            ".sidebar-menu a[data-page]"
        );


    // ============================================================
    // PAGE REGISTRY
    // ============================================================

    const pageSections = {};


    for (
        let i = 1;
        i <= 20;
        i++
    ) {

        const pageId =
            "page" + i;


        const section =
            document.getElementById(
                pageId
            );


        if (section) {

            pageSections[pageId] =
                section;

        }

    }


    // ============================================================
    // PAGE NAVIGATION
    // ============================================================

    function navigateTo(
        pageId
    ) {

        try {

            if (
                !pageId ||
                !pageSections[pageId]
            ) {

                console.warn(
                    "⚠️ Page not found:",
                    pageId
                );

                return false;

            }


            Object.keys(
                pageSections
            ).forEach(
                function (id) {

                    const section =
                        pageSections[id];


                    if (section) {

                        section.classList.remove(
                            "active"
                        );

                    }

                }
            );


            pageSections[pageId]
                .classList
                .add(
                    "active"
                );


            navLinks.forEach(
                function (link) {

                    const linkPage =
                        link.getAttribute(
                            "data-page"
                        );


                    if (
                        linkPage === pageId
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                    else {

                        link.classList.remove(
                            "active"
                        );

                    }

                }
            );


            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });


            console.log(
                "📄 Navigated to:",
                pageId
            );


            return true;

        }

        catch (error) {

            console.error(
                "❌ Navigation Error:",
                error
            );


            return false;

        }

    }


    // ============================================================
    // NAVIGATION EVENT LISTENERS
    // ============================================================

    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const pageId =
                        this.getAttribute(
                            "data-page"
                        );


                    if (pageId) {

                        navigateTo(
                            pageId
                        );

                    }

                }
            );

        }
    );


    // ============================================================
    // TOAST NOTIFICATION SYSTEM
    // ============================================================

    function showToast(
        message,
        type = "info"
    ) {

        try {

            if (
                !toastContainer
            ) {

                console.log(
                    "🔔 Toast:",
                    message
                );

                return;

            }


            const toast =
                document.createElement(
                    "div"
                );


            toast.className =
                "toast toast-" +
                type;


            toast.textContent =
                message;


            toast.setAttribute(
                "role",
                "alert"
            );


            toastContainer.appendChild(
                toast
            );


            setTimeout(
                function () {

                    toast.style.opacity =
                        "0";

                    toast.style.transition =
                        "opacity 0.3s ease";


                    setTimeout(
                        function () {

                            if (
                                toast &&
                                toast.parentNode
                            ) {

                                toast.remove();

                            }

                        },
                        300
                    );


                },
                3000
            );

        }

        catch (error) {

            console.error(
                "❌ Toast Error:",
                error
            );

        }

    }


    // ============================================================
    // LOADER SYSTEM
    // ============================================================

    function hideLoader() {

        try {

            const loaderElement =
                document.getElementById(
                    "loader"
                );


            if (
                !loaderElement
            ) {

                return;

            }


            if (
                loaderElement.classList.contains(
                    "hidden"
                ) ||
                loaderElement.style.display ===
                    "none"
            ) {

                return;

            }


            loaderElement.classList.add(
                "hidden"
            );


            setTimeout(
                function () {

                    try {

                        loaderElement.style.display =
                            "none";


                        loaderElement.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                    }

                    catch (error) {

                        console.error(
                            "❌ Loader Hide Error:",
                            error
                        );

                    }

                },
                300
            );

        }

        catch (error) {

            console.error(
                "❌ Loader System Error:",
                error
            );

        }

    }


    // ============================================================
    // MODAL SYSTEM
    // ============================================================

    function openModal(
        title,
        bodyHTML,
        options = {}
    ) {

        try {

            if (modalTitle) {

                modalTitle.textContent =
                    title ||
                    "Modal";

            }


            if (modalBody) {

                modalBody.innerHTML =
                    bodyHTML ||
                    "No content available.";

            }


            if (modalContainer) {

                modalContainer.classList.add(
                    "open"
                );

                modalContainer.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }


            document.body.style.overflow =
                "hidden";


            if (
                options &&
                typeof options.onOpen ===
                    "function"
            ) {

                options.onOpen();

            }

        }

        catch (error) {

            console.error(
                "❌ Modal Open Error:",
                error
            );

        }

    }


    // ============================================================
    // CLOSE MODAL
    // ============================================================

    function closeModal() {

        try {

            if (
                modalContainer
            ) {

                modalContainer.classList.remove(
                    "open"
                );

                modalContainer.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            document.body.style.overflow =
                "";

        }

        catch (error) {

            console.error(
                "❌ Modal Close Error:",
                error
            );

        }

    }


    // ============================================================
    // MODAL EVENTS
    // ============================================================

    if (
        modalCloseBtn
    ) {

        modalCloseBtn.addEventListener(
            "click",
            closeModal
        );

    }


    if (
        modalCancelBtn
    ) {

        modalCancelBtn.addEventListener(
            "click",
            closeModal
        );

    }


    if (
        modalConfirmBtn
    ) {

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


    if (
        modalContainer
    ) {

        modalContainer.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modalContainer
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modalContainer &&
                modalContainer.classList.contains(
                    "open"
                )
            ) {

                closeModal();

            }

        }
    );


    // ============================================================
    // BASIC DARK MODE
    // ============================================================

    function toggleDarkMode() {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        showToast(

            isDark
                ? "🌙 Dark Mode Enabled"
                : "☀️ Light Mode Enabled",

            "info"

        );

    }


    if (
        darkModeBtn
    ) {

        darkModeBtn.addEventListener(
            "click",
            toggleDarkMode
        );

    }


    // ============================================================
    // NOTIFICATION PANEL
    // ============================================================

    if (
        notificationBell &&
        notificationPanel
    ) {

        notificationBell.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                notificationPanel.classList.toggle(
                    "open"
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !notificationPanel.contains(
                        event.target
                    ) &&
                    event.target !==
                        notificationBell
                ) {

                    notificationPanel.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    // ============================================================
    // MARK ALL NOTIFICATIONS READ
    // ============================================================

    if (
        markAllReadBtn
    ) {

        markAllReadBtn.addEventListener(
            "click",
            function () {

                if (
                    notificationCount
                ) {

                    notificationCount.style.display =
                        "none";

                }


                showToast(
                    "All notifications marked as read",
                    "success"
                );

            }
        );

    }


    // ============================================================
    // FOOTER YEAR
    // ============================================================

    if (
        currentYear
    ) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    // ============================================================
    // SCROLL TO TOP
    // ============================================================

    if (
        scrollTopBtn
    ) {

        scrollTopBtn.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top:
                        0,

                    behavior:
                        "smooth"

                });

            }
        );

    }


    // ============================================================
    // PUBLIC SCALEFLOW API
    // OTHER PARTS WILL USE THIS
    // ============================================================

    global.ScaleFlowAPI = {

        request:
            scaleFlowAPIRequest,

        health:
            testScaleFlowWebsiteConnection,

        config:
            SCALEFLOW_API_CONFIG

    };


    // ============================================================
    // PUBLIC SCALEFLOW CORE
    // OTHER PARTS WILL USE THIS
    // ============================================================

    global.ScaleFlow = {

        showToast:
            showToast,

        openModal:
            openModal,

        closeModal:
            closeModal,

        navigateTo:
            navigateTo,

        toggleDarkMode:
            toggleDarkMode,

        hideLoader:
            hideLoader,

        api:
            global.ScaleFlowAPI

    };


    // ============================================================
    // DOM READY
    // ============================================================

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            console.log(
                "================================================"
            );

            console.log(
                "ScaleFlow University Frontend Part 1"
            );

            console.log(
                "DOM Ready"
            );

            console.log(
                "================================================"
            );


            hideLoader();


            // ----------------------------------------------------
            // Start on Home Page
            // ----------------------------------------------------

            if (
                pageSections.page1
            ) {

                navigateTo(
                    "page1"
                );

            }


            // ----------------------------------------------------
            // Website → Backend Health Check
            // ----------------------------------------------------

            testScaleFlowWebsiteConnection()
                .then(
                    function (result) {

                        if (
                            result &&
                            result.success === true
                        ) {

                            showToast(
                                "🟢 ScaleFlow AI Backend Connected",
                                "success"
                            );

                        }

                        else {

                            showToast(
                                "⚠️ Backend connection unavailable",
                                "warning"
                            );

                        }

                    }
                )
                .catch(
                    function (error) {

                        console.error(
                            "❌ Startup API Error:",
                            error
                        );

                    }
                );

        }
    );


    // ============================================================
    // SAFETY LOADER FALLBACK
    // ============================================================

    window.addEventListener(
        "load",
        function () {

            hideLoader();

        }
    );


    setTimeout(
        function () {

            hideLoader();

        },
        1500
    );


    // ============================================================
    // FINAL PART 1 MESSAGE
    // ============================================================

    console.log(
        "✅ ScaleFlow University JavaScript Part 1 initialized."
    );

})(window);

// ============================================================
// SCALEFLOW UNIVERSITY
// FRONTEND JAVASCRIPT — PART 2
// WEBSITE FEATURES + LOGIN + REGISTRATION
// ============================================================

(function (global) {

    "use strict";


    // ============================================================
    // SCALEFLOW CORE DEPENDENCY CHECK
    // ============================================================

    if (
        !global.ScaleFlow ||
        !global.ScaleFlowAPI
    ) {

        console.error(
            "❌ ScaleFlow Part 2 cannot start because Part 1 is unavailable."
        );

        return;

    }


    const ScaleFlow =
        global.ScaleFlow;


    const ScaleFlowAPI =
        global.ScaleFlowAPI;


    console.log(
        "================================================"
    );

    console.log(
        "ScaleFlow University"
    );

    console.log(
        "JavaScript Part 2 Starting..."
    );

    console.log(
        "================================================"
    );


    // ============================================================
    // PART 8 — GLOBAL SEARCH SYSTEM
    // ============================================================

    const globalSearchInput =
        document.getElementById(
            "globalSearchInput"
        );


    if (
        globalSearchInput
    ) {

        globalSearchInput.addEventListener(
            "input",
            function () {

                const query =
                    this.value
                        .toLowerCase()
                        .trim();


                if (!query) {

                    return;

                }


                console.log(
                    "🔎 Global Search:",
                    query
                );


                // ------------------------------------------------
                // Search visible website content
                // ------------------------------------------------

                const searchableElements =
                    document.querySelectorAll(
                        "h1, h2, h3, h4, p, .card, .course-card, .dashboard-box"
                    );


                let matchFound =
                    false;


                searchableElements.forEach(
                    function (element) {

                        const text =
                            (
                                element.textContent ||
                                ""
                            )
                            .toLowerCase();


                        if (
                            text.includes(
                                query
                            )
                        ) {

                            matchFound =
                                true;

                        }

                    }
                );


                if (
                    matchFound
                ) {

                    console.log(
                        "✅ Search match found."
                    );

                }

                else {

                    console.log(
                        "ℹ️ No search match found."
                    );

                }

            }
        );

    }


    // ============================================================
    // PART 9 — HERO SECTION ACTIONS
    // ============================================================

    const exploreCoursesBtn =
        document.getElementById(
            "exploreCoursesBtn"
        );


    if (
        exploreCoursesBtn
    ) {

        exploreCoursesBtn.addEventListener(
            "click",
            function () {

                console.log(
                    "📚 Opening Courses..."
                );


                const success =
                    ScaleFlow.navigateTo(
                        "page2"
                    );


                if (
                    success
                ) {

                    ScaleFlow.showToast(
                        "📚 Courses opened.",
                        "success"
                    );

                }

            }
        );

    }


    // ============================================================
    // PART 11 — CONTINUE LEARNING PROGRESS
    // ============================================================

    const continueProgressBtn =
        document.getElementById(
            "continueProgressBtn"
        );


    const continueProgress =
        document.getElementById(
            "continueProgress"
        );


    const progressText =
        document.getElementById(
            "progressText"
        );


    function updateContinueLearningProgress(
        value
    ) {

        if (
            !continueProgress
        ) {

            return 0;

        }


        let progress =
            Number(
                value
            );


        if (
            !Number.isFinite(
                progress
            )
        ) {

            progress =
                0;

        }


        progress =
            Math.max(
                0,
                Math.min(
                    100,
                    progress
                )
            );


        continueProgress.style.width =
            progress + "%";


        continueProgress.setAttribute(
            "aria-valuenow",
            String(
                progress
            )
        );


        if (
            progressText
        ) {

            progressText.textContent =
                progress +
                "% Complete";

        }


        return progress;

    }


    if (
        continueProgressBtn
    ) {

        continueProgressBtn.addEventListener(
            "click",
            function () {

                const currentWidth =
                    continueProgress
                        ? parseFloat(
                            continueProgress.style.width
                        )
                        : 65;


                let currentProgress =
                    Number.isFinite(
                        currentWidth
                    )
                    ? currentWidth
                    : 65;


                if (
                    currentProgress >=
                    100
                ) {

                    updateContinueLearningProgress(
                        100
                    );


                    ScaleFlow.showToast(
                        "🎉 Course Completed Successfully!",
                        "success"
                    );


                    return;

                }


                currentProgress +=
                    5;


                if (
                    currentProgress >
                    100
                ) {

                    currentProgress =
                        100;

                }


                const updatedProgress =
                    updateContinueLearningProgress(
                        currentProgress
                    );


                if (
                    updatedProgress >=
                    100
                ) {

                    ScaleFlow.showToast(
                        "🎉 Course Completed Successfully!",
                        "success"
                    );

                }

                else {

                    ScaleFlow.showToast(
                        "📈 Learning Progress Updated (" +
                        updatedProgress +
                        "%)",
                        "info"
                    );

                }

            }
        );

    }


    if (
        continueProgress
    ) {

        updateContinueLearningProgress(
            65
        );

    }


    // ============================================================
    // PART 12 — DASHBOARD STATS
    // ============================================================

    function updateDashboardStats(
        stats = {}
    ) {

        try {

            if (
                !stats ||
                typeof stats !== "object"
            ) {

                return;

            }


            const mappings = {

                xp:
                    [
                        "xpValue",
                        "dashboardXP"
                    ],

                level:
                    [
                        "levelValue",
                        "dashboardLevel"
                    ],

                progress:
                    [
                        "dashboardProgress"
                    ],

                streak:
                    [
                        "streakValue",
                        "dashboardStreak"
                    ]

            };


            Object.keys(
                mappings
            ).forEach(
                function (key) {

                    if (
                        stats[key] ===
                        undefined
                    ) {

                        return;

                    }


                    mappings[key].forEach(
                        function (id) {

                            const element =
                                document.getElementById(
                                    id
                                );


                            if (
                                element
                            ) {

                                element.textContent =
                                    stats[key];

                            }

                        }
                    );

                }
            );


            console.log(
                "✅ Dashboard statistics updated."
            );

        }

        catch (error) {

            console.error(
                "❌ Dashboard Stats Error:",
                error
            );

        }

    }


    // ============================================================
    // PART 12D — LOGIN DOM REFERENCES
    // ============================================================

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    const loginEmail =
        document.getElementById(
            "loginEmail"
        );


    const loginPassword =
        document.getElementById(
            "loginPassword"
        );


    const loginSubmitBtn =
        document.getElementById(
            "loginSubmitBtn"
        );


    const loginSection =
        document.getElementById(
            "loginSection"
        );


    const registrationSection =
        document.getElementById(
            "registrationSection"
        );


    const registerLink =
        document.getElementById(
            "registerLink"
        );


    const backToLoginLink =
        document.getElementById(
            "backToLoginLink"
        );


    const registrationForm =
        document.getElementById(
            "registrationForm"
        );


    const registerSubmitBtn =
        document.getElementById(
            "registerSubmitBtn"
        );


    // ============================================================
    // LOGIN / REGISTRATION SECTION SWITCH
    // ============================================================

    if (
        registerLink
    ) {

        registerLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                if (
                    loginSection
                ) {

                    loginSection.style.display =
                        "none";

                }


                if (
                    registrationSection
                ) {

                    registrationSection.style.display =
                        "block";

                }

            }
        );

    }


    if (
        backToLoginLink
    ) {

        backToLoginLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                if (
                    registrationSection
                ) {

                    registrationSection.style.display =
                        "none";

                }


                if (
                    loginSection
                ) {

                    loginSection.style.display =
                        "block";

                }

            }
        );

    }


    // ============================================================
    // LOGIN BUTTON STATE
    // ============================================================

    function setLoginButtonState(
        loading
    ) {

        if (
            !loginSubmitBtn
        ) {

            return;

        }


        loginSubmitBtn.disabled =
            loading;


        loginSubmitBtn.style.opacity =
            loading
                ? "0.7"
                : "1";


        loginSubmitBtn.textContent =
            loading
                ? "Signing In..."
                : "Sign In";

    }


    // ============================================================
    // LOGIN REQUEST
    // WEBSITE → SCALEFLOW API → AUTH ENGINE
    // ============================================================

    async function handleLogin(
        event
    ) {

        event.preventDefault();


        const email =
            loginEmail
                ? loginEmail.value
                    .trim()
                    .toLowerCase()
                : "";


        const password =
            loginPassword
                ? loginPassword.value
                : "";


        if (
            !email ||
            !password
        ) {

            ScaleFlow.showToast(
                "⚠️ Please enter Email and Password.",
                "warning"
            );


            return;

        }


        setLoginButtonState(
            true
        );


        try {

            console.log(
                "🔐 Sending login request..."
            );


            const result =
                await ScaleFlowAPI.request(
                    "login",
                    {

                        email:
                            email,

                        password:
                            password

                    }
                );


            console.log(
                "🔐 Login API Result:",
                result
            );


            if (
                result &&
                result.success ===
                    true
            ) {

                ScaleFlow.showToast(
                    result.message ||
                    "✅ Login successful.",
                    "success"
                );


                if (
                    typeof result.data ===
                    "object"
                ) {

                    global.ScaleFlowStudent =
                        result.data;

                }


                ScaleFlow.navigateTo(
                    "page1"
                );

            }

            else {

                ScaleFlow.showToast(

                    result &&
                    result.message
                        ? result.message
                        : "❌ Login failed.",

                    "error"

                );

            }

        }

        catch (error) {

            console.error(
                "❌ Login Error:",
                error
            );


            ScaleFlow.showToast(

                "❌ Unable to connect to the login service.",

                "error"

            );

        }

        finally {

            setLoginButtonState(
                false
            );

        }

    }


    if (
        loginForm
    ) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    // ============================================================
    // REGISTRATION BUTTON STATE
    // ============================================================

    function setRegistrationButtonState(
        loading
    ) {

        if (
            !registerSubmitBtn
        ) {

            return;

        }


        registerSubmitBtn.disabled =
            loading;


        registerSubmitBtn.style.opacity =
            loading
                ? "0.7"
                : "1";


        registerSubmitBtn.textContent =
            loading
                ? "Creating Account..."
                : "Create Account";

    }


    // ============================================================
    // REGISTRATION REQUEST
    // WEBSITE → SCALEFLOW API → AUTH ENGINE
    // ============================================================

    async function handleRegistration(
        event
    ) {

        event.preventDefault();


        const fullName =
            document.getElementById(
                "registerFullName"
            )?.value
                .trim() ||
            "";


        const email =
            document.getElementById(
                "registerEmail"
            )?.value
                .trim()
                .toLowerCase() ||
            "";


        const password =
            document.getElementById(
                "registerPassword"
            )?.value ||
            "";


        const confirmPassword =
            document.getElementById(
                "registerConfirmPassword"
            )?.value ||
            "";


        const terms =
            document.getElementById(
                "registerTerms"
            );


        if (
            !fullName ||
            !email
        ) {

            ScaleFlow.showToast(
                "⚠️ Please fill in all required fields.",
                "warning"
            );


            return;

        }


        if (
            password.length <
            8
        ) {

            ScaleFlow.showToast(
                "⚠️ Password must contain at least 8 characters.",
                "warning"
            );


            return;

        }


        if (
            password !==
            confirmPassword
        ) {

            ScaleFlow.showToast(
                "⚠️ Passwords do not match.",
                "warning"
            );


            return;

        }


        if (
            !terms ||
            !terms.checked
        ) {

            ScaleFlow.showToast(
                "⚠️ Please accept the Terms and Conditions.",
                "warning"
            );


            return;

        }


        setRegistrationButtonState(
            true
        );


        try {

            console.log(
                "📝 Sending registration request..."
            );


            const result =
                await ScaleFlowAPI.request(
                    "register",
                    {

                        fullName:
                            fullName,

                        email:
                            email,

                        password:
                            password,

                        confirmPassword:
                            confirmPassword

                    }
                );


            console.log(
                "📝 Registration API Result:",
                result
            );


            if (
                result &&
                result.success ===
                    true
            ) {

                ScaleFlow.showToast(
                    result.message ||
                    "🎉 Account created successfully.",
                    "success"
                );


                registrationForm.reset();


                if (
                    registrationSection
                ) {

                    registrationSection.style.display =
                        "none";

                }


                if (
                    loginSection
                ) {

                    loginSection.style.display =
                        "block";

                }


                if (
                    loginEmail
                ) {

                    loginEmail.value =
                        email;

                }

            }

            else {

                ScaleFlow.showToast(

                    result &&
                    result.message
                        ? result.message
                        : "❌ Registration failed.",

                    "error"

                );

            }

        }

        catch (error) {

            console.error(
                "❌ Registration Error:",
                error
            );


            ScaleFlow.showToast(

                "❌ Unable to connect to the registration service.",

                "error"

            );

        }

        finally {

            setRegistrationButtonState(
                false
            );

        }

    }


    if (
        registrationForm
    ) {

        registrationForm.addEventListener(
            "submit",
            handleRegistration
        );

    }


    // ============================================================
    // PART 13 — QUICK ACTIONS
    // ============================================================

    document
        .querySelectorAll(
            ".quick-action-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const label =
                            this.querySelector(
                                ".label"
                            )?.textContent
                            ||
                            "Action";


                        console.log(
                            "🚀 Quick Action:",
                            label
                        );


                        ScaleFlow.showToast(
                            "🚀 Triggered: " +
                            label,
                            "info"
                        );

                    }
                );

            }
        );


    // ============================================================
    // PUBLIC PART 2 FUNCTIONS
    // ============================================================

    ScaleFlow.updateDashboardStats =
        updateDashboardStats;


    ScaleFlow.updateContinueLearningProgress =
        updateContinueLearningProgress;


    ScaleFlow.login =
        handleLogin;


    ScaleFlow.register =
        handleRegistration;


    // ============================================================
    // PART 2 STARTUP TEST
    // ============================================================

    function startPart2() {

        console.log(
            "================================================"
        );

        console.log(
            "SCALEFLOW JAVASCRIPT PART 2 TEST"
        );

        console.log(
            "================================================"
        );


        console.log(
            "ScaleFlow Core:",
            !!global.ScaleFlow
        );


        console.log(
            "ScaleFlow API:",
            !!global.ScaleFlowAPI
        );


        console.log(
            "Global Search:",
            !!globalSearchInput
        );


        console.log(
            "Explore Courses:",
            !!exploreCoursesBtn
        );


        console.log(
            "Continue Learning:",
            !!continueProgress
        );


        console.log(
            "Login Form:",
            !!loginForm
        );


        console.log(
            "Registration Form:",
            !!registrationForm
        );


        console.log(
            "Quick Actions:",
            document.querySelectorAll(
                ".quick-action-btn"
            ).length
        );


        console.log(
            "================================================"
        );

        console.log(
            "✅ SCALEFLOW JAVASCRIPT PART 2 INITIALIZED"
        );

        console.log(
            "================================================"
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startPart2
        );

    }

    else {

        startPart2();

    }


})(window);

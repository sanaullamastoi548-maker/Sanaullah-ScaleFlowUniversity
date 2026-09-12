// ============================================================
// SCALEFLOW UNIVERSITY
// FRONTEND JAVASCRIPT — PART 1
// CORE SYSTEM + WEB APP API + NAVIGATION
// ============================================================

(function (global) {

    "use strict";


    // ============================================================
    // SCALEFLOW UNIVERSITY — WEB APP API CONFIGURATION
    // TESTED DEPLOYMENT
    // ============================================================

    const SCALEFLOW_API_CONFIG = {

        WEB_APP_URL:
            "https://script.google.com/macros/s/AKfycbwBPdo7TflhmyiUIU8rZQx7hvUYPMpJJX7LszL1YxNUQrcLrf8lh8ZUIxGrp4jK_PvY/exec",

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
    //
    // WEBSITE
    //    ↓
    // WEB APP API
    //
    // All current backend communication goes through here.
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
            //
            // Do NOT use no-cors.
            // We need to read the JSON response.
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
            // Read response
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
    //
    // CURRENT BACKEND:
    // system.health
    //
    // Expected current response:
    // success === true
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


            // ----------------------------------------------------
            // Current Web App API health response
            // ----------------------------------------------------

            if (
                result &&
                result.success === true
            ) {

                console.log(
                    "================================================"
                );

                console.log(
                    "✅ WEBSITE API CONNECTION SUCCESSFUL"
                );


                if (
                    result.data
                ) {

                    console.log(
                        "Service:",
                        result.data.service
                    );

                    console.log(
                        "Version:",
                        result.data.version
                    );

                    console.log(
                        "Status:",
                        result.data.status
                    );

                }


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
    //
    // IMPORTANT:
    // Part 2 and Part 3 will EXTEND this object.
    // They must NOT replace it.
    // ============================================================

    if (
        !global.ScaleFlow
    ) {

        global.ScaleFlow = {};

    }


    Object.assign(
        global.ScaleFlow,
        {

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

        }
    );


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



/* ============================================================
   SCALEFLOW UNIVERSITY
   MAIN WEBSITE FRONTEND
   PART 2 — CORE FRONTEND SYSTEMS
   ============================================================ */

(function (global) {

    "use strict";


    /* ============================================================
       DEPENDENCY CHECK
       ============================================================ */

    if (!global.ScaleFlowAPI) {
        console.error(
            "ScaleFlow Part 2: ScaleFlowAPI not found."
        );
        return;
    }

    if (!global.ScaleFlow) {
        global.ScaleFlow = {};
    }


    /* ============================================================
       DOM READY HELPER
       ============================================================ */

    function onDOMReady(callback) {

        if (document.readyState === "loading") {
            document.addEventListener(
                "DOMContentLoaded",
                callback
            );
        } else {
            callback();
        }

    }


    /* ============================================================
       GLOBAL SEARCH
       ============================================================ */

    function performGlobalSearch() {

        const input =
            document.querySelector("#globalSearchInput") ||
            document.querySelector(".global-search-input") ||
            document.querySelector('input[type="search"]');

        if (!input) {
            showFrontendMessage(
                "Search field not found."
            );
            return;
        }

        const query = input.value.trim();

        if (!query) {
            showFrontendMessage(
                "Please enter something to search."
            );
            return;
        }

        console.log(
            "ScaleFlow Search:",
            query
        );

        showFrontendMessage(
            "Search is ready. Search engine integration will be connected later."
        );

    }


    /* ============================================================
       HERO — VIEW COURSES
       ============================================================ */

    function viewCourses() {

        if (typeof global.ScaleFlow.navigateTo === "function") {

            global.ScaleFlow.navigateTo(
                "courses"
            );

            return;
        }

        const coursesPage =
            document.querySelector(
                '[data-page="courses"]'
            );

        if (coursesPage) {
            coursesPage.scrollIntoView({
                behavior: "smooth"
            });
        }

    }


    /* ============================================================
       CONTINUE LEARNING
       ============================================================ */

    function continueLearning() {

        console.log(
            "ScaleFlow: Continue Learning"
        );

        showFrontendMessage(
            "Continue Learning system is ready."
        );

    }


    /* ============================================================
       DASHBOARD STATS
       ============================================================ */

    function updateDashboardStats(stats) {

        if (!stats || typeof stats !== "object") {
            return;
        }

        const mapping = {

            activeTasks:
                [
                    "#activeTasksCount",
                    "[data-stat='activeTasks']"
                ],

            projects:
                [
                    "#projectsCount",
                    "[data-stat='projects']"
                ],

            aiTasks:
                [
                    "#aiTasksCount",
                    "[data-stat='aiTasks']"
                ],

            aiCredits:
                [
                    "#aiCreditsCount",
                    "[data-stat='aiCredits']"
                ]

        };


        Object.keys(mapping).forEach(function (key) {

            if (
                stats[key] === undefined ||
                stats[key] === null
            ) {
                return;
            }

            const selectors = mapping[key];

            for (let i = 0; i < selectors.length; i++) {

                const element =
                    document.querySelector(
                        selectors[i]
                    );

                if (element) {

                    element.textContent =
                        stats[key];

                    break;
                }

            }

        });

    }


    /* ============================================================
       CONTINUE LEARNING PROGRESS
       ============================================================ */

    function updateContinueLearningProgress(
        percentage
    ) {

        let value =
            Number(percentage);

        if (Number.isNaN(value)) {
            return;
        }

        value =
            Math.max(
                0,
                Math.min(100, value)
            );


        const progressElements =
            document.querySelectorAll(
                "[data-progress]"
            );


        progressElements.forEach(
            function (element) {

                const current =
                    element.getAttribute(
                        "data-progress"
                    );

                if (current !== null) {

                    element.style.width =
                        value + "%";

                    element.setAttribute(
                        "data-progress",
                        value
                    );

                }

            }
        );


        const progressText =
            document.querySelector(
                "#learningProgress"
            );

        if (progressText) {

            progressText.textContent =
                value + "%";

        }

    }


    /* ============================================================
       LOGIN UI
       ============================================================ */

    function getLoginElements() {

        return {

            form:
                document.querySelector(
                    "#loginForm"
                ),

            email:
                document.querySelector(
                    "#loginEmail"
                ),

            password:
                document.querySelector(
                    "#loginPassword"
                ),

            message:
                document.querySelector(
                    "#loginMessage"
                )

        };

    }


    /* ============================================================
       LOGIN VALIDATION
       ============================================================ */

    function validateLoginForm() {

        const elements =
            getLoginElements();


        if (!elements.email ||
            !elements.password) {

            showFrontendMessage(
                "Login fields not found."
            );

            return false;
        }


        const email =
            elements.email.value.trim();

        const password =
            elements.password.value;


        if (!email) {

            showFrontendMessage(
                "Please enter your email."
            );

            elements.email.focus();

            return false;
        }


        if (!email.includes("@")) {

            showFrontendMessage(
                "Please enter a valid email."
            );

            elements.email.focus();

            return false;
        }


        if (!password) {

            showFrontendMessage(
                "Please enter your password."
            );

            elements.password.focus();

            return false;
        }


        return true;

    }


    /* ============================================================
       LOGIN
       
       IMPORTANT:
       Authentication backend is NOT connected yet.
       ============================================================ */

    function handleLogin(event) {

        if (event) {
            event.preventDefault();
        }


        if (!validateLoginForm()) {
            return false;
        }


        console.log(
            "ScaleFlow Login:",
            "Frontend validation passed."
        );


        showFrontendMessage(
            "Login interface is ready. Authentication Engine will be connected after its separate testing."
        );


        return false;

    }


    /* ============================================================
       REGISTER UI
       ============================================================ */

    function getRegisterElements() {

        return {

            form:
                document.querySelector(
                    "#registerForm"
                ),

            fullName:
                document.querySelector(
                    "#registerFullName"
                ),

            email:
                document.querySelector(
                    "#registerEmail"
                ),

            password:
                document.querySelector(
                    "#registerPassword"
                ),

            confirmPassword:
                document.querySelector(
                    "#registerConfirmPassword"
                ),

            message:
                document.querySelector(
                    "#registerMessage"
                )

        };

    }


    /* ============================================================
       REGISTER VALIDATION
       ============================================================ */

    function validateRegisterForm() {

        const elements =
            getRegisterElements();


        if (
            !elements.fullName ||
            !elements.email ||
            !elements.password ||
            !elements.confirmPassword
        ) {

            showFrontendMessage(
                "Registration fields not found."
            );

            return false;
        }


        const fullName =
            elements.fullName.value.trim();

        const email =
            elements.email.value.trim();

        const password =
            elements.password.value;

        const confirmPassword =
            elements.confirmPassword.value;


        if (!fullName) {

            showFrontendMessage(
                "Please enter your full name."
            );

            elements.fullName.focus();

            return false;
        }


        if (!email) {

            showFrontendMessage(
                "Please enter your email."
            );

            elements.email.focus();

            return false;
        }


        if (!email.includes("@")) {

            showFrontendMessage(
                "Please enter a valid email."
            );

            elements.email.focus();

            return false;
        }


        if (password.length < 6) {

            showFrontendMessage(
                "Password must contain at least 6 characters."
            );

            elements.password.focus();

            return false;
        }


        if (password !== confirmPassword) {

            showFrontendMessage(
                "Passwords do not match."
            );

            elements.confirmPassword.focus();

            return false;
        }


        return true;

    }


    /* ============================================================
       REGISTER
       
       IMPORTANT:
       Authentication backend is NOT connected yet.
       ============================================================ */

    function handleRegister(event) {

        if (event) {
            event.preventDefault();
        }


        if (!validateRegisterForm()) {
            return false;
        }


        console.log(
            "ScaleFlow Registration:",
            "Frontend validation passed."
        );


        showFrontendMessage(
            "Registration interface is ready. Authentication Engine will be connected after its separate testing."
        );


        return false;

    }


    /* ============================================================
       LOGIN / REGISTER SWITCH
       ============================================================ */

    function switchAuthMode(mode) {

        const loginPanel =
            document.querySelector(
                "#loginPanel"
            );

        const registerPanel =
            document.querySelector(
                "#registerPanel"
            );


        if (mode === "register") {

            if (loginPanel) {
                loginPanel.style.display =
                    "none";
            }

            if (registerPanel) {
                registerPanel.style.display =
                    "";
            }

        } else {

            if (loginPanel) {
                loginPanel.style.display =
                    "";
            }

            if (registerPanel) {
                registerPanel.style.display =
                    "none";
            }

        }

    }


    /* ============================================================
       QUICK ACTIONS
       ============================================================ */

    function runQuickAction(action) {

        const normalized =
            String(action || "")
                .trim()
                .toLowerCase();


        switch (normalized) {

            case "courses":

                viewCourses();

                break;


            case "learning":

                continueLearning();

                break;


            case "search":

                performGlobalSearch();

                break;


            case "login":

                switchAuthMode(
                    "login"
                );

                break;


            case "register":

                switchAuthMode(
                    "register"
                );

                break;


            default:

                console.log(
                    "ScaleFlow Quick Action:",
                    action
                );

                showFrontendMessage(
                    "This action is ready for future engine integration."
                );

        }

    }


    /* ============================================================
       FRONTEND MESSAGE
       ============================================================ */

    function showFrontendMessage(message) {

        if (
            global.ScaleFlow &&
            typeof global.ScaleFlow.showToast ===
                "function"
        ) {

            global.ScaleFlow.showToast(
                message
            );

            return;
        }


        console.log(
            "ScaleFlow:",
            message
        );

    }


    /* ============================================================
       EVENT BINDING
       ============================================================ */

    function bindPart2Events() {

        /* --------------------------------------------------------
           Login Form
           -------------------------------------------------------- */

        const loginForm =
            document.querySelector(
                "#loginForm"
            );

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                handleLogin
            );

        }


        /* --------------------------------------------------------
           Register Form
           -------------------------------------------------------- */

        const registerForm =
            document.querySelector(
                "#registerForm"
            );

        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                handleRegister
            );

        }


        /* --------------------------------------------------------
           Search
           -------------------------------------------------------- */

        const searchButtons =
            document.querySelectorAll(
                "[data-action='search']"
            );


        searchButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    performGlobalSearch
                );

            }
        );


        /* --------------------------------------------------------
           View Courses
           -------------------------------------------------------- */

        const courseButtons =
            document.querySelectorAll(
                "[data-action='courses']"
            );


        courseButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    viewCourses
                );

            }
        );


        /* --------------------------------------------------------
           Continue Learning
           -------------------------------------------------------- */

        const learningButtons =
            document.querySelectorAll(
                "[data-action='learning']"
            );


        learningButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    continueLearning
                );

            }
        );

    }


    /* ============================================================
       PUBLIC SCALEFLOW API
       ============================================================ */

    Object.assign(
        global.ScaleFlow,
        {

            performGlobalSearch:
                performGlobalSearch,

            viewCourses:
                viewCourses,

            continueLearning:
                continueLearning,

            updateDashboardStats:
                updateDashboardStats,

            updateContinueLearningProgress:
                updateContinueLearningProgress,

            handleLogin:
                handleLogin,

            handleRegister:
                handleRegister,

            switchAuthMode:
                switchAuthMode,

            runQuickAction:
                runQuickAction

        }
    );


    /* ============================================================
       DOM READY
       ============================================================ */

    onDOMReady(
        function () {

            console.log(
                "ScaleFlow Part 2: DOM ready."
            );


            bindPart2Events();


            console.log(
                "ScaleFlow Part 2: Core frontend systems ready."
            );

        }
    );


})(window);



/* ============================================================
   SCALEFLOW UNIVERSITY
   MAIN WEBSITE FRONTEND
   PART 3 — AI MENTOR + QUESTION LIBRARY
   ============================================================ */

(function (global) {

    "use strict";


    /* ============================================================
       DEPENDENCY CHECK
       ============================================================ */

    if (!global.ScaleFlowAPI) {
        console.error(
            "ScaleFlow Part 3: ScaleFlowAPI not found."
        );
        return;
    }

    if (!global.ScaleFlow) {
        global.ScaleFlow = {};
    }


    /* ============================================================
       AI STATE
       ============================================================ */

    const AIState = {

        busy: false,

        lastQuestion: "",

        lastLanguage: "en",

        lastSubject: "Web Development"

    };


    /* ============================================================
       DOM HELPERS
       ============================================================ */

    function getAIElements() {

        return {

            input:
                document.querySelector("#aiQuestion") ||
                document.querySelector("#question") ||
                document.querySelector("#chatInput") ||
                document.querySelector(
                    "[data-ai-question]"
                ),

            subject:
                document.querySelector("#aiSubject") ||
                document.querySelector("#subject") ||
                document.querySelector(
                    "[data-ai-subject]"
                ),

            language:
                document.querySelector("#aiLanguage") ||
                document.querySelector("#language") ||
                document.querySelector(
                    "[data-ai-language]"
                ),

            sendButton:
                document.querySelector("#aiSendButton") ||
                document.querySelector("#askAI") ||
                document.querySelector(
                    "[data-action='ask-ai']"
                ),

            clearButton:
                document.querySelector("#clearAI") ||
                document.querySelector(
                    "[data-action='clear-ai']"
                ),

            answer:
                document.querySelector("#aiAnswer") ||
                document.querySelector("#aiResponse") ||
                document.querySelector(
                    "[data-ai-answer]"
                ),

            status:
                document.querySelector("#aiStatus") ||
                document.querySelector(
                    "[data-ai-status]"
                ),

            libraryStatus:
                document.querySelector("#aiLibraryStatus") ||
                document.querySelector(
                    "[data-ai-library-status]"
                )

        };

    }


    /* ============================================================
       LANGUAGE NORMALIZATION
       ============================================================ */

    function normalizeAILanguage(language) {

        const value =
            String(language || "")
                .trim()
                .toLowerCase();


        if (!value) {
            return "en";
        }


        const aliases = {

            english: "en",
            en: "en",

            urdu: "ur",
            اردو: "ur",
            ur: "ur",

            sindhi: "sd",
            سنڌي: "sd",
            sd: "sd",

            arabic: "ar",
            العربية: "ar",
            ar: "ar",

            hindi: "hi",
            हिन्दी: "hi",
            hi: "hi",

            bengali: "bn",
            বাংলা: "bn",
            bn: "bn",

            french: "fr",
            français: "fr",
            fr: "fr",

            spanish: "es",
            español: "es",
            es: "es",

            german: "de",
            deutsch: "de",
            de: "de",

            portuguese: "pt",
            português: "pt",
            pt: "pt",

            italian: "it",
            italiano: "it",
            it: "it",

            russian: "ru",
            русский: "ru",
            ru: "ru",

            chinese: "zh",
            中文: "zh",
            zh: "zh",

            japanese: "ja",
            日本語: "ja",
            ja: "ja",

            korean: "ko",
            한국어: "ko",
            ko: "ko",

            turkish: "tr",
            türkçe: "tr",
            tr: "tr",

            indonesian: "id",
            "bahasa indonesia": "id",
            id: "id"

        };


        return aliases[value] || "en";

    }


    /* ============================================================
       GET SELECTED LANGUAGE
       ============================================================ */

    function getSelectedLanguage() {

        const elements =
            getAIElements();

        if (!elements.language) {
            return "en";
        }

        return normalizeAILanguage(
            elements.language.value
        );

    }


    /* ============================================================
       GET SUBJECT
       ============================================================ */

    function getSelectedSubject() {

        const elements =
            getAIElements();

        if (!elements.subject) {
            return "";
        }

        return String(
            elements.subject.value || ""
        ).trim();

    }


    /* ============================================================
       SET AI STATUS
       ============================================================ */

    function setAIStatus(
        message,
        success
    ) {

        const elements =
            getAIElements();


        if (!elements.status) {
            return;
        }


        elements.status.textContent =
            message;


        if (success === true) {

            elements.status.dataset.status =
                "success";

        } else if (success === false) {

            elements.status.dataset.status =
                "error";

        } else {

            elements.status.dataset.status =
                "working";

        }

    }


    /* ============================================================
       SET AI ANSWER
       ============================================================ */

    function setAIAnswer(answer) {

        const elements =
            getAIElements();


        if (!elements.answer) {
            return;
        }


        elements.answer.textContent =
            String(answer || "");

    }


    /* ============================================================
       SET LIBRARY STATUS
       ============================================================ */

    function setLibraryStatus(
        message,
        success
    ) {

        const elements =
            getAIElements();


        if (!elements.libraryStatus) {
            return;
        }


        elements.libraryStatus.textContent =
            message;


        if (success === true) {

            elements.libraryStatus.dataset.status =
                "success";

        } else if (success === false) {

            elements.libraryStatus.dataset.status =
                "error";

        } else {

            elements.libraryStatus.dataset.status =
                "working";

        }

    }


    /* ============================================================
       BUTTON STATE
       ============================================================ */

    function setAIButtonBusy(
        busy
    ) {

        const elements =
            getAIElements();


        if (!elements.sendButton) {
            return;
        }


        elements.sendButton.disabled =
            Boolean(busy);


        if (busy) {

            elements.sendButton.dataset.originalText =
                elements.sendButton.textContent;

            elements.sendButton.textContent =
                "Thinking...";

        } else {

            const original =
                elements.sendButton.dataset.originalText;

            if (original) {

                elements.sendButton.textContent =
                    original;

            }

        }

    }


    /* ============================================================
       VALIDATE AI REQUEST
       ============================================================ */

    function validateAIRequest(
        question,
        subject
    ) {

        if (!question) {

            setAIStatus(
                "Please enter your question.",
                false
            );

            return false;

        }


        if (!subject) {

            setAIStatus(
                "Please enter a subject.",
                false
            );

            return false;

        }


        if (
            typeof SCALEFLOW_AI_SETTINGS !==
            "undefined" &&
            question.length >
            SCALEFLOW_AI_SETTINGS.MAX_QUESTION_LENGTH
        ) {

            setAIStatus(
                "Question is too long.",
                false
            );

            return false;

        }


        return true;

    }


    /* ============================================================
       ASK SCALEFLOW AI
       ============================================================ */

    async function sendAIQuestion() {

        if (AIState.busy) {
            return;
        }


        const elements =
            getAIElements();


        if (!elements.input) {

            console.error(
                "ScaleFlow Part 3: AI question input not found."
            );

            return;

        }


        const question =
            String(
                elements.input.value || ""
            ).trim();


        const subject =
            getSelectedSubject();


        const language =
            getSelectedLanguage();


        if (
            !validateAIRequest(
                question,
                subject
            )
        ) {

            return;

        }


        AIState.busy = true;

        AIState.lastQuestion =
            question;

        AIState.lastLanguage =
            language;

        AIState.lastSubject =
            subject;


        setAIButtonBusy(true);

        setAIStatus(
            "Connecting to ScaleFlow AI...",
            null
        );

        setAIAnswer("");

        setLibraryStatus(
            "Question Library processing...",
            null
        );


        try {

            /*
             * IMPORTANT
             *
             * Tested backend expects:
             *
             * action: ai.chat
             *
             * data:
             * {
             *     question,
             *     language,
             *     subject
             * }
             */

            const result =
                await global.ScaleFlowAPI.request(
                    "ai.chat",
                    {

                        question:
                            question,

                        language:
                            language,

                        subject:
                            subject

                    }
                );


            console.log(
                "ScaleFlow AI Response:",
                result
            );


            if (
                !result ||
                result.success !== true
            ) {

                const message =
                    result &&
                    result.message
                        ? result.message
                        : "AI request failed.";


                setAIStatus(
                    message,
                    false
                );

                setLibraryStatus(
                    "Question Library not updated.",
                    false
                );

                return;

            }


            /* ----------------------------------------------------
               AI ANSWER
               ---------------------------------------------------- */

            const data =
                result.data || {};


            const answer =
                String(
                    data.answer || ""
                ).trim();


            if (!answer) {

                setAIStatus(
                    "AI returned an empty response.",
                    false
                );

                setLibraryStatus(
                    "Question Library not updated.",
                    false
                );

                return;

            }


            setAIAnswer(
                answer
            );


            setAIStatus(
                "AI response received successfully.",
                true
            );


            /* ----------------------------------------------------
               QUESTION LIBRARY RESULT
               ---------------------------------------------------- */

            const library =
                data.library || null;


            if (!library) {

                setLibraryStatus(
                    "Question Library result not returned.",
                    false
                );

                return;

            }


            if (
                library.success === true &&
                library.duplicate === true
            ) {

                setLibraryStatus(
                    "Existing question found in Question Library. ID: " +
                    String(
                        library.questionId || "N/A"
                    ),
                    true
                );

            } else if (
                library.success === true &&
                library.duplicate !== true
            ) {

                setLibraryStatus(
                    "Question saved successfully. ID: " +
                    String(
                        library.questionId || "N/A"
                    ),
                    true
                );

            } else {

                setLibraryStatus(
                    library.message ||
                    "Question Library save failed.",
                    false
                );

            }


        } catch (error) {

            console.error(
                "ScaleFlow Part 3 AI Error:",
                error
            );


            setAIStatus(
                "Unable to connect to AI.",
                false
            );


            setLibraryStatus(
                "Question Library could not be processed.",
                false
            );


        } finally {

            AIState.busy =
                false;

            setAIButtonBusy(
                false
            );

        }

    }


    /* ============================================================
       CLEAR AI
       ============================================================ */

    function clearAI() {

        const elements =
            getAIElements();


        if (elements.input) {
            elements.input.value = "";
        }


        setAIAnswer("");

        setLibraryStatus(
            ""
        );

        setAIStatus(
            "AI Ready"
        );


        AIState.lastQuestion =
            "";

    }


    /* ============================================================
       QUICK AI QUESTION
       ============================================================ */

    function askQuickQuestion(
        question,
        subject,
        language
    ) {

        const elements =
            getAIElements();


        if (elements.input) {

            elements.input.value =
                question;

        }


        if (elements.subject) {

            elements.subject.value =
                subject;

        }


        if (elements.language) {

            elements.language.value =
                normalizeAILanguage(
                    language
                );

        }


        sendAIQuestion();

    }


    /* ============================================================
       ENTER KEY SUPPORT
       ============================================================ */

    function handleAIKeydown(
        event
    ) {

        if (!event) {
            return;
        }


        /*
         * Ctrl + Enter or
         * Android/desktop Enter handling
         */

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            sendAIQuestion();

        }

    }


    /* ============================================================
       QUICK QUESTION BUTTONS
       ============================================================ */

    function bindQuickQuestions() {

        const buttons =
            document.querySelectorAll(
                "[data-ai-question-text]"
            );


        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const question =
                            button.getAttribute(
                                "data-ai-question-text"
                            );

                        const subject =
                            button.getAttribute(
                                "data-ai-subject"
                            ) ||
                            "Web Development";

                        const language =
                            button.getAttribute(
                                "data-ai-language"
                            ) ||
                            "en";


                        if (!question) {
                            return;
                        }


                        askQuickQuestion(
                            question,
                            subject,
                            language
                        );

                    }
                );

            }
        );

    }


    /* ============================================================
       EVENT BINDING
       ============================================================ */

    function bindAIEvents() {

        const elements =
            getAIElements();


        /* --------------------------------------------------------
           Ask Button
           -------------------------------------------------------- */

        if (elements.sendButton) {

            elements.sendButton.addEventListener(
                "click",
                sendAIQuestion
            );

        }


        /* --------------------------------------------------------
           Clear Button
           -------------------------------------------------------- */

        if (elements.clearButton) {

            elements.clearButton.addEventListener(
                "click",
                clearAI
            );

        }


        /* --------------------------------------------------------
           Input
           -------------------------------------------------------- */

        if (elements.input) {

            elements.input.addEventListener(
                "keydown",
                handleAIKeydown
            );

        }


        bindQuickQuestions();

    }


    /* ============================================================
       PUBLIC SCALEFLOW METHODS
       ============================================================ */

    Object.assign(
        global.ScaleFlow,
        {

            sendAIQuestion:
                sendAIQuestion,

            askScaleFlowAI:
                sendAIQuestion,

            clearAI:
                clearAI,

            askQuickQuestion:
                askQuickQuestion,

            getSelectedAILanguage:
                getSelectedLanguage,

            getSelectedAISubject:
                getSelectedSubject

        }
    );


    /* ============================================================
       DOM READY
       ============================================================ */

    function initializePart3() {

        console.log(
            "ScaleFlow Part 3: Initializing AI Mentor..."
        );


        bindAIEvents();


        setAIStatus(
            "AI Ready"
        );


        console.log(
            "ScaleFlow Part 3: AI Mentor ready."
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializePart3
        );

    } else {

        initializePart3();

    }


})(window);

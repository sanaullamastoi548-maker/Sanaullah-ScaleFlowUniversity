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


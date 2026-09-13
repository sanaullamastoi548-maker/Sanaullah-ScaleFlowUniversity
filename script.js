// ============================================================
// SCALEFLOW UNIVERSITY
// PAGE 7 — AI MENTOR + QUESTION LIBRARY
// + SCALEFLOW AI MONITOR
// + LIVE WEBSITE TEST
// + ENGINE LOCK
// ============================================================

(function (global) {

    "use strict";


    // ========================================================
    // 1. VERIFIED GOOGLE APPS SCRIPT WEB APP URL
    // ========================================================

    const SCALEFLOW_WEB_APP_URL =
        "https://script.google.com/macros/s/AKfycbwBPdo7TflhmyiUIU8rZQx7hvUYPMpJJX7LszL1YxNUQrcLrf8lh8ZUIxGrp4jK_PvY/exec";


    // ========================================================
    // 2. PAGE 7 MONITOR STATE
    // ========================================================

    const AIHubState = {

        apiRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,

        lastResponseTime: 0,

        aiMentorPassed: false,
        questionLibraryPassed: false,
        monitorPassed: false,
        liveWebsitePassed: false,

        enginesLocked: false

    };


    // ========================================================
    // 3. DOM REFERENCES
    // ========================================================

    const aiMentorQuestion =
        document.getElementById("aiMentorQuestion");

    const aiMentorLanguage =
        document.getElementById("aiMentorLanguage");

    const aiMentorSubject =
        document.getElementById("aiMentorSubject");

    const aiMentorAskBtn =
        document.getElementById("aiMentorAskBtn");

    const aiMentorClearBtn =
        document.getElementById("aiMentorClearBtn");

    const aiMentorResponse =
        document.getElementById("aiMentorResponse");


    const questionLibraryTestBtn =
        document.getElementById("questionLibraryTestBtn");

    const questionLibraryStatus =
        document.getElementById("questionLibraryStatus");


    const monitorAIRequests =
        document.getElementById("monitorAIRequests");

    const monitorSuccessRate =
        document.getElementById("monitorSuccessRate");

    const monitorResponseTime =
        document.getElementById("monitorResponseTime");

    const monitorActiveServices =
        document.getElementById("monitorActiveServices");

    const scaleFlowMonitorStatus =
        document.getElementById("scaleFlowMonitorStatus");


    const runScaleFlowLiveTestBtn =
        document.getElementById("runScaleFlowLiveTestBtn");

    const liveWebsiteTestResult =
        document.getElementById("liveWebsiteTestResult");


    const liveTestAIMentorStatus =
        document.getElementById("liveTestAIMentorStatus");

    const liveTestQuestionLibraryStatus =
        document.getElementById("liveTestQuestionLibraryStatus");

    const liveTestMonitorStatus =
        document.getElementById("liveTestMonitorStatus");


    const engineLockStatus =
        document.getElementById("engineLockStatus");

    const lockScaleFlowEnginesBtn =
        document.getElementById("lockScaleFlowEnginesBtn");


    // ========================================================
    // 4. SAFE TOAST
    // ========================================================

    function aiHubToast(message, type = "info") {

        if (typeof global.showToast === "function") {
            global.showToast(message, type);
            return;
        }

        console.log("ScaleFlow AI Hub:", message);
    }


    // ========================================================
    // 5. MONITOR UPDATE
    // ========================================================

    function updateAIHubMonitor() {

        if (monitorAIRequests) {
            monitorAIRequests.textContent =
                AIHubState.apiRequests;
        }


        if (monitorSuccessRate) {

            if (AIHubState.apiRequests === 0) {

                monitorSuccessRate.textContent = "—";

            } else {

                const rate =
                    (AIHubState.successfulRequests /
                        AIHubState.apiRequests) * 100;

                monitorSuccessRate.textContent =
                    Math.round(rate) + "%";
            }
        }


        if (monitorResponseTime) {

            if (AIHubState.lastResponseTime > 0) {

                monitorResponseTime.textContent =
                    AIHubState.lastResponseTime + " ms";

            } else {

                monitorResponseTime.textContent = "—";
            }
        }


        if (monitorActiveServices) {

            let active = 0;

            if (AIHubState.aiMentorPassed) {
                active++;
            }

            if (AIHubState.questionLibraryPassed) {
                active++;
            }

            if (AIHubState.monitorPassed) {
                active++;
            }

            monitorActiveServices.textContent =
                active + " / 3";
        }
    }


    // ========================================================
    // 6. CENTRAL API REQUEST
    // ========================================================

    async function scaleFlowAIHubRequest(
        action,
        data = {}
    ) {

        const startedAt = Date.now();

        AIHubState.apiRequests++;

        updateAIHubMonitor();


        try {

            const response = await fetch(
                SCALEFLOW_WEB_APP_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        action: action,

                        data: data,

                        version: "v1",

                        requestId:
                            "PAGE7-" + Date.now()

                    })
                }
            );


            const responseTime =
                Date.now() - startedAt;

            AIHubState.lastResponseTime =
                responseTime;


            if (!response.ok) {

                throw new Error(
                    "HTTP " + response.status
                );
            }


            const result =
                await response.json();


            if (!result || result.success !== true) {

                throw new Error(
                    result && result.message
                        ? result.message
                        : "API request failed"
                );
            }


            AIHubState.successfulRequests++;

            updateAIHubMonitor();


            return result;


        } catch (error) {

            AIHubState.failedRequests++;

            AIHubState.lastResponseTime =
                Date.now() - startedAt;

            updateAIHubMonitor();

            console.error(
                "❌ ScaleFlow AI Hub API Error:",
                error
            );

            throw error;
        }
    }


    // ========================================================
    // 7. AI MENTOR
    // ========================================================

    async function askScaleFlowAIMentor() {

        if (!aiMentorQuestion) {
            return;
        }


        const question =
            aiMentorQuestion.value.trim();

        const language =
            aiMentorLanguage
                ? aiMentorLanguage.value
                : "en";

        const subject =
            aiMentorSubject
                ? aiMentorSubject.value.trim()
                : "Web Development";


        if (!question) {

            aiHubToast(
                "Please enter your question.",
                "warning"
            );

            aiMentorQuestion.focus();

            return;
        }


        if (!subject) {

            aiHubToast(
                "Please enter the subject.",
                "warning"
            );

            aiMentorSubject.focus();

            return;
        }


        if (aiMentorAskBtn) {

            aiMentorAskBtn.disabled = true;

            aiMentorAskBtn.textContent =
                "⏳ Asking AI...";
        }


        if (aiMentorResponse) {

            aiMentorResponse.textContent =
                "AI is processing your question...";
        }


        try {

            const result =
                await scaleFlowAIHubRequest(
                    "ai.chat",
                    {
                        question: question,
                        language: language,
                        subject: subject
                    }
                );


            const answer =
                result &&
                result.data &&
                result.data.answer
                    ? result.data.answer
                    : "";


            if (!answer) {

                throw new Error(
                    "AI returned an empty answer."
                );
            }


            if (aiMentorResponse) {

                aiMentorResponse.textContent =
                    answer;
            }


            AIHubState.aiMentorPassed = true;

            AIHubState.monitorPassed = true;

            updateAIHubMonitor();


            if (liveTestAIMentorStatus) {

                liveTestAIMentorStatus.textContent =
                    "🟢 PASS";

                liveTestAIMentorStatus.classList.add(
                    "success"
                );
            }


            aiHubToast(
                "AI Mentor connected successfully.",
                "success"
            );


            return result;


        } catch (error) {

            AIHubState.aiMentorPassed = false;

            updateAIHubMonitor();


            if (aiMentorResponse) {

                aiMentorResponse.textContent =
                    "AI Mentor connection failed. Please try again.";
            }


            if (liveTestAIMentorStatus) {

                liveTestAIMentorStatus.textContent =
                    "🔴 FAILED";

                liveTestAIMentorStatus.classList.add(
                    "error"
                );
            }


            aiHubToast(
                "AI Mentor connection failed.",
                "error"
            );


            return null;


        } finally {

            if (aiMentorAskBtn) {

                aiMentorAskBtn.disabled = false;

                aiMentorAskBtn.textContent =
                    "🤖 Ask AI";
            }
        }
    }


    // ========================================================
    // 8. CLEAR AI MENTOR
    // ========================================================

    function clearAIMentor() {

        if (aiMentorQuestion) {
            aiMentorQuestion.value = "";
        }

        if (aiMentorResponse) {

            aiMentorResponse.textContent =
                "AI response will appear here.";
        }
    }


    // ========================================================
    // 9. QUESTION LIBRARY LIVE TEST
    // ========================================================

    async function testQuestionLibraryConnection() {

        if (questionLibraryStatus) {

            questionLibraryStatus.textContent =
                "⏳ Testing Question Library...";
        }


        if (liveTestQuestionLibraryStatus) {

            liveTestQuestionLibraryStatus.textContent =
                "🟡 TESTING";
        }


        try {

            const result =
                await scaleFlowAIHubRequest(
                    "questionlibrary.test",
                    {
                        question:
                            "What is JavaScript?",

                        language:
                            "English",

                        subject:
                            "Web Development"
                    }
                );


            const data =
                result && result.data
                    ? result.data
                    : null;


            if (!data) {

                throw new Error(
                    "Question Library returned no data."
                );
            }


            AIHubState.questionLibraryPassed =
                true;


            updateAIHubMonitor();


            if (questionLibraryStatus) {

                questionLibraryStatus.textContent =
                    "🟢 Question Library connection PASS";
            }


            if (liveTestQuestionLibraryStatus) {

                liveTestQuestionLibraryStatus.textContent =
                    "🟢 PASS";

                liveTestQuestionLibraryStatus.classList.add(
                    "success"
                );
            }


            aiHubToast(
                "Question Library connection passed.",
                "success"
            );


            return result;


        } catch (error) {

            AIHubState.questionLibraryPassed =
                false;


            updateAIHubMonitor();


            if (questionLibraryStatus) {

                questionLibraryStatus.textContent =
                    "🔴 Question Library connection FAILED";
            }


            if (liveTestQuestionLibraryStatus) {

                liveTestQuestionLibraryStatus.textContent =
                    "🔴 FAILED";

                liveTestQuestionLibraryStatus.classList.add(
                    "error"
                );
            }


            aiHubToast(
                "Question Library test failed.",
                "error"
            );


            return null;
        }
    }


    // ========================================================
    // 10. LIVE WEBSITE TEST
    // ========================================================

    async function runScaleFlowLiveTest() {

        if (runScaleFlowLiveTestBtn) {

            runScaleFlowLiveTestBtn.disabled =
                true;

            runScaleFlowLiveTestBtn.textContent =
                "⏳ Running Live Test...";
        }


        if (liveWebsiteTestResult) {

            liveWebsiteTestResult.textContent =
                "Running real website connection tests...";
        }


        // Reset previous visual status

        if (liveTestAIMentorStatus) {

            liveTestAIMentorStatus.textContent =
                "🟡 TESTING";

            liveTestAIMentorStatus.classList.remove(
                "success",
                "error"
            );
        }


        if (liveTestQuestionLibraryStatus) {

            liveTestQuestionLibraryStatus.textContent =
                "🟡 TESTING";

            liveTestQuestionLibraryStatus.classList.remove(
                "success",
                "error"
            );
        }


        if (liveTestMonitorStatus) {

            liveTestMonitorStatus.textContent =
                "🟡 TESTING";

            liveTestMonitorStatus.classList.remove(
                "success",
                "error"
            );
        }


        try {

            // ----------------------------------------------
            // TEST 1 — AI MENTOR
            // ----------------------------------------------

            const aiResult =
                await scaleFlowAIHubRequest(
                    "ai.chat",
                    {
                        question:
                            "What is JavaScript and why is it important for web development?",

                        language:
                            "en",

                        subject:
                            "Web Development"
                    }
                );


            if (
                !aiResult ||
                !aiResult.data ||
                !aiResult.data.answer
            ) {

                throw new Error(
                    "AI Mentor live test failed."
                );
            }


            AIHubState.aiMentorPassed =
                true;


            if (liveTestAIMentorStatus) {

                liveTestAIMentorStatus.textContent =
                    "🟢 PASS";

                liveTestAIMentorStatus.classList.add(
                    "success"
                );
            }


            // ----------------------------------------------
            // TEST 2 — QUESTION LIBRARY
            // ----------------------------------------------

            const libraryResult =
                await scaleFlowAIHubRequest(
                    "questionlibrary.test",
                    {
                        question:
                            "What is JavaScript?",

                        language:
                            "English",

                        subject:
                            "Web Development"
                    }
                );


            if (
                !libraryResult ||
                !libraryResult.data
            ) {

                throw new Error(
                    "Question Library live test failed."
                );
            }


            AIHubState.questionLibraryPassed =
                true;


            if (liveTestQuestionLibraryStatus) {

                liveTestQuestionLibraryStatus.textContent =
                    "🟢 PASS";

                liveTestQuestionLibraryStatus.classList.add(
                    "success"
                );
            }


            // ----------------------------------------------
            // TEST 3 — MONITOR
            // ----------------------------------------------

            AIHubState.monitorPassed =
                AIHubState.apiRequests > 0 &&
                AIHubState.successfulRequests > 0;


            if (!AIHubState.monitorPassed) {

                throw new Error(
                    "AI Monitor test failed."
                );
            }


            if (liveTestMonitorStatus) {

                liveTestMonitorStatus.textContent =
                    "🟢 PASS";

                liveTestMonitorStatus.classList.add(
                    "success"
                );
            }


            // ----------------------------------------------
            // FINAL LIVE TEST
            // ----------------------------------------------

            AIHubState.liveWebsitePassed =
                true;


            updateAIHubMonitor();


            if (liveWebsiteTestResult) {

                liveWebsiteTestResult.textContent =
                    "🟢 LIVE WEBSITE TEST PASSED — AI Mentor + Question Library + AI Monitor are connected.";
                
                liveWebsiteTestResult.classList.add(
                    "success"
                );

                liveWebsiteTestResult.classList.remove(
                    "error"
                );
            }


            aiHubToast(
                "Live Website Test PASSED.",
                "success"
            );


            // Enable Lock

            if (
                AIHubState.aiMentorPassed &&
                AIHubState.questionLibraryPassed &&
                AIHubState.monitorPassed &&
                AIHubState.liveWebsitePassed
            ) {

                if (lockScaleFlowEnginesBtn) {
                    lockScaleFlowEnginesBtn.disabled =
                        false;
                }

                if (engineLockStatus) {

                    engineLockStatus.textContent =
                        "🟢 READY FOR LOCK";
                }
            }


        } catch (error) {

            AIHubState.liveWebsitePassed =
                false;


            updateAIHubMonitor();


            if (liveWebsiteTestResult) {

                liveWebsiteTestResult.textContent =
                    "🔴 LIVE WEBSITE TEST FAILED — Check the Page 7 connection only.";

                liveWebsiteTestResult.classList.add(
                    "error"
                );

                liveWebsiteTestResult.classList.remove(
                    "success"
                );
            }


            aiHubToast(
                "Live Website Test failed.",
                "error"
            );


            console.error(
                "❌ Page 7 Live Test:",
                error
            );


        } finally {

            if (runScaleFlowLiveTestBtn) {

                runScaleFlowLiveTestBtn.disabled =
                    false;

                runScaleFlowLiveTestBtn.textContent =
                    "⚡ Run Live Website Test";
            }
        }
    }


    // ========================================================
    // 11. ENGINE LOCK
    // ========================================================

    function lockScaleFlowEngines() {

        const ready =
            AIHubState.aiMentorPassed &&
            AIHubState.questionLibraryPassed &&
            AIHubState.monitorPassed &&
            AIHubState.liveWebsitePassed;


        if (!ready) {

            aiHubToast(
                "Engines cannot be locked before all tests pass.",
                "warning"
            );

            return;
        }


        AIHubState.enginesLocked =
            true;


        if (engineLockStatus) {

            engineLockStatus.textContent =
                "🔒 ENGINES LOCKED";

            engineLockStatus.classList.add(
                "locked"
            );
        }


        if (lockScaleFlowEnginesBtn) {

            lockScaleFlowEnginesBtn.disabled =
                true;

            lockScaleFlowEnginesBtn.textContent =
                "🔒 Engines Locked";
        }


        aiHubToast(
            "Verified ScaleFlow engines are now locked.",
            "success"
        );


        console.log(
            "🔒 SCALEFLOW PAGE 7 ENGINES LOCKED"
        );
    }


    // ========================================================
    // 12. EVENT LISTENERS
    // ========================================================

    if (aiMentorAskBtn) {

        aiMentorAskBtn.addEventListener(
            "click",
            askScaleFlowAIMentor
        );
    }


    if (aiMentorClearBtn) {

        aiMentorClearBtn.addEventListener(
            "click",
            clearAIMentor
        );
    }


    if (questionLibraryTestBtn) {

        questionLibraryTestBtn.addEventListener(
            "click",
            testQuestionLibraryConnection
        );
    }


    if (runScaleFlowLiveTestBtn) {

        runScaleFlowLiveTestBtn.addEventListener(
            "click",
            runScaleFlowLiveTest
        );
    }


    if (lockScaleFlowEnginesBtn) {

        lockScaleFlowEnginesBtn.addEventListener(
            "click",
            lockScaleFlowEngines
        );
    }


    // ========================================================
    // 13. PUBLIC PAGE 7 API
    // ========================================================

    global.ScaleFlowAIHub = {

        askAI:
            askScaleFlowAIMentor,

        testQuestionLibrary:
            testQuestionLibraryConnection,

        runLiveTest:
            runScaleFlowLiveTest,

        lockEngines:
            lockScaleFlowEngines,

        getState:
            function () {
                return {
                    ...AIHubState
                };
            },

        getMonitor:
            function () {
                return {
                    apiRequests:
                        AIHubState.apiRequests,

                    successfulRequests:
                        AIHubState.successfulRequests,

                    failedRequests:
                        AIHubState.failedRequests,

                    lastResponseTime:
                        AIHubState.lastResponseTime
                };
            }
    };


    // ========================================================
    // 14. INITIAL MONITOR
    // ========================================================

    updateAIHubMonitor();


    console.log(
        "✅ ScaleFlow Page 7 AI Hub loaded."
    );

    console.log(
        "🔗 Web App API:",
        SCALEFLOW_WEB_APP_URL
    );


})(window);


// ============================================================
// PAGE 7 AI HUB MODULE END
// ============================================================

جی پیارے دوست، بالکل۔ اس Part 8 → Part 13 کو بھی اسی اصول کے مطابق رکھنا بہتر ہے کہ:
ہر Part کا اپنا نمبر ہو۔
ہر Part صرف اپنی ذمہ داری سنبھالے۔
موجودہ HTML کے IDs/classes سے ہی link ہو۔
دوسرے Parts کو overwrite نہ کرے۔
Login/Register میں no-cors استعمال نہ کریں، کیونکہ اس سے response پڑھا نہیں جا سکتا اور غلطی کی صورت میں بھی frontend کو اصل نتیجہ معلوم نہیں ہوتا۔
Part 10 آپ کے موجودہ structure میں غائب ہے، اس لیے نمبر نہیں بدلیں گے؛ اگلا موجودہ حصہ Part 11 ہی رہے گا۔
Part 12D کو login/registration کا الگ واضح module رکھیں۔
Page 7 کا AI Hub الگ Part میں رہے گا، اسے اس حصے میں نہیں ملائیں گے۔
یہ پورا حصہ موجودہ JS میں Part 7 کے بعد، Part 14 سے پہلے رکھیں
// ============================================================
// PART 8 — GLOBAL SEARCH SYSTEM
// ============================================================

const globalSearchInput = document.getElementById("globalSearchInput");

if (globalSearchInput) {

    globalSearchInput.addEventListener("input", function () {

        const query = this.value.toLowerCase().trim();

        if (!query) {
            return;
        }

        console.log("ScaleFlow Global Search:", query);

        // Current V1:
        // Search system is connected to the website input.
        // Actual database-wide search will be connected later.
    });
}


// ============================================================
// PART 9 — HERO SECTION ACTIONS
// ============================================================

const exploreCoursesBtn = document.getElementById("exploreCoursesBtn");

if (exploreCoursesBtn) {

    exploreCoursesBtn.addEventListener("click", function () {

        navigateTo("page2");

    });
}


// ============================================================
// PART 10 — RESERVED
// ============================================================
//
// Part 10 is intentionally reserved so that every major
// frontend module keeps its original numbering.
//
// Do not place unrelated functionality here.
//


// ============================================================
// PART 11 — CONTINUE LEARNING PROGRESS
// ============================================================

const continueProgressBtn = document.getElementById("continueProgressBtn");
const continueProgress = document.getElementById("continueProgress");
const progressText = document.getElementById("progressText");


function updateContinueLearningProgress(value) {

    if (!continueProgress) {
        return 0;
    }

    let progress = Number(value);

    if (!Number.isFinite(progress)) {
        progress = 0;
    }

    progress = Math.max(0, Math.min(100, progress));

    continueProgress.style.width = progress + "%";

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

            if (currentProgress >= 100) {

                updateContinueLearningProgress(100);

                showToast(
                    "🎉 Course Completed Successfully!",
                    "success"
                );

                return;
            }

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


if (continueProgress) {

    updateContinueLearningProgress(65);
}


// ============================================================
// PART 12 — DASHBOARD STATS & METRICS
// ============================================================

function updateDashboardStats() {

    const statElements =
        document.querySelectorAll(
            ".stat-box strong, .dashboard-box span"
        );

    statElements.forEach(function (element) {

        // Dashboard statistics will be connected
        // to the real backend/database later.

        if (!element.dataset.scaleFlowStatReady) {

            element.dataset.scaleFlowStatReady = "true";
        }
    });
}


// ============================================================
// PART 12D — LOGIN & REGISTRATION
// ============================================================
//
// IMPORTANT:
// This module communicates with Google Apps Script.
//
// We intentionally DO NOT use "mode: no-cors"
// because no-cors prevents the frontend from reading
// the backend response.
//
// This means the website can correctly know:
// SUCCESS / FAILED / INVALID / SERVER ERROR
//


// ------------------------------------------------------------
// LOGIN DOM REFERENCES
// ------------------------------------------------------------

const loginForm =
    document.getElementById("loginForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const loginSubmitBtn =
    document.getElementById("loginSubmitBtn");


// ------------------------------------------------------------
// REGISTRATION DOM REFERENCES
// ------------------------------------------------------------

const loginSection =
    document.getElementById("loginSection");

const registrationSection =
    document.getElementById("registrationSection");

const registerLink =
    document.getElementById("registerLink");

const backToLoginLink =
    document.getElementById("backToLoginLink");

const registrationForm =
    document.getElementById("registrationForm");

const registerSubmitBtn =
    document.getElementById("registerSubmitBtn");


// ============================================================
// PART 12D.1 — LOGIN / REGISTRATION SCREEN SWITCHING
// ============================================================

if (registerLink) {

    registerLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            if (loginSection) {
                loginSection.style.display = "none";
            }

            if (registrationSection) {
                registrationSection.style.display = "block";
            }
        }
    );
}


if (backToLoginLink) {

    backToLoginLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            if (registrationSection) {
                registrationSection.style.display = "none";
            }

            if (loginSection) {
                loginSection.style.display = "block";
            }
        }
    );
}


// ============================================================
// PART 12D.2 — LOGIN REQUEST
// ============================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                loginEmail
                    ? loginEmail.value.trim()
                    : "";

            const password =
                loginPassword
                    ? loginPassword.value
                    : "";


            // ------------------------------------------------
            // BASIC VALIDATION
            // ------------------------------------------------

            if (!email || !password) {

                showToast(
                    "⚠️ Please enter Email and Password.",
                    "warning"
                );

                return;
            }


            // ------------------------------------------------
            // BUTTON STATE
            // ------------------------------------------------

            if (loginSubmitBtn) {

                loginSubmitBtn.disabled = true;

                loginSubmitBtn.textContent =
                    "Signing In...";

                loginSubmitBtn.style.opacity = "0.7";
            }


            try {

                // ------------------------------------------------
                // SEND REQUEST TO GOOGLE APPS SCRIPT
                // ------------------------------------------------

                const response =
                    await fetch(
                        SCALEFLOW_WEB_APP_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body: JSON.stringify({

                                action: "login",

                                data: {
                                    email: email,
                                    password: password
                                },

                                version: "v1",

                                requestId:
                                    "LOGIN-" +
                                    Date.now()
                            })
                        }
                    );


                // ------------------------------------------------
                // READ BACKEND RESPONSE
                // ------------------------------------------------

                const result =
                    await response.json();


                console.log(
                    "ScaleFlow Login Response:",
                    result
                );


                // ------------------------------------------------
                // SUCCESS
                // ------------------------------------------------

                if (result && result.success === true) {

                    showToast(
                        "✅ Login successful!",
                        "success"
                    );

                    navigateTo("page1");

                    return;
                }


                // ------------------------------------------------
                // BACKEND REJECTED LOGIN
                // ------------------------------------------------

                const message =
                    result &&
                    result.message
                        ? result.message
                        : "Invalid email or password.";


                showToast(
                    "❌ " + message,
                    "error"
                );


            } catch (error) {

                console.error(
                    "ScaleFlow Login Error:",
                    error
                );

                showToast(
                    "❌ Login connection error.",
                    "error"
                );


            } finally {

                // ------------------------------------------------
                // RESTORE BUTTON
                // ------------------------------------------------

                if (loginSubmitBtn) {

                    loginSubmitBtn.disabled = false;

                    loginSubmitBtn.textContent =
                        "Sign In";

                    loginSubmitBtn.style.opacity = "1";
                }
            }
        }
    );
}


// ============================================================
// PART 12D.3 — REGISTRATION REQUEST
// ============================================================

if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ------------------------------------------------
            // GET FORM VALUES
            // ------------------------------------------------

            const fullName =
                document
                    .getElementById("registerFullName")
                    ?.value
                    .trim() || "";

            const email =
                document
                    .getElementById("registerEmail")
                    ?.value
                    .trim() || "";

            const password =
                document
                    .getElementById("registerPassword")
                    ?.value || "";

            const confirmPassword =
                document
                    .getElementById("registerConfirmPassword")
                    ?.value || "";

            const terms =
                document.getElementById(
                    "registerTerms"
                );


            // ------------------------------------------------
            // VALIDATION
            // ------------------------------------------------

            if (!fullName || !email) {

                showToast(
                    "⚠️ Please fill in all required fields.",
                    "warning"
                );

                return;
            }


            if (password.length < 8) {

                showToast(
                    "⚠️ Password must contain at least 8 characters.",
                    "warning"
                );

                return;
            }


            if (password !== confirmPassword) {

                showToast(
                    "⚠️ Passwords do not match.",
                    "warning"
                );

                return;
            }


            if (!terms || !terms.checked) {

                showToast(
                    "⚠️ Please accept the Terms and Conditions.",
                    "warning"
                );

                return;
            }


            // ------------------------------------------------
            // BUTTON STATE
            // ------------------------------------------------

            if (registerSubmitBtn) {

                registerSubmitBtn.disabled = true;

                registerSubmitBtn.textContent =
                    "Creating Account...";

                registerSubmitBtn.style.opacity = "0.7";
            }


            try {

                // ------------------------------------------------
                // SEND REGISTRATION REQUEST
                // ------------------------------------------------

                const response =
                    await fetch(
                        SCALEFLOW_WEB_APP_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body: JSON.stringify({

                                action: "register",

                                data: {
                                    fullName: fullName,
                                    email: email,
                                    password: password,
                                    confirmPassword:
                                        confirmPassword
                                },

                                version: "v1",

                                requestId:
                                    "REGISTER-" +
                                    Date.now()
                            })
                        }
                    );


                // ------------------------------------------------
                // READ BACKEND RESPONSE
                // ------------------------------------------------

                const result =
                    await response.json();


                console.log(
                    "ScaleFlow Registration Response:",
                    result
                );


                // ------------------------------------------------
                // SUCCESS
                // ------------------------------------------------

                if (result && result.success === true) {

                    showToast(
                        "🎉 Account created successfully!",
                        "success"
                    );


                    registrationForm.reset();


                    if (registrationSection) {

                        registrationSection.style.display =
                            "none";
                    }


                    if (loginSection) {

                        loginSection.style.display =
                            "block";
                    }


                    if (loginEmail) {

                        loginEmail.value = email;
                    }


                    return;
                }


                // ------------------------------------------------
                // BACKEND REJECTED REGISTRATION
                // ------------------------------------------------

                const message =
                    result &&
                    result.message
                        ? result.message
                        : "Registration failed.";


                showToast(
                    "❌ " + message,
                    "error"
                );


            } catch (error) {

                console.error(
                    "ScaleFlow Registration Error:",
                    error
                );

                showToast(
                    "❌ Registration connection error.",
                    "error"
                );


            } finally {

                // ------------------------------------------------
                // RESTORE BUTTON
                // ------------------------------------------------

                if (registerSubmitBtn) {

                    registerSubmitBtn.disabled = false;

                    registerSubmitBtn.textContent =
                        "Create Account";

                    registerSubmitBtn.style.opacity = "1";
                }
            }
        }
    );
}


// ============================================================
// PART 13 — QUICK ACTIONS
// ============================================================

const quickActionButtons =
    document.querySelectorAll(
        ".quick-action-btn"
    );


quickActionButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const label =
                this.querySelector(".label")
                    ?.textContent
                    ?.trim() ||
                "Action";


            console.log(
                "ScaleFlow Quick Action:",
                label
            );


            showToast(
                "🚀 Triggered: " + label,
                "info"
            );
        }
    );
});


// ============================================================
// PART 13.1 — DASHBOARD STATS INITIALIZATION
// ============================================================

updateDashboardStats();


// ============================================================
// PART 13.2 — PART 8–13 READY CHECK
// ============================================================

console.log(
    "ScaleFlow Frontend Parts 8–13: READY"
);
ا

// ============================================================
// PART 14 — GEMINI AI CHAT MODULE
// ============================================================
//
// Website Chat
// ↓
// Web App API
// ↓
// Gemini AI Engine
// ↓
// Response
//
// IMPORTANT:
// - Uses the verified ScaleFlow Web App URL
// - Uses action: "ai.chat"
// - Uses question / language / subject
// - Does NOT use no-cors
// - Reads the real backend response
// ============================================================

const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");
const chatClearBtn = document.getElementById("chatClearBtn");
const chatVoiceBtn = document.getElementById("chatVoiceBtn");


// ------------------------------------------------------------
// PART 14.1 — CHAT MESSAGE HELPER
// ------------------------------------------------------------

function addChatMessage(type, text) {

    if (!chatMessages) {
        return null;
    }

    const message = document.createElement("div");

    message.className =
        type === "user"
            ? "message user"
            : "message ai";

    message.textContent = String(text || "");

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    return message;
}


// ------------------------------------------------------------
// PART 14.2 — SEND CHAT MESSAGE
// ------------------------------------------------------------

async function sendChatMessage() {

    if (!chatMessages || !chatInput) {
        return;
    }

    const message =
        chatInput.value.trim();

    if (!message) {
        showToast(
            "⚠️ Please enter a question.",
            "warning"
        );
        return;
    }


    // --------------------------------------------------------
    // DISPLAY USER MESSAGE
    // --------------------------------------------------------

    addChatMessage(
        "user",
        message
    );

    chatInput.value = "";


    // --------------------------------------------------------
    // AI LOADING MESSAGE
    // --------------------------------------------------------

    const aiMessage =
        addChatMessage(
            "ai",
            "Thinking with ScaleFlow AI..."
        );


    // --------------------------------------------------------
    // DISABLE SEND BUTTON
    // --------------------------------------------------------

    if (chatSendBtn) {

        chatSendBtn.disabled = true;

        chatSendBtn.style.opacity = "0.7";
    }


    const startTime =
        Date.now();


    try {

        // ----------------------------------------------------
        // REQUEST PAYLOAD
        // ----------------------------------------------------

        const payload = {

            action: "ai.chat",

            data: {

                question: message,

                language: "en",

                subject: "General"
            },

            version: "v1",

            requestId:
                "CHAT-" +
                Date.now()
        };


        console.log(
            "ScaleFlow AI Chat Request:",
            payload
        );


        // ----------------------------------------------------
        // GOOGLE APPS SCRIPT REQUEST
        // ----------------------------------------------------

        const response =
            await fetch(
                SCALEFLOW_WEB_APP_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(payload)
                }
            );


        // ----------------------------------------------------
        // HTTP CHECK
        // ----------------------------------------------------

        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );
        }


        // ----------------------------------------------------
        // READ JSON RESPONSE
        // ----------------------------------------------------

        const result =
            await response.json();


        console.log(
            "ScaleFlow AI Chat Response:",
            result
        );


        // ----------------------------------------------------
        // SUCCESS
        // ----------------------------------------------------

        if (
            result &&
            result.success === true &&
            result.data
        ) {

            const answer =
                result.data.answer ||
                "AI response received.";


            if (aiMessage) {

                aiMessage.textContent =
                    answer;
            }


            showToast(
                "✨ AI response received.",
                "success"
            );


        } else {

            // ------------------------------------------------
            // BACKEND ERROR
            // ------------------------------------------------

            const errorMessage =
                result &&
                result.message
                    ? result.message
                    : "AI response failed.";


            if (aiMessage) {

                aiMessage.textContent =
                    "⚠️ " +
                    errorMessage;
            }


            showToast(
                "❌ AI request failed.",
                "error"
            );
        }


        // ----------------------------------------------------
        // RESPONSE TIME
        // ----------------------------------------------------

        const responseTime =
            Date.now() -
            startTime;


        console.log(
            "ScaleFlow AI Response Time:",
            responseTime + " ms"
        );


    } catch (error) {

        console.error(
            "ScaleFlow AI Chat Error:",
            error
        );


        if (aiMessage) {

            aiMessage.textContent =
                "⚠️ Unable to connect to ScaleFlow AI.";
        }


        showToast(
            "❌ AI connection error.",
            "error"
        );


    } finally {

        // ----------------------------------------------------
        // RESTORE SEND BUTTON
        // ----------------------------------------------------

        if (chatSendBtn) {

            chatSendBtn.disabled = false;

            chatSendBtn.style.opacity = "1";
        }
    }
}


// ------------------------------------------------------------
// PART 14.3 — SEND BUTTON
// ------------------------------------------------------------

if (chatSendBtn) {

    chatSendBtn.addEventListener(
        "click",
        sendChatMessage
    );
}


// ------------------------------------------------------------
// PART 14.4 — ENTER KEY
// ------------------------------------------------------------

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendChatMessage();
            }
        }
    );
}


// ------------------------------------------------------------
// PART 14.5 — CLEAR CHAT
// ------------------------------------------------------------

if (chatClearBtn) {

    chatClearBtn.addEventListener(
        "click",
        function () {

            if (!chatMessages) {
                return;
            }


            chatMessages.innerHTML = "";


            addChatMessage(
                "ai",
                "Hello! How can I assist you today?"
            );


            showToast(
                "🧹 Chat cleared.",
                "info"
            );
        }
    );
}


// ------------------------------------------------------------
// PART 14.6 — VOICE INPUT
// ------------------------------------------------------------

if (chatVoiceBtn) {

    chatVoiceBtn.addEventListener(
        "click",
        function () {

            showToast(
                "🎤 Voice input is not connected yet.",
                "info"
            );

            console.log(
                "ScaleFlow Voice Input: Pending"
            );
        }
    );
}


// ============================================================
// PART 15 — RESERVED
// ============================================================
//
// Part 15 is intentionally reserved.
//
// Do not add unrelated functionality here.
// This keeps the original module numbering clean.
//


// ============================================================
// PART 16 — COURSES & FILTERS
// ============================================================

const courseFilterButtons =
    document.querySelectorAll(
        ".filter-buttons button"
    );


courseFilterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                courseFilterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );
                    }
                );


                this.classList.add(
                    "active"
                );


                showToast(
                    "📁 Filter applied.",
                    "info"
                );
            }
        );
    }
);


// ============================================================
// PART 17 — ACHIEVEMENTS & PROGRESS TIMELINE
// ============================================================

const achievementCards =
    document.querySelectorAll(
        ".achievement-card"
    );


achievementCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                if (
                    this.classList.contains(
                        "locked"
                    )
                ) {

                    showToast(
                        "🔒 Complete previous milestones to unlock!",
                        "warning"
                    );

                } else {

                    showToast(
                        "🏆 Achievement unlocked!",
                        "success"
                    );
                }
            }
        );
    }
);


// ============================================================
// PART 18 — MARKETPLACE & BUSINESS HUBS
// ============================================================

const businessButtons =
    document.querySelectorAll(
        ".business-card .btn-primary"
    );


businessButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    this.closest(
                        ".business-card"
                    );


                const title =
                    card
                        ?.querySelector("h3")
                        ?.textContent
                        ?.trim() ||
                    "Business";


                showToast(
                    "📂 Opening " +
                    title +
                    "... (Demo)",
                    "info"
                );
            }
        );
    }
);


// ============================================================
// PART 19 — MARKETPLACE CART SYSTEM
// ============================================================

let cartCount = 0;


const productButtons =
    document.querySelectorAll(
        ".product-card .btn-primary"
    );


function updateMarketplaceCartButton() {

    const cartButton =
        document.getElementById(
            "marketplaceCart"
        );


    if (cartButton) {

        cartButton.textContent =
            "🛒 Cart (" +
            cartCount +
            ")";
    }
}


productButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                cartCount++;

                updateMarketplaceCartButton();


                showToast(
                    "🛒 Item added to cart!",
                    "success"
                );
            }
        );
    }
);


// ------------------------------------------------------------
// CART BUTTON
// ------------------------------------------------------------

const marketplaceCart =
    document.getElementById(
        "marketplaceCart"
    );


if (marketplaceCart) {

    marketplaceCart.addEventListener(
        "click",
        function () {

            showToast(
                "🛒 You have " +
                cartCount +
                " items in your cart.",
                "info"
            );
        }
    );
}


// ------------------------------------------------------------
// CHECKOUT BUTTON
// ------------------------------------------------------------

const marketplaceCheckout =
    document.getElementById(
        "marketplaceCheckout"
    );


if (marketplaceCheckout) {

    marketplaceCheckout.addEventListener(
        "click",
        function () {

            if (cartCount === 0) {

                showToast(
                    "⚠️ Your cart is empty.",
                    "warning"
                );

                return;
            }


            showToast(
                "✅ Checkout successful! Thank you for your purchase.",
                "success"
            );


            cartCount = 0;

            updateMarketplaceCartButton();
        }
    );
}


// ============================================================
// PART 20 — SETTINGS, GLOBAL APP & SAFE BOOT STARTUP
// ============================================================


// ------------------------------------------------------------
// PART 20.1 — SETTINGS ACTIONS
// ------------------------------------------------------------

const settingsBackupBtn =
    document.getElementById(
        "settingsBackupBtn"
    );


if (settingsBackupBtn) {

    settingsBackupBtn.addEventListener(
        "click",
        function () {

            showToast(
                "💾 Backup system is ready.",
                "info"
            );
        }
    );
}


const settingsChangePassword =
    document.getElementById(
        "settingsChangePassword"
    );


if (settingsChangePassword) {

    settingsChangePassword.addEventListener(
        "click",
        function () {

            showToast(
                "🔐 Password change interface is ready.",
                "info"
            );
        }
    );
}


const settingsEnable2FA =
    document.getElementById(
        "settingsEnable2FA"
    );


if (settingsEnable2FA) {

    settingsEnable2FA.addEventListener(
        "click",
        function () {

            showToast(
                "📱 2FA interface is ready.",
                "info"
            );
        }
    );
}


// ============================================================
// PART 20.2 — GLOBAL SCALEFLOW API
// ============================================================
//
// IMPORTANT:
// Do NOT replace the existing global.ScaleFlow object.
//
// Object.assign() keeps functions registered by earlier Parts.
// ============================================================

if (!global.ScaleFlow) {

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

        updateDashboardStats:
            updateDashboardStats,

        updateContinueLearningProgress:
            updateContinueLearningProgress,

        sendChatMessage:
            sendChatMessage
    }
);


// ============================================================
// PART 20.3 — SAFE APPLICATION STARTUP
// ============================================================

function startScaleFlowApp() {

    console.log(
        "🚀 ScaleFlow University starting..."
    );


    // --------------------------------------------------------
    // NAVIGATION
    // --------------------------------------------------------

    try {

        navigateTo("page1");

    } catch (error) {

        console.error(
            "Navigation startup error:",
            error
        );
    }


    // --------------------------------------------------------
    // DASHBOARD
    // --------------------------------------------------------

    try {

        updateDashboardStats();

    } catch (error) {

        console.error(
            "Dashboard startup error:",
            error
        );
    }


    // --------------------------------------------------------
    // WELCOME
    // --------------------------------------------------------

    try {

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
// PART 20.4 — DOM READY
// ============================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startScaleFlowApp
    );

} else {

    startScaleFlowApp();
}


// ============================================================
// PART 20.5 — SAFETY LOADER
// ============================================================

setTimeout(
    function () {

        try {

            hideLoader();

        } catch (error) {

            console.error(
                "Loader hide error:",
                error
            );


            const safeLoader =
                document.getElementById(
                    "loader"
                );


            if (safeLoader) {

                safeLoader.style.display =
                    "none";
            }
        }

    },
    1000
);


// ============================================================
// FINAL FRONTEND INITIALIZATION
// ============================================================

console.log(
    "✅ ScaleFlow University JavaScript initialized."
);


// ============================================================
// END OF MAIN JAVASCRIPT IIFE
// ============================================================

})(window);

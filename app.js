"use strict";

/*
 * PS4 13.52 Host
 *
 * Frontend/controller only.
 * Kernel exploitation or payload execution is intentionally
 * not implemented here.
 */

const $ = (id) => document.getElementById(id);

const consoleElement = $("console");

function timestamp() {
    return new Date().toLocaleTimeString();
}

function log(message, type = "INFO") {
    if (!consoleElement) return;

    consoleElement.textContent +=
        `[${timestamp()}] [${type}] ${message}\n`;

    consoleElement.scrollTop = consoleElement.scrollHeight;
}

function setStatus(title, detail, state = "ready") {
    const statusText = $("statusText");
    const statusDetail = $("statusDetail");
    const statusIcon = $("statusIcon");

    if (statusText) {
        statusText.textContent = title;
    }

    if (statusDetail) {
        statusDetail.textContent = detail;
    }

    if (statusIcon) {
        statusIcon.textContent = "●";

        if (state === "success") {
            statusIcon.style.color = "var(--success)";
        } else if (state === "warning") {
            statusIcon.style.color = "var(--warning)";
        } else if (state === "error") {
            statusIcon.style.color = "var(--danger)";
        } else {
            statusIcon.style.color = "var(--accent)";
        }
    }
}

function initializeProfile() {
    const config = PS4_CONFIG;

    $("firmwareBadge").textContent =
        `FW ${config.firmware}`;

    $("profileFirmware").textContent =
        config.firmware;

    $("configFirmware").textContent =
        config.firmware;

    $("profileName").textContent =
        config.profileName;

    $("offsetCount").textContent =
        Object.keys(config.offsets).length;

    log(`Loaded ${config.profileName} profile.`);
    log(
        `${Object.keys(config.offsets).length} configuration values available.`
    );
}

function checkFirmware() {
    /*
     * A normal webpage cannot reliably read the console's actual
     * system firmware through standard browser APIs.
     */

    setStatus(
        "Firmware profile selected",
        `Configured profile: ${PS4_CONFIG.firmware}`,
        "success"
    );

    log(
        `Configured firmware: ${PS4_CONFIG.firmware}`,
        "INFO"
    );

    log(
        "Browser firmware detection is not available through standard Web APIs.",
        "INFO"
    );
}

function startSpoofIntegration() {
    log("HW Spoof selected.", "ACTION");

    if (typeof PS4_CONFIG.integration.hwSpoof === "function") {
        PS4_CONFIG.integration.hwSpoof();
        return;
    }

    setStatus(
        "Integration not connected",
        "No HW spoof implementation is attached.",
        "warning"
    );

    log(
        "No HW spoof integration is configured.",
        "WARNING"
    );
}

function startPayloadIntegration() {
    log("Payload loader selected.", "ACTION");

    if (typeof PS4_CONFIG.integration.payloadLoader === "function") {
        PS4_CONFIG.integration.payloadLoader();
        return;
    }

    setStatus(
        "Integration not connected",
        "No payload loader is attached.",
        "warning"
    );

    log(
        "No payload loader integration is configured.",
        "WARNING"
    );
}

function clearConsole() {
    consoleElement.textContent = "";
    log("Console cleared.");
}

async function copyConsole() {
    const content = consoleElement.textContent;

    try {
        await navigator.clipboard.writeText(content);

        setStatus(
            "Copied",
            "Console contents copied to clipboard.",
            "success"
        );

        log("Console copied to clipboard.");
    } catch {
        setStatus(
            "Copy failed",
            "Clipboard access was unavailable.",
            "error"
        );
    }
}

function setupEvents() {
    $("spoofButton").addEventListener(
        "click",
        startSpoofIntegration
    );

    $("payloadButton").addEventListener(
        "click",
        startPayloadIntegration
    );

    $("checkButton").addEventListener(
        "click",
        checkFirmware
    );

    $("clearButton").addEventListener(
        "click",
        clearConsole
    );

    $("copyLog").addEventListener(
        "click",
        copyConsole
    );
}

document.addEventListener("DOMContentLoaded", () => {
    initializeProfile();
    setupEvents();

    setStatus(
        "Ready",
        "Select an action to continue.",
        "ready"
    );
});

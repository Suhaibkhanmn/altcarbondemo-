const STORAGE_KEY = "altcarbon-ops-demo-v1";

const routes = [
  { id: "dashboard", label: "Dashboard", tag: "Overview" },
  { id: "campaign", label: "Campaign Setup", tag: "Intake" },
  { id: "field", label: "Field Collection", tag: "Mobile QA" },
  { id: "lab", label: "Lab Upload", tag: "Reconcile" },
  { id: "exceptions", label: "Exceptions", tag: "Action Queue" },
  { id: "sample", label: "Sample Detail", tag: "Evidence" },
  { id: "audit", label: "Audit Pack", tag: "Verifier" },
];

const seed = buildSeedData();
const state = loadState();
applyInitialRouteFromHash();

const app = document.getElementById("app");
const routeNav = document.getElementById("routeNav");

renderShell();
renderAll();
syncRoute();
updateFieldValidationPanel();

document.body.addEventListener("click", handleClick);
document.body.addEventListener("submit", handleSubmit);
document.body.addEventListener("change", handleChange);
document.body.addEventListener("input", handleInput);

function buildSeedData() {
  const campaigns = [
    {
      id: "camp-darjeeling",
      name: "Darjeeling Revival Lot A",
      region: "Makaibari cluster, Darjeeling",
      fieldTeam: "North Ridge Team",
      sampleTypes: ["Soil Core", "Water", "Rock Dust"],
      sopVersion: "SOP-ERW-2.3",
      status: "Active",
      stage: "Field + lab reconciliation",
      sampleTarget: 48,
      samplesCollected: 20,
      startDate: "2026-02-12T07:00:00+05:30",
      boundary: [
        [88.247, 27.041],
        [88.281, 27.043],
        [88.289, 27.058],
        [88.266, 27.067],
        [88.243, 27.055],
      ],
      narrative:
        "High-priority tea estate block where field quality issues directly affect downstream verification speed.",
      focus:
        "Catch collection mistakes before bags leave site, then reconcile fast enough to prepare verifier-ready evidence the same week.",
    },
    {
      id: "camp-bengal",
      name: "Bengal Basin Moisture Pilot",
      region: "Hooghly floodplain",
      fieldTeam: "Delta Survey Unit",
      sampleTypes: ["Soil Core", "Water"],
      sopVersion: "SOP-HYD-1.8",
      status: "Planned",
      stage: "Campaign design",
      sampleTarget: 24,
      samplesCollected: 0,
      startDate: "2026-03-20T08:00:00+05:30",
      boundary: [
        [88.291, 22.868],
        [88.322, 22.872],
        [88.329, 22.891],
        [88.309, 22.902],
        [88.287, 22.889],
      ],
      narrative:
        "Secondary program for floodplain moisture baselining and sampling density design.",
      focus:
        "Show how one ops surface can handle campaign setup before the first field run even starts.",
    },
  ];

  const sampleRows = [
    sample("sample-101", "AC-101", "camp-darjeeling", [88.254, 27.047], "Soil Core", "North Ridge Team", "Shallow damp soil; stone fragments visible.", "2026-03-01T08:40:00+05:30", true, "Tray A / eastern terrace"),
    sample("sample-102", "AC-102", "camp-darjeeling", [88.258, 27.051], "Water", "North Ridge Team", "Tea drainage channel, low flow.", "2026-03-01T09:08:00+05:30", true, "Channel edge / amber tint"),
    sample("sample-103", "AC-103", "camp-darjeeling", [88.261, 27.049], "Soil Core", "North Ridge Team", "Root-heavy core, moist, no odor.", "2026-03-01T09:32:00+05:30", true, "Core bag on tarp"),
    sample("sample-104a", "AC-104", "camp-darjeeling", [88.265, 27.052], "Soil Core", "North Ridge Team", "Dry topsoil near access path.", "2026-03-01T10:02:00+05:30", true, "Access path, sunny side"),
    sample("sample-104b", "AC-104", "camp-darjeeling", [88.266, 27.053], "Soil Core", "North Ridge Team", "Re-entry bag created with same label after handwriting smudge.", "2026-03-01T10:07:00+05:30", true, "Duplicate bag with tape relabel"),
    sample("sample-105", "AC-105", "camp-darjeeling", [88.271, 27.054], "Rock Dust", "North Ridge Team", "Amendment spread row, fine powder consistency.", "2026-03-01T10:30:00+05:30", true, "Hari Mati spread line"),
    sample("sample-106", "AC-106", "camp-darjeeling", [88.273, 27.057], "Soil Core", "North Ridge Team", "Steady moisture; tea roots at 15 cm.", "2026-03-01T10:58:00+05:30", true, "Low slope core"),
    sample("sample-107", "AC-107", "camp-darjeeling", [88.257, 27.061], "Water", "North Ridge Team", "Standing water after rain.", "2026-03-01T11:22:00+05:30", true, "Rain catchment edge"),
    sample("sample-108", "AC-108", "camp-darjeeling", [88.298, 27.071], "Soil Core", "North Ridge Team", "Collection taken after crossing trail marker; location looks off-plan.", "2026-03-01T11:44:00+05:30", true, "Outside terrace edge"),
    sample("sample-109", "AC-109", "camp-darjeeling", [88.248, 27.053], "Rock Dust", "North Ridge Team", "Material clumped from prior humidity.", "2026-03-01T12:10:00+05:30", true, "Bag beside tray"),
    sample("sample-110", "AC-110", "camp-darjeeling", [88.274, 27.047], "Soil Core", "North Ridge Team", "Compact dark soil, slight tea smell.", "2026-03-01T12:48:00+05:30", true, "Dark loam close-up"),
    sample("sample-111", "AC-111", "camp-darjeeling", [88.279, 27.05], "Water", "North Ridge Team", "Clear sample, fast flow, no sediment.", "2026-03-01T13:12:00+05:30", true, "Bottle on mossy stone"),
    sample("sample-112", "AC-112", "camp-darjeeling", [88.268, 27.045], "Soil Core", "North Ridge Team", "Dry soil, upper ridge, no image captured before bagging.", "2026-03-01T13:38:00+05:30", false, "Photo missing"),
    sample("sample-113", "AC-113", "camp-darjeeling", [88.246, 27.049], "Soil Core", "North Ridge Team", "Moisture gradient visible; shade plot.", "2026-03-01T14:04:00+05:30", true, "Shade plot sample"),
    sample("sample-114", "AC-114", "camp-darjeeling", [88.269, 27.061], "Water", "North Ridge Team", "Slight sediment after rainfall.", "2026-03-01T14:28:00+05:30", true, "Sediment swirl bottle"),
    sample("sample-115", "AC-115", "camp-darjeeling", [88.264, 27.059], "Soil Core", "North Ridge Team", "Expected neutral tea soil; no visible anomaly.", "2026-03-01T15:02:00+05:30", true, "Core with layered bands"),
    sample("sample-116", "AC-116", "camp-darjeeling", [88.252, 27.058], "Rock Dust", "North Ridge Team", "Dry amendment, uniform granules.", "2026-03-01T15:31:00+05:30", true, "Granular spread sample"),
    sample("sample-117", "AC-117", "camp-darjeeling", [88.276, 27.055], "Soil Core", "North Ridge Team", "Dry soil at surface, dusty in bag, no recent irrigation observed.", "2026-03-01T15:58:00+05:30", true, "Dusty bag by plot flag"),
    sample("sample-118", "AC-118", "camp-darjeeling", [88.259, 27.044], "Water", "North Ridge Team", "Low turbidity, routine check.", "2026-03-01T16:18:00+05:30", true, "Routine bottle shot"),
    sample("sample-119", "AC-119", "camp-darjeeling", [88.272, 27.063], "Soil Core", "North Ridge Team", "Upper boundary core, firm texture.", "2026-03-01T16:42:00+05:30", true, "Upper boundary core"),
  ];

  const labResults = [
    lab("lab-101", "AC-101", "LAB-026-A", 6.2, 38, 1.41, "2026-03-02T10:14:00+05:30"),
    lab("lab-102", "AC-102", "LAB-026-A", 7.1, 44, 0.41, "2026-03-02T10:21:00+05:30"),
    lab("lab-103", "AC-103", "LAB-026-A", 6.5, 41, 1.26, "2026-03-02T10:30:00+05:30"),
    lab("lab-104", "AC-104", "LAB-026-A", 5.8, 33, 1.33, "2026-03-02T10:37:00+05:30"),
    lab("lab-105", "AC-105", "LAB-026-A", 6.8, 21, 0.73, "2026-03-02T10:45:00+05:30"),
    lab("lab-106", "AC-106", "LAB-026-A", 6.1, 46, 1.52, "2026-03-02T10:52:00+05:30"),
    lab("lab-107", "AC-107", "LAB-026-A", 7.4, 68, 0.34, "2026-03-02T11:01:00+05:30"),
    lab("lab-108", "AC-109", "LAB-026-A", 6.9, 26, 0.87, "2026-03-02T11:08:00+05:30"),
    lab("lab-109", "AC-110", "LAB-026-A", 6.3, 39, 1.38, "2026-03-02T11:16:00+05:30"),
    lab("lab-110", "AC-111", "LAB-026-A", 7.0, 52, 0.29, "2026-03-02T11:23:00+05:30"),
    lab("lab-111", "AC-113", "LAB-026-A", 6.4, 42, 1.43, "2026-03-02T11:31:00+05:30"),
    lab("lab-112", "AC-114", "LAB-026-A", 7.2, 55, 0.39, "2026-03-02T11:39:00+05:30"),
    lab("lab-113", "AC-116", "LAB-026-A", 6.7, 22, 0.78, "2026-03-02T11:46:00+05:30"),
    lab("lab-114", "AC-118", "LAB-026-A", 7.0, 47, 0.36, "2026-03-02T11:53:00+05:30"),
    lab("lab-115", "AC-119", "LAB-026-A", 6.1, 34, 1.48, "2026-03-02T12:01:00+05:30"),
  ];

  const issues = [
    issue("issue-duplicate-104", "high", "AC-104", "sample-104b", "Duplicate sample ID", "Two field submissions carry the same label AC-104 within five minutes, so downstream chain-of-custody will not know which bag maps to which plot.", "Relabel the second bag with a new ID, update the field log, and confirm which coordinates belong to the retained physical sample.", "open", "Field validation"),
    issue("issue-gps-108", "high", "AC-108", "sample-108", "GPS outside boundary", "Recorded coordinates fall beyond the approved Darjeeling lot polygon and likely came from an off-plan collection point.", "Reconfirm the plot marker, recollect inside the authorized boundary, and retain the outside sample only with exception approval.", "open", "Field validation"),
    issue("issue-photo-112", "medium", "AC-112", "sample-112", "Missing photo", "The field worker submitted metadata without a supporting capture, so bag condition and context are not independently verifiable.", "Request a same-day photo addendum or mark the sample as evidence-incomplete before lab intake.", "review", "Field validation"),
    issue("issue-unmatched-204", "high", "AC-204", null, "Unmatched lab result", "Lab batch LAB-027 contains AC-204, but there is no corresponding field sample in the current campaign register.", "Pause reporting for AC-204, verify whether the label belongs to another campaign, and fix the manifest before approval.", "open", "Lab reconciliation"),
    issue("issue-ph-115", "medium", "AC-115", "sample-115", "Suspicious pH jump", "Field context suggests a normal tea soil profile, but the uploaded lab pH is sharply alkaline relative to nearby samples.", "Re-run the aliquot, confirm bottle handling, and compare with adjacent control samples before accepting the result.", "review", "Lab reconciliation"),
    issue("issue-note-117", "medium", "AC-117", "sample-117", "Field note vs lab mismatch", "Field notes describe dry, dusty soil while the lab upload reports unusually high moisture, indicating either cross-labeling or handling error.", "Check bag labels, verify transport conditions, and repeat the lab moisture test if custody is intact.", "open", "Lab reconciliation"),
  ];

  const demoUploadRows = [
    { sampleId: "AC-115", ph: 9.7, moisture: 36, inorganicCarbon: 1.62, batchId: "LAB-027" },
    { sampleId: "AC-115", ph: 9.7, moisture: 36, inorganicCarbon: 1.62, batchId: "LAB-027" },
    { sampleId: "AC-117", ph: 6.3, moisture: 88, inorganicCarbon: 1.39, batchId: "LAB-027" },
    { sampleId: "AC-204", ph: 7.2, moisture: 42, inorganicCarbon: 0.58, batchId: "LAB-027" },
    { sampleId: "AC-118", ph: 6.9, moisture: 45, inorganicCarbon: 0.37, batchId: "LAB-027" },
    { sampleId: "AC-112", ph: 6.0, moisture: 31, inorganicCarbon: 1.28, batchId: "LAB-027" },
  ];

  const activity = [
    activityItem("Field QA", "AC-108 tripped the site-boundary rule before courier handoff.", "2026-03-01T11:45:00+05:30"),
    activityItem("Lab Intake", "Batch LAB-027 loaded with one unmatched result and two high-priority exceptions.", "2026-03-02T16:10:00+05:30"),
    activityItem("Audit Draft", "Verifier dossier refreshed with lineage, approvals, and flagged evidence gaps.", "2026-03-03T09:05:00+05:30"),
    activityItem("Ops Review", "AC-112 remains evidence-incomplete pending photo addendum.", "2026-03-03T11:24:00+05:30"),
  ];

  const approvals = [
    { id: "approval-field", role: "Field Lead", owner: "S. Banerjee", status: "signed", time: "2026-03-03T14:10:00+05:30" },
    { id: "approval-lab", role: "Lab Manager", owner: "R. Menon", status: "signed", time: "2026-03-03T16:20:00+05:30" },
    { id: "approval-mrv", role: "MRV Lead", owner: "A. Dutta", status: "pending", time: null },
  ];

  return {
    campaigns,
    samples: sampleRows,
    labResults,
    issues,
    demoUploadRows,
    activity,
    approvals,
  };
}

function sample(uid, sampleId, campaignId, gps, type, team, notes, collectedAt, hasPhoto, photoLabel) {
  return {
    uid,
    sampleId,
    campaignId,
    gps: { lng: gps[0], lat: gps[1] },
    type,
    team,
    notes,
    collectedAt,
    hasPhoto,
    photoLabel,
    photoData: "",
    collector: team,
    lineage: [
      "Field capture on mobile form",
      "Courier manifest generated",
      "Lab intake registered",
      "Reconciliation and evidence pack",
    ],
  };
}

function lab(id, sampleId, batchId, ph, moisture, inorganicCarbon, receivedAt) {
  return { id, sampleId, batchId, ph, moisture, inorganicCarbon, receivedAt };
}

function issue(id, severity, sampleId, sampleUid, title, reason, fix, status, source) {
  return {
    id,
    severity,
    sampleId,
    sampleUid,
    title,
    reason,
    fix,
    status,
    source,
    createdAt: "2026-03-03T08:30:00+05:30",
  };
}

function activityItem(title, detail, time) {
  return { id: `${title}-${time}`, title, detail, time };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) {
      return defaultState();
    }
    return {
      ...defaultState(),
      ...saved,
      fieldForm: {
        ...defaultState().fieldForm,
        ...(saved.fieldForm || {}),
      },
      campaignForm: {
        ...defaultState().campaignForm,
        ...(saved.campaignForm || {}),
      },
      labUpload: {
        ...defaultState().labUpload,
        ...(saved.labUpload || {}),
      },
      copilotMessages: saved.copilotMessages?.length ? saved.copilotMessages : defaultState().copilotMessages,
      toasts: [],
    };
  } catch (error) {
    return defaultState();
  }
}

function applyInitialRouteFromHash() {
  const hashRoute = window.location.hash.replace("#", "");
  if (routes.some((route) => route.id === hashRoute)) {
    state.view = hashRoute;
  }
}

function defaultState() {
  const analysis = analyzeLabRows(seed.demoUploadRows, {
    samples: seed.samples,
    labResults: seed.labResults,
    issues: seed.issues,
  });

  return {
    view: "dashboard",
    selectedCampaignId: "camp-darjeeling",
    selectedSampleUid: "sample-115",
    selectedIssueId: null,
    issueFilter: "all",
    campaigns: structuredClone(seed.campaigns),
    samples: structuredClone(seed.samples),
    labResults: structuredClone(seed.labResults),
    issues: structuredClone(seed.issues),
    demoUploadRows: structuredClone(seed.demoUploadRows),
    latestBatchAnalysis: analysis,
    activity: structuredClone(seed.activity),
    approvals: structuredClone(seed.approvals),
    fieldValidation: [],
    campaignForm: {
      name: "",
      region: "",
      team: "",
      sampleTypes: ["Soil Core", "Water"],
      sopVersion: "SOP-ERW-2.4",
      boundaryPreset: "darjeeling-extension",
    },
    fieldForm: {
      campaignId: "camp-darjeeling",
      sampleId: "AC-120",
      type: "Soil Core",
      lat: "27.0710",
      lng: "88.2980",
      notes: "Dry soil at ridge edge. Purposely bad demo sample with no image attached.",
      collectedAt: toInputDateTime("2026-03-16T09:20:00+05:30"),
      photoData: "",
      photoName: "",
    },
    lastSubmission: null,
    labUpload: {
      rows: structuredClone(seed.demoUploadRows),
      fileName: "demo-batch-lab-027.csv",
      summary: analysis,
    },
    copilotMessages: [
      {
        role: "assistant",
        card: {
          summary: "Ask about a flagged sample, unresolved issues, or what still blocks verification.",
          evidence: "The copilot uses the seeded exception queue, sample records, and batch QA summary that power the rest of the interface.",
          confidence: "High confidence on current demo data because the answers come from local rules and seeded records.",
          nextAction: "Try: Why was sample AC-115 flagged?",
        },
      },
    ],
    toasts: [],
  };
}

function persistState() {
  const payload = {
    view: state.view,
    selectedCampaignId: state.selectedCampaignId,
    selectedSampleUid: state.selectedSampleUid,
    selectedIssueId: state.selectedIssueId,
    issueFilter: state.issueFilter,
    campaigns: state.campaigns,
    samples: state.samples,
    labResults: state.labResults,
    issues: state.issues,
    demoUploadRows: state.demoUploadRows,
    latestBatchAnalysis: state.latestBatchAnalysis,
    activity: state.activity,
    approvals: state.approvals,
    fieldValidation: state.fieldValidation,
    campaignForm: state.campaignForm,
    fieldForm: {
      ...state.fieldForm,
      photoData: state.fieldForm.photoData,
    },
    lastSubmission: state.lastSubmission,
    labUpload: state.labUpload,
    copilotMessages: state.copilotMessages.slice(-8),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function renderShell() {
  routeNav.innerHTML = routes
    .map(
      (route) => `
        <button class="route-button ${state.view === route.id ? "active" : ""}" type="button" data-action="route" data-route="${route.id}">
          <span class="route-index">0${routes.findIndex((entry) => entry.id === route.id) + 1}</span>
          <strong>${route.label}</strong>
        </button>
      `
    )
    .join("");

  app.innerHTML = `
    <div class="workspace-grid" id="workspaceGrid">
      <div class="view-stack">
        ${routes
          .map(
            (route) => `
              <section id="view-${route.id}" class="view-panel ${state.view === route.id ? "active" : ""}"></section>
            `
          )
          .join("")}
      </div>
      <aside class="copilot-panel" id="copilotPanel"></aside>
    </div>
    <div class="drawer-root ${state.selectedIssueId ? "open" : ""}" id="drawerRoot"></div>
    <div class="toast-root" id="toastRoot"></div>
  `;
}

function renderAll() {
  renderNav();
  renderDashboard();
  renderCampaignSetup();
  renderFieldCollection();
  renderLabUpload();
  renderExceptions();
  renderSampleDetail();
  renderAuditPack();
  renderCopilot();
  renderDrawer();
  renderToasts();
}

function renderNav() {
  routeNav.querySelectorAll(".route-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === state.view);
  });
}

function syncRoute() {
  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `view-${state.view}`);
  });
  document.body.dataset.view = state.view;
  const workspace = document.getElementById("workspaceGrid");
  const copilot = document.getElementById("copilotPanel");
  if (workspace && copilot) {
    const copilotRoutes = new Set(["lab", "exceptions", "sample", "audit"]);
    const showCopilot = copilotRoutes.has(state.view);
    workspace.classList.toggle("editorial-mode", !showCopilot);
    copilot.classList.toggle("hidden", !showCopilot);
  }
  if (location.hash !== `#${state.view}`) {
    history.replaceState(null, "", `#${state.view}`);
  }
  renderNav();
}

function renderManuscriptRail(kicker, links, visual = "", note = "") {
  return `
    <aside class="manuscript-rail">
      <p class="section-kicker">${kicker}</p>
      <div class="manuscript-rail-links">
        ${links
          .map(
            (item, index) => `
              <span class="rail-link ${index === 0 ? "active" : ""}">
                ${item}
              </span>
            `
          )
          .join("")}
      </div>
      ${visual}
      ${note}
    </aside>
  `;
}

function renderManuscriptFrame(rail, body, modifier = "") {
  return `
    <section class="manuscript-view ${modifier}">
      ${rail}
      <div class="manuscript-body">
        ${body}
      </div>
    </section>
  `;
}

function renderDashboard() {
  const activeCampaign = getCampaign(state.selectedCampaignId);
  const openIssues = state.issues.filter((entry) => entry.status !== "resolved");
  const highPriority = openIssues.filter((entry) => entry.severity === "high");
  const samplesForCampaign = state.samples.filter((entry) => entry.campaignId === activeCampaign.id);
  const readiness = Math.max(58, Math.round(100 - openIssues.length * 4 - highPriority.length * 6));
  const latestSummary = state.labUpload.summary || state.latestBatchAnalysis;
  document.getElementById("view-dashboard").innerHTML = `
    <section class="cinema-view">
      <div class="cinema-scene">
        <div class="cinema-noise"></div>
        <div class="cinema-river"></div>
        <div class="cinema-hero">
          <div class="cinema-copy">
            <p class="section-kicker">Alt Carbon / Field Operations Narrative</p>
            <h2 class="cinema-title">Create trustworthy evidence before the lab or verifier has to ask for it.</h2>
            <p class="hero-copy hero-lede">
              The strongest version of this product is not a dashboard template. It is an operational surface
              that feels as rigorous as the climate work itself: calm at collection time, precise at reconciliation,
              and legible when evidence needs to move into verification.
            </p>
            <div class="hero-actions">
              <button class="button violet" type="button" data-action="route" data-route="field">Run the bad sample demo</button>
              <button class="button hero-outline" type="button" data-action="route" data-route="audit">Open verifier dossier</button>
            </div>
          </div>
          <div class="cinema-plaque">
            <p class="mini-label">Active campaign</p>
            <h3 class="poster-headline">${activeCampaign.name}</h3>
            <p class="poster-copy">${activeCampaign.region}. ${activeCampaign.focus}</p>
            <div class="poster-facts">
              <div>
                <span class="mini-label">Readiness</span>
                <strong>${readiness}%</strong>
              </div>
              <div>
                <span class="mini-label">Open issues</span>
                <strong>${openIssues.length}</strong>
              </div>
              <div>
                <span class="mini-label">Samples</span>
                <strong>${samplesForCampaign.length}</strong>
              </div>
              <div>
                <span class="mini-label">Method</span>
                <strong>${activeCampaign.sopVersion}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cinema-ledger">
        <article class="ledger-stat">
          <p class="mini-label">Field ops</p>
          <h3>${samplesForCampaign.length} samples structured at capture.</h3>
          <p class="body-copy">GPS, timestamps, notes, and image evidence stay connected from the first tap.</p>
        </article>
        <article class="ledger-stat">
          <p class="mini-label">Science operations</p>
          <h3>${latestSummary.matchedCount} lab matches and ${latestSummary.unmatchedCount} rows needing triage.</h3>
          <p class="body-copy">Batch review stays legible because anomalies, duplicates, and gaps are explained early.</p>
        </article>
        <article class="ledger-stat">
          <p class="mini-label">Verification</p>
          <h3>${highPriority.length} serious blockers surfaced before reporting.</h3>
          <p class="body-copy">Evidence is packaged as a dossier, not assembled at the end in spreadsheets.</p>
        </article>
      </div>
    </section>

    ${renderManuscriptFrame(
      renderManuscriptRail(
        "Overview",
        ["Why this workflow exists", "Active campaign", "Recent activity", "Batch summary"],
        `<div class="rail-photo rail-photo-one"></div>`
      ),
      `
        <section class="folio-section">
          <div class="folio-header">
            <div>
              <p class="section-kicker">Active campaign</p>
              <h2 class="section-title">${activeCampaign.name}</h2>
            </div>
            <button class="button subtle" type="button" data-action="route" data-route="campaign">Edit setup</button>
          </div>
          <div class="folio-two-column">
            <div class="folio-copy-block">
              <p class="body-copy">${activeCampaign.narrative}</p>
              <div class="folio-meta-list">
                <span>${activeCampaign.fieldTeam}</span>
                <span>${activeCampaign.sopVersion}</span>
                <span>${samplesForCampaign.length} plotted samples</span>
              </div>
            </div>
            <div class="folio-map-block">
              ${renderMapSvg(activeCampaign, samplesForCampaign, state.issues, "light")}
            </div>
          </div>
        </section>

        <section class="folio-section">
          <div class="folio-grid-three">
            <div>
              <p class="section-kicker">Programs in system</p>
              <div class="roster-list">
                ${state.campaigns
                  .map((campaign) => {
                    const sampleCount = state.samples.filter((entry) => entry.campaignId === campaign.id).length;
                    return `
                      <article class="roster-item ${campaign.id === activeCampaign.id ? "active-card" : ""}">
                        <div>
                          <p class="mini-label">${campaign.status}</p>
                          <h3>${campaign.name}</h3>
                          <p class="body-copy">${campaign.focus}</p>
                        </div>
                        <div class="roster-meta">
                          <span>${campaign.fieldTeam}</span>
                          <span>${sampleCount} samples</span>
                          <button class="button subtle" type="button" data-action="set-campaign" data-campaign-id="${campaign.id}">Focus</button>
                        </div>
                      </article>
                    `;
                  })
                  .join("")}
              </div>
            </div>
            <div>
              <p class="section-kicker">Recent activity</p>
              <ul class="activity-list activity-stream">
                ${state.activity
                  .slice(0, 4)
                  .map(
                    (entry) => `
                      <li class="activity-item">
                        <strong>${entry.title}</strong>
                        <div>${entry.detail}</div>
                        <small>${formatDateTime(entry.time)}</small>
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            </div>
            <div>
              <p class="section-kicker">Latest batch summary</p>
              ${renderBatchNarrative(latestSummary)}
            </div>
          </div>
        </section>
      `,
      "dashboard-manuscript"
    )}
  `;
}

function renderCampaignSetup() {
  const presets = boundaryPresets();
  const selectedPreset = presets[state.campaignForm.boundaryPreset];
  const previewCampaign = {
    id: "campaign-preview",
    name: selectedPreset.label,
    boundary: selectedPreset.boundary,
  };

  document.getElementById("view-campaign").innerHTML = renderManuscriptFrame(
    renderManuscriptRail(
      "Campaign setup",
      ["Boundary", "Field team", "Sample scope", "Method"],
      `<div class="rail-photo rail-photo-campaign"></div>`,
      `
        <div class="rail-note">
          <p class="mini-label">Selected preset</p>
          <h3>${selectedPreset.label}</h3>
          <p>${selectedPreset.region}</p>
        </div>
      `
    ),
    `
      <section class="folio-section">
        <div class="folio-header">
          <div>
            <p class="section-kicker">I. Campaign Setup</p>
            <h2 class="section-title">Scope the field operation with the same discipline expected later in verification.</h2>
          </div>
          <span class="status-pill manuscript-pill">Stage 01 / Operating boundary and ownership</span>
        </div>
        <div class="manuscript-copy-grid">
          <p class="body-copy">
            This screen should read like the opening page of a case file: named project, declared geography,
            assigned team, sample scope, and explicit SOP lineage. Everything downstream inherits that context.
          </p>
          <div class="folio-meta-list">
            <span>${selectedPreset.region}</span>
            <span>${state.campaignForm.sampleTypes.length} sample classes selected</span>
            <span>${state.campaignForm.sopVersion || "SOP pending"}</span>
          </div>
        </div>
      </section>

      <section class="folio-section">
        <div class="manuscript-split manuscript-split-intake">
          <form class="form-card sheet-form manuscript-form-card" id="campaignForm">
            <div class="split-header">
              <div>
                <p class="section-kicker">New campaign</p>
                <h2 class="section-title">Create campaign</h2>
              </div>
              <span class="badge">Seeded local workflow</span>
            </div>
            <div class="form-stack">
              <div class="input-group">
                <label for="campaign-name">Project name</label>
                <input class="field" id="campaign-name" name="name" value="${escapeAttr(state.campaignForm.name)}" placeholder="Darjeeling Ridge Expansion" />
              </div>
              <div class="input-group">
                <label for="campaign-region">Site boundary label</label>
                <input class="field" id="campaign-region" name="region" value="${escapeAttr(state.campaignForm.region)}" placeholder="North terrace pilot block" />
              </div>
              <div class="form-row two-up">
                <div class="input-group">
                  <label for="campaign-team">Assigned field team</label>
                  <input class="field" id="campaign-team" name="team" value="${escapeAttr(state.campaignForm.team)}" placeholder="North Ridge Team" />
                </div>
                <div class="input-group">
                  <label for="campaign-sop">SOP version</label>
                  <input class="field" id="campaign-sop" name="sopVersion" value="${escapeAttr(state.campaignForm.sopVersion)}" placeholder="SOP-ERW-2.4" />
                </div>
              </div>
              <fieldset class="checkbox-group">
                <legend>Sample types</legend>
                <div class="checkbox-list">
                  ${["Soil Core", "Water", "Rock Dust", "Leaf Tissue"]
                    .map(
                      (sampleType) => `
                        <label class="checkbox-chip">
                          <input
                            type="checkbox"
                            name="sampleTypes"
                            value="${sampleType}"
                            ${state.campaignForm.sampleTypes.includes(sampleType) ? "checked" : ""}
                          />
                          <span>${sampleType}</span>
                        </label>
                      `
                    )
                    .join("")}
                </div>
              </fieldset>
              <div class="detail-highlight">
                <p class="mini-label">Boundary preset</p>
                <h3 style="margin: 8px 0 10px;">${selectedPreset.label}</h3>
                <p class="muted-copy" style="margin: 0;">${selectedPreset.copy}</p>
              </div>
              <div class="inline-actions">
                <button class="button" type="submit">Create campaign</button>
                <button class="button ghost" type="button" data-action="load-campaign-example">Load example values</button>
              </div>
            </div>
          </form>

          <div class="manuscript-side-column">
            <div class="map-card manuscript-map-card">
              <div class="split-header">
                <div>
                  <p class="section-kicker">Boundary preview</p>
                  <h2 class="section-title">Working footprint</h2>
                </div>
                <span class="badge">${selectedPreset.region}</span>
              </div>
              ${renderMapSvg(previewCampaign, [], [], "light")}
            </div>

            <div class="preset-gallery boundary-gallery">
              ${Object.entries(presets)
                .map(
                  ([key, preset]) => `
                    <article class="campaign-card preset-card ${state.campaignForm.boundaryPreset === key ? "active-card" : ""}">
                      <p class="mini-label">${preset.label}</p>
                      <h3>${preset.region}</h3>
                      <p class="body-copy">${preset.copy}</p>
                      <button class="button subtle" type="button" data-action="set-boundary-preset" data-preset="${key}">
                        Use this boundary
                      </button>
                    </article>
                  `
                )
                .join("")}
            </div>

            <div class="manuscript-note-card">
              <p class="mini-label">Material direction</p>
              <p class="body-copy">
                Scientific trust starts here: bounded geography, named ownership, declared method, and explicit sample scope.
              </p>
            </div>
          </div>
        </div>
      </section>
    `,
    "campaign-manuscript"
  );
}

function renderFieldCollection() {
  const activeCampaign = getCampaign(state.fieldForm.campaignId);
  const draftPreview = buildDraftSamplePreview();
  const previewIssues = draftPreview ? buildDraftPreviewIssues(draftPreview, activeCampaign) : [];
  document.getElementById("view-field").innerHTML = renderManuscriptFrame(
    renderManuscriptRail(
      "Field collection",
      ["Capture", "Coordinates", "Evidence", "Submission"],
      `<div class="rail-photo rail-photo-field"></div>`,
      `
        <div class="rail-note">
          <p class="mini-label">Selected site</p>
          <h3>${activeCampaign.name}</h3>
          <p>${activeCampaign.fieldTeam} / ${activeCampaign.sopVersion}</p>
        </div>
      `
    ),
    `
      <section class="folio-section">
        <div class="folio-header">
          <div>
            <p class="section-kicker">II. Field Collection</p>
            <h2 class="section-title">The mobile form should feel like a field instrument, not a generic app screen.</h2>
          </div>
          <span class="status-pill manuscript-pill">Stage 02 / Capture once, reconcile cleanly later</span>
        </div>
        <div class="manuscript-copy-grid">
          <p class="body-copy">
            This is the clean-work-first-time moment. The worker should know immediately if the label is duplicated,
            the boundary is wrong, the timestamp is missing, or evidence was never attached.
          </p>
          <div class="folio-meta-list">
            <span>${activeCampaign.region}</span>
            <span>${draftPreview ? "Draft sample preview active" : "Awaiting coordinates"}</span>
            <span>${validationHeadline()}</span>
          </div>
        </div>
      </section>

      <section class="folio-section">
        <div class="field-stage field-stage-manuscript">
          <div class="field-form-panel">
            <div class="phone-shell field-phone">
              <div class="phone-notch" aria-hidden="true"></div>
              <form id="fieldForm" class="form-stack">
                <div class="phone-header">
                  <div>
                    <p class="mini-label">Selected site</p>
                    <h3 class="phone-title">${activeCampaign.name}</h3>
                  </div>
                  <span class="badge">${activeCampaign.fieldTeam}</span>
                </div>

                <section class="phone-section">
                  <p class="mini-label">Site context</p>
                  <div class="input-group">
                    <label for="field-campaign">Site</label>
                    <select class="select" id="field-campaign" name="campaignId">
                      ${state.campaigns
                        .map(
                          (campaign) => `
                            <option value="${campaign.id}" ${campaign.id === state.fieldForm.campaignId ? "selected" : ""}>
                              ${campaign.name}
                            </option>
                          `
                        )
                        .join("")}
                    </select>
                  </div>
                </section>

                <section class="phone-section">
                  <p class="mini-label">Sample identity</p>
                  <div class="form-row two-up">
                    <div class="input-group">
                      <label for="field-sample-id">Sample ID</label>
                      <input class="field" id="field-sample-id" name="sampleId" value="${escapeAttr(state.fieldForm.sampleId)}" />
                    </div>
                    <div class="input-group">
                      <label for="field-type">Sample type</label>
                      <select class="select" id="field-type" name="type">
                        ${["Soil Core", "Water", "Rock Dust", "Leaf Tissue"]
                          .map((option) => `<option value="${option}" ${state.fieldForm.type === option ? "selected" : ""}>${option}</option>`)
                          .join("")}
                      </select>
                    </div>
                  </div>
                </section>

                <section class="phone-section">
                  <div class="section-header-line">
                    <div>
                      <p class="mini-label">Location capture</p>
                      <h3 class="minor-title">Coordinates and timestamp</h3>
                    </div>
                    <button class="button subtle" type="button" data-action="capture-gps">Capture GPS</button>
                  </div>
                  <div class="form-row two-up">
                    <div class="input-group">
                      <label for="field-lat">Latitude</label>
                      <input class="field" id="field-lat" name="lat" value="${escapeAttr(state.fieldForm.lat)}" />
                    </div>
                    <div class="input-group">
                      <label for="field-lng">Longitude</label>
                      <input class="field" id="field-lng" name="lng" value="${escapeAttr(state.fieldForm.lng)}" />
                    </div>
                  </div>
                  <div class="input-group">
                    <label for="field-collected-at">Timestamp</label>
                    <input class="field" id="field-collected-at" type="datetime-local" name="collectedAt" value="${escapeAttr(state.fieldForm.collectedAt)}" />
                  </div>
                </section>

                <section class="phone-section">
                  <p class="mini-label">Evidence</p>
                  <div class="input-group">
                    <label for="field-photo">Photo evidence</label>
                    <input class="file-field" id="field-photo" name="photo" type="file" accept="image/*" />
                  </div>
                  <div id="fieldPhotoPreview">${renderFieldPhotoPreview()}</div>
                </section>

                <section class="phone-section">
                  <p class="mini-label">Context note</p>
                  <div class="input-group">
                    <label for="field-notes">Field notes</label>
                    <textarea class="textarea" id="field-notes" name="notes">${escapeText(state.fieldForm.notes)}</textarea>
                  </div>
                </section>

                <div class="phone-sticky-bar">
                  <div class="phone-demo-actions">
                    <button class="button ghost" type="button" data-action="load-bad-sample">Load failing sample</button>
                    <button class="button ghost" type="button" data-action="load-good-sample">Load clean sample</button>
                  </div>
                  <div class="inline-actions">
                    <button class="button" type="submit">Submit sample</button>
                    <button class="button clay" type="button" data-action="route" data-route="exceptions">Open issue queue</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="field-rail">
            <div class="form-card qa-sheet">
              <div class="split-header">
                <div>
                  <p class="section-kicker">Instant checks</p>
                  <h2 class="section-title">Clean work first time</h2>
                </div>
                <span class="badge" id="fieldValidationHeadline">${validationHeadline()}</span>
              </div>
              <ul class="validation-list" id="fieldValidationPanel"></ul>
            </div>

            <div class="map-card evidence-sheet">
              <div class="split-header">
                <div>
                  <p class="section-kicker">Boundary preview</p>
                  <h2 class="section-title">Draft sample against site boundary</h2>
                </div>
                <span class="badge">${activeCampaign.sopVersion}</span>
              </div>
              ${
                draftPreview
                  ? renderMapSvg(activeCampaign, [draftPreview], previewIssues, "light")
                  : `<div class="empty-state">Enter coordinates to preview this draft sample against the selected site.</div>`
              }
            </div>

            <div class="detail-card evidence-sheet">
              <p class="section-kicker">Operational note</p>
              <h2 class="section-title">Stop rework before the courier leaves site.</h2>
              <p class="section-subtitle">
                The strongest moment in the demo is the rejection of a bad sample while the worker is still standing on plot.
              </p>
              ${
                state.lastSubmission
                  ? `
                    <div class="detail-highlight" style="margin-top: 18px;">
                      <p class="mini-label">Latest clean submission</p>
                      <h3 style="margin: 8px 0 10px;">${state.lastSubmission.sampleId}</h3>
                      <p class="muted-copy" style="margin: 0;">Saved for ${getCampaign(state.lastSubmission.campaignId).name} at ${formatDateTime(state.lastSubmission.collectedAt)}.</p>
                    </div>
                  `
                  : `
                    <div class="empty-state" style="margin-top: 18px;">
                      Submit a clean sample to show how the workflow moves from validation into the shared campaign record.
                    </div>
                  `
              }
            </div>
          </div>
        </div>
      </section>
    `,
    "field-manuscript"
  );
  updateFieldValidationPanel();
}

function renderLabUpload() {
  const summary = state.labUpload.summary || state.latestBatchAnalysis;
  const flaggedIds = new Set((summary?.findings || []).map((finding) => finding.sampleId));
  document.getElementById("view-lab").innerHTML = renderManuscriptFrame(
    renderManuscriptRail(
      "Lab reconciliation",
      ["Upload batch", "Preview rows", "Review logic", "Findings"],
      `<div class="rail-photo rail-photo-lab"></div>`,
      `
        <div class="rail-note">
          <p class="mini-label">Current batch</p>
          <h3>${state.labUpload.fileName || "No file loaded"}</h3>
          <p>${state.labUpload.rows.length} rows staged for QA</p>
        </div>
      `
    ),
    `
      <section class="folio-section">
        <div class="folio-header">
          <div>
            <p class="section-kicker">III. Lab Results Upload</p>
            <h2 class="section-title">Batch QA should feel like evidence reconciliation, not file management.</h2>
          </div>
          <span class="status-pill manuscript-pill">Stage 03 / Match, screen, and explain anomalies</span>
        </div>
        <div class="impact-strip lab-summary-strip">
          ${summaryMetric("Matched", summary?.matchedCount || 0, "Field records found")}
          ${summaryMetric("Unmatched", summary?.unmatchedCount || 0, "No field record")}
          ${summaryMetric("Suspicious", summary?.suspiciousCount || 0, "Values needing review")}
          ${summaryMetric("Duplicates", summary?.duplicateCount || 0, "Repeated sample IDs")}
        </div>
      </section>

      <section class="folio-section">
        <div class="manuscript-split manuscript-split-lab">
          <div class="upload-card sheet-form manuscript-upload-card">
            <div class="split-header">
              <div>
                <p class="section-kicker">CSV preview</p>
                <h2 class="section-title">Rows ready for QA</h2>
              </div>
              <span class="badge">${state.labUpload.rows.length} rows</span>
            </div>
            <div class="upload-zone" style="margin-bottom: 22px;">
              <div class="inline-actions">
                <label class="button ghost" for="lab-file-input">Upload CSV</label>
                <input class="sr-only" id="lab-file-input" type="file" accept=".csv" />
                <button class="button subtle" type="button" data-action="load-demo-batch">Load demo batch</button>
                <button class="button" type="button" data-action="run-lab-qa">Run QA</button>
              </div>
              <p class="muted-copy" style="margin: 14px 0 0;">${state.labUpload.fileName ? `Current file: ${state.labUpload.fileName}` : "No file loaded yet."}</p>
            </div>
            ${
              state.labUpload.rows.length
                ? `
                  <div class="preview-table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Sample ID</th>
                          <th>Batch</th>
                          <th>pH</th>
                          <th>Moisture</th>
                          <th>Inorganic Carbon</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${state.labUpload.rows
                          .map(
                            (row) => `
                              <tr class="${flaggedIds.has(row.sampleId) ? "table-row-flagged" : ""}">
                                <td>${row.sampleId}</td>
                                <td>${row.batchId}</td>
                                <td>${row.ph}</td>
                                <td>${row.moisture}%</td>
                                <td>${row.inorganicCarbon}</td>
                              </tr>
                            `
                          )
                          .join("")}
                      </tbody>
                    </table>
                  </div>
                `
                : `<div class="empty-state">Load a seeded batch or upload a simple CSV with columns: sampleId,batchId,ph,moisture,inorganicCarbon.</div>`
            }
          </div>

          <div class="manuscript-side-column">
            <div class="manuscript-note-card">
              <p class="mini-label">Batch narrative</p>
              <h3>Readable QA summary</h3>
              ${renderBatchNarrative(summary)}
            </div>
            <div class="manuscript-note-card">
              <p class="mini-label">Review logic</p>
              <p class="body-copy">
                The review layer uses explicit rules instead of black-box anomaly claims: sample matching, duplicate screening,
                pH outliers, note mismatches, and missing field lineage.
              </p>
            </div>
            ${
              summary?.findings?.length
                ? `
                  <div class="manuscript-note-card">
                    <p class="mini-label">Flagged findings</p>
                    <ul class="validation-list findings-list">
                      ${summary.findings
                        .slice(0, 5)
                        .map(
                          (finding) => `
                            <li class="validation-item">
                              <div class="validation-copy">
                                <strong>${finding.title} / ${finding.sampleId}</strong>
                                <p>${finding.reason}</p>
                              </div>
                              <span class="validation-state ${severityClass(finding.severity)}">${finding.severity}</span>
                            </li>
                          `
                        )
                        .join("")}
                    </ul>
                  </div>
                `
                : ""
            }
          </div>
        </div>
      </section>
    `,
    "lab-manuscript"
  );
}

function renderExceptions() {
  const filteredIssues = getFilteredIssues();
  const openCount = state.issues.filter((entry) => entry.status === "open").length;
  const reviewCount = state.issues.filter((entry) => entry.status === "review").length;
  const resolvedCount = state.issues.filter((entry) => entry.status === "resolved").length;
  const highCount = state.issues.filter((entry) => entry.severity === "high").length;
  document.getElementById("view-exceptions").innerHTML = renderManuscriptFrame(
    renderManuscriptRail(
      "Exception review",
      ["Queue", "Severity", "Reasoning", "Next action"],
      `<div class="rail-photo rail-photo-qa"></div>`,
      `
        <div class="rail-note">
          <p class="mini-label">Queue health</p>
          <h3>${openCount} open / ${reviewCount} in review</h3>
          <p>${highCount} high-severity items still threaten verifier confidence.</p>
        </div>
      `
    ),
    `
      <section class="folio-section">
        <div class="folio-header">
          <div>
            <p class="section-kicker">IV. Exceptions Dashboard</p>
            <h2 class="section-title">Exception review should feel like disciplined casework, not spreadsheet triage.</h2>
          </div>
          <button class="button ghost" type="button" data-action="route" data-route="audit">Preview verifier pack</button>
        </div>
        <div class="impact-strip qa-strip">
          <article class="impact-line">
            <p class="mini-label">Open</p>
            <h3>${openCount}</h3>
            <p class="body-copy">Blocking items waiting on action.</p>
          </article>
          <article class="impact-line">
            <p class="mini-label">In review</p>
            <h3>${reviewCount}</h3>
            <p class="body-copy">Records already under scientific review.</p>
          </article>
          <article class="impact-line">
            <p class="mini-label">High severity</p>
            <h3>${highCount}</h3>
            <p class="body-copy">Most likely to block verifier confidence.</p>
          </article>
          <article class="impact-line">
            <p class="mini-label">Resolved</p>
            <h3>${resolvedCount}</h3>
            <p class="body-copy">Exceptions closed with traceable fixes.</p>
          </article>
        </div>
      </section>

      <section class="folio-section">
        <div class="filter-row manuscript-filter-row">
          ${["all", "open", "review", "high"]
            .map(
              (filter) => `
                <button class="button ${state.issueFilter === filter ? "" : "ghost"}" type="button" data-action="set-issue-filter" data-filter="${filter}">
                  ${filter === "all" ? "All issues" : filter === "review" ? "In review" : filter === "high" ? "High severity" : "Open only"}
                </button>
              `
            )
            .join("")}
        </div>

        <div class="table-wrapper premium-table-wrap manuscript-table-shell">
          <table>
            <thead>
              <tr>
                <th>Severity</th>
                <th>Sample ID</th>
                <th>Issue</th>
                <th>Queue</th>
                <th>Reason</th>
                <th>Recommended fix</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredIssues
                .map(
                  (entry) => `
                    <tr class="qa-row qa-row-${entry.severity}">
                      <td><span class="validation-state ${severityClass(entry.severity)}">${capitalize(entry.severity)}</span></td>
                      <td>
                        <button class="table-button case-link" type="button" data-action="open-issue" data-issue-id="${entry.id}">
                          <strong>${entry.sampleId}</strong>
                        </button>
                      </td>
                      <td>${entry.title}</td>
                      <td>${entry.source}</td>
                      <td>${entry.reason}</td>
                      <td>${entry.fix}</td>
                      <td>
                        <select class="select" data-action="update-issue-status" data-issue-id="${entry.id}">
                          ${["open", "review", "resolved"]
                            .map((status) => `<option value="${status}" ${entry.status === status ? "selected" : ""}>${status}</option>`)
                            .join("")}
                        </select>
                      </td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    `,
    "exceptions-manuscript"
  );
}

function renderSampleDetail() {
  const sample = getSample(state.selectedSampleUid) || state.samples[0];
  const sampleIssues = issuesForSample(sample.sampleId);
  const sampleLab = latestLabForSample(sample.sampleId);
  const campaign = getCampaign(sample.campaignId);
  const evidenceIntegrity = sample.hasPhoto || sample.photoData ? "Photo attached" : "Evidence gap";
  document.getElementById("view-sample").innerHTML = renderManuscriptFrame(
    renderManuscriptRail(
      "Sample case file",
      ["Metadata", "Evidence", "Location", "History"],
      `<div class="rail-photo rail-photo-sample"></div>`,
      `
        <div class="rail-note">
          <p class="mini-label">Current sample</p>
          <h3>${sample.sampleId}</h3>
          <p>${campaign.name} / ${sample.type}</p>
        </div>
      `
    ),
    `
      <section class="folio-section">
        <div class="folio-header">
          <div>
            <p class="section-kicker">V. Sample Detail</p>
            <h2 class="section-title">${sample.sampleId}</h2>
            <p class="section-subtitle">${campaign.name} / ${sample.type} / ${sample.team}</p>
          </div>
          <div class="inline-actions">
            <select class="select" data-action="select-sample">
              ${state.samples
                .map(
                  (entry) => `
                    <option value="${entry.uid}" ${entry.uid === sample.uid ? "selected" : ""}>
                      ${entry.sampleId} / ${entry.type}
                    </option>
                  `
                )
                .join("")}
            </select>
            <button class="button ghost" type="button" data-action="route" data-route="exceptions">Back to queue</button>
          </div>
        </div>

        <div class="casefile-layout">
          <div class="casefile-main">
            <div class="casefile-summary">
              <article class="impact-line">
                <p class="mini-label">Evidence integrity</p>
                <h3>${evidenceIntegrity}</h3>
                <p class="body-copy">Photo status, chain-of-custody, and note completeness stay tied to the sample record.</p>
              </article>
              <article class="impact-line">
                <p class="mini-label">Issue count</p>
                <h3>${sampleIssues.length}</h3>
                <p class="body-copy">Open and historical exceptions linked directly to this sample.</p>
              </article>
              <article class="impact-line">
                <p class="mini-label">Lab match</p>
                <h3>${sampleLab ? sampleLab.batchId : "Pending"}</h3>
                <p class="body-copy">${sampleLab ? "Result attached and traceable." : "No reconciled lab row yet."}</p>
              </article>
            </div>
            <div class="detail-highlight case-note-block">
              <p class="mini-label">Field note</p>
              <p class="body-copy" style="margin: 10px 0 0;">${sample.notes}</p>
            </div>
            <div class="detail-card case-spec">
              <dl class="detail-metadata">
                <div>
                  <dt>Collected at</dt>
                  <dd>${formatDateTime(sample.collectedAt)}</dd>
                </div>
                <div>
                  <dt>GPS</dt>
                  <dd>${formatCoord(sample.gps.lat)}, ${formatCoord(sample.gps.lng)}</dd>
                </div>
                <div>
                  <dt>SOP</dt>
                  <dd>${campaign.sopVersion}</dd>
                </div>
                <div>
                  <dt>Chain of custody</dt>
                  <dd>${sample.lineage.join(" -> ")}</dd>
                </div>
              </dl>
            </div>
            <div class="case-history">
              <p class="section-kicker">Issue history</p>
              ${
                sampleIssues.length
                  ? `
                    <ul class="timeline-list">
                      ${sampleIssues
                        .map(
                          (entry) => `
                            <li class="timeline-item">
                              <strong>${entry.title}</strong>
                              <div>${entry.reason}</div>
                              <small>${capitalize(entry.status)} / ${entry.source}</small>
                            </li>
                          `
                        )
                        .join("")}
                    </ul>
                  `
                  : `<div class="empty-state">No open issues on this sample.</div>`
              }
            </div>
          </div>

          <div class="casefile-rail">
            <div class="map-card case-evidence-card">
              <p class="section-kicker">Photo evidence</p>
              ${renderSamplePhoto(sample)}
            </div>
            <div class="map-card case-evidence-card">
              <p class="section-kicker">Location context</p>
              ${renderMapSvg(campaign, [sample], sampleIssues, "light")}
            </div>
            <div class="detail-card case-evidence-card">
              <p class="section-kicker">Lab results</p>
              ${
                sampleLab
                  ? `
                    <dl class="lab-stats">
                      <div><dt>Batch</dt><dd>${sampleLab.batchId}</dd></div>
                      <div><dt>pH</dt><dd>${sampleLab.ph}</dd></div>
                      <div><dt>Moisture</dt><dd>${sampleLab.moisture}%</dd></div>
                      <div><dt>Inorganic carbon</dt><dd>${sampleLab.inorganicCarbon}</dd></div>
                    </dl>
                  `
                  : `<div class="empty-state">No lab result matched yet.</div>`
              }
            </div>
          </div>
        </div>
      </section>
    `,
    "sample-manuscript"
  );
}

function renderAuditPack() {
  const activeCampaign = getCampaign(state.selectedCampaignId);
  const campaignSamples = state.samples.filter((entry) => entry.campaignId === activeCampaign.id);
  const campaignIssues = state.issues.filter((entry) => {
    const sample = entry.sampleUid ? getSample(entry.sampleUid) : sampleBySampleId(entry.sampleId);
    return !sample || sample.campaignId === activeCampaign.id;
  });
  const openCount = campaignIssues.filter((entry) => entry.status !== "resolved").length;
  const readiness = Math.max(58, Math.round(100 - openCount * 5));

  document.getElementById("view-audit").innerHTML = renderManuscriptFrame(
    renderManuscriptRail(
      "Verifier dossier",
      ["Batch summary", "Sample map", "Exceptions", "Approvals"],
      `<div class="rail-photo rail-photo-audit"></div>`,
      `
        <div class="rail-note">
          <p class="mini-label">Campaign readiness</p>
          <h3>${readiness}% ready</h3>
          <p>${openCount} unresolved items remain before final sign-off.</p>
        </div>
      `
    ),
    `
      <div class="dossier-card dossier-page">
        <div class="dossier-masthead">
          <div>
            <p class="section-kicker">VI. Audit Pack / Verifier Page</p>
            <h2 class="dossier-title">Field-to-lab evidence dossier</h2>
            <p class="section-subtitle">${activeCampaign.name}. ${activeCampaign.region}.</p>
          </div>
          <div class="inline-actions dossier-actions">
            <div class="readiness-ring" style="--readiness: ${readiness};">
              <div>
                <strong>${readiness}</strong>
                <div class="mini-label" style="text-align: center;">Readiness</div>
              </div>
            </div>
            <button class="button" type="button" data-action="export-pdf">Export PDF</button>
          </div>
        </div>
        <div class="dossier-lede">
          <p class="body-copy">
            This pack is structured as a verifier-ready case file. It summarizes operational risk, links each exception
            back to field evidence and lab context, and shows where approvals still block final sign-off.
          </p>
        </div>
        <div class="dossier-divider"></div>
        <div class="audit-grid dossier-grid">
          <div class="detail-card dossier-section">
            <p class="section-kicker">Batch Summary</p>
            <h2 class="section-title">What a verifier needs to trust quickly</h2>
            <p class="body-copy">
              ${campaignSamples.length} samples are in scope for ${activeCampaign.name}. ${campaignIssues.length} exceptions were logged;
              ${openCount} remain unresolved. The pack links every flagged issue back to field metadata, map position, supporting media,
              and the current approval state.
            </p>
            <ul class="evidence-list" style="margin-top: 16px;">
              <li class="evidence-item">
                <div>
                  <strong>Coverage summary</strong>
                  <div>${campaignSamples.length} field records, ${countLabForCampaign(activeCampaign.id)} matched lab results, ${countSamplesWithPhoto(activeCampaign.id)} with photo evidence.</div>
                </div>
                <span class="lineage-step">${Math.round((countSamplesWithPhoto(activeCampaign.id) / Math.max(campaignSamples.length, 1)) * 100)}% photo coverage</span>
              </li>
              <li class="evidence-item">
                <div>
                  <strong>Exception concentration</strong>
                  <div>${campaignIssues.filter((entry) => entry.severity === "high").length} high-severity items carry the biggest verification risk.</div>
                </div>
                <span class="lineage-step">${campaignIssues.filter((entry) => entry.status === "resolved").length} resolved</span>
              </li>
              <li class="evidence-item">
                <div>
                  <strong>Data lineage</strong>
                  <div>Each sample record retains capture timestamp, coordinates, photo state, lab batch link, and exception history.</div>
                </div>
                <span class="lineage-step">Traceable</span>
              </li>
            </ul>
          </div>

          <div class="map-card dossier-section dossier-map">
            <p class="section-kicker">Sample Map</p>
            ${renderMapSvg(activeCampaign, campaignSamples, campaignIssues, "light")}
          </div>

          <div class="detail-card dossier-section">
            <p class="section-kicker">Flagged Exceptions</p>
            <ul class="evidence-list">
              ${campaignIssues
                .slice(0, 6)
                .map(
                  (entry) => `
                    <li class="evidence-item">
                      <div>
                        <strong>${entry.sampleId} / ${entry.title}</strong>
                        <div>${entry.reason}</div>
                      </div>
                      <span class="validation-state ${severityClass(entry.severity)}">${capitalize(entry.status)}</span>
                    </li>
                  `
                )
                .join("")}
              </ul>
          </div>

          <div class="detail-card dossier-section">
            <p class="section-kicker">Data Lineage</p>
            <ul class="lineage-list">
              <li class="lineage-item">
                <div>
                  <strong>Field capture</strong>
                  <div>Mobile submission with site, sample ID, GPS, timestamp, photo, and notes.</div>
                </div>
                <span class="lineage-step">Structured</span>
              </li>
              <li class="lineage-item">
                <div>
                  <strong>Validation layer</strong>
                  <div>Rule engine checks duplicate IDs, missing photo, timestamp presence, and boundary drift.</div>
                </div>
                <span class="lineage-step">Immediate</span>
              </li>
              <li class="lineage-item">
                <div>
                  <strong>Lab reconciliation</strong>
                  <div>CSV matching, anomaly rules, note mismatch detection, and duplicate result screening.</div>
                </div>
                <span class="lineage-step">Batch QA</span>
              </li>
              <li class="lineage-item">
                <div>
                  <strong>Evidence packaging</strong>
                  <div>Open issues, approvals, and map context assembled into a verifier-facing report.</div>
                </div>
                <span class="lineage-step">Export-ready</span>
              </li>
            </ul>
          </div>

          <div class="detail-card dossier-section">
            <p class="section-kicker">Approvals</p>
            <ul class="approval-list">
              ${state.approvals
                .map(
                  (approval) => `
                    <li class="approval-item">
                      <div>
                        <strong>${approval.role}</strong>
                        <div>${approval.owner}</div>
                      </div>
                      <span class="approval-state">${approval.status === "signed" ? `Signed ${formatShortDate(approval.time)}` : "Pending signature"}</span>
                    </li>
                  `
                )
                .join("")}
              </ul>
          </div>

          <div class="detail-card dossier-section">
            <p class="section-kicker">Verifier Narrative</p>
            <p class="body-copy">
              This batch demonstrates exactly where operational risk sits: one duplicate field label, one out-of-bound collection,
              one evidence gap, and two lab-side anomalies that need resolution before claims move forward. The value is not only
              catching them. It is making each exception legible, traceable, and fixable without manual evidence assembly.
            </p>
          </div>
        </div>
      </div>
    `,
    "audit-manuscript"
  );
}

function renderCopilot() {
  document.getElementById("copilotPanel").innerHTML = `
    <div class="copilot-header structured-copilot-header">
      <div>
        <p class="section-kicker">Scripted Copilot</p>
        <h2 class="copilot-title">Operational analyst</h2>
        <p class="section-subtitle">Answers should separate summary, evidence basis, confidence, and next action.</p>
      </div>
      <span class="badge">Rule-backed</span>
    </div>
    <ul class="copilot-messages structured-copilot-list">
      ${state.copilotMessages
        .map((message) => renderCopilotMessage(message))
        .join("")}
    </ul>
    <form class="copilot-form" id="copilotForm">
      <textarea class="textarea" name="copilotQuery" placeholder="Why was sample AC-115 flagged?"></textarea>
      <div class="copilot-suggestions">
        ${[
          "Why was sample AC-115 flagged?",
          "Show samples outside the site boundary",
          "Summarize unresolved issues in this batch",
        ]
          .map(
            (prompt) => `
              <button class="suggestion-chip" type="button" data-action="copilot-prompt" data-prompt="${escapeAttr(prompt)}">${prompt}</button>
            `
          )
          .join("")}
      </div>
      <button class="button" type="submit">Ask copilot</button>
    </form>
  `;
}

function renderDrawer() {
  const drawerRoot = document.getElementById("drawerRoot");
  if (!state.selectedIssueId) {
    drawerRoot.className = "drawer-root";
    drawerRoot.innerHTML = "";
    return;
  }
  const currentIssue = state.issues.find((entry) => entry.id === state.selectedIssueId);
  const sample = currentIssue?.sampleUid ? getSample(currentIssue.sampleUid) : sampleBySampleId(currentIssue.sampleId);
  const campaign = sample ? getCampaign(sample.campaignId) : getCampaign(state.selectedCampaignId);
  const sampleLab = latestLabForSample(currentIssue.sampleId);
  drawerRoot.className = "drawer-root open";
  drawerRoot.innerHTML = `
    <div class="drawer-backdrop" data-action="close-issue"></div>
    <aside class="drawer-panel">
      <div class="split-header">
        <div>
          <p class="section-kicker">Exception Detail</p>
          <h2 class="drawer-title">${currentIssue.title}</h2>
        </div>
        <button class="button ghost" type="button" data-action="close-issue">Close</button>
      </div>
      <div class="drawer-summary">
        <div class="detail-highlight">
          <p class="mini-label">Sample</p>
          <h3 style="margin: 8px 0 6px;">${currentIssue.sampleId}</h3>
          <p class="muted-copy" style="margin: 0;">${currentIssue.reason}</p>
        </div>
        <div class="drawer-metadata">
          <span class="validation-state ${severityClass(currentIssue.severity)}">${capitalize(currentIssue.severity)}</span>
          <span class="badge">${currentIssue.source}</span>
        </div>
      </div>
      <div class="drawer-section" style="margin-top: 18px;">${sample ? renderSamplePhoto(sample) : `<div class="empty-state">No field sample linked yet.</div>`}</div>
      <div class="map-card drawer-section" style="margin-top: 18px;">
        <p class="section-kicker">Location</p>
        ${sample ? renderMapSvg(campaign, [sample], [currentIssue], "dark") : `<div class="empty-state">No map point available for unmatched result.</div>`}
      </div>
      <div class="detail-card drawer-section drawer-stack" style="margin-top: 18px;">
        <div>
          <p class="section-kicker">Reasoning</p>
          <p class="body-copy">${currentIssue.reason}</p>
        </div>
        <div>
          <p class="section-kicker">Recommended fix</p>
          <p class="body-copy">${currentIssue.fix}</p>
        </div>
      </div>
      ${
        sample
          ? `
            <div class="detail-card drawer-section" style="margin-top: 18px;">
              <p class="section-kicker">Field notes</p>
              <p class="body-copy">${sample.notes}</p>
            </div>
          `
          : ""
      }
      ${
        sampleLab
          ? `
            <div class="detail-card drawer-section" style="margin-top: 18px;">
              <p class="section-kicker">Lab values</p>
              <dl class="lab-stats">
                <div><dt>Batch</dt><dd>${sampleLab.batchId}</dd></div>
                <div><dt>pH</dt><dd>${sampleLab.ph}</dd></div>
                <div><dt>Moisture</dt><dd>${sampleLab.moisture}%</dd></div>
                <div><dt>Inorganic carbon</dt><dd>${sampleLab.inorganicCarbon}</dd></div>
              </dl>
            </div>
          `
          : ""
      }
      <div class="detail-actions" style="margin-top: 18px;">
        ${
          sample
            ? `<button class="button" type="button" data-action="open-sample-from-issue" data-sample-uid="${sample.uid}">Open sample detail</button>`
            : ""
        }
        <button class="button ghost" type="button" data-action="route" data-route="audit">Open audit pack</button>
      </div>
    </aside>
  `;
}

function renderToasts() {
  document.getElementById("toastRoot").innerHTML = state.toasts
    .map((toast) => `<div class="toast">${toast.message}</div>`)
    .join("");
}

function updateFieldValidationPanel() {
  const panel = document.getElementById("fieldValidationPanel");
  if (!panel) {
    return;
  }
  const checks = validateFieldForm();
  state.fieldValidation = checks;
  const headline = document.getElementById("fieldValidationHeadline");
  if (headline) {
    headline.textContent = validationHeadline();
  }
  panel.innerHTML = checks
    .map(
      (check) => `
        <li class="validation-item">
          <div class="validation-copy">
            <strong>${check.label}</strong>
            <p>${check.copy}</p>
          </div>
          <span class="validation-state ${check.status}">${check.badge}</span>
        </li>
      `
    )
    .join("");
  persistState();
}

function renderFieldPhotoPreview() {
  if (!state.fieldForm.photoData) {
    return `
      <div class="empty-state">
        No photo attached yet. Missing photo should be caught before the sample enters the clean campaign record.
      </div>
    `;
  }
  return `
    <div class="photo-preview">
      <img src="${state.fieldForm.photoData}" alt="Field evidence preview" />
    </div>
  `;
}

function validationHeadline() {
  const failing = state.fieldValidation.filter((check) => check.status === "fail").length;
  if (failing > 0) {
    return `${failing} blockers`;
  }
  const warnings = state.fieldValidation.filter((check) => check.status === "warn").length;
  if (warnings > 0) {
    return `${warnings} warnings`;
  }
  return "Ready to submit";
}

function renderBatchNarrative(summary) {
  if (!summary) {
    return `<div class="empty-state">Run batch QA to generate the summary.</div>`;
  }
  return `
    <div class="detail-highlight">
      <p class="body-copy" style="margin: 0;">
        ${summary.narrative}
      </p>
    </div>
    <div class="grid-two" style="margin-top: 16px;">
      <div class="summary-card">
        <p class="mini-label">Counts</p>
        <h3>${summary.matchedCount} matched / ${summary.unmatchedCount} unmatched</h3>
        <p class="muted-copy">${summary.suspiciousCount} suspicious values, ${summary.mismatchCount} note mismatches, ${summary.duplicateCount} duplicates.</p>
      </div>
      <div class="summary-card">
        <p class="mini-label">What happens next</p>
        <h3>Send issues into the queue</h3>
        <p class="muted-copy">Each flagged row becomes a trackable exception with a reason, recommended fix, and sample-level context.</p>
      </div>
    </div>
  `;
}

function renderCopilotMessage(message) {
  if (message.role === "user") {
    return `
      <li class="copilot-message user">
        <small>You</small>
        <div>${escapeText(message.text)}</div>
      </li>
    `;
  }

  if (!message.card) {
    return `
      <li class="copilot-message assistant">
        <small>Copilot</small>
        <div>${escapeText(message.text)}</div>
      </li>
    `;
  }

  return `
    <li class="copilot-message assistant copilot-card-message">
      <small>Copilot</small>
      <div class="copilot-card-grid">
        <div class="copilot-card-block">
          <span class="mini-label">Summary</span>
          <p>${escapeText(message.card.summary)}</p>
        </div>
        <div class="copilot-card-block">
          <span class="mini-label">Evidence</span>
          <p>${escapeText(message.card.evidence)}</p>
        </div>
        <div class="copilot-card-block">
          <span class="mini-label">Confidence</span>
          <p>${escapeText(message.card.confidence)}</p>
        </div>
        <div class="copilot-card-block">
          <span class="mini-label">Next action</span>
          <p>${escapeText(message.card.nextAction)}</p>
        </div>
      </div>
    </li>
  `;
}

function renderHeroVisual(campaign, readiness, sampleCount, openIssueCount) {
  return `
    <div class="hero-poster-surface">
      <div class="poster-orb"></div>
      <div class="poster-orb poster-orb-secondary"></div>
      <div class="poster-grain"></div>
      <div class="poster-ink">
        <p class="mini-label">Alt Carbon field operations</p>
        <h3 class="poster-headline">${campaign.name}</h3>
        <p class="poster-copy">
          ${campaign.region}. ${campaign.focus}
        </p>
        <div class="poster-facts">
          <div>
            <span class="mini-label">Readiness</span>
            <strong>${readiness}%</strong>
          </div>
          <div>
            <span class="mini-label">Samples</span>
            <strong>${sampleCount}</strong>
          </div>
        </div>
        <div class="poster-callout poster-callout-left">
          <span class="mini-label">Open issues</span>
          <strong>${openIssueCount}</strong>
        </div>
        <div class="poster-callout poster-callout-right">
          <span class="mini-label">Method</span>
          <strong>${campaign.sopVersion}</strong>
        </div>
      </div>
    </div>
  `;
}

function renderSamplePhoto(sample) {
  if (sample.photoData) {
    return `
      <div class="sample-photo" data-label="${escapeAttr(sample.photoLabel || "Field photo")}">
        <img src="${sample.photoData}" alt="${escapeAttr(sample.sampleId)} field capture" />
      </div>
    `;
  }
  if (!sample.hasPhoto) {
    return `
      <div class="empty-state">
        No photo attached. This evidence gap is one reason the sample remains in review.
      </div>
    `;
  }
  return `
    <div class="sample-photo" data-label="${escapeAttr(sample.photoLabel || "Field capture")}">
      <div class="photo-gradient"></div>
      <p class="photo-note">${sample.photoLabel}</p>
    </div>
  `;
}

function renderMapSvg(campaign, sampleList, flaggedIssues, variant = "light") {
  const polygon = campaign.boundary;
  const bounds = polygon.reduce(
    (acc, [lng, lat]) => ({
      minLng: Math.min(acc.minLng, lng),
      maxLng: Math.max(acc.maxLng, lng),
      minLat: Math.min(acc.minLat, lat),
      maxLat: Math.max(acc.maxLat, lat),
    }),
    {
      minLng: Infinity,
      maxLng: -Infinity,
      minLat: Infinity,
      maxLat: -Infinity,
    }
  );

  const issueSet = new Set(
    flaggedIssues
      .map((entry) => (entry.sampleUid ? entry.sampleUid : sampleBySampleId(entry.sampleId)?.uid))
      .filter(Boolean)
  );

  const projectPoint = ([lng, lat]) => {
    const x = 20 + ((lng - bounds.minLng) / Math.max(bounds.maxLng - bounds.minLng, 0.001)) * 560;
    const y = 20 + ((bounds.maxLat - lat) / Math.max(bounds.maxLat - bounds.minLat, 0.001)) * 300;
    return [x, y];
  };

  const polygonPoints = polygon.map(projectPoint).map((point) => point.join(",")).join(" ");
  const isDark = variant === "dark";
  const frameFill = isDark ? "rgba(9, 12, 10, 0.96)" : "#ece6d4";
  const gridStroke = isDark ? "rgba(255,255,255,0.05)" : "rgba(31,28,22,0.11)";
  const polygonStroke = isDark ? "rgba(194, 211, 183, 0.8)" : "rgba(53, 64, 47, 0.72)";
  const boundaryFillStart = isDark ? "rgba(127,154,111,0.32)" : "rgba(126, 150, 110, 0.18)";
  const boundaryFillEnd = isDark ? "rgba(186,141,106,0.18)" : "rgba(170, 122, 79, 0.12)";
  const pointsMarkup = sampleList
    .map((entry) => {
      const [x, y] = projectPoint([entry.gps.lng, entry.gps.lat]);
      const flagged = issueSet.has(entry.uid);
      return `
        <g>
          <circle cx="${x}" cy="${y}" r="${flagged ? 8 : 6}" fill="${flagged ? "#bb6d50" : "#7d9770"}" stroke="${isDark ? "rgba(255,255,255,0.9)" : "rgba(31,28,22,0.55)"}" stroke-width="1.5" />
          <circle cx="${x}" cy="${y}" r="${flagged ? 16 : 12}" fill="transparent" stroke="${flagged ? (isDark ? "rgba(223,139,106,0.28)" : "rgba(187,109,80,0.24)") : (isDark ? "rgba(127,154,111,0.24)" : "rgba(125,151,112,0.2)")}" stroke-width="2" />
        </g>
      `;
    })
    .join("");

  return `
    <div class="map-frame map-frame-${variant}">
      <svg viewBox="0 0 600 340" width="100%" height="100%" aria-label="${campaign.name} map">
        <defs>
          <linearGradient id="boundaryFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${boundaryFillStart}" />
            <stop offset="100%" stop-color="${boundaryFillEnd}" />
          </linearGradient>
        </defs>
        <rect width="600" height="340" fill="${frameFill}"></rect>
        <path d="M0 64 H600 M0 136 H600 M0 208 H600 M0 280 H600" stroke="${gridStroke}" stroke-width="1"></path>
        <path d="M80 0 V340 M200 0 V340 M320 0 V340 M440 0 V340 M560 0 V340" stroke="${gridStroke}" stroke-width="1"></path>
        <polygon points="${polygonPoints}" fill="url(#boundaryFill)" stroke="${polygonStroke}" stroke-width="2.5"></polygon>
        ${pointsMarkup}
      </svg>
      <div class="map-overlay">
        <div class="map-legend">
          <span class="legend-item"><span class="legend-dot" style="background:#89a77a;"></span> In-bound sample</span>
          <span class="legend-item"><span class="legend-dot" style="background:#df8b6a;"></span> Flagged sample</span>
        </div>
        <span class="legend-item">${sampleList.length} plotted points</span>
      </div>
    </div>
  `;
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) {
    return;
  }

  const action = target.dataset.action;

  if (action === "route") {
    state.view = target.dataset.route;
    if (state.view === "sample" && !state.selectedSampleUid) {
      state.selectedSampleUid = state.samples[0]?.uid || null;
    }
    syncRoute();
    persistState();
    return;
  }

  if (action === "jump-audit") {
    state.view = "audit";
    syncRoute();
    persistState();
    return;
  }

  if (action === "set-campaign") {
    state.selectedCampaignId = target.dataset.campaignId;
    renderDashboard();
    renderAuditPack();
    syncRoute();
    persistState();
    return;
  }

  if (action === "set-boundary-preset") {
    state.campaignForm.boundaryPreset = target.dataset.preset;
    renderCampaignSetup();
    persistState();
    return;
  }

  if (action === "load-campaign-example") {
    state.campaignForm = {
      name: "Darjeeling Ridge Expansion",
      region: "Upper terrace extension",
      team: "North Ridge Team",
      sampleTypes: ["Soil Core", "Water", "Rock Dust"],
      sopVersion: "SOP-ERW-2.4",
      boundaryPreset: "darjeeling-extension",
    };
    renderCampaignSetup();
    persistState();
    return;
  }

  if (action === "capture-gps") {
    captureGps();
    return;
  }

  if (action === "load-bad-sample") {
    state.fieldForm = {
      ...state.fieldForm,
      campaignId: "camp-darjeeling",
      sampleId: "AC-120",
      type: "Soil Core",
      lat: "27.0710",
      lng: "88.2980",
      notes: "Dry soil at ridge edge. Purposely bad demo sample with no image attached.",
      collectedAt: "",
      photoData: "",
      photoName: "",
    };
    renderFieldCollection();
    updateFieldValidationPanel();
    pushToast("Loaded a failing sample to show instant field QA.");
    return;
  }

  if (action === "load-good-sample") {
    state.fieldForm = {
      ...state.fieldForm,
      campaignId: state.selectedCampaignId,
      sampleId: nextSampleId(),
      type: "Soil Core",
      lat: "27.0544",
      lng: "88.2664",
      notes: "Moist core collected inside ridge boundary with photo attached.",
      collectedAt: toInputDateTime(new Date().toISOString()),
      photoData: makeSyntheticPhotoData("clean"),
      photoName: "field-clean-sample.jpg",
    };
    renderFieldCollection();
    updateFieldValidationPanel();
    pushToast("Loaded a clean sample template.");
    return;
  }

  if (action === "load-demo-batch") {
    state.labUpload.rows = structuredClone(state.demoUploadRows);
    state.labUpload.fileName = "demo-batch-lab-027.csv";
    state.labUpload.summary = analyzeLabRows(state.labUpload.rows, currentContext());
    renderLabUpload();
    pushToast("Loaded the seeded demo batch.");
    persistState();
    return;
  }

  if (action === "run-lab-qa") {
    runLabQa();
    return;
  }

  if (action === "set-issue-filter") {
    state.issueFilter = target.dataset.filter;
    renderExceptions();
    persistState();
    return;
  }

  if (action === "open-issue") {
    state.selectedIssueId = target.dataset.issueId;
    renderDrawer();
    persistState();
    return;
  }

  if (action === "close-issue") {
    state.selectedIssueId = null;
    renderDrawer();
    persistState();
    return;
  }

  if (action === "open-sample-from-issue") {
    state.selectedSampleUid = target.dataset.sampleUid;
    state.view = "sample";
    state.selectedIssueId = null;
    renderSampleDetail();
    renderDrawer();
    syncRoute();
    persistState();
    return;
  }

  if (action === "copilot-prompt") {
    const form = document.getElementById("copilotForm");
    if (form) {
      form.querySelector("textarea").value = target.dataset.prompt;
    }
    return;
  }

  if (action === "export-pdf") {
    window.print();
    pushToast("Print dialog opened for the verifier pack.");
  }
}

function handleSubmit(event) {
  if (event.target.id === "campaignForm") {
    event.preventDefault();
    submitCampaignForm();
    return;
  }

  if (event.target.id === "fieldForm") {
    event.preventDefault();
    submitFieldForm();
    return;
  }

  if (event.target.id === "copilotForm") {
    event.preventDefault();
    submitCopilotPrompt(event.target);
  }
}

function handleChange(event) {
  const target = event.target;

  if (target.id === "lab-file-input" && target.files?.[0]) {
    parseLabCsv(target.files[0]);
    return;
  }

  if (target.id === "field-photo" && target.files?.[0]) {
    readFieldPhoto(target.files[0]);
    return;
  }

  if (target.dataset.action === "update-issue-status") {
    const currentIssue = state.issues.find((entry) => entry.id === target.dataset.issueId);
    if (currentIssue) {
      currentIssue.status = target.value;
      renderExceptions();
      renderSampleDetail();
      renderAuditPack();
      persistState();
    }
    return;
  }

  if (target.dataset.action === "select-sample") {
    state.selectedSampleUid = target.value;
    renderSampleDetail();
    persistState();
    return;
  }

  if (target.name && ["name", "region", "team", "sopVersion"].includes(target.name) && target.form?.id === "campaignForm") {
    state.campaignForm[target.name] = target.value;
    persistState();
    return;
  }

  if (target.name === "sampleTypes" && target.form?.id === "campaignForm") {
    const selected = Array.from(target.form.querySelectorAll('input[name="sampleTypes"]:checked')).map((input) => input.value);
    state.campaignForm.sampleTypes = selected;
    persistState();
    return;
  }

  if (target.form?.id === "fieldForm" && target.name) {
    state.fieldForm[target.name] = target.value;
    if (target.name === "campaignId") {
      state.selectedCampaignId = target.value;
      renderFieldCollection();
      renderDashboard();
      renderAuditPack();
    }
    updateFieldValidationPanel();
  }
}

function handleInput(event) {
  const target = event.target;
  if (target.form?.id === "fieldForm" && target.name) {
    state.fieldForm[target.name] = target.value;
    updateFieldValidationPanel();
  }

  if (target.form?.id === "campaignForm" && target.name && ["name", "region", "team", "sopVersion"].includes(target.name)) {
    state.campaignForm[target.name] = target.value;
    persistState();
  }
}

function submitCampaignForm() {
  const preset = boundaryPresets()[state.campaignForm.boundaryPreset];
  const createdCampaign = {
    id: `camp-${slugify(state.campaignForm.name || "new-campaign")}-${Date.now()}`,
    name: state.campaignForm.name || "Untitled Campaign",
    region: state.campaignForm.region || preset.region,
    fieldTeam: state.campaignForm.team || "Unassigned team",
    sampleTypes: state.campaignForm.sampleTypes.length ? state.campaignForm.sampleTypes : ["Soil Core"],
    sopVersion: state.campaignForm.sopVersion || "SOP-ERW-2.4",
    status: "Planned",
    stage: "Campaign design",
    sampleTarget: 24,
    samplesCollected: 0,
    startDate: new Date().toISOString(),
    boundary: preset.boundary,
    narrative: "New demo campaign created from the setup screen.",
    focus: "Proof that the dashboard can start with campaign setup, not just downstream QA.",
  };

  state.campaigns.unshift(createdCampaign);
  state.selectedCampaignId = createdCampaign.id;
  state.activity.unshift(activityItem("Campaign Setup", `${createdCampaign.name} created with ${createdCampaign.sampleTypes.join(", ")} sampling.`, new Date().toISOString()));
  state.campaignForm = {
    name: "",
    region: "",
    team: "",
    sampleTypes: ["Soil Core", "Water"],
    sopVersion: "SOP-ERW-2.4",
    boundaryPreset: state.campaignForm.boundaryPreset,
  };

  renderCampaignSetup();
  renderDashboard();
  renderFieldCollection();
  renderAuditPack();
  pushToast("Campaign created and added to the dashboard.");
  persistState();
}

function submitFieldForm() {
  const checks = validateFieldForm();
  state.fieldValidation = checks;
  const blocking = checks.filter((check) => check.status === "fail");
  updateFieldValidationPanel();
  if (blocking.length) {
    pushToast("Sample blocked until the failing checks are resolved.");
    return;
  }

  const campaign = getCampaign(state.fieldForm.campaignId);
  const createdSample = {
    uid: `sample-${Date.now()}`,
    sampleId: state.fieldForm.sampleId,
    campaignId: state.fieldForm.campaignId,
    gps: { lat: Number(state.fieldForm.lat), lng: Number(state.fieldForm.lng) },
    type: state.fieldForm.type,
    team: campaign.fieldTeam,
    notes: state.fieldForm.notes,
    collectedAt: new Date(state.fieldForm.collectedAt || new Date().toISOString()).toISOString(),
    hasPhoto: Boolean(state.fieldForm.photoData),
    photoData: state.fieldForm.photoData,
    photoLabel: state.fieldForm.photoName || "Uploaded field photo",
    collector: campaign.fieldTeam,
    lineage: [
      "Field capture on mobile form",
      "Queued for courier manifest",
      "Awaiting lab intake",
      "Ready for reconciliation",
    ],
  };

  state.samples.unshift(createdSample);
  state.lastSubmission = createdSample;
  state.selectedSampleUid = createdSample.uid;
  state.activity.unshift(activityItem("Field Submission", `${createdSample.sampleId} passed instant QA and joined ${campaign.name}.`, new Date().toISOString()));
  campaign.samplesCollected += 1;
  state.fieldForm = {
    ...state.fieldForm,
    sampleId: nextSampleId(),
    notes: "",
    photoData: "",
    photoName: "",
    collectedAt: toInputDateTime(new Date().toISOString()),
  };
  renderFieldCollection();
  updateFieldValidationPanel();
  renderDashboard();
  renderSampleDetail();
  renderAuditPack();
  pushToast(`Sample ${createdSample.sampleId} submitted cleanly.`);
  persistState();
}

function submitCopilotPrompt(form) {
  const input = form.querySelector("textarea");
  const query = input.value.trim();
  if (!query) {
    return;
  }
  state.copilotMessages.push({ role: "user", text: query });
  state.copilotMessages.push({ role: "assistant", card: generateCopilotResponse(query) });
  renderCopilot();
  input.value = "";
  persistState();
}

function captureGps() {
  const campaign = getCampaign(state.fieldForm.campaignId);
  const [lng, lat] = centroid(campaign.boundary);
  if (!("geolocation" in navigator)) {
    state.fieldForm.lat = lat.toFixed(4);
    state.fieldForm.lng = lng.toFixed(4);
    renderFieldCollection();
    updateFieldValidationPanel();
    pushToast("Browser geolocation unavailable. Filled the campaign centroid instead.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      state.fieldForm.lat = position.coords.latitude.toFixed(4);
      state.fieldForm.lng = position.coords.longitude.toFixed(4);
      const latInput = document.getElementById("field-lat");
      const lngInput = document.getElementById("field-lng");
      if (latInput) latInput.value = state.fieldForm.lat;
      if (lngInput) lngInput.value = state.fieldForm.lng;
      updateFieldValidationPanel();
      persistState();
    },
    () => {
      state.fieldForm.lat = lat.toFixed(4);
      state.fieldForm.lng = lng.toFixed(4);
      renderFieldCollection();
      updateFieldValidationPanel();
      pushToast("Location permission denied. Used the selected site centroid for the demo.");
    }
  );
}

function readFieldPhoto(file) {
  const reader = new FileReader();
  reader.onload = () => {
    state.fieldForm.photoData = String(reader.result);
    state.fieldForm.photoName = file.name;
    const preview = document.getElementById("fieldPhotoPreview");
    if (preview) {
      preview.innerHTML = renderFieldPhotoPreview();
    }
    updateFieldValidationPanel();
    persistState();
  };
  reader.readAsDataURL(file);
}

function parseLabCsv(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const rows = simpleCsvParse(String(reader.result));
    state.labUpload.rows = rows;
    state.labUpload.fileName = file.name;
    state.labUpload.summary = analyzeLabRows(rows, currentContext());
    renderLabUpload();
    pushToast(`Loaded ${rows.length} rows from ${file.name}.`);
    persistState();
  };
  reader.readAsText(file);
}

function runLabQa() {
  if (!state.labUpload.rows.length) {
    pushToast("Load a CSV or the seeded demo batch first.");
    return;
  }
  const summary = analyzeLabRows(state.labUpload.rows, currentContext());
  state.labUpload.summary = summary;
  state.latestBatchAnalysis = summary;
  summary.newIssues.forEach((entry) => upsertIssue(entry));
  summary.persistedResults.forEach((result) => {
    if (!state.labResults.some((existing) => existing.sampleId === result.sampleId && existing.batchId === result.batchId)) {
      state.labResults.unshift(result);
    }
  });
  state.activity.unshift(activityItem("Lab QA", summary.narrative, new Date().toISOString()));
  renderLabUpload();
  renderExceptions();
  renderSampleDetail();
  renderAuditPack();
  renderDashboard();
  pushToast("Batch QA complete. Exceptions updated.");
  persistState();
}

function buildDraftSamplePreview() {
  const lat = Number(state.fieldForm.lat);
  const lng = Number(state.fieldForm.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }
  return {
    uid: "draft-preview",
    sampleId: state.fieldForm.sampleId || "Draft sample",
    campaignId: state.fieldForm.campaignId,
    gps: { lat, lng },
    type: state.fieldForm.type,
    team: getCampaign(state.fieldForm.campaignId).fieldTeam,
    notes: state.fieldForm.notes,
    collectedAt: state.fieldForm.collectedAt || new Date().toISOString(),
    hasPhoto: Boolean(state.fieldForm.photoData),
    photoData: state.fieldForm.photoData,
    photoLabel: state.fieldForm.photoName || "Draft capture",
  };
}

function buildDraftPreviewIssues(sample, campaign) {
  const issues = [];
  if (!pointInPolygon([sample.gps.lng, sample.gps.lat], campaign.boundary)) {
    issues.push({ sampleUid: sample.uid, sampleId: sample.sampleId });
  }
  return issues;
}

function validateFieldForm() {
  const campaign = getCampaign(state.fieldForm.campaignId);
  const lat = Number(state.fieldForm.lat);
  const lng = Number(state.fieldForm.lng);
  const duplicate = state.samples.some((entry) => entry.sampleId === state.fieldForm.sampleId);
  const insideBoundary =
    Number.isFinite(lat) && Number.isFinite(lng)
      ? pointInPolygon([lng, lat], campaign.boundary)
      : false;

  return [
    {
      key: "photo",
      label: "Photo evidence",
      status: state.fieldForm.photoData ? "pass" : "fail",
      badge: state.fieldForm.photoData ? "Attached" : "Missing",
      copy: state.fieldForm.photoData
        ? "The sample has image evidence attached for condition and context."
        : "Missing photo will force a follow-up and weaken verifier trust in the field record.",
    },
    {
      key: "duplicate",
      label: "Sample ID uniqueness",
      status: duplicate ? "fail" : "pass",
      badge: duplicate ? "Duplicate" : "Unique",
      copy: duplicate
        ? "This ID already exists in the campaign register and would create chain-of-custody ambiguity."
        : "The sample label is unique across the current register.",
    },
    {
      key: "gps",
      label: "Site boundary",
      status: insideBoundary ? "pass" : "fail",
      badge: insideBoundary ? "In bounds" : "Outside boundary",
      copy: insideBoundary
        ? "Coordinates sit inside the approved site polygon."
        : "Current coordinates fall outside the site boundary and should trigger a re-check before submission.",
    },
    {
      key: "timestamp",
      label: "Capture timestamp",
      status: state.fieldForm.collectedAt ? "pass" : "fail",
      badge: state.fieldForm.collectedAt ? "Present" : "Missing",
      copy: state.fieldForm.collectedAt
        ? "Timestamp is available for chain-of-custody and audit lineage."
        : "A missing timestamp creates a gap between collection and lab intake.",
    },
  ];
}

function analyzeLabRows(rows, context) {
  const samples = context.samples;
  const findings = [];
  const persistedResults = [];
  const newIssues = [];
  const ids = new Map();
  let matchedCount = 0;
  let unmatchedCount = 0;
  let suspiciousCount = 0;
  let duplicateCount = 0;
  let mismatchCount = 0;

  rows.forEach((row, index) => {
    ids.set(row.sampleId, (ids.get(row.sampleId) || 0) + 1);
    const matchedSample = sampleBySampleId(row.sampleId, samples);
    if (matchedSample) {
      matchedCount += 1;
    } else {
      unmatchedCount += 1;
      const generated = generatedIssue("high", row.sampleId, null, "Unmatched lab result", `Lab batch ${row.batchId} contains ${row.sampleId}, but there is no corresponding field sample in the campaign register.`, "Pause reporting on this row, verify the manifest, and link it to the correct field record before approval.", "Lab reconciliation", `unmatched-${row.batchId}-${row.sampleId}`);
      findings.push(generated);
      newIssues.push(generated);
    }

    if (ids.get(row.sampleId) > 1) {
      duplicateCount += 1;
      const generated = generatedIssue("medium", row.sampleId, matchedSample?.uid || null, "Duplicate lab result", `Sample ${row.sampleId} appears multiple times in the uploaded batch ${row.batchId}.`, "Confirm whether this is a repeat test or an accidental duplicate before posting it to the evidence pack.", "Lab reconciliation", `duplicate-${row.batchId}-${row.sampleId}`);
      findings.push(generated);
      newIssues.push(generated);
    }

    const suspiciousPh = row.ph < 4.8 || row.ph > 8.8 || (matchedSample?.sampleId === "AC-115" && row.ph > 8.8);
    if (suspiciousPh) {
      suspiciousCount += 1;
      const generated = generatedIssue("medium", row.sampleId, matchedSample?.uid || null, "Suspicious pH jump", `Uploaded pH ${row.ph} is materially out of family with nearby samples and the recorded field context.`, "Re-run the aliquot, compare with neighboring plots, and confirm the bottle label before acceptance.", "Lab reconciliation", `ph-${row.batchId}-${row.sampleId}`);
      findings.push(generated);
      newIssues.push(generated);
    }

    const dryMismatch = matchedSample && /dry/i.test(matchedSample.notes) && row.moisture > 70;
    if (dryMismatch) {
      mismatchCount += 1;
      const generated = generatedIssue("medium", row.sampleId, matchedSample.uid, "Field note vs lab mismatch", `Field note says dry or dusty, but uploaded moisture is ${row.moisture}%.`, "Check bag labels and repeat the moisture test if transport conditions did not explain the change.", "Lab reconciliation", `mismatch-${row.batchId}-${row.sampleId}`);
      findings.push(generated);
      newIssues.push(generated);
    }

    if (matchedSample) {
      persistedResults.push({
        id: `lab-${row.batchId}-${row.sampleId}-${index}`,
        sampleId: row.sampleId,
        batchId: row.batchId,
        ph: row.ph,
        moisture: row.moisture,
        inorganicCarbon: row.inorganicCarbon,
        receivedAt: new Date().toISOString(),
      });
    }
  });

  const summaryIssues = dedupeGeneratedIssues(newIssues);
  const batchId = rows[0]?.batchId || "Batch";
  const narrative = `${batchId} finished with ${matchedCount} matched samples, ${unmatchedCount} unmatched records, ${summaryIssues.filter((entry) => entry.title === "Suspicious pH jump").length} pH anomalies, ${summaryIssues.filter((entry) => entry.title === "Field note vs lab mismatch").length} field-note mismatches, and ${summaryIssues.filter((entry) => entry.title === "Duplicate lab result").length} duplicate rows.`;

  return {
    batchId,
    matchedCount,
    unmatchedCount,
    suspiciousCount,
    duplicateCount,
    mismatchCount,
    narrative,
    findings: dedupeGeneratedIssues(findings),
    newIssues: summaryIssues,
    persistedResults,
  };
}

function generateCopilotResponse(query) {
  const normalized = query.toLowerCase();
  const sampleMatch = query.match(/AC-\d+/i)?.[0]?.toUpperCase();

  if (/why was sample/i.test(query) && sampleMatch) {
    const sampleIssues = issuesForSample(sampleMatch);
    if (!sampleIssues.length) {
      return {
        summary: `${sampleMatch} has no current exception in the demo set.`,
        evidence: "There is no active issue linked to that sample ID in the field or lab reconciliation queues.",
        confidence: "High confidence because the issue register is explicit and local to this demo.",
        nextAction: "Check whether the sample has been reconciled yet or switch to a known flagged sample like AC-115 or AC-117.",
      };
    }
    return {
      summary: `${sampleMatch} was flagged for ${sampleIssues.map((entry) => entry.title.toLowerCase()).join(" and ")}.`,
      evidence: sampleIssues.map((entry) => entry.reason).join(" "),
      confidence: `High confidence because ${sampleIssues.length} linked exception record(s) point to this sample directly.`,
      nextAction: sampleIssues[0]?.fix || "Open the exception drawer to review evidence and recommended action.",
    };
  }

  if (/outside the site boundary|outside boundary/i.test(normalized)) {
    const outsideIssues = state.issues.filter((entry) => /boundary/i.test(entry.title) || /boundary/i.test(entry.reason));
    if (!outsideIssues.length) {
      return {
        summary: "No samples are currently marked outside the approved boundary.",
        evidence: "The active issue queue does not contain any boundary drift exceptions at the moment.",
        confidence: "High confidence because this answer comes from the structured issue register.",
        nextAction: "Run the bad field sample demo if you want to trigger a boundary failure live.",
      };
    }
    return {
      summary: `Samples outside the approved boundary: ${outsideIssues.map((entry) => entry.sampleId).join(", ")}.`,
      evidence: outsideIssues.map((entry) => entry.reason).join(" "),
      confidence: "High confidence because these records were created by the boundary validation rule.",
      nextAction: "Verify the plot marker and recollect inside the approved polygon where needed.",
    };
  }

  if (/summarize unresolved issues|unresolved issues in this batch/i.test(normalized)) {
    const unresolved = state.issues.filter((entry) => entry.status !== "resolved");
    const high = unresolved.filter((entry) => entry.severity === "high").length;
    return {
      summary: `There are ${unresolved.length} unresolved issues, including ${high} high-severity blockers.`,
      evidence: "The unresolved queue is concentrated around duplicate IDs, boundary drift, missing evidence, unmatched lab rows, and lab-side anomalies.",
      confidence: "High confidence because this summary is calculated from the current issue list.",
      nextAction: "Open the exceptions page and sort the queue by high severity to review the most important blockers first.",
    };
  }

  if (/what blocks verification|audit/i.test(normalized)) {
    const blockers = state.issues.filter((entry) => entry.status !== "resolved");
    return {
      summary: `Verification is mainly blocked by ${blockers.slice(0, 3).map((entry) => `${entry.sampleId} (${entry.title.toLowerCase()})`).join(", ")}.`,
      evidence: "The audit pack already has lineage and approvals scaffolding, so unresolved exceptions are the main readiness constraint.",
      confidence: "Medium-high confidence because readiness is a composite of current open issues and evidence completeness.",
      nextAction: "Resolve the high-severity queue first, then regenerate the audit pack to show the readiness lift.",
    };
  }

  return {
    summary: "This copilot is intentionally narrow and operations-focused.",
    evidence: "It can explain flagged samples, highlight boundary exceptions, summarize unresolved issues, and translate QA output into verifier language.",
    confidence: "High confidence when the question maps to seeded samples, issues, campaigns, or batch QA output.",
    nextAction: "Ask about a sample ID, unresolved issues, boundary failures, or verification blockers.",
  };
}

function routeDescription(routeId) {
  return {
    dashboard: "Value story and campaign snapshot",
    campaign: "Create scope, team, and SOP context",
    field: "Catch bad data at collection time",
    lab: "Upload CSV and trigger QA rules",
    exceptions: "Review flagged records with context",
    sample: "Inspect one sample end-to-end",
    audit: "Package evidence for verification",
  }[routeId];
}

function metricCard(label, value, copy) {
  return `
    <article class="metric-card">
      <p class="mini-label">${label}</p>
      <p class="metric-value">${value}</p>
      <p class="metric-copy">${copy}</p>
    </article>
  `;
}

function summaryMetric(label, value, copy) {
  return `
    <article class="metric-card">
      <p class="mini-label">${label}</p>
      <p class="metric-value">${value}</p>
      <p class="metric-copy">${copy}</p>
    </article>
  `;
}

function generatedIssue(severity, sampleId, sampleUid, title, reason, fix, source, signature) {
  return {
    id: `generated-${signature}`,
    severity,
    sampleId,
    sampleUid,
    title,
    reason,
    fix,
    status: "open",
    source,
    signature,
    createdAt: new Date().toISOString(),
  };
}

function dedupeGeneratedIssues(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    const signature = entry.signature || `${entry.title}-${entry.sampleId}`;
    if (seen.has(signature)) {
      return false;
    }
    seen.add(signature);
    return true;
  });
}

function upsertIssue(entry) {
  const signature = entry.signature || `${entry.title}-${entry.sampleId}`;
  const existing = state.issues.find((issueEntry) => (issueEntry.signature || `${issueEntry.title}-${issueEntry.sampleId}`) === signature);
  if (existing) {
    existing.reason = entry.reason;
    existing.fix = entry.fix;
    existing.status = existing.status === "resolved" ? "review" : existing.status;
    existing.severity = entry.severity;
    return;
  }
  state.issues.unshift(entry);
}

function getFilteredIssues() {
  if (state.issueFilter === "all") {
    return state.issues;
  }
  if (state.issueFilter === "high") {
    return state.issues.filter((entry) => entry.severity === "high");
  }
  return state.issues.filter((entry) => entry.status === state.issueFilter);
}

function currentContext() {
  return {
    samples: state.samples,
    labResults: state.labResults,
    issues: state.issues,
  };
}

function getCampaign(id) {
  return state.campaigns.find((entry) => entry.id === id) || state.campaigns[0];
}

function getSample(uid) {
  return state.samples.find((entry) => entry.uid === uid);
}

function sampleBySampleId(sampleId, samples = state.samples) {
  return samples.find((entry) => entry.sampleId === sampleId);
}

function latestLabForSample(sampleId) {
  return state.labResults.find((entry) => entry.sampleId === sampleId);
}

function issuesForSample(sampleId) {
  return state.issues.filter((entry) => entry.sampleId === sampleId);
}

function severityClass(value) {
  return value === "high" ? "fail" : value === "medium" ? "warn" : "pass";
}

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

function formatCoord(value) {
  return Number(value).toFixed(4);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatShortDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

function toInputDateTime(value) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const adjusted = new Date(date.getTime() - offset * 60_000);
  return adjusted.toISOString().slice(0, 16);
}

function pointInPolygon([x, y], polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || 0.00001) + xi;
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
}

function centroid(polygon) {
  const sum = polygon.reduce(
    (acc, point) => {
      acc.lng += point[0];
      acc.lat += point[1];
      return acc;
    },
    { lng: 0, lat: 0 }
  );
  return [sum.lng / polygon.length, sum.lat / polygon.length];
}

function countLabForCampaign(campaignId) {
  const ids = new Set(state.samples.filter((entry) => entry.campaignId === campaignId).map((entry) => entry.sampleId));
  return state.labResults.filter((entry) => ids.has(entry.sampleId)).length;
}

function countSamplesWithPhoto(campaignId) {
  return state.samples.filter((entry) => entry.campaignId === campaignId && (entry.hasPhoto || entry.photoData)).length;
}

function nextSampleId() {
  const numbers = state.samples
    .map((entry) => Number(entry.sampleId.replace(/[^\d]/g, "")))
    .filter((value) => Number.isFinite(value));
  const next = Math.max(...numbers, 120) + 1;
  return `AC-${next}`;
}

function pushToast(message) {
  const toast = { id: Date.now(), message };
  state.toasts.push(toast);
  renderToasts();
  setTimeout(() => {
    state.toasts = state.toasts.filter((entry) => entry.id !== toast.id);
    renderToasts();
  }, 2600);
}

function simpleCsvParse(source) {
  const [headerLine, ...lines] = source.trim().split(/\r?\n/);
  if (!headerLine) {
    return [];
  }
  const headers = headerLine.split(",").map((item) => item.trim());
  return lines
    .filter(Boolean)
    .map((line) => {
      const values = line.split(",").map((item) => item.trim());
      const row = Object.fromEntries(headers.map((header, index) => [header, values[index]]));
      return {
        sampleId: row.sampleId,
        batchId: row.batchId,
        ph: Number(row.ph),
        moisture: Number(row.moisture),
        inorganicCarbon: Number(row.inorganicCarbon),
      };
    });
}

function boundaryPresets() {
  return {
    "darjeeling-extension": {
      label: "Darjeeling extension block",
      region: "Upper ridge terraces",
      copy: "Earthy hill-slope geometry extending the current Darjeeling project footprint.",
      boundary: [
        [88.251, 27.045],
        [88.287, 27.046],
        [88.294, 27.061],
        [88.268, 27.071],
        [88.247, 27.059],
      ],
    },
    "bengal-floodplain": {
      label: "Bengal floodplain pilot",
      region: "Hooghly moisture grid",
      copy: "Flat-water boundary for a moisture and runoff monitoring campaign.",
      boundary: [
        [88.291, 22.868],
        [88.322, 22.872],
        [88.329, 22.891],
        [88.309, 22.902],
        [88.287, 22.889],
      ],
    },
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeSyntheticPhotoData(variant) {
  const palette = variant === "clean" ? ["3a4e31", "8c694b", "111713"] : ["5d3a2b", "2c3a2f", "141713"];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#${palette[0]}" />
          <stop offset="50%" stop-color="#${palette[1]}" />
          <stop offset="100%" stop-color="#${palette[2]}" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g)" />
      <circle cx="180" cy="160" r="110" fill="rgba(255,255,255,0.08)" />
      <circle cx="560" cy="220" r="140" fill="rgba(255,255,255,0.06)" />
      <path d="M0 370 C120 320, 260 340, 360 390 S620 470, 800 360 V500 H0Z" fill="rgba(15,18,15,0.72)" />
      <text x="46" y="446" fill="rgba(255,255,255,0.85)" font-family="Segoe UI, Arial" font-size="24">Alt Carbon field evidence</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

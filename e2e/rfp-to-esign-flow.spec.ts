import { test, expect } from "@playwright/test"

test.describe("RFP to E-Sign Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto("/")

    // Wait for the page to load
    await expect(page.getByText("Tatvacare HealthTech CRM")).toBeVisible()
  })

  test("complete RFP to Quote to E-Sign workflow", async ({ page }) => {
    // Step 1: Create RFP
    await page.getByRole("link", { name: "RFP" }).click()
    await page.getByRole("link", { name: "New RFP" }).click()

    await expect(page.getByText("Create New RFP")).toBeVisible()

    // Fill RFP form
    await page.getByLabel("RFP Title").fill("Apollo Hospitals Clinical Trial Platform")
    await page.getByLabel("Account Name").fill("Apollo Hospitals")
    await page.getByLabel("Contact Name").fill("Dr. Priya Menon")
    await page.getByLabel("Contact Email").fill("priya.menon@apollohospitals.com")
    await page
      .getByLabel("Requirements")
      .fill("Need a comprehensive clinical trial management platform with regulatory compliance features.")
    await page.getByLabel("Budget Range").selectOption("500000-1000000")
    await page.getByLabel("Timeline").fill("Q2 2024")

    await page.getByRole("button", { name: "Create RFP" }).click()

    // Verify RFP creation
    await expect(page.getByText("RFP created successfully")).toBeVisible()

    // Step 2: Convert RFP to Opportunity
    await page.getByRole("button", { name: "Convert to Opportunity" }).click()

    await expect(page.getByText("Opportunity created successfully")).toBeVisible()

    // Navigate to opportunities
    await page.getByRole("link", { name: "Opportunities" }).click()
    await page.getByText("Apollo Hospitals Clinical Trial Platform").click()

    // Step 3: Create Quote from Opportunity
    await page.getByRole("button", { name: "Create Quote" }).click()

    await expect(page.getByText("Create Quote")).toBeVisible()

    // Fill quote details
    await page.getByLabel("Quote Title").fill("Clinical Trial Management Platform Quote")

    // Add line items
    await page.getByRole("button", { name: "Add Line Item" }).click()
    await page.getByLabel("Description").fill("Clinical Trial Management Platform License")
    await page.getByLabel("Quantity").fill("1")
    await page.getByLabel("Unit Price").fill("500000")
    await page.getByLabel("GST Rate").selectOption("18")

    await page.getByRole("button", { name: "Add Line Item" }).click()
    await page.getByLabel("Description").nth(1).fill("Implementation Services")
    await page.getByLabel("Quantity").nth(1).fill("40")
    await page.getByLabel("Unit Price").nth(1).fill("5000")
    await page.getByLabel("GST Rate").nth(1).selectOption("18")

    // Set customer details
    await page.getByLabel("Customer State").selectOption("Tamil Nadu")
    await page.getByLabel("Company State").selectOption("Karnataka")

    await page.getByRole("button", { name: "Create Quote" }).click()

    // Verify quote creation and GST calculation
    await expect(page.getByText("Quote created successfully")).toBeVisible()
    await expect(page.getByText("₹8,51,960")).toBeVisible() // Total with GST
    await expect(page.getByText("IGST (18%)")).toBeVisible() // Inter-state GST

    // Step 4: Send Quote via Email
    await page.getByRole("button", { name: "Send Quote" }).click()

    await expect(page.getByText("Send Quote")).toBeVisible()

    // Verify email recipients are pre-filled
    await expect(page.getByDisplayValue("priya.menon@apollohospitals.com")).toBeVisible()

    await page.getByLabel("Subject").fill("Quote for Clinical Trial Management Platform")
    await page.getByLabel("Message").fill("Please find attached our quote for the clinical trial management platform.")

    await page.getByRole("button", { name: "Send Email" }).click()

    // Verify email sent
    await expect(page.getByText("Email sent successfully")).toBeVisible()

    // Step 5: Send for E-Signature
    await page.getByRole("button", { name: "Send for E-Sign" }).click()

    await expect(page.getByText("Send for E-Signature")).toBeVisible()

    // Fill e-sign details
    await page.getByLabel("Document Name").fill("Clinical Trial Platform Agreement")
    await page.getByLabel("Signing Message").fill("Please review and sign the attached agreement.")

    // Verify signers are pre-filled
    await expect(page.getByDisplayValue("Dr. Priya Menon")).toBeVisible()
    await expect(page.getByDisplayValue("priya.menon@apollohospitals.com")).toBeVisible()

    await page.getByRole("button", { name: "Send for Signature" }).click()

    // Verify e-sign envelope creation
    await expect(page.getByText("E-signature envelope created successfully")).toBeVisible()

    // Step 6: Verify E-Sign Status Page
    const envelopeId = "env-123456" // Mock envelope ID
    await page.goto(`/esign/${envelopeId}`)

    await expect(page.getByText("E-Signature Status")).toBeVisible()
    await expect(page.getByText("Clinical Trial Platform Agreement")).toBeVisible()
    await expect(page.getByText("Pending Signature")).toBeVisible()

    // Step 7: Verify Audit Trail
    await page.goto("/audit/quote/quote-001")

    await expect(page.getByText("Audit Trail: Quote")).toBeVisible()
    await expect(page.getByText("created")).toBeVisible()
    await expect(page.getByText("sent")).toBeVisible()

    // Verify audit entry details
    await page.getByRole("button", { name: "View Details" }).first().click()
    await expect(page.getByText("Audit Entry Details")).toBeVisible()
    await expect(page.getByText("IP Address:")).toBeVisible()
    await expect(page.getByText("User Agent:")).toBeVisible()
  })

  test("GST calculation for intra-state transaction", async ({ page }) => {
    // Navigate to quote creation
    await page.goto("/quotes/new")

    // Set same state for both customer and company
    await page.getByLabel("Customer State").selectOption("Karnataka")
    await page.getByLabel("Company State").selectOption("Karnataka")

    // Add a line item
    await page.getByRole("button", { name: "Add Line Item" }).click()
    await page.getByLabel("Description").fill("Test Product")
    await page.getByLabel("Quantity").fill("1")
    await page.getByLabel("Unit Price").fill("100000")
    await page.getByLabel("GST Rate").selectOption("18")

    // Verify CGST + SGST calculation
    await expect(page.getByText("CGST (9%)")).toBeVisible()
    await expect(page.getByText("SGST (9%)")).toBeVisible()
    await expect(page.getByText("₹1,18,000")).toBeVisible() // Total with GST
  })

  test("pricing approval workflow for high-value quotes", async ({ page }) => {
    // Navigate to quote creation
    await page.goto("/quotes/new")

    // Add high-value line item that requires approval
    await page.getByRole("button", { name: "Add Line Item" }).click()
    await page.getByLabel("Description").fill("Enterprise Solution")
    await page.getByLabel("Quantity").fill("1")
    await page.getByLabel("Unit Price").fill("1500000") // Above approval threshold
    await page.getByLabel("GST Rate").selectOption("18")

    await page.getByRole("button", { name: "Create Quote" }).click()

    // Verify approval required status
    await expect(page.getByText("Approval Required")).toBeVisible()
    await expect(page.getByText("This quote requires manager approval")).toBeVisible()

    // Verify send buttons are disabled
    await expect(page.getByRole("button", { name: "Send Quote" })).toBeDisabled()
    await expect(page.getByRole("button", { name: "Send for E-Sign" })).toBeDisabled()
  })
})

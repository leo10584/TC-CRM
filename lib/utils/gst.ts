export interface GSTBreakdown {
  cgst: number
  sgst: number
  igst: number
  total: number
}

export function calculateGST(amount: number, gstRate: number, isInterState = false): GSTBreakdown {
  const totalGST = (amount * gstRate) / 100

  if (isInterState) {
    return {
      cgst: 0,
      sgst: 0,
      igst: totalGST,
      total: totalGST,
    }
  } else {
    const halfGST = totalGST / 2
    return {
      cgst: halfGST,
      sgst: halfGST,
      igst: 0,
      total: totalGST,
    }
  }
}

export function calculateTotalWithGST(amount: number, gstRate: number): number {
  return amount + (amount * gstRate) / 100
}

export function isInterState(customerState: string, companyState: string): boolean {
  return customerState.toLowerCase().trim() !== companyState.toLowerCase().trim()
}

export function formatGSTNumber(gstNumber: string): string {
  // Format: 22AAAAA0000A1Z5
  return gstNumber.replace(/(.{2})(.{10})(.{3})/, "$1 $2 $3")
}

export function validateGSTNumber(gstNumber: string): boolean {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  return gstRegex.test(gstNumber)
}

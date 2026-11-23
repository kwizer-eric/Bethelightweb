export type DonationFrequency = 'one-time' | 'monthly'

export interface DonationPayload {
  amount: number
  frequency: DonationFrequency
  firstName: string
  lastName: string
  email: string
  phone?: string
  purpose?: string
  country?: string
  message?: string
  programId?: string
  childId?: string
  childName?: string
  currency?: string
}

export interface DonationResult {
  success: boolean
  transactionId?: string
  message: string
}

/** Provider adapter boundary — swap mockDonationProvider for Stripe/Donorbox later */
export interface DonationProvider {
  submit(payload: DonationPayload): Promise<DonationResult>
}

const mockDonationProvider: DonationProvider = {
  async submit(payload) {
    await new Promise((r) => setTimeout(r, 400))
    if (payload.amount < 1) {
      return { success: false, message: 'Amount must be at least $1.' }
    }
    if (!payload.email.includes('@')) {
      return { success: false, message: 'Please enter a valid email.' }
    }
    if (payload.phone && payload.phone.replace(/\D/g, '').length < 8) {
      return { success: false, message: 'Please enter a valid phone number.' }
    }
    return {
      success: true,
      message: 'Use the payment instructions to complete your gift.',
    }
  },
}

let activeProvider: DonationProvider = mockDonationProvider

export function setDonationProvider(provider: DonationProvider) {
  activeProvider = provider
}

export function getDonationProvider(): DonationProvider {
  return activeProvider
}

export async function submitDonation(payload: DonationPayload): Promise<DonationResult> {
  return activeProvider.submit(payload)
}

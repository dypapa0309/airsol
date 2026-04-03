export type LeadStatus = 'new' | 'contacted' | 'visited' | 'quoted' | 'won' | 'lost'

export interface Lead {
  id: string
  created_at: string
  name: string
  phone: string
  company_name: string
  service_type: string
  region: string
  message: string
  status: LeadStatus
  source: string
  memo: string | null
}

export interface LeadInsert {
  name: string
  phone: string
  company_name: string
  service_type: string
  region: string
  message: string
  status?: LeadStatus
  source?: string
}

export interface AnalyticsEvent {
  id?: string
  created_at?: string
  event_name: 'page_view' | 'cta_click' | 'phone_click' | 'form_start' | 'form_submit'
  page: string
  metadata?: Record<string, unknown>
}

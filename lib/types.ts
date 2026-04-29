export type UserRole = 'admin' | 'manager' | 'viewer'

export type LeadSource =
  | 'website' | 'whatsapp' | 'referral' | 'social_media'
  | 'google_ads' | 'meta_ads' | 'cold_outreach' | 'booking'
  | 'landing_page' | 'other'

export type LeadStatus =
  | 'new' | 'contacted' | 'qualified' | 'proposal_sent'
  | 'negotiation' | 'won' | 'lost' | 'inactive'

export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent'

export type ConversationChannel =
  | 'email' | 'whatsapp' | 'phone' | 'sms'
  | 'chat' | 'social' | 'in_person' | 'other'

export type ActivityType =
  | 'note' | 'call' | 'email' | 'meeting' | 'task'
  | 'stage_change' | 'status_change' | 'score_change'
  | 'created' | 'converted' | 'lost'

export type AutomationTrigger =
  | 'new_lead' | 'stage_change' | 'status_change'
  | 'time_based' | 'score_threshold' | 'manual'
  | 'form_submission' | 'booking_created'

export type AutomationAction =
  | 'send_email' | 'send_whatsapp' | 'send_sms'
  | 'create_task' | 'update_lead' | 'notify_team'
  | 'webhook' | 'move_stage' | 'add_tag'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'

export type AnalyticsEventType =
  | 'page_view' | 'form_view' | 'form_submit'
  | 'cta_click' | 'booking_created' | 'lead_created'
  | 'lead_converted' | 'email_opened' | 'link_clicked'

export interface Profile {
  id: string
  full_name: string | null
  email: string
  avatar_url: string | null
  company_name: string | null
  role: UserRole
  phone: string | null
  timezone: string
  onboarding_complete: boolean
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  profile_id: string
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
  company: string | null
  source: LeadSource | null
  source_detail: string | null
  status: LeadStatus
  priority: LeadPriority
  lead_score: number
  estimated_value: number | null
  tags: string[] | null
  custom_fields: Record<string, unknown>
  notes: string | null
  assigned_to: string | null
  last_contacted_at: string | null
  next_follow_up_at: string | null
  converted_at: string | null
  lost_reason: string | null
  created_at: string
  updated_at: string
}

export interface PipelineStage {
  id: string
  profile_id: string
  name: string
  slug: string
  color: string
  position: number
  is_default: boolean
  is_won_stage: boolean
  is_lost_stage: boolean
  created_at: string
}

export interface PipelineEntry {
  id: string
  lead_id: string
  stage_id: string
  profile_id: string
  position: number
  entered_at: string
  moved_at: string
}

export interface Conversation {
  id: string
  lead_id: string
  profile_id: string
  channel: ConversationChannel | null
  direction: 'inbound' | 'outbound' | null
  subject: string | null
  message: string
  metadata: Record<string, unknown>
  is_automated: boolean
  read_at: string | null
  created_at: string
}

export interface Activity {
  id: string
  lead_id: string
  profile_id: string
  type: ActivityType | null
  title: string
  description: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export interface Automation {
  id: string
  profile_id: string
  name: string
  description: string | null
  trigger_type: AutomationTrigger | null
  trigger_config: Record<string, unknown>
  action_type: AutomationAction | null
  action_config: Record<string, unknown>
  is_active: boolean
  last_triggered_at: string | null
  trigger_count: number
  n8n_workflow_id: string | null
  created_at: string
  updated_at: string
}

export interface AutomationLog {
  id: string
  automation_id: string
  lead_id: string | null
  status: 'success' | 'failed' | 'skipped' | 'pending'
  input_data: Record<string, unknown> | null
  output_data: Record<string, unknown> | null
  error_message: string | null
  executed_at: string
}

export interface Booking {
  id: string
  lead_id: string | null
  profile_id: string
  title: string
  description: string | null
  booking_date: string
  start_time: string
  end_time: string
  status: BookingStatus
  meeting_link: string | null
  reminder_sent: boolean
  notes: string | null
  created_at: string
}

export interface Form {
  id: string
  profile_id: string
  name: string
  slug: string
  fields: FormField[]
  settings: Record<string, unknown>
  submission_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FormField {
  id: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox'
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
}

export interface FormSubmission {
  id: string
  form_id: string
  lead_id: string | null
  data: Record<string, unknown>
  source_url: string | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface AnalyticsEvent {
  id: string
  profile_id: string
  event_type: AnalyticsEventType | null
  page_url: string | null
  referrer: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  metadata: Record<string, unknown>
  session_id: string | null
  visitor_id: string | null
  created_at: string
}

// UI & utility types
export interface KPIData {
  total_leads: number
  active_leads: number
  conversion_rate: number
  revenue_pipeline: number
  bookings_this_week: number
  automation_runs_today: number
}

export interface LeadWithPipeline extends Lead {
  pipeline_entry?: PipelineEntry & { stage?: PipelineStage }
}

export interface ConversationWithLead extends Conversation {
  lead?: Pick<Lead, 'id' | 'first_name' | 'last_name' | 'email' | 'phone'>
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}


-- leads 테이블
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  company_name text not null default '',
  service_type text not null,
  region text not null,
  message text not null default '',
  status text not null default 'new'
    check (status in ('new','contacted','visited','quoted','won','lost')),
  source text not null default 'landing',
  memo text
);

-- events 테이블
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text not null
    check (event_name in ('page_view','cta_click','phone_click','form_start','form_submit')),
  page text not null default '/',
  metadata jsonb default '{}'::jsonb
);

-- RLS: leads (서비스 롤만 insert/select 가능, 퍼블릭 insert는 API route에서 service role key로 처리)
alter table leads enable row level security;
alter table events enable row level security;

-- 인증된 사용자(관리자)만 leads 조회/수정 가능
create policy "admin_all_leads" on leads
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- events는 service role에서만 insert (anon 차단)
create policy "admin_all_events" on events
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 인덱스
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_status_idx on leads (status);
create index if not exists events_created_at_idx on events (created_at desc);
create index if not exists events_name_idx on events (event_name);

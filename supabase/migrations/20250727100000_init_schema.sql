-- Profiles (linked to auth.users)
create table public.profile (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  avatar_path text
);

-- Chat
create table public.chat_message (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  text text not null,
  user_id uuid references public.profile (id) on delete set null
);

-- Dashboard stats (seed data optional)
create table public.project_stat (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  number integer not null,
  bg_color text,
  icon text
);

create table public.project_chart_point (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  range_type text not null,
  value numeric not null
);

-- Tasks
create table public.task (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  due_date date not null,
  color text,
  end_time time,
  icon text,
  owner_id uuid references public.profile (id) on delete set null,
  start_time time
);

create table public.sub_task (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  is_completed boolean default false,
  task_id uuid references public.task (id) on delete cascade
);

create table public.task_participants (
  task_id uuid not null references public.task (id) on delete cascade,
  profile_id uuid not null references public.profile (id) on delete cascade,
  primary key (task_id, profile_id)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profile (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profile enable row level security;
alter table public.chat_message enable row level security;
alter table public.project_stat enable row level security;
alter table public.project_chart_point enable row level security;
alter table public.task enable row level security;
alter table public.sub_task enable row level security;
alter table public.task_participants enable row level security;

create policy "profile: read own" on public.profile for select using (auth.uid() = id);
create policy "profile: update own" on public.profile for update using (auth.uid() = id);

create policy "chat_message: read all authenticated" on public.chat_message for select to authenticated using (true);
create policy "chat_message: insert own" on public.chat_message for insert to authenticated with check (auth.uid() = user_id);

create policy "project_stat: read all" on public.project_stat for select to authenticated using (true);
create policy "project_chart_point: read all" on public.project_chart_point for select to authenticated using (true);

create policy "task: read all authenticated" on public.task for select to authenticated using (true);
create policy "task: insert own" on public.task for insert to authenticated with check (auth.uid() = owner_id);
create policy "task: update own" on public.task for update to authenticated using (auth.uid() = owner_id);
create policy "task: delete own" on public.task for delete to authenticated using (auth.uid() = owner_id);

create policy "sub_task: read all authenticated" on public.sub_task for select to authenticated using (true);
create policy "sub_task: all for task owner" on public.sub_task for all to authenticated
  using (exists (select 1 from public.task t where t.id = task_id and t.owner_id = auth.uid()));

create policy "task_participants: read all authenticated" on public.task_participants for select to authenticated using (true);
create policy "task_participants: manage own tasks" on public.task_participants for all to authenticated
  using (exists (select 1 from public.task t where t.id = task_id and t.owner_id = auth.uid()));

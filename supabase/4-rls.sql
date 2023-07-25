------------------------------------------------------------
-- Setup the profiles table RLS --

alter table profiles enable row level security;
create policy "Profiles only viewable by logged in users" on profiles
  for select to authenticated using (true);
create policy "Users can update own profile." on profiles
  for update using (auth.uid () = id);

------------------------------------------------------------
-- Setup the matkul table RLS --

alter table matkul enable row level security;
create policy "matkul only can be viewed by logged in users" on matkul
  for select to authenticated using (true);

------------------------------------------------------------
-- Setup the praktikum table RLS --

alter table praktikum enable row level security;
create policy "praktikum only can be viewed by logged in users" on praktikum
  for select to authenticated using (true);

------------------------------------------------------------
-- Setup the user_praktikum_linker table RLS --

alter table user_praktikum_linker enable row level security;
create policy "Praktikan only select themself and aslab"
  on user_praktikum_linker
  for select using (
    auth.uid() = id or 'aslab' = praktikum_role
  );

create policy
  "Aslab can update the kelompok he's on" on user_praktikum_linker for all using (
    kelompok in (
      select
        linker_update ()
    )
    and kode_praktikum in (
      select
        linker_update2 ()
    )
  );

------------------------------------------------------------
-- Setup the avatar table RLS --

create policy "Avatar images are accessible to logged in users." on storage.objects
  for all to authenticated using (bucket_id = 'avatars');
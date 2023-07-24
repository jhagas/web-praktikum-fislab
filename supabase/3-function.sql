------------------------------------------------------------
-- Make handle_new_user() function, to be triggered everytime new user is created --

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, nrp, contact)
  values ( new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'nrp', new.raw_user_meta_data->>'contact' );
  return new;
end;
$$ language plpgsql security definer;

------------------------------------------------------------
-- Make linker_update() and linker_update2() function --
-- to verify that only Aslab can update the kelompok he's on (RLS) --

create
or replace function linker_update() returns setof text language sql security definer
set
  search_path = public stable as $$
    select kelompok
    from user_praktikum_linker
    where id = auth.uid() and praktikum_role = 'aslab'
$$;

create
or replace function linker_update2() returns setof text language sql security definer
set
  search_path = public stable as $$
    select kode_praktikum
    from user_praktikum_linker
    where id = auth.uid() and praktikum_role = 'aslab'
$$;

------------------------------------------------------------
-- Make dup_jadwal() function, to check same schedule at a time (called from client) --

create or replace function dup_jadwal()
returns setof timestamp
language sql
as $$
    select jadwal
    from user_praktikum_linker
    where praktikum_role = 'aslab'
    GROUP BY jadwal
    HAVING COUNT(*) >= 2;
$$;
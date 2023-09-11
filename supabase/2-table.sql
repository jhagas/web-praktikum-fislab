------------------------------------------------------------
-- Make profiles table --

create table profiles (
    id uuid references auth.users on delete cascade not null primary key,
    nrp text unique,
    full_name text,
    contact text,
    avatar_url text,
    isChanged boolean default false not null
);

------------------------------------------------------------
-- Make matkul table --

create table
  matkul (id text unique primary key, modul_link text);

------------------------------------------------------------
-- Make praktikum table --

create table
  praktikum (
    id text unique primary key,
    matkul text references matkul,
    judul text
  );

------------------------------------------------------------
-- Make user_praktikum_linker table --

create table
  user_praktikum_linker (
    id uuid references profiles not null,
    kelompok text,
    kode_praktikum text references praktikum,
    praktikum_role krole,
    jadwal timestamp with time zone,
    minggu int2,
    nilai jsonb,
    komentar text,
    PRIMARY KEY (id, kelompok, kode_praktikum)
  );

------------------------------------------------------------
-- Set up Storage! --
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');
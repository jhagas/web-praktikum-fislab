-- This triggers the function handle_new_user()
-- everytime a new user is created

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
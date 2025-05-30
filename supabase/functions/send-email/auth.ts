
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

export async function authenticateUser(req: Request) {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
  
  if (authError || !user) {
    console.error('Auth error:', authError);
    throw new Error('Unauthorized');
  }
  
  return user;
}

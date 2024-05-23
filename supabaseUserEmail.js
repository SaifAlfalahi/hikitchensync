const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises; // Using promises for asynchronous file writing

const supabaseUrl = "https://gvezselivzzzrzzdemnc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2ZXpzZWxpdnp6enJ6emRlbW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NjQxMzMsImV4cCI6MjAzMjA0MDEzM30.Nql3OlIpNQyTgpxhesKAHvjWPmxHbZN3_eHSpG93MSA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getUserEmail(email) {
  try {
    const { data, error } = await supabase
      .from('Users') // Assuming your table name is 'users'
      .select('email')
      .eq('email', email); // Filter by the provided email

    if (error) {
      throw error; // Re-throw the error for handling
    }

    if (data.length === 0) {
      return 'Email not found.'; // Inform user if no matching email exists
    }

    const userEmail = data[0].email;
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Email</title>
</head>
<body>
  <h1>User Email</h1>
  <p>The email address for the user is: ${userEmail}</p>
</body>
</html>`;

    await fs.writeFile('user_email.html', htmlContent); // Write HTML content to a file
    console.log('User email successfully retrieved and saved to user_email.html');
  } catch (error) {
    console.error('Error retrieving user email:', error);
  }
}

// Example usage:
const userEmailToFind = 'saif@gmail.com'; // Replace with the email you want to retrieve
getUserEmail(userEmailToFind);

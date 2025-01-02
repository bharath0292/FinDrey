export function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  const form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  const params: Record<string, string | string[]> = {
    client_id: '498968129207-93qkva3upkove8c9bi1db2qlbo4pmqqb.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:3000/login',
    response_type: 'token',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
    include_granted_scopes: 'true',
    state: 'pass-through value'
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', String(params[p]));
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

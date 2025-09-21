// Helper to create a JWT for Google Service Account
async function getGoogleAccessToken() {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const payload = {
    iss: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: 'https://oauth2.googleapis.com/token',
    exp,
    iat,
  };
  function base64url(input: string) {
    return btoa(input)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  const enc = (obj: any) => base64url(JSON.stringify(obj));
  const unsignedToken = `${enc(header)}.${enc(payload)}`;

  // Sign with private key (PEM)
  // Cloudflare Workers: use crypto.subtle
  const key = await crypto.subtle.importKey(
    'pkcs8',
    str2ab(process.env.GOOGLE_DRIVE_PRIVATE_KEY!.replace(/\\n/g, '\n')),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsignedToken)
  );
  function ab2b64url(buf: ArrayBuffer) {
    let bin = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
    return base64url(bin);
  }
  function str2ab(str: string) {
    const bstr = atob(str.replace(/-----[^-]+-----/g, '').replace(/\s+/g, ''));
    const buf = new ArrayBuffer(bstr.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < bstr.length; i++) view[i] = bstr.charCodeAt(i);
    return buf;
  }
  const jwt = `${unsignedToken}.${ab2b64url(signature)}`;

  // Exchange JWT for access token
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Failed to get Google access token');
  return data.access_token;
}

export async function listDriveFiles() {
  const accessToken = await getGoogleAccessToken();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  const fields = encodeURIComponent('files(id,name,size,mimeType,modifiedTime,webViewLink,webContentLink,lastModifyingUser)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&orderBy=modifiedTime desc&supportsAllDrives=true&includeItemsFromAllDrives=true`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
}

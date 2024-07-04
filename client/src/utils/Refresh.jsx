// client/src/utils/Refresh.jsx
export function tokenExpired() {
    fetch('/refresh', {
        method: 'POST',
        credentials: 'include' // Necessary to include cookies with the request
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to refresh token');
        return response.json();
    })
    .then(data => {
        localStorage.setItem('token', data.accessToken);
        // Optionally, retry the request that failed due to the expired token here
    })
    .catch(error => console.error('Error refreshing token:', error));
}


export function exportToURL(data) {
    const encoded = btoa(JSON.stringify(data));
  
    window.history.pushState({}, null, '?data=' + encoded)
}

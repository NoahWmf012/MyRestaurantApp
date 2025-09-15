import { useRouteError, Link } from 'react-router-dom';

export function ErrorBoundary() {
    const error = useRouteError() as Error;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1>Oops! Something went wrong</h1>
            <p>We're sorry, but an error occurred while loading the page.</p>
            {error && (
                <details style={{ marginTop: '20px', textAlign: 'left' }}>
                    <summary>Error details</summary>
                    <pre style={{
                        background: '#f5f5f5',
                        padding: '10px',
                        borderRadius: '4px',
                        overflow: 'auto',
                        maxWidth: '100%'
                    }}>
                        {error.message || 'Unknown error'}
                    </pre>
                </details>
            )}
            <Link
                to="/"
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px'
                }}
            >
                Go back to home
            </Link>
        </div>
    );
}

export function NotFoundPage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px'
                }}
            >
                Go back to home
            </Link>
        </div>
    );
}
